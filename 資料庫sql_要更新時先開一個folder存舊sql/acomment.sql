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
-- 資料表結構 `acomment`
--

CREATE TABLE `acomment` (
  `Id` int(10) NOT NULL COMMENT '流水號',
  `MId` char(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '會員ID',
  `aComment` char(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '留言內容',
  `aId` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '活動編號',
  `aCommentParentId` int(10) NOT NULL COMMENT '上層留言流水編號',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `acomment`
--

INSERT INTO `acomment` (`Id`, `MId`, `aComment`, `aId`, `aCommentParentId`, `created_at`, `updated_at`) VALUES
(1, '20', '推!!!很用心辦活動的主辦單位!讓大家有美好的午後:)', '20', 0, '2020-03-22 14:01:25', '2020-03-25 14:54:29'),
(2, '15', '推!!推!!', '8', 1, '2020-03-22 14:02:11', '2020-03-25 14:53:36'),
(3, '5', '好玩', '14', 0, '2020-03-22 17:39:14', '2020-03-25 14:54:04'),
(4, '3', '大家快一起來玩吧!', '10', 0, '2020-03-22 18:43:49', '2020-03-25 14:53:46'),
(5, '18', '推推推推!!', '1', 0, '2020-03-22 18:50:17', '2020-03-25 14:45:36'),
(6, '1', '下次要帶我朋友一起去!', '12', 0, '2020-03-22 19:01:50', '2020-03-25 14:53:54'),
(7, '7', '歡迎大家再來玩!!', '2', 0, '2020-03-22 19:02:46', '2020-03-25 14:45:39'),
(8, '10', '那天真太瘋狂了!', '19', 0, '2020-03-22 19:05:38', '2020-03-25 14:54:25'),
(9, '9', '好想再去一次!', '16', 0, '2020-03-22 19:09:07', '2020-03-25 07:50:04'),
(10, '6', '下次找我一起嘛!!', '3', 0, '2020-03-22 19:36:09', '2020-03-25 14:45:42'),
(11, '11', '好期待下一次開團!!', '21', 0, '2020-03-22 19:49:27', '2020-03-25 14:54:43'),
(12, '2', '推推推!!　大家一起來玩!', '11', 0, '2020-03-22 19:57:02', '2020-03-25 14:53:50'),
(13, '4', '揪多一點人呀!!!!!', '18', 0, '2020-03-22 19:58:01', '2020-03-25 14:54:21'),
(14, '8', '好的好的～', '4', 0, '2020-03-22 19:59:08', '2020-03-25 14:45:45'),
(15, '12', '走吧走吧！', '16', 0, '2020-03-22 19:59:43', '2020-03-25 07:50:04'),
(16, '16', '你們都一起去!沒揪～', '13', 0, '2020-03-22 20:00:53', '2020-03-25 14:53:57'),
(17, '13', '加一!', '16', 0, '2020-03-22 20:01:32', '2020-03-25 07:50:04'),
(18, '14', '開心', '6', 0, '2020-03-22 20:08:34', '2020-03-25 14:45:51'),
(19, '17', '我也要', '15', 0, '2020-03-23 10:58:58', '2020-03-25 14:54:08'),
(20, '18', '餘音繞樑～三日不絕於耳　XD', '17', 0, '2020-03-23 11:28:51', '2020-03-25 14:45:28'),
(21, '9', '開心!', '5', 0, '2020-03-25 07:40:07', '2020-03-25 14:45:23'),
(22, '13', '開心!', '5', 0, '2020-03-25 07:40:23', '2020-03-25 14:55:19'),
(23, '1', '開心!', '7', 0, '2020-03-25 07:40:26', '2020-03-25 14:54:59'),
(24, '10', '開心!', '5', 0, '2020-03-25 07:41:44', '2020-03-25 14:55:14'),
(25, '2', '開心', '9', 0, '2020-03-25 07:43:36', '2020-03-25 14:55:05'),
(26, '26', '下次再找我喲!', '5', 0, '2020-03-25 07:53:44', '2020-03-25 07:53:44'),
(27, '26', '揪多一點人來', '5', 0, '2020-03-25 07:54:22', '2020-03-25 07:54:22');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `acomment`
--
ALTER TABLE `acomment`
  ADD PRIMARY KEY (`Id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `acomment`
--
ALTER TABLE `acomment`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
