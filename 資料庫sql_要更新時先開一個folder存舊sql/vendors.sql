-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `nodejs`
--

-- --------------------------------------------------------

--
-- 資料表結構 `vendors`
--

CREATE TABLE `vendors` (
  `id` int(11) NOT NULL,
  `vId` varchar(15) NOT NULL COMMENT '廠商編號',
  `vName` varchar(25) DEFAULT NULL COMMENT '廠商名稱',
  `vOwner` varchar(15) DEFAULT NULL COMMENT '負責人',
  `vContact` int(20) DEFAULT NULL COMMENT '聯絡電話',
  `vLocation` varchar(20) DEFAULT NULL COMMENT '總部',
  `vAccount` varchar(15) DEFAULT NULL COMMENT '帳號',
  `vPwd` varchar(100) DEFAULT NULL COMMENT '密碼',
  `created_at` datetime NOT NULL COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `vendors`
--

INSERT INTO `vendors` (`id`, `vId`, `vName`, `vOwner`, `vContact`, `vLocation`, `vAccount`, `vPwd`, `created_at`, `updated_at`) VALUES
(1, 'V001', '美國藝電（ElectronicArts）', '安德魯·威森', 88887777, '美國加利福尼亞紅木城', '1234', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0000-00-00 00:00:00', '2020-01-14 13:52:10'),
(2, 'V002', '動視暴雪（Activision Blizzard）', '羅伯特·科蒂克', 88887778, '美國加利福尼亞聖莫尼卡', '12345', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0000-00-00 00:00:00', '2020-01-14 13:52:10'),
(3, 'V003', '2K Games', '萊恩·布朗特', 88887779, '美國加利福尼亞諾瓦托', '2234', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0000-00-00 00:00:00', '2020-01-14 13:52:10'),
(4, 'V004', '任天堂（NINTENDO）', '古川俊太郎', 88887780, '本京都府京都市', '3234', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0000-00-00 00:00:00', '2020-01-14 13:52:10'),
(5, 'V005', '索尼（SONY）', '平井一夫', 88887781, '東京都港區港南一丁目7番1號', '4234', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0000-00-00 00:00:00', '2020-01-14 13:52:10'),
(6, 'V006', '育碧（Ubisoft）', '伊夫·吉勒莫特', 88887782, '法國蒙特勒伊', '5234', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0000-00-00 00:00:00', '2020-01-14 13:52:10'),
(7, 'V007', '柯樂美（KONAMI）', 'Kagemasa Kozuki', 88887783, '日本東京都港區', '6234', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0000-00-00 00:00:00', '2020-01-14 13:52:10'),
(8, 'V008', '卡普空（CAPCOM）', '十本 憲三', 88887784, '日本大阪府大阪市', '7234', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0000-00-00 00:00:00', '2020-01-14 13:52:10'),
(9, 'V009', '史克威爾艾尼克斯（SQUARE ENIX）', '福島康博', 88887785, '日本東京都新宿區', '8234', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0000-00-00 00:00:00', '2020-01-14 13:52:10'),
(10, 'V010', '世嘉（SEGA）', '大衛·羅森', 88887786, '日本東京都品川區', '9234', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0000-00-00 00:00:00', '2020-01-14 13:52:10');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
