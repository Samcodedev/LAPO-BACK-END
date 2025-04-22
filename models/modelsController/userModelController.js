const User = require('../../models/userModel')

// Fixed query structure and added proper error handling
const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        throw new Error(`Error finding user by email: ${error.message}`);
    }
}

const findUserByUserName = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (error) {
        throw new Error(`Error finding user by username: ${error.message}`);
    }
}

module.exports = { findUserByEmail, findUserByUserName }