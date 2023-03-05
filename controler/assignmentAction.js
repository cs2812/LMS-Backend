const AssignmentCollection = require("../model/assignment/assignment_schema");
const StuCollection = require("../model/assignment/stu_assig_schema");

// for Instrutor
const CreateAssignment = async (req, res) => {
  try {
    const newData = new AssignmentCollection(req.body);
    await newData.save();
    return { message: "process success", data: newData };
  } catch (e) {
    return { message: "process failed", error: e.message };
  }
};

// for Student
const AddAssignment = async (req, res) => {
  try {
    const newData = new StuCollection(req.body);
    await newData.save();
    return { message: "Submit Successfully", data: newData };
  } catch (e) {
    return { message: "process failed", error: e.message };
  }
};

module.exports = { AddAssignment, CreateAssignment };
