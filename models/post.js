const mongoose = require('mongoose')

const Posts = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required :true,
    },
    by : {
        type : String,
    },
    url : {
        type: String,
    },
    likes: {
        type : String,
    },
    tags : {
        type: Array,
    },
    comments :{
        type : Object
    }
});


module.exports = mongoose.model('post',Posts);