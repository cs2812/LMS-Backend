const express = require("express");
const { ActionCreateLecture } = require("../controler/lectureAction");
const lectureCollection = require("../model/lectureSchema");

const lectureRoutes = express.Router();

lectureRoutes.get("/", async (req, res) => {
  try {
    const result = await lectureCollection.find().sort({ _id: -1 });
    res.status(200).send({ message: "process success", data: result });
  } catch (e) {
    res.status(500).send({ message: "process failed", error: e });
  }
});
lectureRoutes.get("/:id", async (req, res) => {
  try {
    const result = await lectureCollection.findById(req.params.id);
    res.status(200).send({ message: "process success", data: result });
  } catch (e) {
    res.status(500).send({ message: "process failed", error: e });
  }
});

lectureRoutes.post("/create", async (req, res) => {
  try {
    const data =await ActionCreateLecture(req, res);
    if(data.message ==="process failed"){
        res.status(500).send(data)
    }
    else{
        res.status(200).send({ message: "process success", data });
    }
  } catch (e) {
    res.status(500).send({ message: "process failed", error: e });
  }
});

lectureRoutes.delete("/:id", async (req, res) => {
  const data = await lectureCollection.findByIdAndDelete(req.params.id);
  res.send(data);
});

module.exports = lectureRoutes;
