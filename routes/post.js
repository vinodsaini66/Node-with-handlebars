const express = require('express');

const router = express.Router();
const PostController = require('../controllers/PostController');
const Auth = require('../middleware/auth');

router.get('/',function(req,res,next) {
    res.status(200).send('post test');
});
router.post('/create',Auth.auth,PostController.create);

module.exports = router;