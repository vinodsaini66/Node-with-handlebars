const {User,validate} = require("../../models/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { success, error, validation } = require("../../helpers/responseApis");



exports.create = (req,res) => {
    if(!req.body.email){
        return res.status(400).send({
            message : "email required"
        });
    }
    // create user
    const user = new User({
        role:req.body.role,
        name : req.body.name,
        email: req.body.email,
        password : req.body.password,
        address: req.body.address,
    });

    user.save()
    .then( data =>{
        res.send(data);
    }).catch( err => {
        res.status(500).send({
            message: err.message  || " Some Error Occured While Creating Users."
        });
    });
    

};

exports.findAll =(req ,res) => {
    User.find()
    .then( data => {
        res.status(200)
        .json(success("OK", { data: data}, res.statusCode));
    }).catch ( err =>{
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.findMe =  (req ,res) => {
    User.findById(req.user._id)
    .then( data => {
        res.status(200)
        .json(success("OK", { data: data}, res.statusCode));
    }).catch ( err =>{
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.register = async (req,res) => {
    try{
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = new User(req.body);

        const salt =await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password,salt);
        await user.save();
        res.send(user);
    } catch(error){
        console.log(error);
        res.send("An error occured");

    }

};

exports.login = async(req,res) => {

    try{
            const { error } = validate_login (req.body);
            if(error) return res.status(400).send(error.details[0].message);

            const user =await User.findOne({email : req.body.email});
            if(!user) return res.status(400).send("Invalid email");

            const validPassword =await bcrypt.compare(
                req.body.password,
                user.password
            );

            if(!validPassword) return res.status(400).send("Invalid email and Password");

            const token=user.generateAuthToken();
            res.send(token);
    } catch( error){
        console.log(error);
        res.send("An error occured");
    }

};

const validate_login = (user) => {
    const schema =Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required(),
    });
    return schema.validate(user);
};
