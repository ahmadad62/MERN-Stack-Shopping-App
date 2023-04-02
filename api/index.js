const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require("./routes/stripe");
const cors = require('cors')

const app = express();
dotenv.config()
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
            .then(() => {
                console.log('connected MongoDB successfully')
            })
            .catch(err => { console.log('error connecting MongoDB', err) })

        app.listen(process.env.PORT || 5000, () => {
            console.log('Backend server is running on port 5000');
        })

    } catch (err) {
        console.log(err);
    }
}

startServer().catch(err => console.log(err));
app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)
app.use("/api/checkout", stripeRoute);





