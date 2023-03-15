const express =require('express');
const router= express.Router();
const Order= require('../models/Orders')

router.post('/myorderdata', async(req,res)=>{
    try {
       let myOrderData=await Order.findOne({'email':req.body.email});
       res.json({myOrderData:myOrderData})
    } catch (error) {
        res.send('server error')
    }
})

module.exports=router;