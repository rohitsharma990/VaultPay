const User = require("../models/userModel");

const createUser = async ({ FullName, Email, Password, PhoneNumber}) => {
    if(!FullName || !Email || !Password || !PhoneNumber){
        return {
            success: false,
            message: "All fields are required"
        }
    }
    try{
    const user = await User.create({
        FullName: {
            firstName: FullName.firstName,
            lastName: FullName.lastName
        },
        Email,
        Password,
        PhoneNumber,
        Coins: 100,
        role: "user"
    });
    return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { createUser };