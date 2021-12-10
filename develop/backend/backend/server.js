import express from "express";
import data from "./data";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import userRoute from "./routes/userRoute";

import expressAsyncHandler from "express-async-handler";
// import model
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
// Hash pass
import bcrypt from "bcryptjs";
const { MongoClient } = require("mongodb");

// dotenv.config();
// MONGODB
const uri =
  "mongodb+srv://admin:123@cluster0.wrhwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

/////////////////////////////////////////////////////////////////////////////// LIST MONGODB FUNCTION
////////////////////////////////////////////////////////////////////////Users Function
// Find Account to login
async function findAccountTologin(client, username, password1) {
  const result = await client
    .db("Cdweb1")
    .collection("users")
    .findOne({ email: username, password: password1 });
  if (result) {
    console.log(`Found 1 Account with name ${username}`);

    return result;
    // console.log(result);
  } else {
    console.log(`Found Nothing`);
  }
}
// Add user form Data.js with id
async function createAccountFromData(client, newListing) {
  const result = await client
    .db("Cdweb1")
    .collection("users")
    .insertOne(newListing);
  console.log(`new User created by Id = ${result.insertedId}`);
}
async function getDataFromUsers(client) {
  const result = await client
    .db("Cdweb1")
    .collection("users")
    .find({})
    .toArray();
  // console.log(result);
  return result;
}
// find user by id
async function findOneUserByID(client, idIn) {
  const result = await client
    .db("Cdweb1")
    .collection("users")
    .findOne({ id: idIn });
  if (result) {
    console.log(`Found 1 Account with Id ${idIn}`);
    return result;
    console.log(result);
  } else {
    console.log(`Found Nothing`);
  }
}
// find user by email
async function findOneUserByEmail(client, emailIn) {
  const result = await client
    .db("Cdweb1")
    .collection("users")
    .findOne({ email: emailIn });
  if (result) {
    console.log(`Found 1 Account with email ${emailIn}`);
    return result;
    console.log(result);
  } else {
    console.log(`Found Nothing`);
  }
}
// Update user
async function updateInfo(client, userName, newData) {
  const result = await client
    .db("Cdweb1")
    .collection("users")
    .updateOne({ email: userName }, { $set: newData });
  console.log(result.matchedCount + " matched");
  console.log(result.modifiedCount + " Was updated");
}
//
////////////////////////////////////////////////////////////////////////Products Function
// Create Order
async function createOrderFromData(client, newListing) {
  const result = await client
    .db("Cdweb1")
    .collection("orders")
    .insertOne(newListing);
  console.log(`new Order created by Id = ${result.insertedId}`);
}
////////////////////////////////////////////////////////////////////////Products Function
// Get the newest product
async function getNewest(client) {
  const result = await client
    .db("Cdweb1")
    .collection("products")
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .toArray();
  // JSON.stringify(result);
  console.log(result[0].id);
  return result[0].id;
}
// Get length product
async function getProductLength(client) {
  const result = await client
    .db("Cdweb1")
    .collection("products")
    .find({})
    .toArray();
  // JSON.stringify(result);
  console.log(result.length);
}

// Create product
async function createProductFromData(client, newListing) {
  const result = await client
    .db("Cdweb1")
    .collection("products")
    .insertOne(newListing);
  console.log(`new Product created by Id = ${result.insertedId}`);
}
////Delete product by name
async function deleteProduct(client, nameOfProduct) {
  const result = await client
    .db("Cdweb1")
    .collection("products")
    .deleteOne({ name: nameOfProduct });
  if (result) {
    console.log(`Delete 1 Listing name ${nameOfProduct}`);
    return result;
    console.log(result);
  } else {
    console.log(` Delete Fail`);
  }
}
// Upsert product
async function createProductFromDataUpsert(client, key, newListing) {
  const result = await client
    .db("Cdweb1")
    .collection("products")
    .updateOne({ name: key }, { $set: newListing }, { upsert: true });
  if (result.upsertedCount > 0) {
    console.log(`Product ${result.insertedId} modify `);
  } else {
    console.log(`1 new Product's created .It's id = ${result.insertedId}  `);
  }
}
async function createproductFromDataFile(client, newListing) {
  const result = await client
    .db("Cdweb1")
    .collection("products")
    .insertOne(newListing);
  console.log(`new Product created by Id = ${result.insertedId}`);
}
//////////////////
async function getDataFromProducts(client) {
  const result = await client
    .db("Cdweb1")
    .collection("products")
    .find({})
    .toArray();
  return result;
}
async function findOneProductByID(client, idIn) {
  const result = await client
    .db("Cdweb1")
    .collection("products")
    .findOne({ id: idIn });
  if (result) {
    console.log(`Found 1 product Id ${idIn}`);
    return result;
    console.log(result);
  } else {
    console.log(`Found Nothing`);
  }
}

/////////////////////////////////////////////////////////////////////////////

const app = express();
app.use(bodyParser.json());
/////////////////////////////////////////////////////////////////////////////// User Route
app.get("/api/users", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    res.send(JSON.stringify(await getDataFromUsers(client)));
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
});
// Login
app.post("/api/users/signin", async (req, res) => {
  const client = new MongoClient(uri);
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  // const userPassword = bcrypt.hashSync(req.body.password, 8);
  // console.log(userPassword);
  try {
    await client.connect();
    res.send(await findAccountTologin(client, userEmail, userPassword));
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
});
// get user by id
app.get("/api/users/:id", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.params.id;
  try {
    await client.connect();
    res.send(await findOneUserByID(client, userId + ""));
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
});
// Register user
app.post("/api/users/register", async (req, res) => {
  const client = new MongoClient(uri);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    res.send(user);
    try {
      await client.connect();
      await createAccountFromData(client, user);
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  } else {
    res.status(404).send({ msg: "USER NOT FOUND !!" });
  }
});
//  create user from file data
app.get("/api/users/seed/:id", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.params.id;
  const user = data.users.find((element) => element.id === userId);
  if (user) {
    res.send(user);

    try {
      await client.connect();

      await createAccountFromData(client, user);
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  } else {
    res.status(404).send({ msg: "USER NOT FOUND !!" });
  }
});
// Modify user data
app.post("/api/users/updateInfor", async (req, res) => {
  const client = new MongoClient(uri);
  // console.log(req.body.email);
  // console.log(req.body.name);
  // console.log(req.body.password);
  try {
    await client.connect();
    await updateInfo(client, req.body.email.toString(), {
      name: `${req.body.name}`,
      // email: "bbgk198@gmail.com",
      password: `${req.body.password}`,
      isAdmin: true,
    });
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
});
/////////////////////////////////////////////////////////////////////////////// Product Route
app.get("/api/products/seed/:id", async (req, res) => {
  const client = new MongoClient(uri);
  const productId = req.params.id;
  const product = data.products.find((element) => element.id === productId);
  if (product) {
    res.send(product);
    try {
      await client.connect();

      await createproductFromDataFile(client, product);
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  } else {
    res.status(404).send({ msg: "product NOT FOUND !!" });
  }
});
app.get("/api/products/:id", async (req, res) => {
  const client = new MongoClient(uri);
  const productId = req.params.id;
  try {
    await client.connect();
    res.send(await findOneProductByID(client, productId));
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
});
//Get ALL PRODUCT
app.get("/api/getAll/products", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    res.send(JSON.stringify(await getDataFromProducts(client)));
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
});
// Create Product
app.post("/api/products/createProduct", async (req, res) => {
  const client = new MongoClient(uri);
  const newProduct = new Product({
    // id: 999,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  console.log(newProduct);
  if (newProduct) {
    try {
      await client.connect();
      await createProductFromData(client, newProduct);
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  } else {
    res.status(404).send({ msg: "PRODUCT NOT FOUND !!" });
  }
});
// Create Product2
app.post("/api/products/createProduct2", async (req, res) => {
  const client = new MongoClient(uri);
  const newProduct = {
    id: "99",
    name: req.body.name + " ",
    image: "imagies/a1.jpg",
    price: parseInt(req.body.price),
    brand: req.body.brand + " ",
    description: `${req.body.description}`,
    rating: 0,
    numReviews: 0,
    countInStock: parseInt(req.body.countInStock),
  };
  console.log(newProduct);
  if (newProduct) {
    try {
      await client.connect();
      await createProductFromData(client, newProduct);
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  } else {
    res.status(404).send({ msg: "PRODUCT NOT FOUND !!" });
  }
});
// delete Product
app.post("/api/products/deleteProduct/", async (req, res) => {
  const client = new MongoClient(uri);
  const productName = req.body.name;
  try {
    await client.connect();
    const deletedProduct = await deleteProduct(client, productName);
    if (deletedProduct) {
      res.send({ message: "Product Deleted" });
    } else {
      res.send("Error in Deletion.");
    }
    console.log(deletedProduct);
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
});
// //////////////////////////////////////  Order
app.post("/api/orders/create", async (req, res) => {
  const client = new MongoClient(uri);
  console.log(req.userInfo);
  const newOrder = {
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  };
  console.log(newOrder);
  if (newOrder) {
    try {
      await client.connect();
      await createOrderFromData(client, newOrder);
      res
        .status(201)
        .send({ message: "New Order Created", data: newOrderCreated });
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  } else {
    res.status(404).send({ msg: "PRODUCT NOT FOUND !!" });
  }
});
// Default Port
app.listen(5000, () => {
  // console.log("Server started at http://localhost:5000");
  // console.log("Server Products at http://localhost:5000/api/getAll/products");
  // console.log("Server Users at http://localhost:5000/api/users");
  console.log("Server started !!");
});
