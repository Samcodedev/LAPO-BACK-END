const jwt = require("jsonwebtoken");

const generateToken = async (data, expire) => {
    try {
        return jwt.sign(
            data, 
            process.env.JWT_SECRET, 
            { expiresIn: expire }
        );
    } catch (err) {
        throw new Error(`Error generating token: ${error.message}`);
    }
    
}


module.exports = generateToken