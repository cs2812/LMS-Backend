const UserCollection = require("../model/Auth/userSchema");
const TokenCollection = require("../model/Auth/tokenSchema");
const getID = require("getid");

const RegisterUser = async (req, res) => {
  
  const data = {...req.body, uid: getID({ length: 10, prefix: "ID" }) };
  try {
    const user = new UserCollection(data);
    await user.save();
    return { message: "User Signup Successfully" };
  } catch (e) {
    // console.log("Process failed");
    return { message: "Process failed", error: e.message };
  }
};

const LoginRegisterUser = async (req, res) => {
  const { ue, up } = req.body;
  if(ue && up){
    const user = await UserCollection.find({ ue, up });
    let tokenData;
    if (user.length === 1) {
      //if user user alredy logged in then delete token
      const loggedin = await TokenCollection.find({ ue });
      if (loggedin.length >0) {
        await immediateDeleteToken(loggedin[0]._id);
      }
      // new login
      tokenData = new TokenCollection({
        uid: user[0].uid,
        ut: getID({ prefix: "t", length: 20 }),
        ur: user[0].ur,
        ue: user[0].ue,
        un:user[0].un,
        sb:user[0].sb
      });
      await tokenData.save();
      return { message: "process success", data: tokenData };
    } else {
      return { message: "process failed", error: "user not found" };
    }
  }
  else {
    return {
      message: "process failed",
      error: "Email or Password should be correct or present",
    };
  }
  
};

// 1000 * 60 * 60 * 24 ;

const immediateDeleteToken = async (id) => {
  let data = await TokenCollection.findByIdAndDelete(id);
  return data;
};

module.exports = { RegisterUser, LoginRegisterUser };
