const express = require("express");
const moment = require("moment-timezone");
const multer = require("multer");

const db = require(__dirname + "/../connect_db");
const router = express.Router();

const dateFormat = "YYYY-MM-DD";
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/activity_uploads");
    }
  })
});

router.post("/addNewAc", upload.single(), (req, res) => {
  const aId = "waitMakeUp";
  const aKV = req.body.files[0].path;
  const arr = JSON.stringify([]);
  console.log(req.body.aCategoryId);
  const inserSql =
    "INSERT INTO `activity` ( `aId` , `MbId` , `aName` , `aDate` , `aLocation` , `aContent` , `aKV` , `aCategoryId` , `aBookingTime` , `aLimit` , `aBudget` , `aCostTime` , `aLike` , `aFallowing` , `aBook` , `aImg` ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.queryAsync(inserSql, [
    aId,
    req.body.localUserData.mbId,
    req.body.aName,
    req.body.aDate,
    req.body.aLocation,
    req.body.aContent,
    aKV,
    req.body.aCategoryId,
    req.body.aBookingTime,
    req.body.aLimit,
    req.body.aBudget,
    req.body.aCostTime,
    arr,
    arr,
    arr,
    arr
  ])
    .then(r => {
      const extractSql =
        "SELECT `id` FROM `activity` WHERE `aId` = 'waitMakeUp'";
      db.queryAsync(extractSql).then(id => {
        const makeUpSql = "UPDATE `activity` SET `aId`= ? WHERE `id`= ?";
        db.queryAsync(makeUpSql, [id, id]).then(result => {
          console.log("result:", r);
          res.json(r);
        });
      });
    })
    .catch(error => {
      res.json(error);
      console.log(error);
    });
});

router.post("/activitycontentpage/:Id?", (req, res) => {
  console.log(req.body);
  const commentSql =
    "INSERT INTO `acomment` (`MId`, `aComment`, `aId`) VALUES (?,?,?)";
  db.queryAsync(commentSql, [
    req.body.localUserData.mbId,
    req.body.aComment,
    req.body.aBData.aId
  ])
    .then(commentresult => {
      console.log("commentresult", commentresult);
      res.json(commentresult);
    })
    .catch(error => {
      res.json(error);
      console.log(error);
    });
});

router.get("/activitycontentpage/:Id?", (req, res) => {
  const contentSql =
    "SELECT `activity`.`aId` , `activity`.`aName` , `activity`.`aLocation` , `activity`.`aContent` , `activity`.`aKV` , `activity`.`aBookingTime` , `activity`.`aLimit` , `activity`.`aBudget` , `activity`.`aCostTime` , `activity`.`aLike` , `activity`.`aFallowing` , `activity`.`aBook` , `activity`.`aImg` , `acategory`.`aCategoryName` , `acategory`.`created_at` , `mb_info`.`mbName` FROM `activity` INNER JOIN `acategory` ON `activity`.`aCategoryId` = `acategory`.`aCategoryId` INNER JOIN `mb_info` ON `activity`.`MbId` = `mb_info`.`mbId` Where`activity`.`Id` = ?";
  db.queryAsync(contentSql, [req.params.Id])
    .then(result => {
      if (!result || !result.length) {
        res.redirect(req.baseUrl + "/");
      } else {
        result[0].aDate = moment(result[0].aDate).format(dateFormat);
        result[0].created_at = moment(result[0].created_at).format(dateFormat);
        res.json(result[0]);
      }
    })
    .catch(error => {
      res.send("error", error);
    });
});

router.get("/getComment/:aId?", (req, res) => {
  const commentInfoSql =
    "SELECT `mb_info`.`mbName` , `aComment`.`created_at` , `aComment`.`aComment` , `aComment`.`aId` FROM `aComment` INNER JOIN `mb_info` ON `aComment`.`MId` = `mb_info`.`mbId` WHERE `aComment`.`aId` = ? ORDER BY `aComment`.`created_at` DESC";
  db.queryAsync(commentInfoSql, [req.params.aId])
    .then(commentInfo => {
      console.log("length", commentInfo.length);
      if (!commentInfo || !commentInfo.length) {
        res.send("noData");
      } else {
        commentInfo.forEach(data => {
          data.created_at = moment(data.created_at).format(dateFormat);
        });
        console.log("length", commentInfo.length);
        console.log("commentInfo", commentInfo);
        res.json(commentInfo);
      }
    })
    .catch(error => {
      res.send("error", error);
    });
});

router.get("/mbCalendar/:mId", (req, res) => {
  const mbJoinAcArr = [];
  const mCalenSql = "SELECT `mbactivityBook` FROM `mb_info` WHERE `mbId` = ?";
  db.queryAsync(mCalenSql, [req.params.mId]).then(result => {
    const mActivityArr = JSON.parse(result[0].mbactivityBook);
    const activityDateSql = "SELECT `aDate` FROM `activity` WHERE `aId` IN (?)";
    db.queryAsync(activityDateSql, [mActivityArr]).then(resDate => {
      resDate.forEach(ad => {
        ad.aDate = moment(ad.aDate).format(dateFormat);
        mbJoinAcArr.push(ad.aDate);
      });
      res.json(mbJoinAcArr);
    });
  });
});

//列表頁模糊搜尋
// router.get('/fuzzySearch', (req, res) => {
// SELECT  FROM `activity`
// const cateInfoSql = `SELECT `aName` FROM \`activity\``;
//     console.log(req)
// })

//列表頁抓資料與分類選擇
router.get("/:page?/:aCategoryId?", (req, res) => {
  //一頁抓10筆
  const perPage = 10;
  let totalRows, totalPages;
  //類別設定，若網址上沒有類別則給0
  let aCategoryId = req.params.aCategoryId ? req.params.aCategoryId : 0;
  //頁數設定，若網址上有pagenumber就parseInt用它，沒有抓到網址上的page就給1
  let page = req.params.page ? parseInt(req.params.page) : 1;
  // console.log('page', page)

  if (aCategoryId) {
    //有類別的處理
    //依照類別計算資料庫裡一共有幾筆資料
    const categorySql =
      "SELECT COUNT(1) num FROM `activity` WHERE `aCategoryId` = ? ";
    db.queryAsync(categorySql, [aCategoryId]).then(result => {
      totalRows = result[0].num;
      totalPages = Math.ceil(totalRows / perPage);
      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;
      //依據上面計算的筆數撈資料
      const cateInfoSql = `SELECT * FROM \`activity\` WHERE \`aCategoryId\` = ? LIMIT ${(page -
        1) *
        perPage}, ${perPage}`;
      db.queryAsync(cateInfoSql, [aCategoryId]).then(cateInfo => {
        cateInfo.forEach(ad => {
          ad.aDate = moment(ad.aDate).format(dateFormat);
        });
        res.json({ activity: cateInfo, totalPages: totalPages });
      });
    });
  } else {
    //沒有類別
    //計算資料庫裡一共有幾筆資料
    const totalSql = "SELECT COUNT(1) num FROM `activity`";
    db.queryAsync(totalSql).then(result => {
      totalRows = result[0].num;
      totalPages = Math.ceil(totalRows / perPage);
      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;
      //依據上面計算的筆數撈資料
      const infoSql = `SELECT * FROM \`activity\` LIMIT ${(page - 1) *
        perPage}, ${perPage}`;
      return db.queryAsync(infoSql).then(result => {
        result.forEach(ad => {
          ad.aDate = moment(ad.aDate).format(dateFormat);
        });
        res.json({ activity: result, totalPages: totalPages });
      });
    });
  }
});

module.exports = router;
