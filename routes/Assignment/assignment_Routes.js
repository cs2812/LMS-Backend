const { CreateAssignment } = require("../../controler/assignmentAction");
const TokenCollection = require("../../model/Auth/tokenSchema");
const express = require("express");
const AssignmentCollection = require("../../model/assignment/assignment_schema");

const AssignmentRoutes = express();

AssignmentRoutes.post("/create", async (req, res) => {

  // console.log({ length: user.length, ue, an, ur, adl, acb, token });
  const { an, ur, adl, acb,ut} = req.body;
  // const token = req.headers["authorization"];
  const user = await TokenCollection.find({ ut });
  // console.log({an, ur,role:user , adl, acb, apid, ut, tokenLength:user.length })
  if (
    user.length === 1 &&
    an &&
    adl &&
    acb &&
    ur === user[0].ur &&
    ur !== "student"
  ) {
    const result = await CreateAssignment(req, res);
    if (result.message === "process failed") {
      res.status(500).send({ result });
    } else {
      res.send(result);
    }
  } else {
    res.status(500).send({
      message: "process failed",
      error: "credentials are not completed/Not Authorize to Create Assignment",
    });
  }
});


AssignmentRoutes.get("/", async (req, res) => {
  try {
    const result = await AssignmentCollection.find().sort({ _id: -1 });
    res.status(200).send({ message: "process success", data: result });
  } catch (e) {
    res.status(500).send({ message: "process failed", error: e });
  }
});

AssignmentRoutes.get("/:id", async (req, res) => {
  try {
    const result = await AssignmentCollection.findById(req.params.id)
    res.status(200).send({ message: "process success", data: result });
  } catch (e) {
    res.status(500).send({ message: "process failed", error: e });
  }
});

AssignmentRoutes.delete("/:id", async (req, res) => {
  const data = await AssignmentCollection.findByIdAndDelete(req.params.id);
  res.send(data);
});

// Patch Route
AssignmentRoutes.patch("/:id", async (req, res) => {
  try{
    const updatedInfo = await AssignmentCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send({message:"process success",data:updatedInfo});
  }
  catch(error){
    res.status(500).send({ message: "process failed", error });
  }
});


module.exports = AssignmentRoutes;
