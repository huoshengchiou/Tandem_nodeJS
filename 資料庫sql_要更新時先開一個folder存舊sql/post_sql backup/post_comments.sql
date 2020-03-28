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
-- 資料表結構 `post_comments`
--

CREATE TABLE `post_comments` (
  `postComment_id` int(11) NOT NULL,
  `postComment_content` varchar(1000) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `post_comments`
--

INSERT INTO `post_comments` (`postComment_id`, `postComment_content`, `member_id`, `post_id`, `updated_at`, `created_at`) VALUES
(2, '要你命1500：額外的填裝動畫，過熱值固定為1!!\r\n', 21, 29, '2020-03-22 11:00:52', '2020-03-22 11:00:52'),
(5, '精神殺手射出子彈會排列成圓形，模仿音響等化器效果，有效距離短。', 43, 26, '2020-03-22 14:41:55', '2020-03-22 14:41:55'),
(6, '要你命1500：額外的填裝動畫，過熱值固定為1!!', 29, 26, '2020-03-22 14:45:31', '2020-03-22 14:45:31'),
(7, '要你命1500：額外的填裝動畫，過熱值固定為1!!', 29, 26, '2020-03-22 14:48:30', '2020-03-22 14:48:30'),
(8, ' const sql = `SELECT \\`post_comments\\`.\\`postComment_content\\`,\\`post_comments\\`.\\`updated_at\\`,\\`post_comments\\`.\\`postComment_id\\`,\\`post_comments\\`.\\`post_id\\`, \\`mb_info\\`.\\`mbId\\`,\\`mb_info\\`.\\`mbNick\\`,\\`mb_info\\`.\\`mbAva\\`      FROM \\`post_comments\\`      INNER JOIN \\`mb_info\\`      ON \\`post_comments\\`.\\`member_id\\`=\\`mb_info\\`.\\`mbId\\` `', 29, 26, '2020-03-22 15:02:38', '2020-03-22 15:02:38'),
(9, '你好', 29, 26, '2020-03-22 15:04:00', '2020-03-22 15:04:00'),
(10, '你好', 30, 26, '2020-03-22 15:46:18', '2020-03-22 15:06:50'),
(16, '較大的濺射半徑。看起來很好玩', 26, 39, '2020-03-22 15:28:21', '2020-03-22 15:28:21'),
(20, '加油！！⛽️不要讓反射子彈給攻擊者！', 26, 30, '2020-03-22 23:42:18', '2020-03-22 23:42:18'),
(21, '模仿音響等化器效果', 26, 43, '2020-03-23 13:38:23', '2020-03-23 13:35:49'),
(22, '每次發射消耗2發彈藥但會射出3顆子彈。', 26, 32, '2020-03-23 14:44:01', '2020-03-23 14:44:01'),
(25, '另外死亡之後不需要等待時間，可以直接買槍復活', 26, 48, '2020-03-23 22:07:52', '2020-03-23 22:07:52'),
(27, '從敵人身上掠奪戰利品', 26, 85, '2020-03-24 19:18:29', '2020-03-24 19:18:29'),
(31, '「虛空行動」裡的「黃金槍」', 26, 86, '2020-03-24 21:16:59', '2020-03-24 21:16:59'),
(33, '？？？？', 26, 50, '2020-03-24 21:33:13', '2020-03-24 21:33:13'),
(36, '你好', 26, 75, '2020-03-24 22:05:40', '2020-03-24 22:05:40');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`postComment_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `postComment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
