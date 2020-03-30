-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.4.10-MariaDB
-- PHP 版本： 7.3.12

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
-- 資料表結構 `article_comments`
--

CREATE TABLE `article_comments` (
  `id` int(10) NOT NULL COMMENT '留言流水號',
  `mbId` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '會員ID',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '留言內容',
  `articleId` int(10) NOT NULL COMMENT '文章ID',
  `parentId` int(10) NOT NULL COMMENT '父層編號',
  `created_at` date NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` date NOT NULL DEFAULT current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `article_comments`
--

INSERT INTO `article_comments` (`id`, `mbId`, `content`, `articleId`, `parentId`, `created_at`, `updated_at`) VALUES
(1, '1', '感謝大大無私的分享~', 1, 0, '2020-03-29', '2020-03-29'),
(2, '2', '感謝大大無私的整理~', 1, 0, '2020-03-29', '2020-03-29'),
(3, '1', '', 0, 0, '2020-03-29', '2020-03-29'),
(4, '1', 'test', 0, 0, '2020-03-29', '2020-03-29'),
(5, '1', 'test', 1, 0, '2020-03-29', '2020-03-29'),
(6, '1', 'test2', 1, 0, '2020-03-29', '2020-03-29'),
(7, '1', '頭香', 98, 0, '2020-03-30', '2020-03-30'),
(8, '1', '', 98, 0, '2020-03-30', '2020-03-30'),
(9, '1', 'test', 98, 0, '2020-03-30', '2020-03-30'),
(10, '1', 'test3', 1, 0, '2020-03-30', '2020-03-30'),
(11, '1', 'test4', 1, 0, '2020-03-30', '2020-03-30'),
(12, '1', 'test5', 1, 0, '2020-03-30', '2020-03-30'),
(13, '1', 'test6', 1, 0, '2020-03-30', '2020-03-30'),
(14, '1', '123', 1, 0, '2020-03-30', '2020-03-30'),
(15, '1', '456', 1, 0, '2020-03-30', '2020-03-30'),
(16, '1', '999', 1, 0, '2020-03-30', '2020-03-30'),
(17, '1', '00', 1, 0, '2020-03-30', '2020-03-30'),
(18, '1', '666', 1, 0, '2020-03-30', '2020-03-30'),
(19, '1', '555', 1, 0, '2020-03-30', '2020-03-30'),
(20, '1', 'test', 105, 0, '2020-03-30', '2020-03-30'),
(21, '1', 'test', 105, 0, '2020-03-30', '2020-03-30'),
(22, '1', 'test', 107, 0, '2020-03-30', '2020-03-30'),
(23, '1', 'test', 107, 0, '2020-03-30', '2020-03-30'),
(24, '1', 'test', 107, 0, '2020-03-30', '2020-03-30'),
(25, '1', '', 107, 0, '2020-03-30', '2020-03-30'),
(26, '1', '', 107, 0, '2020-03-30', '2020-03-30'),
(27, '1', 'test1', 107, 0, '2020-03-30', '2020-03-30'),
(28, '1', 'test2', 107, 0, '2020-03-30', '2020-03-30');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `article_comments`
--
ALTER TABLE `article_comments`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `article_comments`
--
ALTER TABLE `article_comments`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '留言流水號', AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
