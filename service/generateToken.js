const jwt = require("jsonwebtoken");

const generateToken = (data, expire) => {
    try {
        return jwt.sign(
            data, 
            process.env.JWT_SECRET, 
            { expiresIn: expire }
        );
    } catch (err) {
        throw new Error(`Error generating token: ${err.message}`);
    }
}

module.exports = generateToken