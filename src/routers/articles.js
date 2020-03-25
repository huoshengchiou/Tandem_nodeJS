const express = require("express");
const db = require(__dirname + "/../_connect_db");
const router = express.Router();
const dateFormat ="YYYY-MM-DD";
const url = require('url');

//新增文章
router.post('/addNewArticle', (req, res) => {
    console.log(req.body)
    const inserSql = "INSERT INTO `articles` ( `articleAuthor` , `articleName` , `articleCategoryId` , `articleClassId` , `articleContent` , `articleImage`  ) VALUES (?,?,?,?,?,?)";
    db.queryAsync(inserSql, [
        req.body.localUserData.mbId,
        req.body.articleName,
        req.body.articleCategoryId,
        req.body.articleClassId,
        req.body.articleContent,
        [],
    ])
        .then(r => {
            console.log('result:', r)
            res.json(r)
        })
        .catch(error => {
            res.json(error)
            console.log(error)
        })
})

//取forum全資料
router.get("/", function(req, res){
    const sql = `SELECT * FROM articles`;
    db.queryAsync(sql).then(result =>{
        console.log(result)
        return res.json(result);
    })
})

//取熱門文章4筆
router.get("/hot", function(req, res){
    const sql = `SELECT * FROM articles ORDER BY updated_at DESC LIMIT 4 ;`;
    db.queryAsync(sql).then(result =>{
        console.log(result)
        return res.json(result);
    })
})

//Read每頁顯示幾筆資料
router.get('/list/:page?',(req,res)=>{
    const perPage = 18;//每頁幾筆
    let totalRows, totalPages;
    let page = req.params.page ? parseInt(req.params.page):1;//沒有設定頁數就第1頁
    const t_sql = "SELECT COUNT(1) AS num FROM `items`";

    db.queryAsync(t_sql)
        .then(result=>{
            totalRows = result[0].num;//總筆數
            totalPages = Math.ceil(totalRows/perPage);

            //限定page範圍
            if(page<1) page=1;
            if(page>totalPages) page=totalPages;

            const sql = `SELECT * FROM articles LIMIT ${(page-1)*perPage},${perPage}`;
            return db.queryAsync(sql);
        })
        .then(result=>{
       
            result.forEach((row,idx)=>{
                row.itemDate = moment(row.itemDate).format(dateFormat);
            })
            // res.send(result)//check sql語法查詢到的結果
            // res.render('product-list/list',{
            //     totalRows,
            //     totalPages,
            //     page,
            //     rows:result
            // });
            //api(輸出json格式)
            res.json({
                totalRows,
                totalPages,
                page,
                rows:result
            });
        })
});

//文章ID
router.get("/:articleId?", function(req, res){
    const sql =`SELECT * FROM articles WHERE articleId = ?`
    console.log(req.params.articleId)
    db.queryAsync(sql, [req.params.articleId]).then(result=>{return res.json(result)})
})

//刪除資料
router.post('/del/:ArticleId', (req, res)=>{
    const sql = "DELETE FROM `articles` WHERE `articleId`=?";
    db.queryAsync(sql, [req.params.articleId])
        .then(r=>{
            console.log(r);
            res.json(r);
    })
});


//取comment全資料
router.get("/:articleId?", function(req, res){
    const sql = `SELECT * FROM article_comments WHERE articleId = ?`;
    console.log(req.params.articleId)
    db.queryAsync(sql, [req.params.articleId]).then(result=>{return res.json(result)})
})


//partner資料
// router.get("knowledge/partner", function(req, res){
//     const sql = `SELECT * FROM knowledge_partners`;
//     db.queryAsync(sql).then(result =>{
//         return res.json(result);
//     })
// })

//進階資料
// router.get("knowledge/partner/:pId?", function(req, res){
//     const sql =`SELECT * FROM knowledge_partners WHERE pId = ?`
//     console.log(req.params.pId)
//     db.queryAsync(sql, [req.params.pId]).then(result=>{return res.json(result)})
// })


//question資料
// router.get("knowledge/question", function(req, res){
//     const sql = `SELECT * FROM knowledge_questions`;
//     db.queryAsync(sql).then(result =>{
//         return res.json(result);
//     })
// })

//進階資料
// router.get("knowledge/question/:qId?", function(req, res){
//     const sql =`SELECT * FROM knowledge_questions WHERE qId = ?`
//     console.log(req.params.qId)
//     db.queryAsync(sql, [req.params.qId]).then(result=>{return res.json(result)})
// })

module.exports = router;