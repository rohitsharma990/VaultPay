const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const userService = require('../services/user.services.js');
const { generateAndSaveQRCode } = require('../utils/qrGenerator.js');
const randomstring = require('randomstring');
const sendEmail = require('../utils/sendEmail.js');
//register
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const { FullName, Email, Password, PhoneNumber } = req.body;
    
    try {
        //Check if user already exists
        const userisExist = await User.findOne({ Email });
        if(userisExist){
            return res.status(400).json({ message: "User already exists" });
        }
         //Hash Password
        let hashedPassword = await User.hashPassword(Password);
        
        if(!hashedPassword){
            return res.status(400).json({ message: "Failed to hash password" });
        }

        //Create User
        const user = await userService.createUser({ FullName, Email, Password : hashedPassword, PhoneNumber });
        if(!user){
            return res.status(400).json({ message: "Failed to create user" });
        };
        //Generate QR Code and save it in local storage
        const qrCode = await generateAndSaveQRCode(user._id);
        if(!qrCode){
            return res.status(400).json({ message: "Failed to generate QR code" });
        }
 
        //Update User with QR Code
        const updatedUser = await User.findByIdAndUpdate(user._id, { QRCode: qrCode });
        if(!updatedUser){
            return res.status(400).json({ message: "Failed to update user" });
        }


        return res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

//generate entry code
const generate_EntryCode = async (req, res) => {
    const { userId , entryCode } = req.body;
    const user = await User.findByIdAndUpdate(userId , { EntryCode: entryCode });
    if(!user){
        return res.status(400).json({ message: "User not found" });
    }
   
    if(!entryCode){
        return res.status(400).json({ message: "Failed to generate entry code" });
    }
    return res.status(200).json({ message: "Entry code generated successfully", entryCode });
}

//login with entry code
const login_with_entry_code = async (req, res) => {
    const { entryCode } = req.body;
    const user = await User.findOne({ EntryCode: entryCode });
    if(!user){
        return res.status(400).json({ message: "invalid Entry Pin" });
    }

    const token = await user.generateAuthToken();

    res.cookie('token', token);
    return res.status(200).json({ message: "User logged in successfully", user, token });
}

//logout
const logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
}
//login with email and password
const login_with_email_and_password = async (req, res) => {
    try {
        // Validate request body
        if (!req.body?.email || !req.body?.password) {
            return res.status(400).json({ password: "Email and password are required" });
        }

        const { email, password } = req.body;

        // Find user and handle case sensitivity
        const user = await User.findOne({ Email: email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if user is banned
        if (user.isBanned) {
            return res.status(403).json({ message: "Account has been banned" });
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = user.generateAuthToken();

        // Set cookie with secure options
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Return user data and token
        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                FullName: user.FullName,
                Email: user.Email,
                PhoneNumber: user.PhoneNumber,
                ProfileImage: user.ProfileImage,
                Coins: user.Coins,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "An error occurred during login" });
    }
}
//daily reward
const dailyReward = async (req, res) => {
    const user = req.user;
    const dailyReward = user.Coins + 50;
    const updatedUser = await User.findByIdAndUpdate(user._id, { Coins: dailyReward });
    if(!updatedUser){
        return res.status(400).json({ message: "Failed to update user" });
    }

    const transaction = await User.findByIdAndUpdate(user._id, {
        $push: {
            Transactions: {
                userId: user._id,
                amount: 50,
                title: "Daily reward",
                date: new Date()
            }
        }
    });
    return res.status(200).json({ message: "Daily reward added successfully", updatedUser, transaction });
}

//transactions

//get all transactions
const getallTransactions = async (req, res) => {
    try {
        const user = req.user;
        const transactionsby = user.Transactions;;
        if(!transactionsby){
            return res.status(400).json({ message: "No transactions found" });
        }
        return res.status(200).json({ transactionsby });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

//create transaction

const createTransaction = async (req, res) => {
    try {
      const sender = req.user;
  
      // Fetch sender from DB
      const senderUser = await User.findById(sender._id);
      if (!senderUser) {
        return res.status(400).json({ message: "Sender not found" });
      }
  
      const { userId, amount, title } = req.body;
  
      // Validate input
      if (!userId || !amount || !title) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater than 0" });
      }
  
      if (senderUser.Coins < amount) {  // Changed coins to Coins to match schema
        return res.status(400).json({ message: "Insufficient balance" });
      }
  
      // Fetch receiver
      const receiverUser = await User.findById(userId);
      if (!receiverUser) {
        return res.status(400).json({ message: "Receiver not found" });
      }
  
      // Deduct coins from sender
      await User.findByIdAndUpdate(senderUser._id, {
        $inc: { Coins: -amount + 50 },  // Changed coins to Coins
        $push: {
          Transactions: {  // Changed transactions to Transactions
            userId: receiverUser._id,
            amount: -amount,
            title: `Sent to ${receiverUser.FullName.firstName} _ ${title}`,
            status: "success",
            date: new Date(),
            type: "Sent",
            bonus: 50
          }
        }
      });
  
      // Add coins to receiver
      await User.findByIdAndUpdate(receiverUser._id, {
        $inc: { Coins: amount + 20 },  // Changed coins to Coins
        $push: {
          Transactions: {  // Changed transactions to Transactions
            userId: senderUser._id,
            amount: amount,
            title: `Received from ${senderUser.FullName.firstName} _ ${title}`, 
            status: "success",
            date: new Date(),
            type: "Received",
            bonus: 20
          }
        }
      });
  
      return res.status(200).json({ message: "Transaction completed successfully and bonus", });
  
    } catch (error) {
      console.error("Transaction error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

//get user by id
const getUserById = async (req, res) => {
    const  userId = req.user._id;
    const user = await User.findById(userId);
    return res.status(200).json({ user });
}

//forgot password
//reset password
const forgotPassword = async (req, res) => {
    //validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email } = req.body;
        const user = await User.findOne({ Email: email });
        if (!user) {
            return res.status(404).json({ message: 'email does not exist' });
        }
        const token = randomstring.generate(6);
        const data = await User.updateOne({ email }, { $set: { token: token } });
        if (!data) {
            return res.status(400).json({ message: 'Failed to generate token' });
        }
        const subject = 'Reset Password';
        const html = `
        <h1>Password Reset Request</h1>
        <p>Dear Customer,</p>
        <p>We received a request to reset your password. Please use the following OTP to reset your password:</p>
        <h2><a target="_blank" href="http://localhost:5173/reset-password/${token}">Reset Password</a></h2>
        <p>If you did not request a password reset, please ignore this email or contact our support team.</p>
        <p>Thank you,</p>
        <p>The E-commerce Team</p>
        `;
        const isEmailSent = await sendEmail(email, subject, html);
        if (!isEmailSent) {
            return res.status(400).json({ message: 'Failed to send email' });
        }
        res.status(200).json({ message: 'please check your email' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while sending OTP', error: error.message });
    }
}
//change password
const resetPassword = async (req, res) => {
    //validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const token = req.query.token;
        const { password } = req.body;
         
        const user = await User.findOne({token});
        if (!user) {
            return res.status(404).json({ message:  'token is expired' });
        }
        const hashedPassword = await User.hashPassword(password);
     const data =   await User.updateOne({ token }, { $set: { password: hashedPassword , token: " " } } , { new: true });
     
       res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while resetting password', error: error.message });
    }
}
//update profile image
const updateProfileImage = async (req, res) => {
    try {
        const user = req.user;
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        // Get the file path from multer upload
        const imagePath = req.file.path;
        
        // Create a URL for the image
        const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;

        // Update user profile with image URL
        const updatedUser = await User.findByIdAndUpdate(
            user._id, 
            { ProfileImage: imageUrl },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ message: "Failed to update profile image" });
        }

        return res.status(200).json({ 
            message: "Profile image updated successfully",
            user: updatedUser 
        });

    } catch (error) {
        console.error('Profile image update error:', error);
        return res.status(500).json({ 
            message: "Error updating profile image",
            error: error.message 
        });
    }
}
//find user by name
const getAllUsers = async (req, res) => {
    try {
       const user = await User.find();
       return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { 
    register,
     generate_EntryCode, 
     login_with_entry_code, 
     logout,
     getallTransactions,
     dailyReward,
     createTransaction,
     getUserById,
     forgotPassword,
     resetPassword,
     updateProfileImage,
     login_with_email_and_password,
     getAllUsers
    };