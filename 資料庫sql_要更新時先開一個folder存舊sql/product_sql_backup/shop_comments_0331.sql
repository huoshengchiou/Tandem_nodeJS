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
-- 資料庫： `tandem`
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
(49, '迷茫的家裡蹲', '1', '我只打兩季的GM和兩季的雙GM，在此提出個人的看法。\r\n這遊戲開局給予新手的資源相當多，可以讓新手快速適應環境，這點做得不錯。\r\n但是實際上環境相當不友善，現環境T1、T2牌組與T3以下的牌組強度差距巨大，(環境分為指定與無限制，差別在可使用牌庫量)指定還算可以接受，無限制大致上已經消失一半職業和7成以上牌組，難以感受到卡牌遊戲的多樣性，從者強度過度膨脹導致對局時劣勢方壓力極大，在隨時可能被OTK的環境，主戰者血少於15點沒守護基本上跟死了沒兩樣，甚至有些牌組你根本拿他沒辦法，遊戲體驗極差。\r\n在平衡方面做得很差，明顯過強的單卡不Nerf，在下版用更強的卡做暴力平衡，然後無視舊卡，等到新卡真的強到使環境崩壞時才直接砍死(敵對心最大的那一兩張而已)，導致現在新卡沒有兩到三個的超模能力沒人會用的窘境，這個牌組爆走情況也發生不只一到兩次，已經成為週期性循環(大概半年一次)，這對於玩家對卡牌遊戲的安全感是很嚴重的打擊。\r\n當抽卡遊戲進來看看卡面聽聽語音是可以，如果新手想入坑，我誠心建議你不要。', 2, 0, 1, '2020-03-29 17:37:18', '2020-03-29 17:55:16'),
(51, '迷茫的家裡蹲', '2', 'hihi', 3, 0, 1, '2020-03-29 17:51:44', '2020-03-29 17:51:44'),
(52, '逃避就是勝利', '3', '玩了幾天\r\n\r\n活動送1張SSR 主線SSR補償卷1張 10連抽1SSR\r\n\r\n目前4隻角色3個SSR泳衣\r\n\r\n感覺不課金角色依然可以順利成長，酋長例外!', 5, 0, 2, '2020-03-29 18:01:25', '2020-03-29 18:01:25'),
(53, '惡魔少女', '4', '強韌 無敵 最強\r\n粉碎 玉碎 大喝采', 5, 0, 3, '2020-03-29 18:05:46', '2020-03-29 18:05:46');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
