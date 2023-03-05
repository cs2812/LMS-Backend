const mongoose = require("mongoose");
const AssigData = new mongoose.Schema(
  {
    an: { type: String, require: true ,unique: true}, //assignment name
    adl: { type: String, require: true}, //assignment discription
    acb:{ type: String, require: true }, // assignment created by
    anl: { type: String}, //assignment notes link
    aei: { type: String}, //assignment extra info
    sids:{type:Array, require:true}, //students ids who solved this Assignment.
    apid:{type:Array} // assignment problem id
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const AssignmentCollection = mongoose.model("InstructorAssignment",AssigData)
module.exports = AssignmentCollection;
