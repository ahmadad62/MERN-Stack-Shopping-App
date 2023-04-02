const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('./verifyToken');
const router = require('express').Router();
const Product = require("../models/Product");


//CREATE PRODUCT

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Adding new Product failed!" })
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true })
        res.status(200).json(updatedProduct)
    } catch (err) {
        console.log(err);

        res.status(500).json(err)
    }

})

//Delete 

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted!')

    } catch (err) {
        res.status(500).json(err)
    }
})

//GET Product

router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)

    } catch (err) {
        res.status(500).json(err)

    }
})

//GET ALL PRODUCTS

router.get('/', async (req, res) => {
    const qNew = req.query.new;  //query string for search =in this case find 5 last products
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createAt: -1 }).limit(5);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            })
        } else {                                //If you want to add something new, you can add else if here 
            products = await Product.find()
        }


        res.status(200).json(products)

    } catch (err) {
        res.status(500).json(err)

    }
})



module.exports = router;