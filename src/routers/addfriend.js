const express = require('express');
const db = require(__dirname + '/../_connect_db');
const router = express.Router();
const fs = require('fs');
const multer =require('multer')
const path = require('path');
const moment = require('moment-timezone')
const dateFormat= 'YYYY-MM-DD';


// ----------------------------------------------------------------------------------------
//get 會員資料到前端
router.post('/addfriend', (req, res)=>{
    const sql = "SELECT * FROM `add_friend` WHERE invatembId =?"
    db.queryAsync(sql, [req.body.loginUserId])

    .then(result=>{
     res.json(result)
    console.log(req.body)


    })
    .catch(error=>{
        console.log(error);
        res.send(error)
    })    
})



module.exports = router ;
