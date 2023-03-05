const mongoose = require("mongoose");

const problemData = new mongoose.Schema(
  {
    pn: { type: String, require: true , unique: true}, //problem name
    pnl: { type: String }, //problem notes link
    pd: { type: String, require: true }, // problem discreption
    pcb: { type: String, require: true }, // problem created by(name)
    pei: { type: String}, //problem extra Info
    sids:{type:Array, require:true}, //students ids who solved this Problem.
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const problemCollection = mongoose.model("problemCollection", problemData);
module.exports = problemCollection;
