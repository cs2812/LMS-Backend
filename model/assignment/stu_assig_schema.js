const mongoose = require("mongoose");

const stuAssigData = new mongoose.Schema(
  {
    sid: { type: String, require: true }, //student id
    sa: { type: Object, require: true }, // student assignment
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const StuData = mongoose.model("studentAssignment", stuAssigData);
module.exports = StuData;
