const express = require("express");
const router = express.Router();
const db = require(__dirname + "/../_connect_db");
const multer = require("multer");
const upLoads = multer({ dest: "tmp_upLoads/" });
const moment = require("moment-timezone");

// ------------------------------------------------會員登入------------------------------

router.post("/check", (req, res) => {
  // console.log(req.body.mbE);
  //   自定義message

  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  //檢驗輸入資訊存在
  if (req.body.mbE && req.body.mbPwd) {
    // 檢驗Email格式
    let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    // 如果郵件不存在或者密碼格式不符
    if (!req.body.mbE || !email_pattern.test(req.body.mbE)) {
      FetchSeverResponse.msg = "密碼格式不符或不存在";
      return res.json(FetchSeverResponse);
    }
  } else {
    FetchSeverResponse.msg = "輸入帳號或密碼不存在";
    return res.json(FetchSeverResponse);
  }
  // 利用ctEmail和ctPwd對資料庫進行檢索
  //   sql語法建立
  const sql = `SELECT \* FROM \`mb_info\` WHERE \`mbE\`= ? AND \`mbPwd\` = ?`;

  db.queryAsync(sql, [req.body.mbE, req.body.mbPwd])
    .then(r => {
      // 撥開RowDataPacket obj拿裡面的東西
      // console.log(r[0]);
      // 沒有比對成功的帳號
      if (!r || !r.length) {
        FetchSeverResponse.msg = "帳號或密碼錯誤";
        return res.json(FetchSeverResponse);
      }
      //成功之後返回使用者資料，驅動前端進行狀態修改
      // FetchSeverResponse.success = true;
      // 將取得個人資料寄存在回覆中
      FetchSeverResponse.body = r[0];
      FetchSeverResponse.msg = "取得資料成功";

      // 進行上線設定
      const sql = `UPDATE \`mb_info\` SET \`mbOn\`=1  WHERE mbE=?`;
      return db.queryAsync(sql, [req.body.mbE]);
    })
    .then(r2 => {
      if (!r2.affectedRows) {
        FetchSeverResponse.msg = "上線設定失敗";
        return res.json(FetchSeverResponse);
      }
      FetchSeverResponse.success = true;
      FetchSeverResponse.msg = "完全登入成功";
      return res.json(FetchSeverResponse);
    });
});

// ---------------------------------------------------------------會員註冊---------------------------------------------
router.post("/reg", (req, res) => {
  // console.log(req.body);
  //   自定義message
  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  //   -------------------輸入資料驗證-----------------------
  if (req.body.mbE && req.body.mbPwd) {
    //   有輸入值時進一步比對格式
    let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!req.body.mbE || !email_pattern.test(req.body.mbE)) {
      FetchSeverResponse.msg = "Email格式不符";
      return res.json(output);
    }
  } else {
    FetchSeverResponse.msg = "mail或密碼遺失";
    return res.json(FetchSeverResponse);
  }

  // ------------------------------資料庫檢索區塊---------------------------
  // 找尋是否有重複的帳號
  const s_sql = "SELECT * FROM mb_info WHERE mbE=?";
  db.queryAsync(s_sql, [req.body.mbE])
    .then(r => {
      // console.log(r);
      if (r.length === 1) {
        FetchSeverResponse.msg = "影分身之術~帳號發生重複!";
        return res.json(FetchSeverResponse);
      }
      const sql = `INSERT INTO \`mb_info\` (\`mbE\`,\`mbPwd\`) 
        VALUES(?, ?)`;
      return db.queryAsync(sql, [req.body.mbE, req.body.mbPwd]);
      // 執行完成上方sql，但是跳過下方
    })
    .then(r2 => {
      if (!r2.affectedRows) {
        //  如果註冊不成功
        FetchSeverResponse.msg = "註冊失敗";
        return res.json(FetchSeverResponse);
      }

      const sql = `UPDATE \`mb_info\` SET \`mbOn\`=1  WHERE mbE=?`;
      return db.queryAsync(sql, [req.body.mbE]);
    })
    .then(r3 => {
      if (!r3.affectedRows) {
        //  如果上線修改不成功
        FetchSeverResponse.msg = "上線設定失敗";
        return res.json(FetchSeverResponse);
      }
      // 把剛註冊完的資料往外拉
      const s_sql = "SELECT * FROM mb_info WHERE mbE=?";
      return db.queryAsync(s_sql, [req.body.mbE]);
    })
    .then(r4 => {
      // 把結果回傳前端執行寫入
      FetchSeverResponse.success = true;
      FetchSeverResponse.msg = "註冊成功";
      FetchSeverResponse.body = r4[0];
      return res.json(FetchSeverResponse);
    })

    .catch(err => {
      console.log("資料庫搜索失敗");
      FetchSeverResponse.msg = "資料庫檢索錯誤";
      FetchSeverResponse.body = err;
      return res.json(FetchSeverResponse);
    });
  // promise只能走單條不可以在外圈處理
  // return res.json({ ok: "666" });
});

// ----------------利用個人ID---------------------------轉會員中心fetch會員個人資料塞入Redux state--------------------------------
router.post("/getUserfromFetch", (req, res) => {
  // console.log("here");
  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  const pickupUserData = [];
  const sql = "SELECT * FROM mb_info WHERE mbId=?";
  db.queryAsync(sql, [req.body.mbId])
    .then(r => {
      // 回送會員obj
      if (r.length === 1) pickupUserData.push(r[0]);
      //  設定會員上線

      // console.log(pickupUserData);
      const sql = `UPDATE \`mb_info\` SET \`mbOn\`=1  WHERE mbId=?`;
      return db.queryAsync(sql, [req.body.mbId]);
    })
    .then(r2 => {
      if (r2.affectedRows) {
        return res.json(pickupUserData);
      }
      FetchSeverResponse.msg = "上線設定失敗";
      return res.json(FetchSeverResponse);
    })
    .catch(err => {
      FetchSeverResponse.body = err;
      FetchSeverResponse.msg = "會員中心尋找會員失敗";
      return res.json(FetchSeverResponse);
    });
});
// -------------------會員個人資料修改---------------------
router.post("/Editinfo", (req, res) => {
  // console.log("收到新的會員資料!!");
  //   自定義message
  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  const sql = `UPDATE \`mb_info\` SET \`mbNick\`=?, \`mbCountry\`=?, \`mbGender\`=?, \`mbBd\`=?, \`mbPh\`=?, \`mbInv\`=?, \`mbDes\`=? WHERE mbId=?`;
  db.queryAsync(sql, [
    req.body.mbNick,
    req.body.mbCountry,
    req.body.mbGender,
    req.body.mbBd,
    req.body.mbPh,
    req.body.mbInv,
    req.body.mbDes,
    req.body.mbId
  ])
    .then(r => {
      if (r.affectedRows) {
        FetchSeverResponse.success = true;
        FetchSeverResponse.msg = "修改個人資料成功";
        return res.json(FetchSeverResponse);
      }
      FetchSeverResponse.msg = "修改個人資料失敗";
      return res.json(FetchSeverResponse);
    })
    .catch(err => {
      FetchSeverResponse.body = err;
      FetchSeverResponse.msg = "修改個人資料發生錯誤";
      return res.json(FetchSeverResponse);
    });
});
// --------------------紙娃娃修改--------------------
router.post("/changeavatar", (req, res) => {
  // console.log("收到新的cancas!!");
  //   自定義message
  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  const sql = `UPDATE \`mb_info\` SET \`mbAva\`=?, \`mbAvaHead\`=?, \`mbAvaBody\`=? WHERE mbId=?`;
  db.queryAsync(sql, [
    req.body.userNewcanvas,
    req.body.mbNewAvaHead,
    req.body.mbNewAvaBody,
    req.body.mbId
  ])
    .then(r => {
      // console.log(r);
      FetchSeverResponse.success = true;
      FetchSeverResponse.msg = "紙娃娃更新完成囉!";
      return res.json(FetchSeverResponse);
    })
    .catch(err => {
      return res.json(err);
    });
});
// -----------------由會員個人id到朋友會員資料---------
router.post("/findfriendinfo", (req, res) => {
  const sql = "SELECT mbFd FROM mb_info WHERE mbId=?";
  db.queryAsync(sql, [req.body.mbId])
    .then(r => {
      // 把string用JSON轉回來變obj
      // console.log(JSON.parse(r[0].mbFd));
      const arr = JSON.parse(r[0].mbFd);
      //用obj裝進sql語法
      const sql2 = `SELECT \* FROM \`mb_info\` WHERE \`mbId\`IN (${arr})`;
      return db.queryAsync(sql2);
    })
    .then(r2 => {
      return res.json(r2);
      //會員朋友陣列資料
    })
    .catch(err => {
      return res.json(err);
    });
});

// --------------會員id找按讚商品--------------------
router.post("/findAzenproduct", (req, res) => {
  const sql = "SELECT mbAzen FROM mb_info WHERE mbId=?";
  db.queryAsync(sql, [req.body.mbId])
    .then(r => {
      const arr = JSON.parse(r[0].mbAzen);

      const sql2 = `SELECT \* FROM \`items\` WHERE \`itemId\`IN (${arr})`;
      return db.queryAsync(sql2);
    })
    .then(r2 => {
      return res.json(r2);
      //會員按讚商品資料
    })
    .catch(err => {
      return res.json(err);
    });
});

// --------------會員id找已購買商品--------------------
router.post("/findmygame", (req, res) => {
  const sql = "SELECT mbBuy FROM mb_info WHERE mbId=?";
  db.queryAsync(sql, [req.body.mbId])
    .then(r => {
      const arr = JSON.parse(r[0].mbBuy);

      const sql2 = `SELECT \* FROM \`items\` WHERE \`itemId\`IN (${arr})`;
      return db.queryAsync(sql2);
    })
    .then(r2 => {
      return res.json(r2);
      //會員收藏商品資料
    })
    .catch(err => {
      return res.json(err);
    });
});

//------------------會員id找擁有折價券-----------------------
router.post("/findmycup", (req, res) => {
  const sql = "SELECT mbCup FROM mb_info WHERE mbId=?";
  db.queryAsync(sql, [req.body.mbId])
    .then(r => {
      // const arr = JSON.parse(r[0].mbCup);
      // console.log(typeof arr);

      const oristring = r[0].mbCup;
      const arr = oristring.split(",");
      const sql2 = `SELECT \* FROM \`sales\` WHERE \`sId\`IN (?)`;
      return db.queryAsync(sql2, [arr]);
    })
    .then(r2 => {
      return res.json(r2);
    });
});
//------------從會員id尋找好友推文----------先寫成功搜尋之後補失敗搜尋處理
router.post("/findmyFpost", (req, res) => {
  const sql = "SELECT mbFd FROM mb_info WHERE mbId=?";
  db.queryAsync(sql, [req.body.mbId])
    .then(r => {
      const arr = JSON.parse(r[0].mbFd);
      const sql2 = `SELECT \* FROM \`mb_info\` JOIN  \`posts\` ON \`mb_info\`.\`mbId\` = \`posts\`.\`member_id\` WHERE \`mbId\` IN (${arr})`;
      return db.queryAsync(sql2);
    })
    .then(r2 => {
      return res.json(r2);
    });
});

//由商品Id尋找商品細節
router.post("/findmygamedetail", (req, res) => {
  const sql = `SELECT \* FROM \`items\` WHERE \`itemId\`=?`;
  db.queryAsync(sql, [req.body.itemId]).then(r => {
    return res.json(r);
  });
});

// //新增文章，再把會員資料的發文陣列修改
// router.post("/post", (req, res) => {
//   const newpostId = 1;
//   const catcharr = [];
//   const sql = "SELECT mbPost FROM mb_info WHERE mbId=?";
//   db.queryAsync(sql, [req.body.mbId])
//     .then(r => {
//       const oriarr = JSON.parse(r[0].mbPost);
//       oriarr.push(newpostId);
//       console.log(oriarr);
//       const transJSON = JSON.stringify(oriarr);
//       const updatesql = `UPDATE \`mb_info\` SET \`mbPost\`=? WHERE \`mbId\`=?`;
//       return db.queryAsync(updatesql, [transJSON, req.body.mbId]);
//     })
//     .then(r2 => {
//       return res.json(r2);
//     });
// });

// 加好友前段啟動申請事件---------透過被加方Id與申請方Id成立加好友事件

router.post("/invate", (req, res) => {
  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  if (!req.body) {
    FetchSeverResponse.msg = "缺少申請資料";
    return res.json(FetchSeverResponse);
  }
  const sql = `SELECT \* FROM \`mb_info\` WHERE \`mbId\`=?`;
  db.queryAsync(sql, [req.body.mbId])
    .then(r => {
      const inviteUserData = r[0];
      // console.log(inviteUserData);
      // 把邀請方的所有資料JSON打包紀錄
      const JSdata = JSON.stringify(inviteUserData);
      const sql = `INSERT INTO \`add_friend\`(\`addmbId\`, \`invatembId\`, \`inviteuserData\`) VALUES (?,?,?)`;
      return db.queryAsync(sql, [req.body.addmbId, req.body.mbId, JSdata]);
    })
    .then(r2 => {
      if (r2.affectedRows) {
        FetchSeverResponse.msg = "加好友事件成立";
        return res.json(FetchSeverResponse);
      }
    });
});
// 檢索申請好友事件_old
// router.post("/confirmfriend", (req, res) => {
//   const sql = `SELECT \`invatembId\`, \`inviteuserData\` FROM \`add_friend\` WHERE \`addmbId\` = ${req.body.mbId}`;
//   db.queryAsync(sql).then(r => {
//     return res.json(r);
//   });
// });
// 檢索申請好友事件  //修正
router.post("/confirmfriend", (req, res) => {
  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  const sql = `SELECT \`invatembId\`, \`inviteuserData\` FROM \`add_friend\` WHERE \`addmbId\` = ${req.body.mbId}`;
  db.queryAsync(sql)
    .then(r => {
      if (r.length < 1) {
        FetchSeverResponse.body = r;
        FetchSeverResponse.msg = "沒有好友資料";
        return res.json(FetchSeverResponse);
      }
      FetchSeverResponse.success = true;
      FetchSeverResponse.body = r;
      FetchSeverResponse.msg = "有新的好友申請!";
      return res.json(FetchSeverResponse);
    })
    .catch(err => {
      FetchSeverResponse.body = err;
      FetchSeverResponse.msg = "沒有檢索資料";
      return res.json(FetchSeverResponse);
    });
});

//成立好友
router.post("/iamufriend", (req, res) => {
  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  // {mbId: 24, newfriendId: 26}   //req.body sample
  // 取出自己陣列加工放回
  const sql = "SELECT mbFd FROM mb_info WHERE mbId=?";
  db.queryAsync(sql, [req.body.mbId])
    .then(r => {
      // console.log(r[0].mbFd);
      const oriarr = JSON.parse(r[0].mbFd);
      oriarr.push(req.body.newfriendId);
      const transJSON = JSON.stringify(oriarr);
      const updatesql = `UPDATE \`mb_info\` SET \`mbFd\`=? WHERE \`mbId\`=?`;
      return db.queryAsync(updatesql, [transJSON, req.body.mbId]);
    })
    .then(r2 => {
      // console.log(r2);
      if (!r2.affectedRows) {
        FetchSeverResponse.msg = "自己加入好友寫入失敗";
        FetchSeverResponse.body = r2;
        return res.json(FetchSeverResponse);
      }
      // 換對方陣列進行加工   尚未處理重複id問題
      const sql = "SELECT mbFd FROM mb_info WHERE mbId=?";
      return db.queryAsync(sql, [req.body.newfriendId]);
    })
    .then(r3 => {
      const oriarr = JSON.parse(r3[0].mbFd);
      oriarr.push(req.body.mbId);
      const transJSON = JSON.stringify(oriarr);
      const updatesql = `UPDATE \`mb_info\` SET \`mbFd\`=? WHERE \`mbId\`=?`;
      return db.queryAsync(updatesql, [transJSON, req.body.newfriendId]);
    })
    .then(r4 => {
      if (!r4.affectedRows) {
        FetchSeverResponse.msg = "對方好友資料寫入失敗";
        FetchSeverResponse.body = r2;
        return res.json(FetchSeverResponse);
      }
      // 去除加好友事件
      const delsql = `DELETE FROM \`add_friend\` WHERE \`addmbId\`=?`;
      return db.queryAsync(delsql, [req.body.mbId]);
    })
    .then(r5 => {
      if (!r5.affectedRows) {
        FetchSeverResponse.msg = "刪除好友申請事件失敗";
        FetchSeverResponse.body = r5;
        return res.json(FetchSeverResponse);
      }
      (FetchSeverResponse.success = true),
        (FetchSeverResponse.msg = "已經成為好友囉");
      FetchSeverResponse.body = r5;
      return res.json(FetchSeverResponse);
    })
    .catch(err => {
      FetchSeverResponse.msg = "成為好友的過程失敗了";
      FetchSeverResponse.body = err;
      return res.json(FetchSeverResponse);
    });
});

// 從mbId與對方Id刪除好友---------------------
router.post("/killfriend", (req, res) => {
  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  //先利用mbId調出好友arr
  const sql = "SELECT mbFd FROM mb_info WHERE mbId=?";
  db.queryAsync(sql, [req.body.mbId])
    .then(r => {
      const oriarr = JSON.parse(r[0].mbFd);
      // 取出尋找值的位置
      let index = oriarr.indexOf(req.body.killmbId);
      // console.log(index);
      // 進行arr處理
      oriarr.splice(index, 1);
      const transJSON = JSON.stringify(oriarr);
      const updatesql = `UPDATE \`mb_info\` SET \`mbFd\`=? WHERE \`mbId\`=?`;
      return db.queryAsync(updatesql, [transJSON, req.body.mbId]);
    })
    .then(r2 => {
      if (!r2.affectedRows) {
        FetchSeverResponse.msg = "刪除好友失敗";
        FetchSeverResponse.body = r2;
        return res.json(FetchSeverResponse);
      }
      // FetchSeverResponse.success = true;
      // FetchSeverResponse.msg = "刪除好友成功";
      // return res.json(FetchSeverResponse);
      // 成功後把好友資訊再搜尋一次結果給前端更新畫面
      const sql = "SELECT mbFd FROM mb_info WHERE mbId=?";
      return db.queryAsync(sql, [req.body.mbId]);
    })
    .then(r3 => {
      const arr = JSON.parse(r3[0].mbFd);
      //用obj裝進sql語法
      const sql = `SELECT \* FROM \`mb_info\` WHERE \`mbId\`IN (${arr})`;
      return db.queryAsync(sql);
    })
    .then(r4 => {
      return res.json(r4);
      //會員朋友陣列資料
    })
    .catch(err => {
      return res.json(err);
    });
});

//登入後取得用戶頭像

router.post("/findmyhomeava", (req, res) => {
  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  const sql = "SELECT mbAva FROM mb_info WHERE mbId=?";
  db.queryAsync(sql, [req.body.mbId])
    .then(r => {
      if (!r.length) {
        FetchSeverResponse.msg = "資料庫取得頭像失敗";
        return res.json(FetchSeverResponse);
      }
      FetchSeverResponse.success = true;
      //只會有單筆     obj{obj}
      FetchSeverResponse.body = r[0];
      FetchSeverResponse.msg = "取得個人頭像";
      return res.json(FetchSeverResponse);
    })
    .catch(err => {
      FetchSeverResponse.msg = "搜尋頭像失敗";
      FetchSeverResponse.body = err;
      return res.json(FetchSeverResponse);
    });
});

// 登出後歸零上線狀態
router.post("/logout", (req, res) => {
  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  const sql = `UPDATE \`mb_info\` SET \`mbOn\`=0  WHERE mbId=?`;
  db.queryAsync(sql, [req.body.mbId])
    .then(r => {
      if (!r.affectedRows) {
        FetchSeverResponse.msg = "登出設定失敗";
        return res.json(FetchSeverResponse);
      }
      FetchSeverResponse.success = true;
      FetchSeverResponse.body = r;
      FetchSeverResponse.msg = "登出設定成功";
      return res.json(FetchSeverResponse);
    })
    .catch(err => {
      FetchSeverResponse.msg = "登出設定失敗";
      FetchSeverResponse.body = err;
      return res.json(FetchSeverResponse);
    });
});

// 將密碼重置需求進行導頁

router.get("/redirectpwdset", (req, res) => {
  res.sendFile(__dirname + "/member/resetmypwd.html");
});

router.post("/pwdreset", (req, res) => {
  // 接收資料形式
  // mbE:
  // pwd:
  // newpwd:
  const FetchSeverResponse = {
    success: false,
    body: req.body,
    msg: ""
  };
  // 用戶信箱存在檢驗
  if (!req.body.mbE) {
    FetchSeverResponse.msg = "用戶郵件錯誤";
    return res.json(FetchSeverResponse);
  }
  //密碼格式檢驗
  if (!req.body.pwd || !req.body.newpwd || req.body.pwd !== req.body.newpwd) {
    FetchSeverResponse.msg = "輸入密碼不正確";
    return res.json(FetchSeverResponse);
  }
  const sql = `UPDATE \`mb_info\` SET \`mbPwd\`=? WHERE \`mbE\`=?`;
  db.queryAsync(sql, [req.body.newpwd, req.body.mbE])
    .then(r => {
      if (!r.affectedRows) {
        FetchSeverResponse.msg = "密碼修改失敗";
        return res.json(FetchSeverResponse);
      }
      FetchSeverResponse.success = true;
      FetchSeverResponse.msg = "密碼修改成功，將為你導向光明彼方";
      return res.json(FetchSeverResponse);
    })
    .catch(err => {
      FetchSeverResponse.msg = "密碼修改發生錯誤";
      FetchSeverResponse.body = err;
      return res.json(FetchSeverResponse);
    });
});

//送前端arr測試
router.post("/testarr", (req, res) => {
  const sql = "SELECT mbFd FROM mb_info WHERE mbId=?";
  db.queryAsync(sql, [req.body.mbId]).then(r => {
    const arr = JSON.parse(r[0].mbFd);
    return res.json(r);
  });
});
module.exports = router;
