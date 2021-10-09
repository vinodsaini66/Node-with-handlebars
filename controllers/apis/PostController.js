const Post = require("../../models/post")

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send('first write post');
    }
    const post =new Post (req.body);
    post.save()
    .then( data =>{
        res.status(200).send(post);
    }).catch( error => {
        res.status(400).send(error);
    });
    

}