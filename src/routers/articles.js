const express = require("express");
const db = require(__dirname + "/../_connect_db");
const router = express.Router();
const moment = require("moment-timezone");
const dateFormat ="YYYY-MM-DD";
const url = require('url');

//新增文章
router.post('/articlepost', (req, res) => {

    const output={
        success:false,
        result:{}
    }
    // console.log(req.body)
    const sql = `INSERT INTO \`articles\` ( \`articleAuthor\` , \`articleName\` , \`articleCategoryId\` , \`articleClassId\` , \`articleContent\` , \`created_at\`  ) VALUES (?,?,?,?,?,NOW())`;
    db.queryAsync(sql, [
        req.body.mbId,
        req.body.articleName,
        req.body.articleCategoryId,
        req.body.articleClassId,
        req.body.articleContent,
    ])
        .then(r => {
            // console.log('result:', r)
            output.success=true;
            output.result=r
            return res.json(output)
        })
        .catch(error => {
            return res.json(output)
            // console.log(error)
        })
})


//取熱門文章4筆
router.get("/hot", function(req, res){
    const sql = `SELECT * FROM articles ORDER BY updated_at DESC LIMIT 4 ;`;
    db.queryAsync(sql).then(result =>{
        // console.log(result)
        return res.json(result);
    })
})

//文章列表分頁
router.get('/forum/:page?', (req, res) => {
    const perPage = 10;
    let totalRows, totalPages;
    let page = req.params.page ? parseInt(req.params.page) : 1;
    const totalSql = "SELECT COUNT(1) num FROM `articles`";
    db.queryAsync(totalSql)
        .then(result => {
            totalRows = result[0].num;
            totalPages = Math.ceil(totalRows / perPage)

            if (page < 1) page = 1;
            if (page > totalPages) page = totalPages;

            const infoSql = `SELECT * FROM articles LIMIT ${(page - 1) * perPage}, ${perPage}`;

            return db.queryAsync(infoSql)
        })
        // .then(result => {
        //     result.forEach((bd) => {
        //         bd.birthday = moment(bd.birthday).format(dateFormat);
        //     });

        //     res.render('address_book/list', {
        //         totalRows,
        //         totalPages,
        //         page,
        //         rows: result
        //     })
        // })
})

//刪除資料
router.post('/del/:ArticleId', (req, res)=>{
    const sql = "DELETE FROM `articles` WHERE `articleId`=?";
    db.queryAsync(sql, [req.params.articleId])
        .then(r=>{
            // console.log(r);
            res.json(r);
    })
});


//取得文章下面的留言
router.get("/article_comments/:articleId", (req, res) => {
    // console.log('req',req)
    let articleId = req.params.articleId;
    // const sql = `SELECT * FROM shop_comments WHERE itemId =${productId}`;
    const sql = `SELECT * FROM article_comments INNER JOIN mb_info ON article_comments.mbId = mb_info.mbId WHERE articleId =${articleId}`;
    db.queryAsync(sql).then(result => {
      result.forEach((row, idx) => {
        row.created_at = moment(row.created_at).format(dateFormat);
      });
      res.json(
        result
      );
    });
  });
  //發表對文章的留言
  router.post("/article_comments/", (req, res) => {
    let articleId = req.params.articleId;
    const sql = `INSERT INTO article_comments (\`content\`,\`articleId\`,\`mbId\`) 
      VALUES (?,?,?)`;
    db.queryAsync(sql, [
      req.body.content,
      req.body.articleId,
      req.body.mbId
    ]).then(result => {
      res.json({
        result
      });
    });
  });

//文章ID
router.get("/article/:articleId", function(req, res){
    let articleId = req.params.articleId;
    const sql =`SELECT * FROM articles INNER JOIN mb_info ON articles.articleAuthor = mb_info.mbId WHERE articleId = ? `
    // console.log(req.params.articleId)
    db.queryAsync(sql, [req.params.articleId]).then(result=>{
        result[0].created_at = moment(result[0].created_at).format(dateFormat);
        result[0].updated_at = moment(result[0].updated_at).format(dateFormat);
        // console.log('result',result[0].mbName)
        return res.json(result[0])
})
})

//取相關文章資料
// router.get("/:articleId", function(req, res){
//     const sql = `SELECT * FROM articles`;
//     db.queryAsync(sql).then(result =>{
//         result.forEach((row, idx) => {
//             row.created_at = moment(row.created_at).format(dateFormat);
//             row.updated_at = moment(row.updated_at).format(dateFormat);
//         }) 
//     console.log(result)
//      res.json(result);
// })
// })

//取forum全資料
router.get("/", function(req, res){
    const sql = `SELECT * FROM articles INNER JOIN mb_info ON articles.articleAuthor = mb_info.mbId WHERE articleId ORDER BY updated_at DESC`;
    db.queryAsync(sql).then(result =>{
        result.forEach((row, idx) => {
            row.created_at = moment(row.created_at).format(dateFormat);
            row.updated_at = moment(row.updated_at).format(dateFormat);
        }) 
    // console.log(result)
     res.json(result);
})
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