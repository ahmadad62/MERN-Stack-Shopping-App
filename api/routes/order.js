const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('./verifyToken');
const router = require('express').Router();
const Order = require("../models/Order");


//CREATE Order

router.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Adding new Order failed!" })
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true })
        res.status(200).json(updatedOrder)
    } catch (err) {
        console.log(err);

        res.status(500).json(err)
    }

})

//Delete 

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has been deleted!')

    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER ORDERS
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }) //users can have multiple orders
        res.status(200).json(orders)

    } catch (err) {
        res.status(500).json(err)

    }
})

//GET ALL

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId: productId } }
                    })
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        // if (income.length === 0) {
        //     return res.status(404).json({ message: "No income data found" });
        // }
        res.status(200).json(income);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// router.get('/all', async (req, res) => {
//     const page = req.query.page ? parseInt(req.query.page) : 1;
//     const limit = req.query.limit ? parseInt(req.query.limit) : 10;
//     const skip = (page - 1) * limit;

//     try {
//         const orders = await Order.aggregate([
//             {
//                 $facet: {
//                     data: [
//                         {
//                             $skip: skip,
//                         },
//                         {
//                             $limit: limit,
//                         },
//                         {
//                             $sort: { createdAt: -1 },
//                         },
//                     ],
//                     totalCount: [
//                         {
//                             $count: "count",
//                         },
//                     ],
//                 },
//             },
//         ]);

//         const result = {
//             orders: orders[0].data,
//             total: orders[0].totalCount[0].count,
//             totalPages: Math.ceil(orders[0].totalCount[0].count / limit),
//             currentPage: page,
//         };
//         res.status(200).json(result);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


module.exports = router;