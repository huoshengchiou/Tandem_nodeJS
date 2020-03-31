//基本套件導入
const express = require('express');
const moment = require('moment-timezone');
const multer = require('multer');
const nodemailer = require("nodemailer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/activity_img');
    }
  })
});
const db = require(__dirname + '/../_connect_db');
const router = express.Router();

//日期格式全域設定
const dateFormat = 'YYYY-MM-DD';

//新增活動
router.post('/addNewAc', upload.single('aKV'), (req, res) => {
  //填寫欄位的設定
  const aId = 'waitMakeUp'
  const arr = JSON.stringify([])
  const inserSql = "INSERT INTO `activity` ( `aId` , `MbId` , `aName` , `aDate` , `aLocation` , `aContent` , `aKV` , `aCategoryId` , `aBookingTime` , `aLimit` , `aBudget` , `aCostTime`,`aLike`,`aFollowing`,`aBook`,`aImg` ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.queryAsync(inserSql, [
    aId,
    req.body.aMId,
    req.body.aName,
    req.body.aDate,
    req.body.aLocation,
    req.body.aContent,
    req.file.originalname,
    req.body.aCategoryId,
    req.body.aBookingTime,
    req.body.aLimit,
    req.body.aBudget,
    req.body.aCostTime,
    arr,
    arr,
    arr,
    arr,
  ])
    .then(r => {
      //回頭取出流水號Id
      const extractSql = "SELECT `id` FROM `activity` WHERE `aId` = 'waitMakeUp'";
      return db.queryAsync(extractSql)
    })
    .then(updateId => {
      //修復活動id值
      let id = updateId[0].id
      const makeUpSql = "UPDATE `activity` SET `aId`= ? WHERE `id`= ?";
      return db.queryAsync(makeUpSql, [id, id])
    })
    .then(result => {
      //為發送email提取關鍵資料
      let mbId = req.body.aMId;
      const mbEsql = "SELECT `mbName`, `mbE` FROM `mb_info` WHERE `mbId` = ?"
      return db.queryAsync(mbEsql, [mbId])
    })
    .then(mbData => {
      const acName = req.body.aName;
      const acDate = req.body.aDate;
      //準備開啟帳號發送創辦活動成功通知
      async function mail() {
        let mbE = mbData[0].mbE;
        let mbName = mbData[0].mbName;
        let serverAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "tandem20200401@gmail.com", // generated ethereal user
            pass: "0401tandem" // generated ethereal password
          }
        });
        let info = await transporter.sendMail({
          from: '"⬖⬗Tandem⬘⬙ " <tandem20200401@gmail.com>',
          // sender address
          to: `${mbE}`, // list of receivers
          subject: "Tandem 活動創建成功", // Subject line
          text: "Hello world?", // plain text body
          html: `<h1>▚親愛的Tandem創客${mbName}您好▞ </h1><h2>您預計要在${acDate}舉辦的活動${acName}已成功創立！</h2><h3>預祝活動順利</h3>` // html body
        });
        return res.json({ 活動創建: "成功" })
      }
      //發送mail
      mail().catch(console.error);
    })
    .catch(error => {
      res.json(error)
      // console.log(error)
    })
})

// 更新訂閱、追蹤、按讚資料表
router.post('/setBFL', (req, res) => {
  // console.log('setBFL', req.body)

  //準備sql，將post取得資料繫結並執行
  //抓會員表這邊的資料，
  const getMstateSql = "SELECT `aLike`, `aBook` FROM `activity` WHERE `aId` = ?"
  db.queryAsync(getMstateSql, [req.body.aId])
    .then(res => {
      // console.log(res)
      // 接收前端對訂閱、按讚、追蹤的動作，預計要做update
      // 這一趴等發表完之後再完成了
    })
})

// 新增留言
router.post('/activitycontentpage/:Id?', (req, res) => {
  // console.log(req)
  //準備sql，將post取得資料繫結並執行
  const commentSql = "INSERT INTO `acomment` (`MId`, `aComment`, `aId`) VALUES (?,?,?)"
  db.queryAsync(commentSql, [
    req.body.localUserData.mbId,
    req.body.aComment,
    req.body.aBData.aId,
  ])
    .then(commentresult => {
      res.json(commentresult)
      // console.log('commentresult', commentresult)
    })
    .catch(error => {
      res.json(error)
      // console.log(error)
    })
})

//日曆icon導入活動時間
router.get('/mbCalendar/:mId', (req, res) => {
  const mbJoinAcArr = []
  const mCalenSql = "SELECT `mbactivityBook` FROM `mb_info` WHERE `mbId` = ?"
  db.queryAsync(mCalenSql, [req.params.mId])
    .then(result => {
      const mActivityArr = JSON.parse(result[0].mbactivityBook)
      // console.log(mActivityArr)
      const activityDateSql = "SELECT `aDate` FROM `activity` WHERE `aId` IN (?)"
      return db.queryAsync(activityDateSql, [mActivityArr])
    })
    .then(resDate => {
      resDate.forEach((ad) => {
        ad.aDate = moment(ad.aDate).format(dateFormat);
        mbJoinAcArr.push(ad.aDate)
      });
      res.json(mbJoinAcArr)
      // console.log(mbJoinAcArr)
    })
})

//輪播牆前三名活動篩選
//尚未完成
router.get('/hotTopThree', (req, res) => {
  let arr = [];
  let topThreeData = [];
  let topThreeAc = [];
  //資料庫撈出推薦資料陣列
  const aLikeSql = "SELECT `aId` , `aLike` FROM `activity`"
  db.queryAsync(aLikeSql)
    .then(allLikeData => {
      // 計算各活動按讚總數
      for (let i = 0; i < allLikeData.length; i++) {
        let detilLength = JSON.parse(allLikeData[i].aLike).length;
        // 將資料陣列化
        arr.push(detilLength)
      }
      // 將資料排序
      for (let i = 0; i < arr.length; i++) {
        let max = arr[i];
        let maxIndex = i;
        for (let k = i; k < arr.length; k++) {
          if (arr[k] > max) {
            max = arr[k];
            maxIndex = k
          }
        }
        [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
      }
      // 取前三名 => 排序好的陣列抓前三的值
      let topThreeData = arr.slice(0, 3)
      // 以前三名資料量回頭提取其活動Id,為避免重複取值使用switch+push選取
      for (let i = 0; i < allLikeData.length; i++) {
        let detilLength = JSON.parse(allLikeData[i].aLike).length
        switch (detilLength) {
          case (topThreeData[0]):
            topThreeAc.push(parseInt(allLikeData[i].aId))
            break;
          case (topThreeData[1]):
            topThreeAc.push(parseInt(allLikeData[i].aId))
            break;
          case (topThreeData[2]):
            topThreeAc.push(parseInt(allLikeData[i].aId))
            break;
        }
        if (topThreeAc.length == 3) {
          break;
        }
      }
      // console.log(topThreeAc)
      // 撈出三筆資料需求的欄位送至前端
      const topThreeSql = `SELECT \`aId\` , \`aName\` , \`aKV\` FROM \`activity\` WHERE \`aId\` IN (${topThreeAc})`
      return db.queryAsync(topThreeSql)
    })
    .then(threeRes => {
      // console.log(threeRes)
      res.json(threeRes)
    })
})

//內容頁，分別以日期點選(icon日曆)或列表方式(主頁)導入
router.get('/activitycontentpage/:Id?', (req, res) => {
  let condition = req.params.Id
  let contentSql = ''
  //取得的條件condition分為Id或日期，依據不同條件選取不同sql語法
  if (condition.length > 6) {
    contentSql = "SELECT `activity`.`aId` , `activity`.`aName` , `activity`.`aDate` , `activity`.`aLocation` , `activity`.`aContent` , `activity`.`aKV` , `activity`.`aBookingTime` , `activity`.`aLimit` , `activity`.`aBudget` , `activity`.`aCostTime` , `activity`.`aLike` , `activity`.`aFollowing` , `activity`.`aBook` , `activity`.`aImg` , `acategory`.`aCategoryName` , `acategory`.`created_at` , `mb_info`.`mbName` FROM `activity` INNER JOIN `acategory` ON `activity`.`aCategoryId` = `acategory`.`aCategoryId` INNER JOIN `mb_info` ON `activity`.`MbId` = `mb_info`.`mbId` WHERE `activity`.`adate` = ?";
  } else {
    contentSql = "SELECT `activity`.`aId` , `activity`.`aName` , `activity`.`aDate` , `activity`.`aLocation` , `activity`.`aContent` , `activity`.`aKV` , `activity`.`aBookingTime` , `activity`.`aLimit` , `activity`.`aBudget` , `activity`.`aCostTime` , `activity`.`aLike` , `activity`.`aFollowing` , `activity`.`aBook` , `activity`.`aImg` , `acategory`.`aCategoryName` , `acategory`.`created_at` , `mb_info`.`mbName` FROM `activity` INNER JOIN `acategory` ON `activity`.`aCategoryId` = `acategory`.`aCategoryId` INNER JOIN `mb_info` ON `activity`.`MbId` = `mb_info`.`mbId` WHERE `activity`.`Id` = ?";
  }
  db.queryAsync(contentSql, [condition])
    .then(result => {
      if (!result || !result.length) {
        res.redirect(req.baseUrl + '/')
      } else {
        result[0].aDate = moment(result[0].aDate).format(dateFormat);
        result[0].created_at = moment(result[0].created_at).format(dateFormat);
        res.json(result[0])
      }
    })
    .catch(error => {
      res.send('error', error)
    })
})

//留言依活動編號導入
router.get('/getComment/:aId?', (req, res) => {
  //取得活動編號並送回留言內容
  const commentInfoSql = "SELECT `mb_info`.`mbName` , `mb_info`.`mbAva` , `aComment`.`created_at` , `aComment`.`aComment` , `aComment`.`aId` FROM `aComment` INNER JOIN `mb_info` ON `aComment`.`MId` = `mb_info`.`mbId` WHERE `aComment`.`aId` = ? ORDER BY `aComment`.`created_at` DESC"
  db.queryAsync(commentInfoSql, [req.params.aId])
    .then(commentInfo => {
      // console.log('length', commentInfo.length)
      if (!commentInfo || !commentInfo.length) {
        res.send('noData')
      } else {
        commentInfo.forEach((data) => {
          data.created_at = moment(data.created_at).format(dateFormat);
        });
        // console.log('commentInfo', commentInfo)
        res.json(commentInfo)
      }
    })
    .catch(error => {
      res.send('error', error)
    })
})

//列表頁抓資料與分類選擇(還有模糊搜尋)
router.get('/:page?/:filter?', (req, res) => {
  //一頁抓10筆
  const perPage = 10;
  let totalRows, totalPages;
  //類別設定，若網址上沒有類別則給0
  let filter = req.params.filter ? req.params.filter : 0;
  //頁數設定，若網址上有pagenumber就parseInt用它，沒有抓到網址上的page就給1
  let page = req.params.page ? parseInt(req.params.page) : 1;
  // console.log('page', page)
  if (filter) {
    //有類別的處理
    // console.log('filter', filter)
    let filterSql = '';
    let cateInfoSql = '';
    //依照類別或搜尋條件計算資料庫裡一共有幾筆資料
    if (filter.indexOf('ACG') != -1) {
      filterSql = `SELECT COUNT(1) num FROM \`activity\` WHERE \`aCategoryId\` = '${filter}' `;
    } else {
      filterSql = `SELECT COUNT(1) num FROM \`activity\` WHERE \`aName\` LIKE '%${filter}%' `;
    }
    db.queryAsync(filterSql)
      .then(result => {
        if (result[0].num > 0) {
          totalRows = result[0].num;
          totalPages = Math.ceil(totalRows / perPage)
          if (page < 1) page = 1;
          if (page > totalPages) page = totalPages;
          //依據上面計算的筆數撈資料
          if (filter.indexOf('ACG') != -1) {
            cateInfoSql = `SELECT * FROM \`activity\` WHERE \`aCategoryId\` = '${filter}' ORDER BY \`aDate\` DESC LIMIT ${(page - 1) * perPage}, ${perPage}`;
          } else {
            cateInfoSql = `SELECT * FROM \`activity\` WHERE \`aName\` LIKE '%${filter}%' ORDER BY \`aDate\` DESC LIMIT ${(page - 1) * perPage}, ${perPage}`;
          }
          db.queryAsync(cateInfoSql)
            .then(cateInfo => {
              cateInfo.forEach((ad) => {
                ad.aDate = moment(ad.aDate).format(dateFormat);
              });
              res.json({ "activity": cateInfo, "totalPages": totalPages });
            })
        }
      })
  } else {
    //沒有類別
    //計算資料庫裡一共有幾筆資料
    const totalSql = "SELECT COUNT(1) num FROM `activity`";
    db.queryAsync(totalSql)
      .then(result => {
        totalRows = result[0].num;
        totalPages = Math.ceil(totalRows / perPage)
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        //依據上面計算的筆數撈資料
        const infoSql = `SELECT * FROM \`activity\` ORDER BY \`aDate\` DESC LIMIT ${(page - 1) * perPage}, ${perPage}`;
        return db.queryAsync(infoSql)
      })
      .then(result => {
        result.forEach((ad) => {
          ad.aDate = moment(ad.aDate).format(dateFormat);
        });
        res.json({ "activity": result, "totalPages": totalPages });
      })
  }
})

module.exports = router