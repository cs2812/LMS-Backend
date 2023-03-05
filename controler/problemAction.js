const problemCollection = require("../model/problemSchema");


const ActionCreateProblem= async (req,res)=>{
    const {ur} = req.body;
    if(ur === "student"){
        return{message:"process failed",error:"User not authorized to create problem"}
    }
    const newProblem = new problemCollection(req.body)
    await newProblem.save()
    return newProblem
}

module.exports = {ActionCreateProblem}