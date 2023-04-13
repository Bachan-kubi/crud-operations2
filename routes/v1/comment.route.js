const express = require('express');
const commentControllers = require('../../controllers/commentControllers');
const router = express.Router();


// shorting the routes 01
// router.get('/', (req, res)=>{
//     res.send('get comments')
// });

// router.post('/', (req, res)=>{
//     res.send('post comments!')
// });
// shorting the routes 02

router.route('/')
    .get(commentControllers.getAllComments)
    .post(commentControllers.postComments)

    // old way
// router.route('/')
//     .get((req, res)=>{
//         res.send('get comments')
//     })
//     .post((req, res)=>{
//         res.send('post comments!')
//     })

module.exports = router;