const express = require("express");
const { ActionCreateProblem } = require("../controler/problemAction");
const problemCollection = require("../model/problemSchema");
const problemRoutes = express.Router();

problemRoutes.post("/create", async (req, res) => {
  try {
    const data = await ActionCreateProblem(req, res);
    if (data.message === "process failed") {
      res.status(500).send(data);
    } else {
      res.status(200).send({ message: "process success", data });
    }
  } catch (e) {
    res.status(500).send({ message: "process failed", error: e });
  }
});

problemRoutes.get("/",async (req,res)=>{
    try{
        const problems = await problemCollection.find().sort({_id:-1})
        res.send({ message: "process success", data:problems })
    }
    catch(e){
        res.status(500).send({ message: "process failed", error: e });
    }
})

problemRoutes.get("/:id", async(req,res)=>{
    try{
        const problem = await problemCollection.findById(req.params.id)
        res.send({ message: "process success", data:problem }) 
    }
    catch(e){
        res.status(500).send({ message: "process failed", error: e });
    }
})

// Patch Route
problemRoutes.patch("/:id", async (req, res) => {
  try{
    const updatedInfo = await problemCollection.findByIdAndUpdate(
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

module.exports = problemRoutes;