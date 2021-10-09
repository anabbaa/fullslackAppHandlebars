const User = require("../models/userModel");
const allowedAccess = {};
//check
allowedAccess.roleCheck = (req, res, next) => {
    if (req.cookies.role !== "ADMIN") {
      return res.status(401).send("NOT Allowed <br> <a href=´/´>Home</a>");
    }
    next();
  };
//allwo to deleter
  allowedAccess.allowedToDelete = async (req, res, next) => {
    const id = req.params.id;
    if (req.cookies.role == "ADMIN" || req.cookies.user_id == id) {
      next();
    } else {
      return res.status(401).send("NOT Allowed <br> <a href='/'>Home</a>");
    }
  };
  //allowed to view
  allowedAccess.allowedToView = async (req, res, next) => {
    const username = req.params.name;
    //   const user = await User.findOne({ username : username});
    const user = await User.findOne({ username });
    if (req.cookies.role == "ADMIN" || req.cookies.user_id == user._id) {
      next();
    } else {
      return res.status(401).send("NOT Allowed <br> <a href='/'>Home</a>");
    }
  };
  //status
  allowedAccess.loggedStatus = (req, res, next) => {
    if (req.cookies.session_id) {
      req.title = "You are already logged in";
      req.done = true;
    } else {
      // this is only for our small app :)
      req.title = req.path == "/" ? "Welcome" : "Login";
      //if its coming from root path   then   
      req.done = false;
    }
    next();
  };
  
  module.exports = allowedAccess;
  
