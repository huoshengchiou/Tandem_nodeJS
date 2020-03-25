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
-- 資料表結構 `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL COMMENT '流水號',
  `categoryName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '類別名稱',
  `categoryParentId` int(11) DEFAULT 0 COMMENT '上層編號',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時?'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='類別資料表';

--
-- 傾印資料表的資料 `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`, `categoryParentId`, `created_at`, `updated_at`) VALUES
(1, '休閒', 0, '2020-01-11 12:47:26', '2020-01-11 14:20:07'),
(2, '動作', 0, '2020-01-11 14:54:19', '2020-01-11 14:54:19'),
(3, '血腥', 0, '2020-01-11 14:54:19', '2020-01-11 14:54:19'),
(4, '冒險', 0, '2020-01-11 14:54:19', '2020-01-11 14:54:19'),
(5, '運動', 0, '2020-01-11 14:54:19', '2020-01-11 14:54:19'),
(6, '競速', 0, '2020-01-11 14:54:19', '2020-01-11 14:54:19'),
(10, '發大財', 0, '2020-01-17 11:36:20', '2020-01-21 15:40:37'),
(13, '摩天輪', 0, '2020-01-20 11:58:52', '2020-01-21 16:19:59'),
(15, '博恩夜夜秀', 0, '2020-01-20 12:07:37', '2020-01-21 16:19:17'),
(16, 'test', 0, '2020-01-21 16:53:26', '2020-01-21 16:53:26'),
(18, 'AA', 0, '2020-01-22 11:21:01', '2020-01-22 11:21:01'),
(19, 'BB', 0, '2020-01-22 14:15:04', '2020-01-22 14:15:04');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
