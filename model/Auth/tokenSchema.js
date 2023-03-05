const mongoose = require("mongoose");
// const ttl = require('mongoose-ttl')

const userToken = new mongoose.Schema(
  {
    uid: { type: String }, //user_id
    ut: { type: String, require: true }, //user_token
    ue: { type: String, require: true }, //user_email
    un: { type: String, require: true }, //user_name
    sb: { type: String, }, //student_batch
    ur: { type: String, require: true }, //who is user(student or instructor)
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// 1000 === 1sec
// userToken.plugin(ttl, { ttl: 1000*60*5});

const TokenCollection = mongoose.model("userTokenCollection",userToken)
module.exports = TokenCollection;
