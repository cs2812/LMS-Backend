const mongoose = require("mongoose");
const userData = new mongoose.Schema(
  {
    uid: { type: String, require: true, unique: true }, //user_id
    un: { type: String, require: true }, //user_name
    ue: { type: String, require: true, unique: true, allowNull: false }, //user_email
    ug: { type: String, require: true, enum: ["female","male"], }, //user_gender
    up: { type: String, require: true }, //user_password
    ur: { type: String, require:true,enum: ["instructor", "student","admin"] }, //who is user(admin, student or instructor)
    sb:{type:String} // student batch
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const UserCollection = mongoose.model("LMS_users", userData);
module.exports = UserCollection;
