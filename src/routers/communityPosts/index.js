const express = require('express');
const db = require(__dirname + '/../../_connect_db');
const router = express.Router();
const fs = require('fs');
const multer =require('multer')
const path = require('path');
const moment = require('moment-timezone')
const dateFormat= 'YYYY-MM-DD';

// const upload = multer({dest: 'tmp_uploads/'});



// ----------------------------------------------------------------------------------------
//上傳圖片 multer 設定

const upload = multer({
  storage: multer.diskStorage({
    destination:(req, file, cb) =>{
      cb(null, 'public/img');
    },
    filename:(req, file, cb) =>{      
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter:(req,res,cb)=>{
        const ext= path.ext(file.originalname)
        if( ext !== '.jpeg'||ext !== '.png'){
            return cb(res.status(400).end('only jpeg and png files are allowed!'))
        }
        cb(null,true)
    }
  }),
})


// ----------------------------------------------------------------------------------------
//上傳圖片表格

router.post('/uploaditem', upload.single('communityImage'), (req, res)=>{
    //新增貼文流水號 （全域參數）
    let newPostId =1 
    
    const output = {
                success: false,
                url: '',
                msg: '沒有上傳檔案',
            };
   
            // console.log(req.body)
    const sql = `INSERT INTO \`posts\`(\`postTitle\`, \`postContent\`,  \`postImg\`,\`postTag\`,\`postViews\`,\`postLikes\`,\`postComments\`,\`member_id\`) 
    VALUES (?, ?, ?,?,?,?,?,?)`;

    db.queryAsync(sql , [
        req.body.title,
        req.body.content,
        req.file.filename,
        req.body.category,
        req.body.postView,
        req.body.postLikes,
        req.body.postComments,
        req.body.memberId,
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

       const memberPostarr= "SELECT mbPost FROM mb_info WHERE mbId=?"
       db.queryAsync(memberPostarr,[ req.body.memberId ])
       .then(r=>{
           const addPost=JSON.parse(r[0].mbPost)
        //    console.log(addPost)
           addPost.push(newPostId)
        //    console.log(addPost)
        const postIdJson = JSON.stringify(addPost)
        const updatePostId =`UPDATE \`mb_info\` 
                             SET \`mbPost\` =? 
                             WHERE \`mbId\` =? `
        db.queryAsync(updatePostId, [postIdJson,req.body.memberId])

       })
       .then(r2=>{
           return res.json(r2)
       })

});


// ----------------------------------------------------------------------------------------
//get資料到前端
router.get('/posts', (req, res)=>{
    const sql = `SELECT \`posts\`.\`post_id\`,\`posts\`.\`postTitle\`,\`posts\`.\`postContent\`,\`posts\`.\`postImg\`,\`posts\`.\`postTag\`,\`posts\`.\`postLikes\`,\`posts\`.\`postComments\`,\`posts\`.\`updated_at\`,\`mb_info\`.\`mbNick\`,\`mb_info\`.\`mbAva\`,\`mb_info\`.\`mbDes\`,\`mb_info\`.\`mbCountry\`,\`mb_info\`.\`mbId\`,\`mb_info\`.\`mbPost\`
    FROM \`posts\`
    INNER JOIN \`mb_info\`
    ON \`posts\`.\`member_id\`=\`mb_info\`.\`mbId\`
    ORDER BY \`posts\`.\`post_id\` DESC`
    

    db.queryAsync(sql)

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

// ----------------------------------------------------------------------------------------
//get資料到前端 分類受訓
router.post('/postCategory', (req,res)=>{
    console.log(req.body.searchData)
    if(req.body.pCategory_id){
        const category_sql=`SELECT \`posts\`.\`post_id\`,\`posts\`.\`postTitle\`,\`posts\`.\`postContent\`,\`posts\`.\`postImg\`,\`posts\`.\`postTag\`,\`posts\`.\`postLikes\`,\`posts\`.\`postComments\`,\`posts\`.\`updated_at\`,\`mb_info\`.\`mbNick\`,\`mb_info\`.\`mbAva\`,\`mb_info\`.\`mbDes\`,\`mb_info\`.\`mbCountry\`,\`mb_info\`.\`mbId\`,\`posts_category\`.\`pCategory_id\`,\`posts_category\`.\`pCategory_id\`,\`mb_info\`.\`mbPost\`
        FROM \`posts\`
        INNER JOIN \`mb_info\`
        ON \`posts\`.\`member_id\`=\`mb_info\`.\`mbId\`
        INNER JOIN \`posts_category\`
        ON \`posts\`.\`postTag\`=\`posts_category\`.\`pCategory_id\`
        WHERE \`posts_category\`.\`pCategory_id\` = ? 
        ORDER BY \`posts\`.\`post_id\` DESC `
        db.queryAsync(category_sql,
            [req.body.pCategory_id],
            )
        .then(r=>{
            res.json(r)
        })
        .catch(error=>{
            res.send(error)
            console.log(error)
        })
    }else if(req.body.searchData){
            const category_sql=`SELECT \`posts\`.\`post_id\`,\`posts\`.\`postTitle\`,\`posts\`.\`postContent\`,\`posts\`.\`postImg\`,\`posts\`.\`postTag\`,\`posts\`.\`postLikes\`,\`posts\`.\`postComments\`,\`posts\`.\`updated_at\`,\`mb_info\`.\`mbNick\`,\`mb_info\`.\`mbAva\`,\`mb_info\`.\`mbDes\`,\`mb_info\`.\`mbCountry\`,\`mb_info\`.\`mbId\`,\`posts_category\`.\`pCategory_id\`,\`posts_category\`.\`pCategory_id\`,\`mb_info\`.\`mbPost\`
            FROM \`posts\`
            INNER JOIN \`mb_info\`
            ON \`posts\`.\`member_id\`=\`mb_info\`.\`mbId\`
            INNER JOIN \`posts_category\`
            ON \`posts\`.\`postTag\`=\`posts_category\`.\`pCategory_id\`
            WHERE \`posts\`.\`postContent\` LIKE CONCAT('%',?,'%' )
             ORDER BY \`posts\`.\`post_id\` DESC `
           
            
            db.queryAsync(category_sql,
                [req.body.searchData,req.body.searchData],
                )
           
            .then(r=>{
                res.json(r)
            })
            .catch(error=>{
                res.send(error)
                console.log(error)
            }) 
    }  
})




// ----------------------------------------------------------------------------------------
//get 會員資料到前端
router.get('/postsmember', (req, res)=>{
    const sql = "SELECT * FROM `mb_info` "
    db.queryAsync(sql)

    .then(result=>{
     res.json(result)

    })
    .catch(error=>{
        console.log(error);
        res.send(error)
    })    
})


// ----------------------------------------------------------------------------------------
  //刪除貼文

router.post('/delpost', (req, res)=>{

        const del_sql = "DELETE FROM `posts` WHERE `post_id`=?";
         db.queryAsync(del_sql, [req.body.postId])

        .then(r=>{
        res.json(r)
        console.log(r)
        console.log(req.body)
        // fs.unlink(req.body.postImg, error=>{
        //     res.json(error);
        });

        const memberPostarr= "SELECT mbPost FROM mb_info WHERE mbId=?"
        db.queryAsync(memberPostarr,[ req.body.memberID ])
        .then(r=>{
            console.log(r)
            const oriarr = JSON.parse(r[0].mbPost);
            // 取出尋找值的位置
           let index = oriarr.indexOf(req.body.postId);
           console.log(index);
           // 進行arr處理
           oriarr.splice(index, 1);  
           const transJSON = JSON.stringify(oriarr);
           const update_member = "UPDATE mb_info SET mbPost=? WHERE  mbId=?"
           return db.queryAsync(update_member, [transJSON, req.body.memberID]);
        })
        .catch(error=>{
            console.log(error);
            res.send(error)
        })
    });      
})

// ----------------------------------------------------------------------------------------
  // 編輯貼文
           
  router.post('/editpost', (req, res)=>{
   
    console.log(req.body)

    const edit_sql = "UPDATE `posts` SET `postContent`=? WHERE `post_id`=?"
    db.queryAsync(edit_sql, [req.body.postContent,req.body.postId])

        .then(r=>{
        console.log(req.body);
            console.log(r);
            res.json(r);
        })

});
   


module.exports = router ;