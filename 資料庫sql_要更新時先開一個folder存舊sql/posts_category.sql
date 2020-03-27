-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2020 年 03 月 25 日 14:34
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
-- 資料表結構 `posts_category`
--

CREATE TABLE `posts_category` (
  `pCategory_id` int(11) NOT NULL,
  `pCategory_name` varchar(1000) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `posts_category`
--

INSERT INTO `posts_category` (`pCategory_id`, `pCategory_name`, `created_at`, `updated_at`) VALUES
(1, '#休閒', '2020-03-24 11:52:13', '2020-03-24 13:30:23'),
(2, '#冒險', '2020-03-24 11:52:29', '2020-03-24 13:30:20'),
(3, '#動作', '2020-03-24 11:52:45', '2020-03-24 13:30:16'),
(4, '#策略', '2020-03-24 11:53:10', '2020-03-24 13:30:14'),
(5, '#競速', '2020-03-24 11:54:30', '2020-03-24 13:30:11'),
(6, '其他', '2020-03-24 11:54:41', '2020-03-24 13:30:08');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `posts_category`
--
ALTER TABLE `posts_category`
  ADD PRIMARY KEY (`pCategory_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `posts_category`
--
ALTER TABLE `posts_category`
  MODIFY `pCategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
