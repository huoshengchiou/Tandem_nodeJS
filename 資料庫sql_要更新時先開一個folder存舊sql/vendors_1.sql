-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2020 年 03 月 25 日 08:16
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `bulletin`
--

-- --------------------------------------------------------

--
-- 資料表結構 `vendors`
--

CREATE TABLE `vendors` (
  `vId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vName` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `vendors`
--

INSERT INTO `vendors` (`vId`, `vName`) VALUES
('V001', '美國藝電(ElectronicArts)'),
('V002', '動視暴雪(Activision Blizzard)'),
('V003', '2K Games'),
('V004', '任天堂(NINTENDO)'),
('V005', '索尼(SONY)'),
('V006', '育碧(Ubisoft)'),
('V007', '柯樂美(KONAMI)'),
('V008', '卡普空(CAPCOM)'),
('V009', '史克威爾艾尼克斯(SQUARE ENIX)'),
('V010', '世嘉(SEGA)');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`vId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
