const db = require(__dirname + '/../_connect_db');
const moment = require('moment-timezone')
const multer = require('multer');
const upload = multer({dest:'tmp_uploads/'});//設定上傳暫存目錄
const express =require('express');
const router = express.Router();
const dateFormat ="YYYY-MM-DD";
const url = require('url');
const nodemailer =require('nodemailer')//寄email
const credentials = require('./credentials')
// router.get('/',(req,res)=>{
//     res.send('hello');
// })
router.get('/:id',(req,res)=>{
    let totalRows
    const id = req.params.id
    // const sql = `SELECT * FROM items WHERE itemId=?`;
    const sql = `SELECT * FROM \`items\` INNER JOIN \`vendors\` ON vendors.vId = items.itemDeveloperId INNER JOIN \`categories\` ON \`categories\`.\`categoryId\` = \`items\`.\`itemCategoryId\` WHERE itemId=?`;
    db.queryAsync(sql,id)
    .then(result=>{
        result.forEach((row,idx)=>{
            row.itemDate = moment(row.itemDate).format(dateFormat);
        })
        res.json({
            totalRows,
            rows:result
        });
    })
})
//對database進行字串搜尋
router.get('/',(req,res)=>{
    const urlparts = url.parse(req.url,true)
    console.log('查詢字串= ',urlparts.query.search)
    const perPage = 18;//每頁幾筆
    let totalRows, totalPages;
    let page = req.params.page ? parseInt(req.params.page):1;//沒有設定頁數就第1頁
    let search_query = urlparts.query.search;//查詢字串
    
    const t_sql = `SELECT COUNT(1) AS num FROM items WHERE itemName LIKE ?`;
    
    db.queryAsync(t_sql,['%'+search_query+'%'])
        .then(result=>{
            totalRows = result[0].num;//總筆數
            totalPages = Math.ceil(totalRows/perPage);

            //限定page範圍
            if(page<1) page=1;
            if(page>totalPages) page=totalPages;

            const sql = `SELECT * FROM items WHERE itemName LIKE ? LIMIT ${(page-1)*perPage},${perPage}`;
            return db.queryAsync(sql,['%'+search_query+'%']);
        })
        .then(result=>{
       
            result.forEach((row,idx)=>{
                row.itemDate = moment(row.itemDate).format(dateFormat);
            })
           
            res.json({
                totalRows,
                totalPages,
                search_query,
                page,
                rows:result
            });
        })
        .catch(error=>{
            // res.send(error);
            console.log(error);
            res.json(output);
        })
});
//Read
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

            const sql = `SELECT * FROM items LIMIT ${(page-1)*perPage},${perPage}`;
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
//篩選查詢
router.get('/search/:type/:vendorId/:price/:orderBy/:page?',(req,res)=>{
    const perPage = 18;//每頁幾筆
    let totalRows, totalPages;
    let page = req.params.page ? parseInt(req.params.page):1;//沒有設定頁數就第1頁
    let type = req.params.type;//類別id
    let vendor = req.params.vendorId;
    let price = req.params.price;
    let orderBy = req.params.orderBy;

    type == 0? type='%%':type=req.params.type;
    console.log('type=',type)
    
    
    
    vendor == 'V000'? vendor='%%':vendor=req.params.vendorId;//IF沒有篩VENDOR(VENDOR='V000')就用模糊搜尋
    console.log('vendor=',vendor)
    console.log('price',price)
    price == 9999? price= 'LIKE "%%"':price=req.params.price;//IF沒有篩PRICE(PRICE='9999')就用模糊搜尋
    
    
    const t_sql = `SELECT COUNT(1) AS num FROM items WHERE itemCategoryId LIKE '${type}' AND itemDeveloperId LIKE '${vendor}' AND itemPrice ${price} ORDER BY ${orderBy}`;
    console.log('t_sql',t_sql)
    db.queryAsync(t_sql)
        .then(result=>{
            totalRows = result[0].num;//總筆數
            totalPages = Math.ceil(totalRows/perPage);

            //限定page範圍
            if(page<1) page=1;
            if(page>totalPages) page=totalPages;

            const sql = `SELECT * FROM items WHERE itemCategoryId LIKE '${type}' AND itemDeveloperId LIKE'${vendor}' AND itemPrice ${price} ORDER BY ${orderBy} LIMIT ${(page-1)*perPage},${perPage} `;
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
                type,
                page,
                rows:result
            });
        })
});

//取得商品下面的留言
router.get('/comment/:productId',(req,res)=>{
    let productId = req.params.productId;
    // const sql = `SELECT * FROM shop_comments WHERE itemId =${productId}`;
    const sql = `SELECT * FROM shop_comments INNER JOIN mb_info ON shop_comments.mbId = mb_info.mbId WHERE itemId =${productId}`;
    db.queryAsync(sql)
    .then(result=>{
        result.forEach((row,idx)=>{
            row.created_at = moment(row.created_at).format(dateFormat);
        })
        res.json({
            
            result
        })
    })
})
//發表對商品的留言
router.post('/comment/:productId',(req,res)=>{
    let productId = req.params.productId;
    const sql = `INSERT INTO shop_comments (\`name\`,\`content\`,\`rating\`,\`itemId\`,\`parentId\`,\`mbId\`) 
    VALUES (?,?,?,?,?,?)`;
    db.queryAsync(sql,[req.body.name,req.body.content,req.body.rating,req.body.itemId,req.body.parentId,req.body.memberId])
    .then(result=>{
        res.json({
            result
        })
    })
})
//抓cart中商品的資訊
router.post('/getCartImg',(req,res)=>{
    //如果購物車是空的，回傳一個空sql查詢結果，然後跳出
    if(req.body.id.length == 0){
        res.json({"result":[]})
        return
    }
    const sql = `SELECT * FROM items WHERE itemId IN (?)`;
    console.log('sql=',sql)
    console.log(req.body)
    db.queryAsync(sql,[req.body.id])
    .then(result=>{
        res.json({
            result})
    })
})
//抓訂單資訊
router.post('/orderInfo/',(req,res)=>{
    let sql = "SELECT MAX(`orderId`) FROM `item_lists`";
    console.log(sql);
    db.queryAsync(sql,[])
        .then(result=>{
            const latestId = result[0]['MAX(`orderId`)']
            console.log(latestId)
            const orderInfoSql = `SELECT * FROM item_lists WHERE orderId = '${latestId}'`
            return db.queryAsync(orderInfoSql)
        })
        .then(r=>{
            r.forEach((row,idx)=>{
                row.created_at = moment(row.created_at).format(dateFormat);
            })
            
            res.json(r)
        })
    
})
//一次找訂單中商品id的名稱
router.post('/multipleId',(req,res)=>{
    const ids = req.body.productIds;
    // ids.replace("[")
    console.log('ids',ids)
    let sql = `SELECT itemName FROM items WHERE itemId in (${ids})`;
    
    console.log(sql)
    db.queryAsync(sql)
    .then(result=>{
        res.json(result)
    })
})
//成立訂單payment,寫進`item_lists`
router.post('/payment/',(req,res)=>{
    const sqlGetOrderId = "INSERT INTO `orders` (`username`) VALUES (?)"
    // db.queryAsync(sqlGetOrderId,[req.body.username])
    // .then(result=>{ 
    //     res.json({
    //         result,
    //         })
    //     console.log(result.insertId)//最新一筆orderId
    // })
    const sqlOrder = "INSERT INTO `item_lists` (`itemId`,`orderId`,`checkSubtotal`,`userId`) VALUES (?,?,?,?)";
    let orderId = 'order_'+new Date().getTime()//產生orderId
    console.log(req.body)
    console.log(orderId)
    console.log(req.body.itemIds)
    db.queryAsync(sqlOrder,[req.body.itemIds, orderId,req.body.totalPrice,req.body.mbId])
    .then(result=>{ 
            res.json({
                result,
                })
            })
})

//對商品按讚，寫入mb_info
// 抓收藏商品的人數
router.post('/addtolike/',(req,res)=>{
    let azenId 
    const addtolike = "UPDATE `mb_info` SET `mbAzen` =? WHERE `mbId` = ?";
    const getlikeId = "SELECT `mbAzen` FROM `mb_info` WHERE `mbId`=?";
    const getmbidfromitem = "SELECT `memberFavoriteId` FROM `items` WHERE `itemId` =?"
    const addmbidtoitem = "UPDATE `items` SET `memberFavoriteId`=? WHERE `itemId`=?"
    // const addcount = "UPDATE `items` SET `` "
    console.log(req.body.userId)
    db.queryAsync(getlikeId,[req.body.userId])
        .then(result=>{
            // res.json({
            //     result
                
            // })
            azenId = result[0].mbAzen;
            
            azenId = JSON.parse(azenId)
            if(azenId.indexOf(req.body.likeproductId) == -1){
                azenId.push(req.body.likeproductId)
            }
            
            azenId_string = JSON.stringify(azenId)
            console.log(azenId)
            console.log(azenId_string)
            // console.log('newazenId',newazenId)
            // newazenId_string = JSON.stringify(newazenId)
            // console.log('新',newazenId_string)
            
        return db.queryAsync(addtolike,[azenId_string,req.body.userId])
        })
        .then(r=>{
            //回傳給前端結果
            res.json({r})

            return db.queryAsync(getmbidfromitem,[req.body.likeproductId])
        })
        .then(r1=>{
            console.log(r1)
            
            let arr = JSON.parse(r1[0].memberFavoriteId)
            console.log(arr)
            if(arr.indexOf(req.body.userId) == -1){
                arr.push(req.body.userId)
                
            }
            // console.log(arr)
            arr_string = JSON.stringify(arr)
            return db.queryAsync(addmbidtoitem,[arr_string,req.body.likeproductId])
        })
        .then(r2=>{
            console.log('最後memberFavorId結果',r2)
        })
})
//抓COUPON圖片
router.post('/getCoupon',(req,res)=>{
    console.log('req.body.sId',req.body.sId)
    const sql = "SELECT * FROM sales WHERE sId = ?";
    db.queryAsync(sql,[req.body.sId])
    .then(r=>{
        res.json({r})
    })
})

//send訂單確認信
let mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: credentials.gmail.user,
      pass: credentials.gmail.pass,
    // user:'albertkingdom@gmail.com',
    // pass:'xup6m4d93albert',
    secure: false,
    requireTLS: true,
    },
  });
router.post('/confirmOrderEmail', (req, res)=>{
    let name = '';
    req.body.productName.forEach((item,value)=>{name = name.concat(`<p>(${value+1})${item}</p>`)})
    console.log(
        name
    )
    const mailOptions ={
        from:'albertkingdom@gmail.com',
        to:'albertkingdom@gmail.com',
        subject: 'Tandem訂單成立通知',
        text: 'Hello',
        html: `<h2>您的訂單詳細內容如下</h2>
               <table>
                
                <tr>
                    <td>訂單編號</td>
                    <td>${req.body.orderId}</td>
                </tr>
                <tr>
                    <td>付款金額</td>
                    <td>NT ${req.body.checktotal}</td>
                </tr>
                <tr>
                    <td>商品項目</td>
                    <td>${name}</td>
                    
                    
                </tr>
               </table>`
    };

    mailTransport.sendMail(mailOptions)
        // if (err){
        //     console.log('Error Occurs');
        // }else{
        //     console.log('Email Sent')
        // }
        .then(function(response){
            console.log('Email Sent')
            return
        })
        .catch(function(error){
            console.log('error',error)
        })
    }
)

//抓會員大頭照圖片
router.post("/getmemberinfo",(req,res)=>{
    const sql = "SELECT mbAva FROM mb_info WHERE mbId=?"
    db.queryAsync(sql, [req.body.mbId])
    .then(r=>{
        res.json({r})
    })
})
//會員id找擁有折價券
router.post("/findmycup",(req,res)=>{
    const sql ="SELECT mbCup FROM mb_info WHERE mbId=?";
    db.queryAsync(sql,[req.body.mbId])
    .then(r=>{
        const oristring = r[0].mbCup;
        console.log(oristring)
        const arr = oristring.split(",")
        // arr = JSON.stringify(oristring)
        console.log(arr)
        const sql2 = `SELECT \* FROM \`sales\` WHERE \`sId\` IN (?)`;
        return db.queryAsync(sql2,[arr])
    })
    .then(r2=>{
        return res.json(r2)
    })
})
//以下for testing
router.get('/hello123',(req,res)=>{
    // console.log('hello123')
    res.send('123')
    
})
//新增資料
// router.get('/insert',(req,res)=>{
//     res.render('product-list/insert');
// })

//upload.none()必須搭配form enctype="multipart"&multer
router.post('/insert',upload.none(),(req,res)=>{
    //檢查各欄位的格式
    const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    const output ={
        success: false,
        error:'',
        status:0,
        body:req.body,
        result:{}
    }

    // if(!req.body.name || req.body.name.length<2){
    //     output.error = "請填寫正確姓名";
    //     output.status =410;
    //     return res.json(output);
    // }
    //沒填email || 不合格式
    // if(!req.body.email || !email_pattern.test(req.body.email)){
    //     output.error = "請填寫合法email";
    //     output.status =420;
    //     return res.json(output);
    // }

    // if(!req.body.email || !/^\d{4}-\d{1,2}-\d{1,2}/.test(req.body.birthday)){
    //     output.error = "請填寫合法生日";
    //     output.status =430;
    //     return res.json(output);
    // }
    const sql = `INSERT INTO \`items\`(\`itemName\`,\`itemPrice\`,\`itemGrade\`,\`itemDate\`,\`itemIntro\`,\`created_at\`) VALUES(?,?,?,?,?,NOW())`;

    db.queryAsync(sql,[
        req.body.name,
        req.body.price,
        req.body.grade,
        req.body.launchdate,
        req.body.intro,
    ])
        .then(r=>{
            output.result =r;
            output.success=true;
            console.log('result',r);
            return res.json(output);
        })
        .catch(error=>{
            // res.send(error);
            console.log(error);
            return res.json(output);
        })
    // res.json(req.body)
});
//編輯資料
router.get('/edit/:itemId',(req,res)=>{

    const sql="SELECT * FROM `items` WHERE itemId=?";
    db.queryAsync(sql,[req.params.itemId])
        .then(result=>{
            // res.json(result)//看result輸出的樣子
            if(!result || !result.length){
                res.redirect(req.baseUrl + '/list');
            }else{
                result[0].itemDate=moment(result[0].itemDate).format(dateFormat);

                // res.send(result);
                res.render('product-list/edit',{row:result[0]});
            }
        })
        .catch(error=>{
            res.redirect(req.baseUrl + '/list');//有錯誤就跳轉
        })
    // res.render('address-book/edit');
})

//EDIT
router.post('/edit/:itemId',upload.none(),(req,res)=>{
    //檢查各欄位的格式
    const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    const output ={
        success: false,
        error:'',
        status:0,
        body:req.body,
        result:{}
    }

    // if(!req.body.name || req.body.name.length<2){
    //     output.error = "請填寫正確姓名";
    //     output.status =410;
    //     return res.json(output);
    // }
    //沒填email || 不合格式
    // if(!req.body.email || !email_pattern.test(req.body.email)){
    //     output.error = "請填寫合法email";
    //     output.status =420;
    //     return res.json(output);
    // }

    // if(!req.body.email || !/^\d{4}-\d{1,2}-\d{1,2}/.test(req.body.birthday)){
    //     output.error = "請填寫合法生日";
    //     output.status =430;
    //     return res.json(output);
    // }
    const sql = `UPDATE \`items\` SET \`itemName\`=?,\`itemPrice\`=?,\`itemGrade\`=?,\`itemDate\`=?,\`itemIntro\`=? WHERE itemId=?`;

    db.queryAsync(sql,[
        req.body.name,
        req.body.price,
        req.body.grade,
        req.body.launchdate,
        req.body.intro,
        req.params.itemId
    ])
        .then(r=>{
            output.result =r;
            output.success=true;
            console.log('result',r);
            return res.json(output);
        })
        .catch(error=>{
            // res.send(error);
            console.log(error);
            return res.json(output);
        })
    // res.json(req.body)
});
//刪除資料
router.post('/del/:itemId', (req, res)=>{
    const sql = "DELETE FROM `items` WHERE `itemId`=?";
    db.queryAsync(sql, [req.params.itemId])
        .then(r=>{
            console.log(r);
            res.json(r);
    })
});
//加入購物車
router.get('/addToCart/:itemId',(req,res)=>{
    //寫入產品itemId進session
    console.log(req.params)
   
    if(!req.session['shopping_item']){
        req.session['shopping_item']=[];
        req.session['shopping_item'].push(req.params.itemId);
    }else{
        console.log('already have')
        req.session['shopping_item'].push(req.params.itemId);
    }
    
    // req.session['shopping_item'].push(req.params.itemId);
    console.log(req.session)
    
    res.json(req.session);
})
//檢視購物車
router.get('/cart',(req,res)=>{
    // res.json(req.session);
    // if(req.shopping_item){
    //     res.render('product-list/cart',{rows:req.session.shopping_item});
    // }else{
    //     res.send('你還沒加入任何商品至購物車')
    // }

    // res.render('product-list/cart',{rows:req.session.shopping_item});

    const sql="SELECT * FROM `items` WHERE itemId IN (?)";
    //如果有加入購物車的商品就做sql查詢
    //還沒有新增shopping_item進session或是已清空
    if(req.session.shopping_item && req.session.shopping_item.length>0){
        let row=[];
        let item = req.session.shopping_item;
        console.log(item);
        // req.session.shopping_item.forEach((item,idx)=>{
        //     // console.log(item);
        db.queryAsync(sql,[item])
        .then(result=>{
            // res.json(result);
            // row.push(result)
            // res.send(result);
            res.render('product-list/cart',{rows:result})
            
            // return row;
        })
        
        
    }else{
        res.render('product-list/cart',{rows:{}});
    }
        // console.log('output'+r);
 })
//刪除購物車項目
 router.get('/cart/del/:itemId',(req,res)=>{
    // const index = req.session.shopping_item.indexOf(itemId);
    // console.log(index);
    let item = req.session.shopping_item;
    // console.log(req.params)
    // console.log(item.includes(req.params.itemId))
        if(item.includes(req.params.itemId)){
            let index = item.indexOf(req.params.itemId);//找itemId在shopping_item的index
            // console.log(index);
            // console.log(req.session)
           item.splice(index,1);//刪除該itemId
            // delete req.session.shopping_item;
            req.session.save();//儲存對session的修改
        //    console.log(req.session)
        //    res.send('hi');
            res.redirect('/product/cart');
           
        }else{
            
            res.redirect('/product/cart');
        }
 })
//購物車內容形成訂單
let ordercontent={};//save query result
 router.post('/addToCheck',(req,res)=>{
     console.log(req.body.itemId)
    //  res.send('addTocheck');
     const sql = "SELECT * FROM `items` WHERE itemId IN (?)";
     db.queryAsync(sql,[req.body.itemId])
     .then(result=>{
         console.log(result);
        //  for(let k=0;k<result.length;k++){
        //  let itemId = result[0].itemId,price = result[0].itemPrice;
        //  }
         console.log(result.length)//長度
        //  console.log('名稱: '+itemId)
        for(let i=0;i<result.length;i++){
            ordercontent[i]={'itemId':result[i].itemId,'price':result[i].itemPrice}
        }
        //  ordercontent['itemId']=itemId;
         console.log(ordercontent)
         //寫入orders資料表以取得orderId
         const sqlOrder = "INSERT INTO `orders` (`username`) VALUES (?)"
         return db.queryAsync(sqlOrder,[req.session.loginUser]);
       
     })
     .then(r=>{
        console.log('最新: '+r.insertId);//取得最新orders id
        // console.log(r.insertId)
        // let params = r.insertId;
        //寫訂單資訊進資料表item_lists
       for(let j=0;j<Object.keys(ordercontent).length;j++){
        //    console.log(j)
        const item_sql = "INSERT INTO `item_lists` (`orderId`,`itemId`,`checkPrice`) VALUES (?,?,?)";
        db.queryAsync(item_sql,[r.insertId,ordercontent[j].itemId,ordercontent[j].price])
        // console.log(el.itemId)
        // console.log('hi')
       }
        // return res.json('omg');
        // res.write(r)
        // res.redirect(req.baseUrl + '/payment');
        // res.render('/product-list/payment',{payment:'1'});
        
     })
     .then(r=>{
         
        res.redirect(req.baseUrl + '/payment');
     })
 })
//付款資訊輸入頁
 router.get('/payment',(req,res)=>{
    //  res.send('hello')
    res.render('product-list/payment');
 })


module.exports = router;