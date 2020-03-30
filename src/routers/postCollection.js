const express = require("express");
const db = require(__dirname + "/../_connect_db");
const router = express.Router();
const moment = require("moment-timezone");
const dateFormat ="YYYY-MM-DD";
const url = require('url');


//貼文收藏
router.post('/postCollection', (req, res) => {
    console.log(req.body)
    const inserSql = "INSERT INTO `post_collection` ( `member_id` , `post_id` ) VALUES (?,?)";
    db.queryAsync(inserSql, [
        req.body.loginMemberId,
        req.body.postId,
    ])
        .then(r => {
            console.log('result:', r)
            res.json(r)
        })
        .catch(error => {
            console.log(req.body)
            res.json(error)
            console.log(error)
        })
})

// ----------------------------------------------------------------------------------------
//get資料到前端
router.post('/getpostcollection', (req, res)=>{
    const sql = `SELECT \`posts\`.\`post_id\`,\`posts\`.\`postTitle\`,\`posts\`.\`postContent\`,\`posts\`.\`postImg\`,\`posts\`.\`postTag\`,\`posts\`.\`postLikes\`,\`posts\`.\`postComments\`,\`post_collection\`.\`updated_at\`,\`post_collection\`.\`postCollection_id\`,\`post_collection\`.\`member_id\`
    FROM \`post_collection\`
    INNER JOIN \`posts\`
    ON \`post_collection\`.\`post_id\`=\`posts\`.\`post_id\`
    WHERE \`post_collection\`.\`member_id\` = ?
    ORDER BY \`post_collection\`.\`postCollection_id\` DESC`
    
    db.queryAsync(sql,[req.body.loginMemberId])

    .then(result=>{
        // console.log(result)
        result.forEach((data)=>{
            data.updated_at = moment (data.updated_at,'YYYY年MM月DD日').fromNow();
        })
     res.json(result)

    })
    .catch(error=>{
        console.log(error);
        res.send(error)
    })
})

module.exports = router;
