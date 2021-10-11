const {User,validate} = require("../../models/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");



exports.create = (req,res) => {
    if(!req.body.email){
        return res.status(400).send({
            message : "email required"
        });
    }
    // create user
    const user = new User({
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

exports.list =(req ,res) => {
    User.find()
    .lean()
    .then( data => {
        console.log(data);
        res.render('admin/users/userslist', {page: 'Users' ,title: 'Jobwick' ,condition: true,list : data});
      
    }).catch ( err =>{
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.findMe =  (req ,res) => {
    User.findById(req.user._id)
    .then( data => {
        res.send(data);
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
            if(error) {
                req.flash('error', error.details[0].message);
                return res.redirect('/');
            };

            const user =await User.findOne({email : req.body.email}).lean();
            console.log(user);
            if(!user) {
                req.flash('error', 'User Not Present');
                return res.redirect('/');
            };

            const validPassword =await bcrypt.compare(
                req.body.password,
                user.password
            );

            if(!validPassword) {
                req.flash('error', 'Password did not match confirmation!');
                return res.redirect('/');
            }

            req.session.user = user;
            req.session.loggedIn = true;
            res.locals.loggedIn = true;
            req.flash('user',user);
            req.flash('loggedIn',true);
            console.log(user);
            console.log(req.flash('loggedIn'));
            
            
            res.redirect('dashboard');
        //res.render('admin/dashboard', {page: 'Dashboard' ,title: 'Vira' ,list : user});
      
    } catch( error){
        req.flash('error', error);
                return res.redirect('/');
        //res.send("An error occured");
    }

};

const validate_login = (user) => {
    const schema =Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required(),
    });
    return schema.validate(user);
};
