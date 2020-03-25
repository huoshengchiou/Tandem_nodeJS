const express = require("express");
const moment = require("moment-timezone");
const db = require(__dirname + "/../_connect_db");

const router = express.Router();

router.get("/:page", async (req, res) => {
  //   console.dir(req);
  //   console.dir(req.url);
  console.log("eeeer");
  console.log(req.query);
  console.log(req.params);
  const perPage = 2;
  let totalRows, totalPages;
  let page = req.params.page ? parseInt(req.params.page) : 1;
  let cond;
  let search = req.query.search;
  console.log(search);

  if (req.query.search == null) {
    cond = 1;
  } else {
    searchArr = search;
    searchArr = searchArr.split(/\s+/);
    for (let i in searchArr) {
      if (i == 0) {
        cond = `bTitle Like "%${searchArr[i]}%" OR vName LIKE "%${searchArr[i]}%"  OR cName LIKE "%${searchArr[i]}%"`;
      } else {
        cond += `OR bTitle Like "%${searchArr[i]}%" OR vName LIKE "%${searchArr[i]}%" OR cName LIKE "%${searchArr[i]}%" `;
      }
    }
  }
  console.log(cond);
  const t_sql = `SELECT COUNT(1) num FROM bulletin INNER JOIN vendors ON bulletin.vId = vendors.vId INNER JOIN category ON category.cId = bulletin.cId WHERE ${cond} ORDER BY bId ASC`;
  //   const t_sql = "SELECT COUNT(1) num FROM `bulletin` WHERE " + cond + " ORDER BY `bId` ASC";
  const resData = await db.queryAsync(t_sql);

  totalRows = resData[0].num; // 總筆數
  totalPages = Math.ceil(totalRows / perPage);

  // 限定 page 範圍
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  const sql = `SELECT * FROM bulletin INNER JOIN vendors ON bulletin.vId = vendors.vId INNER JOIN category ON category.cId = bulletin.cId   WHERE ${cond} LIMIT  ${(page -
    1) *
    perPage}, ${perPage}`;

  const resData2 = await db.queryAsync(sql);

  const fm = "YYYY-MM-DD";

  resData2.forEach((row, idx) => {
    row.bDate = moment(row.bDate).format(fm);
  });

  const newSql = `SELECT * FROM bulletin WHERE 1  ORDER BY bDate DESC LIMIT 5`;

  const newData = await db.queryAsync(newSql);

  newData.forEach((row, idx) => {
    row.bDate = moment(row.bDate).format(fm);
  });

  res.json({
    bulletin: resData2,
    newBulletin: newData,
    totalPages: totalPages
  });

  // .then(result => {
  //   const fm = "YYYY-MM-DD";

  //   result.forEach((row, idx) => {
  //     row.bDate = moment(row.bDate).format(fm);
  //   });

  //   res.json({ bulletin: result, totalPages: totalPages });
  // })
  // .catch(error => {
  //   console.log("no result");
  //   console.log(error);
  // });
});

// router.get("/search", (req, res) => {
//   console.log("serarch");
//   const search = req.query.q;
//   if (!search) {
//     res.status(400);
//     res.end();
//   } else {
//   }
// });

router.get("/news/:bId", async (req, res) => {
  const bId = req.params.bId;

  const sql = `SELECT * FROM vendors INNER JOIN bulletin ON vendors.vId =  bulletin.vId  WHERE bId = '${bId}'`;

  const newsContent = await db.queryAsync(sql);
  const fm = "YYYY-MM-DD";

  newsContent.forEach((row, idx) => {
    row.bDate = moment(row.bDate).format(fm);
  });

  const newSql = `SELECT * FROM vendors INNER JOIN bulletin ON vendors.vId =  bulletin.vId ORDER BY bId DESC  LIMIT 4`;
  const related = await db.queryAsync(newSql);

  related.forEach((row, idx) => {
    row.bDate = moment(row.bDate).format(fm);
  });

  res.json({ newsContent: newsContent, related: related });
});
router.get("/sales/:sId", (req, res) => {
  const sId = req.params.sId;

  //   const sql = `SELECT * FROM bulletin WHERE sId = '${sId}'`;
  const sql = `SELECT bulletin.*, sales.getId, vendors.vName FROM bulletin RIGHT JOIN sales ON bulletin.sId = sales.sId INNER JOIN vendors ON vendors.vId =  bulletin.vId WHERE bulletin.sId="${sId}"`;
  db.queryAsync(sql).then(result => {
    const fm = "YYYY-MM-DD";

    result.forEach((row, idx) => {
      row.bDate = moment(row.bDate).format(fm);
    });
    res.json(result);
  });
});
router.get("/sales/:sId/get", (req, res) => {
  const sId = req.params.sId;
  const mbId = req.query.mbId;
  console.log(sId);
  console.log(mbId);

  const sql = `UPDATE sales SET getId = CASE getId WHEN "" THEN "${mbId}" ELSE CONCAT(getId, ",", "${mbId}") END WHERE sId="${sId}"`;

  db.queryAsync(sql).then(result => {
    if (result.serverStatus == 2) {
      const mbsql = `UPDATE mb_info SET mbCup = CASE mbCup WHEN "" THEN "${sId}" ELSE CONCAT(mbCup, ",", "${sId}") END WHERE mbId="${mbId}"`;
      db.queryAsync(mbsql).then(result => {
        res.status(200);
      });
    } else {
      res.status(500);
    }
    res.end();
  });
});

module.exports = router;
