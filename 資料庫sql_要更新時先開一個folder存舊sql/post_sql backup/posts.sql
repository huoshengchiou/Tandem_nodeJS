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
-- 資料表結構 `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `postTitle` varchar(100) NOT NULL,
  `postContent` varchar(500) NOT NULL,
  `postImg` varchar(500) DEFAULT NULL,
  `postTag` varchar(100) DEFAULT NULL,
  `postViews` int(50) DEFAULT NULL,
  `postLikes` int(50) DEFAULT NULL,
  `postComments` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `posts`
--

INSERT INTO `posts` (`post_id`, `member_id`, `postTitle`, `postContent`, `postImg`, `postTag`, `postViews`, `postLikes`, `postComments`, `created_at`, `updated_at`) VALUES
(28, 2, '菁英級粗大狙擊槍', '菁英級粗大狙擊槍→菁英級粗大轟擊槍：類似NERF菁英系列轟天雷(詳細請GOOGLE)，使用NERF吸盤式子彈，拋物線的彈道。', '1584429679754_4.jpg', '3', NULL, NULL, NULL, '2020-03-17 15:21:19', '2020-03-21'),
(45, 17, '天氣﹑體力都可能是死亡的原因', '建議玩家在營地自己家中先把禦寒和炎夏適合的服裝都先放一套在馬匹上，起身的衣服都有三套的。生命值和體力就要夠玩家自己的努力才會提升，戰鬥﹑射箭﹑釣魚等都可以提升生命等級', '1584517374638_7.jpg', '2', NULL, NULL, NULL, '2020-03-18 15:42:54', '2020-03-21'),
(48, 4, '死鬥', '死鬥模式是除了自己以外，其他的人都是自己的敵人，因此不分你我，只要能看見的人都可以射殺，並且並無特定的重生點，因此需要邊進攻，邊堤防其他玩家偷襲。另外死亡之後不需要等待時間，可以直接買槍復活', '1584518874686_9.jpg', '4', NULL, NULL, NULL, '2020-03-18 16:07:54', '2020-03-21'),
(50, 16, '', '', '1584600780442_11.jpg', '3', NULL, NULL, NULL, '2020-03-19 14:53:00', '2020-03-21'),
(55, 26, '', '', '1584769992334_7.jpg', '3', NULL, NULL, NULL, '2020-03-21 13:53:12', '2020-03-21'),
(56, 26, '10', '10', '1584772771732_10.jpg', '4', NULL, NULL, NULL, '2020-03-21 14:39:31', '2020-03-21'),
(57, 26, '', '', '1584785443726_6.jpg', '4', NULL, NULL, NULL, '2020-03-21 18:10:43', '2020-03-21'),
(58, 26, 'mbID', 'mbID', '1584788351904_4.jpg', '2', NULL, NULL, NULL, '2020-03-21 18:59:11', '2020-03-21'),
(61, 26, 'post12', '', '1584789276298_8.jpg', '5', NULL, NULL, NULL, '2020-03-21 19:14:36', '2020-03-21'),
(62, 26, '12', '', '1584793171386_13.jpg', '6', NULL, NULL, NULL, '2020-03-21 20:19:31', '2020-03-21'),
(68, 26, '', '', '1584795912087_9.jpg', '6', NULL, NULL, NULL, '2020-03-21 21:05:12', '2020-03-21'),
(69, 26, '', '', '1584796012436_3.jpg', '6', NULL, NULL, NULL, '2020-03-21 21:06:52', '2020-03-21'),
(75, 26, '12', '12', '1584797009603_1.jpg', '3', NULL, NULL, NULL, '2020-03-21 21:23:29', '2020-03-21'),
(76, 26, '121212', '', '1584797045816_10.jpg', '2', NULL, NULL, NULL, '2020-03-21 21:24:05', '2020-03-21'),
(77, 26, '', '', '1584797268118_13.jpg', '2', NULL, NULL, NULL, '2020-03-21 21:27:48', '2020-03-21'),
(78, 26, '12', '12', '1584797451575_12.jpg', '2', NULL, NULL, NULL, '2020-03-21 21:30:51', '2020-03-21'),
(81, 26, '', '', '1584798872528_4.jpg', '3', NULL, NULL, NULL, '2020-03-21 21:54:32', '2020-03-21'),
(85, 26, '全副武裝．整裝待發', '從敵人身上掠奪戰利品、製作全新的改良裝備數千種不同武器、技能和裝備組合搭配，創造菁英特工', '1585035948792_tom11.jpg', '2', NULL, NULL, NULL, '2020-03-24 15:45:48', '2020-03-24'),
(86, 26, '《虹彩六號：圍攻行動》', '「虛空行動」裡的「黃金槍」（Golden Gun）封阻物傷害的變動將使突破木質封阻物更連貫且減少阻礙，攻擊方無人機現', '1585036401557_tom4.jpg', '4', NULL, NULL, NULL, '2020-03-24 15:53:21', '2020-03-24'),
(87, 26, '  精靈與螢火意志  ', '普通模式：適合玩過同類型遊戲的玩家，難度適中，商店物品變貴。\n困難模式：適合二周目遊玩體驗，比較難，很容易暴斃。', '1585037733023_3.jpg', '1', NULL, NULL, NULL, '2020-03-24 16:15:33', '2020-03-24');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
