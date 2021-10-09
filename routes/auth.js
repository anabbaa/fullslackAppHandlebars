const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userCopntroller");
const allowedAccess = require("../controllers/authController");

const multer = require("multer");
const { body, validationResult } = require("express-validator");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {// call back where to live
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    },
  });
//requst.file will create file for my uploads and injected it in folder upload
  const upload = multer({
      storage: storage,
      limit: {fileSize: 1024 * 1024 * 10},//in kylo byte
      fileFilter: function(req, file, cb){
          if (
            file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "image/png"

          ){
              cb(null, true);//null no error true fine pass 
          }
          else {
            cb(new Error("Only .jpeg .gif .png files are OK!"), false);
          }
      },
  });

  router.get("/", allowedAccess.loggedStatus, (req, res) => {
    res.render("index", {
      title: req.title,
      done: req.done,
      errors: req.session.errors,
    });
    req.session.errors = null;
  });
  // register
  //single function one file
  // login
  router.get("/login", allowedAccess.loggedStatus, (req, res) => {
    res.render("login", {
      title: req.title,
      done: req.done,
      errors: req.session.errors,
    });
    req.session.errors = null;
  });

  router.get("/", allowedAccess.loggedStatus, (req, res) => {
    res.render("index", {
      title: req.title,
      done: req.done,
      errors: req.session.errors,
    });
    req.session.errors = null;
  });
  // register
  router.post("/register", 
  body("confPassword").custom((value, { req}) => {
    if (value != req.body.password) {
      throw new Error("Password conf is not the same");
    }
    
  }).withMessage("your password is not the same of your cofirm password"),
  
  // body("password", "please be aware of our demands")
  //   .isLength({
  //     min: 3,
  //     max: 12,
  //   })
  //   .isIn(['123', 'password', " "])
  //   .isUppercase(1)
  //   .isInt(1)
  //   .withMessage("Your pass should be atleast one symol one letter uppercase one digit and without spaces"),
    ( req, res) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        res.render("index", {
          title: "Check your info",
          errors: errors.array(),
        });
      } else {
        res.render("index", {
          title: "Cool you are in our DB 😎",
          done: true,
        });
      }},
  upload.single("avatar"), userControllers.addUser);
    
     


  // login
  router.get("/login", allowedAccess.loggedStatus, (req, res) => {
    res.render("login", {
      title: req.title,
      done: req.done,
      errors: req.session.errors,
    });
    req.session.errors = null;

  });
  router.post("/login", userControllers.login);
  // logout
  router.get("/logout", userControllers.logout);
  
  module.exports = router;
  
  
//avatar the name of input where i want to upload a file