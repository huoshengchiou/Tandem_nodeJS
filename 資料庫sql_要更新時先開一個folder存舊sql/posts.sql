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
  `postLikes` int(50) NOT NULL DEFAULT 0,
  `postComments` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `posts`
--

INSERT INTO `posts` (`post_id`, `member_id`, `postTitle`, `postContent`, `postImg`, `postTag`, `postViews`, `postLikes`, `postComments`, `created_at`, `updated_at`) VALUES
(28, 2, '菁英級粗大狙擊槍', '菁英級粗大狙擊槍→菁英級粗大轟擊槍：類似NERF菁英系列轟天雷(詳細請GOOGLE)，使用NERF吸盤式子彈，拋物線的彈道。', '1584429679754_4.jpg', '3', NULL, 129, NULL, '2020-03-17 15:21:19', '2020-03-21'),
(45, 17, '天氣﹑體力都可能是死亡的原因', '建議玩家在營地自己家中先把禦寒和炎夏適合的服裝都先放一套在馬匹上，起身的衣服都有三套的。生命值和體力就要夠玩家自己的努力才會提升，戰鬥﹑射箭﹑釣魚等都可以提升生命等級', '1584517374638_7.jpg', '2', NULL, 98, NULL, '2020-03-18 15:42:54', '2020-03-21'),
(48, 4, '死鬥', '死鬥模式是除了自己以外，其他的人都是自己的敵人，因此不分你我，只要能看見的人都可以射殺，並且並無特定的重生點，因此需要邊進攻，邊堤防其他玩家偷襲。另外死亡之後不需要等待時間，可以直接買槍復活', '1584518874686_9.jpg', '4', NULL, 12, NULL, '2020-03-18 16:07:54', '2020-03-21'),
(57, 26, '', '', '1584785443726_6.jpg', '4', NULL, 54, NULL, '2020-03-21 18:10:43', '2020-03-21'),
(76, 26, '121212', '與大魔王的對決！到底結局是什麼呢？', '1584797045816_10.jpg', '2', NULL, 32, NULL, '2020-03-21 21:24:05', '2020-03-21'),
(85, 26, '全副武裝．整裝待發', '從敵人身上掠奪戰利品、製作全新的改良裝備數千種不同武器、技能和裝備組合搭配，創造菁英特工', '1585035948792_tom11.jpg', '2', NULL, 13, NULL, '2020-03-24 15:45:48', '2020-03-24'),
(87, 26, '  精靈與螢火意志  ', '普通模式：適合玩過同類型遊戲的玩家，難度適中，商店物品變貴。\n困難模式：適合二周目遊玩體驗，比較難，很容易暴斃。', '1585037733023_3.jpg', '1', NULL, 90, NULL, '2020-03-24 16:15:33', '2020-03-24'),
(89, 1, '工業光魔設計的星戰VR體驗', '遊戲平台之後對於遊戲的評級體系和算法可能要重新考慮一下了。\n\n', '1585201547286_10.jpg', '', NULL, 84, NULL, '2020-03-26 13:45:47', '2020-03-26'),
(90, 26, '工業光魔設計的星戰VR體驗', '體驗全場只有不到10分鐘，30秒玩的時間？我特麼下這個應用的時間都比玩的時間長！\n\n', '1585202614814_2.jpg', '6', NULL, 97, NULL, '2020-03-26 14:03:34', '2020-03-26'),
(92, 26, '工業爆炸設計VR體驗', '工業爆炸設計的星戰VR體驗 好真實！❤️希望下次還可以再次體驗 ❤️❤️', '1585202975825_5.jpg', '6', NULL, 212, NULL, '2020-03-26 14:09:35', '2020-03-26'),
(93, 26, 'the sims', 'the sims4 裡面的家也太漂亮了，想擁有！！ #只能在遊戲裡擁有', '1585233677781_01.jpg', '1', NULL, 0, NULL, '2020-03-26 22:41:17', '2020-03-26'),
(94, 1, '', '模擬市民發展的育兒技能也太讓人....還好我目前還是單身，小孩子是惡魔！', '1585233765338_06.jpg', '1', NULL, 0, NULL, '2020-03-26 22:42:45', '2020-03-26'),
(95, 24, 'The Sims4', '期待The Sims 4 Island Living ！！又要破費了！', '1585300206257_04.jpg', '1', NULL, 0, NULL, '2020-03-27 17:10:06', '2020-03-27'),
(96, 3, '大都會天際線:雨港基隆', '基隆的中小學嚴重不足，快來幫助無辜的失學兒童，不要被抓去港口當童工!', '1585300950441_1.jpg', '6', NULL, 0, NULL, '2020-03-27 17:22:30', '2020-03-27'),
(97, 5, '大眾運輸全面介紹', '速度快、運量大還有獨立的路權，和現實一樣算是陸地上最重要的大眾運輸，有許多站內轉乘的車站能夠使用。', '1585301072775_2.jpeg', '1', NULL, 0, NULL, '2020-03-27 17:24:32', '2020-03-27'),
(98, 6, '模擬遊戲 Shoppe Keep', '玩家在遊戲中可以裝備劍、弓箭來跟恐怖怪物與侵略者作戰。', '1585301871369_3.jpg', '3', NULL, 0, NULL, '2020-03-27 17:37:51', '2020-03-27'),
(99, 7, '想當初花月卡RO仙境傳說 愛上 蹲在商人前面低買高賣的日子.', '想當初花月卡RO仙境傳說 愛上 蹲在商人前面低買高賣的日子.', '1585302464088_4.jpg', '2', NULL, 0, NULL, '2020-03-27 17:47:44', '2020-03-27'),
(100, 8, 'Assemble with Care', '紀念碑谷團隊新作《Assemble with Care》舊換新是一種選擇，珍惜是美德', '1585303157816_maxresdefault.jpg', '1', NULL, 0, NULL, '2020-03-27 17:59:17', '2020-03-27'),
(101, 8, '珍惜是美德', '主角瑪麗亞繼承家業成為了古董維修工，父母希望她安穩的過生活，但她總在修理時好奇這每一件古董從何而來，又乘載著什麼樣的故事。', '1585303192175_assemble.jpg', '1', NULL, 0, NULL, '2020-03-27 17:59:52', '2020-03-27'),
(102, 10, 'assemble with care', '其他修復的東西同樣頗有歷史，舊式投影機、黑膠唱片機，這些上個世代的產物或許對現在的孩子來說就像解謎遊戲一樣困難，但作為一個成熟的大人卻能在其中找回屬於自己的記憶。', '1585303295258_191202-assemble- (4).jpeg', '1', NULL, 0, NULL, '2020-03-27 18:01:35', '2020-03-27'),
(103, 10, 'gris', '由 Nomada Studio 和 Devolver Digital 聯合開發的知名唯美風奇幻手遊《Gris》，近日宣佈遊戲將在8月22日於 iOS 平台搶先上架。', '1585303443388_gris2.jpeg', '1', NULL, 0, NULL, '2020-03-27 18:04:03', '2020-03-27'),
(104, 11, 'Gris', '《Gris》是一款獨立製作手遊，遊戲描述一位名為「Gris」的女孩獨自一人在充滿驚奇與華麗風格的世界旅行。你將藉由不同的拼圖，幫助迷路的「Gris」前往正確的道路。圖中的每一處場景與畫面都值得你細細品味！', '1585303489137_GRIS-o.jpg', '1', NULL, 0, NULL, '2020-03-27 18:04:49', '2020-03-27'),
(105, 11, '唯美風手遊《Gris》', '唯美風手遊《Gris》8月22日 iOS正式上線！超級期待！！', '1585303570288_gris3.jpeg', '1', NULL, 0, NULL, '2020-03-27 18:06:10', '2020-03-27'),
(106, 12, '什麼', '天氣太炎熱了？來瓶可樂配打火機？這是殺。？', '1585303742782_10.jpg', '6', NULL, 0, NULL, '2020-03-27 18:09:02', '2020-03-27'),
(107, 13, 'cs', '用了這麼漂亮的槍還是被Terrorist獲勝了！也太可惡了，白費了我漂亮的槍', '1585303923483_maxresdefault.jpg', '3', NULL, 0, NULL, '2020-03-27 18:12:03', '2020-03-27'),
(108, 14, '《歧路旅人》', '《歧路旅人》是由Square Enix, 以及 ACQUIRE Corp 開發的角色扮演遊戲，遊戲畫面融合復古像素角色與 3D CG 風格場景的「HD-2D」呈現嶄新的視覺效果，玩家將扮演八種不同角色，橫越奧魯斯特拉大陸。完成各自的旅程目標。', '1585314763570_octopathtraveler_1.png', '4', NULL, 0, NULL, '2020-03-27 21:12:43', '2020-03-27'),
(110, 26, '《刀劍神域 彼岸遊境（SWORD ART ONLINE Alicization Lycoris）》', '遊戲劇情將從動畫前半部「Alicization 篇」展開，一路進行到第 24 話與亞多米尼‧史特蕾達的一戰，之後會進入有別於動畫的原創分歧路線「Alicization Lycoris 篇」。', '1585646899703_sao-alicization-lycoris-kirito-eugeo.jpg', '3', NULL, 0, NULL, '2020-03-31 17:28:19', '2020-03-31');

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
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
