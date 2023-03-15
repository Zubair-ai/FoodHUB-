const express =require('express');
const router= express.Router();

router.post('/displaydata',(req,res)=>{
    try {
        res.send([global.fooditem,global.catefooditem])
    } catch (error) {
        res.send('server error')
    }
})

module.exports=router;