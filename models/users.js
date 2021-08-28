const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const Users = mongoose.Schema({
    name: {  
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required : true
    },
    address : {
        type : String,
    },
});


Users.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id }, process.env.JWTPRIVATEKEY);
    return token;
}

//module.exports = mongoose.model('Users',Users);
 const User = mongoose.model("Users", Users);
// //validation on input Data

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
    });

    return schema.validate(user);
};
module.exports = { User, validate };