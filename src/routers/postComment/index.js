const express = require('express');
const db = require(__dirname + '/../../_connect_db');
const router = express.Router();

const moment = require("moment-timezone");





// ----------------------------------------------------------------------------------------
//render all comments data

router.get('/comments', (req, res)=>{
    const sql = `SELECT \`post_comments\`.\`postComment_content\`,\`post_comments\`.\`updated_at\`,\`post_comments\`.\`postComment_id\`,\`post_comments\`.\`post_id\`, \`mb_info\`.\`mbId\`,\`mb_info\`.\`mbNick\`,\`mb_info\`.\`mbAva\` 
    FROM \`post_comments\` 
    INNER JOIN \`mb_info\` 
    ON \`post_comments\`.\`member_id\`=\`mb_info\`.\`mbId\`
    ORDER BY \`post_comments\`.\`postComment_id\` DESC `

    db.queryAsync(sql)

    .then(result=>{
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

// WHERE \`post_id\`=?

// ----------------------------------------------------------------------------------------
//Insert comments 新增留言
router.post('/addNewComment', (req, res)=>{
    //新增貼文流水號 （全域參數）
    let newPostId =1 
    
    const output = {
                success: false,
                url: '',
                msg: '沒有上傳檔案',
            };
   
            console.log(req.body)
    const sql = `INSERT INTO \`post_comments\`(\`postComment_content\`,\`member_id\`,\`post_id\` ) 
    VALUES (?, ?, ? )`;

    db.queryAsync(sql , [
        req.body.comment,
        req.body.loginUserId,
        req.body.postId,
       
    ])
        .then(r=>{
            output.result = r;
            output.msg='成功上傳檔案'
            output.success = true;
            //將新增貼文流水號傳到全域參數（newpostId)
            newPostId = r.insertId;
            return res.json(output);
        })
        .catch(error=>{
            console.log(error);
            return res.json(output);
        })


        const comment_sql = `SELECT \`post_comments\`.\`postComment_content\`,\`post_comments\`.\`updated_at\`,\`post_comments\`.\`postComment_id\`,\`post_comments\`.\`post_id\`, \`mb_info\`.\`mbId\`,\`mb_info\`.\`mbNick\`,\`mb_info\`.\`mbAva\` 
        FROM \`post_comments\` 
        INNER JOIN \`mb_info\` 
        ON \`post_comments\`.\`member_id\`=\`mb_info\`.\`mbId\` 
        WHERE \`post_comments\`.\`post_id\`=?
        ORDER BY \`post_comments\`.\`postComment_id\` DESC`

    //    const memberPostarr= "SELECT mbPost FROM mb_info WHERE mbId=?"
       db.queryAsync(comment_sql,[ req.body.postId ])
       .then(r=>{
        //    console.log(r)
           return(r)
       })

});


// ----------------------------------------------------------------------------------------
//刪除留言

router.post('/delpostComment', (req, res)=>{
    console.log(req.body);

    const del_sql = "DELETE FROM `post_comments` WHERE `postComment_id`=?";
    db.queryAsync(del_sql, [req.body.delCommentId])


        .then(r=>{
            console.log(r);
            res.json(r);
        })

});


//編輯留言

router.post('/editpostComment', (req, res)=>{
   
    console.log(req.body)

    const edit_sql = "UPDATE `post_comments` SET `postComment_content`=? WHERE `postComment_id`=?"
    db.queryAsync(edit_sql, [req.body.editComment,req.body.editCommentId])

        .then(r=>{
        console.log(req.body);

            console.log(r);
            res.json(r);
        })

});

module.exports = router ;