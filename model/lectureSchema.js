const mongoose = require("mongoose");

const lectureData = new mongoose.Schema(
  {
    ln: { type: String, require: true }, //lecture name
    ll: { type: String, require: true }, //lecture link
    lt: { type: String, require: true }, //lecture time
    lcb: { type: String, require: true }, //lecture created by(name)
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const lectureCollection = mongoose.model("lectureCollection", lectureData);

module.exports = lectureCollection;
