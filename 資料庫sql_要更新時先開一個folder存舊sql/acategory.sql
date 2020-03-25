-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `tandem_activity`
--

-- --------------------------------------------------------

--
-- 資料表結構 `acategory`
--

CREATE TABLE `acategory` (
  `Id` int(10) NOT NULL COMMENT '流水號',
  `aCategoryId` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '類別編號',
  `aCategoryName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '類別名稱',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `acategory`
--

INSERT INTO `acategory` (`Id`, `aCategoryId`, `aCategoryName`, `created_at`, `updated_at`) VALUES
(1, 'ACG01', '輕鬆聚會', '2020-01-16 12:06:27', '2020-03-18 18:22:27'),
(2, 'ACG02', '專題講座', '2020-01-16 12:06:27', '2020-03-18 18:22:52'),
(3, 'ACG03', '技能競賽', '2020-01-16 12:06:27', '2020-03-18 18:23:07'),
(4, 'ACG04', '運動休閒', '2020-01-16 12:06:28', '2020-03-18 18:23:20'),
(5, 'ACG05', '地圖探索', '2020-01-16 12:06:28', '2020-03-18 18:23:29'),
(6, 'ACG06', '活動管理', '2020-01-16 12:06:28', '2020-03-18 18:23:29');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `acategory`
--
ALTER TABLE `acategory`
  ADD PRIMARY KEY (`Id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `acategory`
--
ALTER TABLE `acategory`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
