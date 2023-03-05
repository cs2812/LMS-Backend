const lectureCollection = require("../model/lectureSchema");

const ActionCreateLecture = async (req, res) => {
  const { ur, ln, ll, lt, lcb } = req.body;
  if (ur === "student" || "") {
    return {
      message: "process failed",
      error: "User not allow to create Lecture",
    };
  }
  const lectureData = new lectureCollection({ ln, ll, lt, lcb });
  await lectureData.save();
  return lectureData;
};

module.exports = { ActionCreateLecture };
