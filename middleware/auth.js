const jwt = require('jsonwebtoken');

exports.auth = (req,res,next) => {
    try{
        const token =req.header("Authorization");
        if(!token) return res.status(403).send("Access Denied");

        const decoded =jwt.verify(token,process.env.JWTPRIVATEKEY);
        req.user =decoded;
        // res.status(200).send(req.user._id);
        next();
    } catch(error){
        console.log(error);
        res.status(400).send("Invalid token");
    }
};