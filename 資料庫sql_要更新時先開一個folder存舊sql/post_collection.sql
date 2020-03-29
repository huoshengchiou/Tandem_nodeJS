-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2020 年 03 月 29 日 05:24
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `tandem`
--

-- --------------------------------------------------------

--
-- 資料表結構 `post_collection`
--

CREATE TABLE `post_collection` (
  `postCollection_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `post_collection`
--

INSERT INTO `post_collection` (`postCollection_id`, `member_id`, `post_id`, `created_at`, `updated_at`) VALUES
(1, 5, 93, '2020-03-29 00:04:13', '2020-03-29 00:04:13'),
(2, 5, 101, '2020-03-29 00:41:29', '2020-03-29 00:41:29'),
(3, 4, 107, '2020-03-29 10:52:24', '2020-03-29 10:52:24'),
(4, 24, 102, '2020-03-29 11:22:52', '2020-03-29 11:22:52');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `post_collection`
--
ALTER TABLE `post_collection`
  ADD PRIMARY KEY (`postCollection_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `post_collection`
--
ALTER TABLE `post_collection`
  MODIFY `postCollection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
