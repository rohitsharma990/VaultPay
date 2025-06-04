const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    FullName:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
    },
    Email:{
        type: String,
        required: true,
        unique: true,
    },
    Password:{
        type: String,
        required: true,
    },
    PhoneNumber:{
        type: Number,
        required: true,
    },
    ProfilePicture:{
        type: String,
        default:"https://res.cloudinary.com/dmv6ezqo6/image/upload/v1747470831/profile_hjaeyg.png"
    },
      Coins: {
        type: Number,
        default: 0
      },    
      QRCode: {
        type: String,
        unique: true
      },   
      Transactions: [
        {
         userId: {
            type: String,
            required: true
         },
         amount: {
            type: Number,
         },
         date: {
            type: Date,
            default: Date.now
         },
         title: {
            type: String,
         },
         status: {
            type: String,
            default: "pending"
         },
         type: {
            type: String,
            default: "Sent"
         },
         bonus: {
            type: Number,
            default: 0
         }
        }
      ],    
      isBanned: {
        type: Boolean,
        default: false
      },
      role: {
        type: String,
        default: "user"
      },
    EntryCode: {
      type: String, 
    },
    token: {
        type: String,
        default: null
    }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24d' });
  return token;
}

userSchema.methods.comparePassword = async function (password) {
  if (!password || !this.Password) {
    throw new Error('Password and hashed password are required for comparison');
  }
  return await bcrypt.compare(password, this.Password);
}

userSchema.statics.hashPassword = async function (password) {
  try {
    if (!password) {
      throw new Error('Password is required for hashing');
    }
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

    module.exports = mongoose.model('User', userSchema);
