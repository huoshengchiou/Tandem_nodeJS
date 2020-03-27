const express = require("express");

const bodyParser = require("body-parser");
const db = require(__dirname + "/_connect_db");
const cors = require("cors");
const session = require("express-session");
const app = express();
const fs = require("fs");

// mail
const nodemailer = require("nodemailer");

//parse application /x-www-form-urlencoded
//top level middleware (analyse header (GET or POST & body))
app.use(bodyParser.urlencoded({ extended: false }));

//top level middleware, type transformation from raw data to json form
app.use(bodyParser.json());

app.use(
  session({
    saveUninitialized: false, //新用戶沒有使用到session 物件時不會建立session何發送
    resave: false, //沒變更內容是否強制回存
    secret: "abcd",
    cookie: {
      maxAge: 1200000, //20分鐘， 單位毫秒
      sameSite: false
    }
  })
);

//cors placed right after session
const whitelist = [
  "http://localhost:5555",
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "http://localhost:63342",
  "http://localhost:3000",
  "http://localhost:5500",
  // domain是認字串，不同就是不同台主機
  "http://127.0.0.1:5500",
  undefined
];

const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true); //允許
    } else {
      callback(null, false); //不允許
    }
  }
};
app.use(cors(corsOptions));

// ----------------------member----------------------------------start-------------------------
// 寄送密碼驗證信
app.post("/fgpwd", (req, res) => {
  // console.log(req.body.fgtraceE);

  async function main() {
    // 拿取userEmail
    let fgtraceE = req.body.fgtraceE;
    let testAccount = await nodemailer.createTestAccount();

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
      to: `${fgtraceE}`, // list of receivers
      subject: "Tandem 密碼重設驗證信", // Subject line
      text: "Hello world?", // plain text body
      html: `<h1>▚請問你掉的是金密碼，還是銀密碼? 不然還是請你重設密碼▞ </h1><br><h1><a href='http://localhost:6001/tandem/member/redirectpwdset?mbE=${fgtraceE}'>應該是Excalibur</a></h1>` // html body
    });
    return res.json({ 你的密碼驗證信: "寄出囉" });
  }
  main().catch(console.error);
});

//連接會員檔案模組
app.use("/tandem/member", require(__dirname + "/routers/Tandemlog"));

//重新修改密碼頁面-----測試中
app.get("/editpwd", (req, res) => {
  console.log(__dirname);
  return res.sendFile(__dirname + "/public/Tandem_pwdedit.html");
});

app.get("/", (req, res) => {
  res.json({ Hello你到囉: "Hello" });
});
app.post("/test", (req, res) => {
  return res.json(req.body);
});
// ----------------------member----------------------------------end-------------------------
// ---------------------community-------------------------------start----------------------------
//路由模組化

app.use("/items", require(__dirname + "/routers/communityPosts"));

app.use("/postComment", require(__dirname + "/routers/postComment"));

app.use("/community", require('./routers/addfriend'));
// -----------------------community-----------------------end----------------------------------

// ----------論壇---article-----start------------------
const articlesRouter = require("./routers/articles");
app.use("/articles", articlesRouter);
// ----------論壇---artice------end----------

// ----------------新聞公告----------start------
app.use("/bulletin", require(__dirname + "/routers/bulletindb"));
// ----------------新聞公告----------end------

// ------------商品------------start--------

app.use("/product", require(__dirname + "/routers/product"));

// ------------商品------------end--------

// ------------活動------------start--------
app.use("/activity", require(__dirname + "/routers/activitydb"));
// ------------活動------------end--------

app.use(express.static(__dirname + "/../public"));

//自訂404 頁面
app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404-page not found");
});

// 固定port號6001
app.listen(6001, () => {
  console.log(`Server has started on port: 6001  -- node 在 port:6001運行`);
});
