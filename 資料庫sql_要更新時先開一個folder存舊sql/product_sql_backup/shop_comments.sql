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
-- 資料表結構 `shop_comments`
--

CREATE TABLE `shop_comments` (
  `id` int(11) NOT NULL COMMENT '流水號',
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '姓名',
  `mbId` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '內容',
  `rating` tinyint(1) NOT NULL COMMENT '評分',
  `parentId` int(11) NOT NULL DEFAULT 0 COMMENT '上(父)層編號',
  `itemId` int(11) NOT NULL COMMENT '商品編號',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='評論';

--
-- 傾印資料表的資料 `shop_comments`
--

INSERT INTO `shop_comments` (`id`, `name`, `mbId`, `content`, `rating`, `parentId`, `itemId`, `created_at`, `updated_at`) VALUES
(1, 'mike', '', 'Good Game!', 5, 0, 1, '2020-01-17 17:41:08', '2020-03-16 14:21:28'),
(2, '管理員', '', 'okok', 0, 1, 1, '2020-01-17 17:53:40', '2020-01-17 17:53:40'),
(3, '管理員', '', '', 0, 1, 1, '2020-01-20 22:45:26', '2020-01-20 22:45:26'),
(4, '管理員', '', 'ooo', 0, 1, 1, '2020-01-20 22:48:55', '2020-01-20 22:48:55'),
(5, 'albert', '', 'hihi', 5, 0, 1288, '2020-01-21 17:22:54', '2020-01-21 17:22:54'),
(6, '管理員', '', 'yaya', 0, 5, 1288, '2020-01-21 17:23:08', '2020-01-21 17:23:08'),
(7, 'mike', '', 'Good Game!', 5, 0, 2, '2020-01-17 17:41:08', '2020-03-16 14:21:28'),
(8, 'Judy', '', 'Good', 0, 0, 2, '0000-00-00 00:00:00', '2020-03-16 14:42:23'),
(9, 'Albert', '', 'Great', 5, 0, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'Ken', '', 'Great', 4, 0, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'Emily', '', 'Great', 3, 0, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'Jerry', '', '快出DLC', 5, 0, 2, '2020-03-16 14:57:55', '2020-03-16 14:57:55'),
(13, '阿凱', '', '測試留言', 5, 0, 2, '2020-03-16 15:08:06', '2020-03-16 15:08:06'),
(14, '阿凱', '', 'test again', 4, 0, 1, '2020-03-16 21:22:18', '2020-03-16 21:22:18'),
(15, '阿凱', '', '9999', 3, 0, 2, '2020-03-16 21:24:50', '2020-03-16 21:24:50'),
(16, '阿凱', '', 'asdf', 4, 0, 1, '2020-03-16 21:25:43', '2020-03-16 21:25:43'),
(17, '阿凱', '', 'abc', 5, 0, 37, '2020-03-21 11:37:24', '2020-03-21 11:37:24'),
(18, '曉華', '', '曉華', 1, 17, 37, '2020-03-21 11:43:40', '2020-03-21 13:06:52'),
(19, '心如', '', '心如', 4, 0, 37, '2020-03-21 11:54:26', '2020-03-21 11:54:26'),
(20, '博任', '', '博任', 2, 0, 37, '2020-03-21 11:55:54', '2020-03-21 11:55:54'),
(21, '孔德', '', '孔德', 4, 20, 37, '2020-03-21 11:57:23', '2020-03-21 12:24:42'),
(22, 'akai', '', 'akai', 2, 0, 37, '2020-03-21 11:59:51', '2020-03-21 11:59:51'),
(23, 'shin', '', 'shin', 4, 0, 37, '2020-03-21 12:01:37', '2020-03-21 12:01:37'),
(24, '', '', '', 5, 0, 37, '2020-03-21 13:09:50', '2020-03-21 13:09:50'),
(25, 'Jerry', '', '快出DLC', 5, 23, 37, '2020-03-21 14:25:47', '2020-03-21 14:25:47'),
(26, '回覆shin', '', '回覆shin測試', 2, 0, 37, '2020-03-21 14:27:19', '2020-03-21 14:27:19'),
(27, '回覆博任', '', '回覆博任', 5, 20, 37, '2020-03-21 14:39:17', '2020-03-21 14:39:17'),
(28, '老哥', '', '老哥回覆心如', 5, 19, 37, '2020-03-21 16:13:42', '2020-03-21 16:13:42'),
(29, 'LinYk', '', 'LinYk@商品1', 5, 0, 1, '2020-03-21 16:35:58', '2020-03-21 16:35:58'),
(30, 'reply LinYK', '', 'reply LinYK@商品1', 5, 29, 1, '2020-03-21 16:36:40', '2020-03-21 16:36:40'),
(31, '2020test', '', '2020test', 5, 0, 3, '2020-03-22 20:29:17', '2020-03-22 20:29:17'),
(32, ' 2020test_reply', '', ' 2020test_reply', 5, 31, 3, '2020-03-22 20:30:01', '2020-03-22 20:30:01'),
(33, '測試', '', '測試', 2, 0, 3, '2020-03-22 22:28:19', '2020-03-22 22:28:19'),
(34, '真的ㄇ', '26', '真的ㄇ', 2, 7, 2, '2020-03-24 15:40:04', '2020-03-24 15:48:55'),
(35, 'Lebron', '1', 'Lebron love overcook', 5, 0, 11, '2020-03-24 23:12:26', '2020-03-24 23:44:40'),
(36, 'Lebron2', '26', 'Lebron2', 5, 0, 11, '2020-03-24 23:20:20', '2020-03-24 23:20:20'),
(37, 'Wade', '26', 'Wade', 3, 0, 11, '2020-03-24 23:51:41', '2020-03-24 23:51:41');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `shop_comments`
--
ALTER TABLE `shop_comments`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `shop_comments`
--
ALTER TABLE `shop_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
