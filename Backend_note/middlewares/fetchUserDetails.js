const jwt = require("jsonwebtoken");
const AUTHENTICATED_SIGNATURE = "sonuisbanu";

const fetchUserDetails = async (req, res, next) => {
    // Verifying the authtoken and decoding the user details
    const authtoken = req.header("auth-token");
    if(!authtoken) {
        res.status(401).send({error: "Oopps... You are not eligible to proceed."});
    }
    try {
        const data = await jwt.verify(authtoken, AUTHENTICATED_SIGNATURE);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({error: "Oopps... You are not eligible to proceed."});
    }
    
}

module.exports = fetchUserDetails;