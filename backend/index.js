
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://devaldarji:185185@cluster0.6jg6u0v.mongodb.net/e-commerce");

// API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for creating products
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  avilable: { type: Boolean, default: true },
});

app.post("/addproduct", async (req, res) => {
  let lastProduct = await Product.findOne().sort({ id: -1 });
  let id = lastProduct ? lastProduct.id + 1 : 1;

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API For Deleting Product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API For Getting All Products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

// Schema creating for user model
const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object, default: {} }, // Will store as { itemId: { size: quantity } }
  date: { type: Date, default: Date.now },
});

// Creating End Point for registering the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, error: "existing user found with same email address" });
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: {},
  });

  await user.save();

  const data = {
    user: { id: user.id },
  };

  const token = jwt.sign(data, "secret_ecom");

  res.json({ success: true, token });
});

// Creating End Point for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: { id: user.id },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});


// Creating end point for subscribe 
const Newsletter = mongoose.model("Newsletter", {
  email: { type: String, unique: true },
  date: { type: Date, default: Date.now },
});

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    let existingEmail = await Newsletter.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: "You are already subscribed!" });
    }

    const subscription = new Newsletter({ email });
    await subscription.save();
    console.log(`New subscription: ${email}`);

    res.json({ success: true, message: "Thank you for subscribing!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Subscription failed" });
  }
});

// Creating end point for new collection data
app.get("/newcollection", async (req, res) => {
  try {
    let men = await Product.find({ category: "men" }).limit(2);
    let women = await Product.find({ category: "women" }).limit(3);
    let kids = await Product.find({ category: "kid" }).limit(3);

    let newcollection = [...men, ...women, ...kids];

    console.log("New Collection Fetched");
    res.send(newcollection);
  } catch (err) {
    console.error("Error fetching new collection:", err);
    res.status(500).send("Something went wrong");
  }
});


// Creating end point for popular women section
app.get("/popularinwoman", async (req, res) => {
  let product = await Product.find({ category: "women" });
  let popular_in_woman = product.slice(0, 4);
  console.log("Popular In Woman Fetched");
  res.send(popular_in_woman);
});


// Creating end point for popular men section
app.get("/popularinman", async (req, res) => {
  let product = await Product.find({ category: "men" });
  let popular_in_man = product.slice(0, 4);
  console.log("Popular In Men Fetched");
  res.send(popular_in_man);
});


// Middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};

// Middleware to initialize cartData if not present
const initializeCartData = async (userId) => {
  const user = await Users.findOne({ _id: userId });
  if (!user.cartData) {
    user.cartData = {};
    await Users.findOneAndUpdate({ _id: userId }, { cartData: {} });
  }
  return user;
};

// Creating endpoint for adding products in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    let userData = await initializeCartData(req.user.id);
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({ success: false, message: "itemId and size are required" });
    }

    // Initialize itemId object if not present
    if (!userData.cartData[itemId]) {
      userData.cartData[itemId] = {};
    }

    // Initialize size for this itemId if not present
    if (!userData.cartData[itemId][size]) {
      userData.cartData[itemId][size] = 0;
    }

    // Increment quantity for the specific size
    userData.cartData[itemId][size] += 1;

    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Creating endpoint to remove product from cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    let userData = await initializeCartData(req.user.id);
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({ success: false, message: "itemId and size are required" });
    }

    if (!userData.cartData[itemId] || !userData.cartData[itemId][size]) {
      return res.status(400).json({ success: false, message: "Item with this size not in cart" });
    }

    if (userData.cartData[itemId][size] > 0) {
      userData.cartData[itemId][size] -= 1;

      // If quantity becomes 0, remove the size entry
      if (userData.cartData[itemId][size] === 0) {
        delete userData.cartData[itemId][size];
      }

      // If no sizes left for this item, remove the item entry
      if (Object.keys(userData.cartData[itemId]).length === 0) {
        delete userData.cartData[itemId];
      }
    }

    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Creating endpoint to get cartdata
app.get("/getcart", fetchUser, async (req, res) => {
  try {
    let userData = await initializeCartData(req.user.id);
    res.json({
      status: "ok",
      cartData: userData.cartData || {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Creating endpoint for payment order / place order 
app.post("/placeorder", fetchUser, async (req, res) => {
  const user = await Users.findOne({ _id: req.user.id });
  if (!user || !user.cartData || Object.keys(user.cartData).length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const { amount, address, paymentMode } = req.body;

  if (!amount || !address || !paymentMode) {
    return res.status(400).json({ success: false, message: "Amount, Address and Payment Mode are required" });
  }

  const newOrder = new Orders({
    userId: req.user.id,
    items: user.cartData,
    amount,
    address,
    paymentMode,
  });

  await newOrder.save();

  // Clear user's cart
  user.cartData = {};
  await user.save();

  res.json({ success: true, message: "Order placed successfully!" });
});


app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error : " + error);
  }
});