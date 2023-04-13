const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dbConnect = require('./utilities/dbConnect');
const commentsRouter = require('./routes/v1/comment.route');
const viewCount = require('./middleware/viewCount');
const { rateLimit } = require('express-rate-limit');

require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// app level middleware and route level middleware
// app.use(viewCount);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter);

dbConnect();

//  routing
app.use('/api/v1/comments', commentsRouter);

async function run(){
    try{
        // const productCollection = client.db('crud-product').collection('products');
        // const users = client.db('crud-product').collection('users');
        // const allComments = client.db('crud-product').collection('comments');


        // app.get('/comments', async(req, res)=>{
        //     const comments = allComments.find({});
        //     const result = await comments.toArray();
        //     res.send(result);
        // })

        // app.get('/comments/:id', async(req, res)=>{
        //     const id = req.params.id;
        //     const filter = {_id: new ObjectId(id)};
        //     const singleComment = await allComments.findOne(filter);
        //     res.send(singleComment);
        //     console.log(singleComment)
        // })


        // app.post('/comments', async(req, res)=>{
        //     const query = req.body;
        //     const commnet = await allComments.insertOne(query);
        //     res.send(commnet);
        // });
        



        // app.get('/users', async (req, res)=>{
        //     const cursor = {}
        //     const allUsers = users.find(cursor);
        //     const result = await allUsers.toArray()
        //     res.send(result);
        // });

        // app.post('/users', async (req, res)=>{
        //     const filter = req.body;
        //     const user = await users.insertOne(filter);
        //     res.status(200).send(user);
        // });



        // app.get('/', async (req, res)=>{
        //     // const query= {}; alternative // begginer
        //     const findProducts = productCollection.find({});
        //     const result = await findProducts.toArray();
        //     res.send(result);
        // });

        // app.get('/products/:id', async(req, res)=>{
        //     const id = req.params.id;
        //     // const query = {_id: new ObjectId(id)}; alternative to understand.
        //     const result = await productCollection.findOne({_id: new ObjectId(id)});
        //     res.send(result);

        // })

        // app.post('/products', async (req, res)=>{
        //     const cursor = req.body;
        //     const product = await productCollection.insertOne(cursor);
        //     res.send(product);
        // });

        // app.patch('/products/:id', async(req, res)=>{
        //     const id = req.params.id;
        //     const filter = {_id: new ObjectId(id)};
        //     const product = req.body;
        //     const options = {upsert: true};
        //     const updateDoc = {
        //         $set: {
        //             name: product.name,
        //             price: product.price,
        //             quantity: product.quantity
        //         }
        //     };
        //     const updatedProduct = await productCollection.updateOne(filter, updateDoc, options);
        //     res.send(updatedProduct);
        // });

        // app.put('/products/:id', async(req, res)=>{
        //     const id = req.params.id;
        //     const filter = {_id: new ObjectId(id)};
        //     const product = req.body;
        //     const options = {upsert: true};
        //     const updateDoc = {
        //         $set: {
        //             name: product.name,
        //             price: product.price,
        //             quantity: product.quantity,
        //             CO: product.CO
        //         }
        //     };
        //     const updatedProduct = await productCollection.updateOne(filter, updateDoc, options);
        //     res.send(updatedProduct);
        // })

        // app.delete('/products/:id', async (req, res)=>{
        //     const id = req.params.id;
        //     const query = {_id: new ObjectId(id)};
        //     const deleteProduct = await productCollection.deleteOne(query);
        //     console.log(deleteProduct)
        //     res.send(deleteProduct);
        // })

    }
    finally{};
}
run().catch(err=>console.log(err));


app.all('*', (req, res)=>{
    res.send('No route found!')
});

app.listen(port, ()=>console.log(`new app running on ${port}`))