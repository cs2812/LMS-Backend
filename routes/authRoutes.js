const express = require("express");
const UserCollection = require("../model/Auth/userSchema");
const TokenCollection = require("../model/Auth/tokenSchema");
const validator = require("validator");
const { RegisterUser, LoginRegisterUser } = require("../controler/AuthAction");
const userRoute = express.Router();

userRoute.post("/singup", async (req, res) => {
  const { ue } = req.body;
  const isEmail = validator.isEmail(ue);
  if (isEmail) {
    const result = await RegisterUser(req, res);
    if (result.message === "Process failed") {
      console.log("process failed")
      res.status(500).send(result);
    } else {
      res.send(result);
    }
  } else {
    console.log("process failed")
    res.status(500).send({
      message: "process failed",
      error: "Email / Gender should be valid",
    });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const result = await LoginRegisterUser(req, res);
    if (result.message === "process failed") {
      res.status(500).send(result);
    } else {
      res.status(200).send(result);
    }
  } catch (e) {
    res.status(500).send({ message: "process failed", error: e });
  }
});

userRoute.get("/", async (req, res) => {
  try {
    const AllUser = await UserCollection.find();
    res.send(AllUser);
  } catch (e) {
    res.send({ message: "process failed", error: e.message });
  }
});

userRoute.get("/tokens", async (req, res) => {
  try {
    const AllToken = await TokenCollection.find();
    res.send(AllToken);
  } catch (e) {
    res.send({ message: "process failed", error: e.message });
  }
});
userRoute.delete("/token/:id", async (req, res) => {
  try {
    const deleted = await TokenCollection.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (e) {
    res.send({ message: "process failed", error: e.message });
  }
});

userRoute.delete("/:id", async (req, res) => {
  try {
    const deleted = await UserCollection.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (e) {
    res.send({ message: "process failed", error: e.message });
  }
});
module.exports = userRoute;
