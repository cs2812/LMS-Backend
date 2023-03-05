const StuCollection = require("../../model/assignment/stu_assig_schema");
const TokenCollection = require("../../model/Auth/tokenSchema");
const express = require("express");
const { AddAssignment } = require("../../controler/assignmentAction");
const StuAssiRoutes = express.Router();

StuAssiRoutes.post("/add", async (req, res) => {
  //se & aid & an & role coming from backend so no need to check
  const { se, aid, sl, as, an, role } = req.body;
  const token = req.headers["authorization"];
  const user = await TokenCollection.find({ ue: se });
  if (
    user.length == 1 &&
    se === user[0].ue &&
    sl &&
    as &&
    aid &&
    an &&
    role === "student" &&
    token === user[0].ut
  ) {
    const newData = await AddAssignment(req, res);
    res.send(newData);
  } else {
    res.send({
      message: "process failed",
      error: "missing credentials/Not Authorize to Read & Wrigth",
    });
  }
});

StuAssiRoutes.delete("/:id", async (req, res) => {
  const data = await StuCollection.findByIdAndDelete(req.params.id);
  res.send(data);
});

StuAssiRoutes.get("/", async (req, res) => {
  const data = await StuCollection.find();
  res.send(data);
});
module.exports = StuAssiRoutes;
