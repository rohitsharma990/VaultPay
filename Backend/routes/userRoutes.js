const express = require("express");
const userController = require("../controllers/userController.js");
const { body } = require("express-validator")
const  authMiddleware  = require("../middlewares/authMiddleware.js");
const router = express.Router();

//register
router.post("/register",[
    body("FullName.firstName").notEmpty().withMessage("First name is required"),
    body("FullName.lastName").notEmpty().withMessage("Last name is required"),
    body("Email").isEmail().withMessage("Please enter a valid email"),
    body("Password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("PhoneNumber").isLength({ min: 10 }).withMessage("Phone number must be at least 10 digits")
], userController.register);

//generate entry code
router.post("/generate_entry_code",[
    body("userId").notEmpty().withMessage("User ID is required"),
    body("entryCode").notEmpty().withMessage("Entry code is required")
], userController.generate_EntryCode);

//login with entry code
router.post("/login_with_entry_code",[
    body("entryCode").notEmpty().withMessage("Entry code is required")
], userController.login_with_entry_code);

//logout
router.post("/logout", userController.logout);

//get all transactions
router.get("/getalltransactions", authMiddleware.authUser, userController.getallTransactions);

//daily reward
router.post("/dailyreward", authMiddleware.authUser, userController.dailyReward);

//create transaction
router.post("/createTransaction", authMiddleware.authUser, userController.createTransaction);

//get user by id
router.get("/getUserById", authMiddleware.authUser, userController.getUserById);

//forgot password
router.post("/forgotPassword", authMiddleware.authUser, userController.forgotPassword);

//change password
router.get("/resetPassword", authMiddleware.authUser, userController.resetPassword);

//update profile image
router.post("/updateProfileImage", authMiddleware.authUser, userController.updateProfileImage);

//login with email and password
router.post("/login_with_email_and_password", userController.login_with_email_and_password);

//get all users
router.get("/getAllUsers", authMiddleware.authUser, userController.getAllUsers);

module.exports = router;
