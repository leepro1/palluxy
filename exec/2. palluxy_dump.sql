-- MySQL dump 10.13  Distrib 9.0.1, for Linux (x86_64)
--
-- Host: localhost    Database: palluxy_db
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `album_id` bigint NOT NULL AUTO_INCREMENT,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`album_id`),
  UNIQUE KEY `UKjo0a04si37gi4gu09hji6ktwx` (`room_id`),
  CONSTRAINT `FKc06tmn6h5vldrebv59ss84lyq` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `report_count` int NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `guestbook_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKtnprub5pcbxuxt3j051702mk1` (`guestbook_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKtnprub5pcbxuxt3j051702mk1` FOREIGN KEY (`guestbook_id`) REFERENCES `guestbook` (`guestbook_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'두부야 안녕!!','2024-08-14 14:26:03.597427',0,0,'2024-08-14 14:26:03.597445',1,3),(2,'상근이 귀여워','2024-08-14 15:56:01.566491',0,0,'2024-08-14 15:56:01.566510',5,2),(3,'상근아 오랜만이다','2024-08-14 15:56:04.519443',0,0,'2024-08-14 15:56:04.519460',5,3),(4,'희주는 더 귀여워','2024-08-14 15:56:13.078563',1,0,'2024-08-14 15:56:30.327800',5,2),(5,'상근아~ 랜선 이모야. 상근이 덕분에 즐거운 시간이 참 많았어 팰럭시에선 잘 지내야해~!','2024-08-14 15:56:17.492295',0,0,'2024-08-14 15:56:17.492313',5,9),(6,'상근아 안녕! 우리 토토랑 친구하자','2024-08-15 14:15:33.210471',0,0,'2024-08-15 14:15:33.210490',5,3);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `approve_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end_time` datetime(6) DEFAULT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `max_capacity` int NOT NULL,
  `remaining_capacity` int NOT NULL,
  `start_time` datetime(6) DEFAULT NULL,
  `status` enum('ACCEPT','CANCEL','REJECT','WAIT') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `leader_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_group_status` (`status`),
  KEY `idx_group_status_capacity_starttime` (`status`,`remaining_capacity`,`start_time`),
  KEY `FK6lapgv3qhf548djp1pmrw4gfx` (`leader_id`),
  CONSTRAINT `FK6lapgv3qhf548djp1pmrw4gfx` FOREIGN KEY (`leader_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,'2024-08-14 14:17:53.919288','93F3WJ','같이 모임을 가져보아요','2024-08-15 16:00:00.000000','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/groups/%2F02f12455-ef96-4dd3-849e-73dafa9c1c66_F6862926-AFE7-4EDA-83FB-EA78C156F890.jpg',3,0,'2024-08-15 15:00:00.000000','ACCEPT','두부집사입니다','2024-08-14 16:26:23.184808',2),(2,'2024-08-14 14:18:43.188700','7XXWQX','반갑습니다 치유모임에서 같이 소통하고 싶습니다','2024-08-16 21:30:00.000000',NULL,4,2,'2024-08-16 21:00:00.000000','ACCEPT','안녕하세요','2024-08-14 14:38:12.708727',2),(3,'2024-08-14 14:29:19.541563','9Z6S20','같이 이야기 나눠요!','2024-08-14 23:00:00.000000','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/groups/%2F8159fdfa-af3b-4129-866e-06f2ddbad5cb_IMG_4951.JPG',4,2,'2024-08-14 15:30:00.000000','ACCEPT','무지개모임','2024-08-14 14:38:15.177435',3),(4,'2024-08-14 14:33:12.305130','S6T7X4','화상모임 가지실분 구합니다','2024-08-14 19:00:00.000000','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/groups/%2F1991dc2c-5a9c-4882-a938-a8b1561347e4_rn_image_picker_lib_temp_02333e1d-96e9-49ab-a882-33be05339927.jpg',4,2,'2024-08-14 18:00:00.000000','ACCEPT','모임가지실분~','2024-08-14 14:38:19.909984',4),(5,'2024-08-14 15:46:05.915320','37OQFY','4시에 모여주세요','2024-08-14 18:00:00.000000','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/groups/%2Fbc7462ce-c120-495d-8e2e-953a316c00e6_images%20%281%29.jfif',4,0,'2024-08-14 16:00:00.000000','ACCEPT','자조모임 가지실 분들을 모집합니다.','2024-08-14 15:53:43.374252',2),(6,'2024-08-15 12:57:31.305798','56L831','함께 얘기 나눠요','2024-08-15 23:30:00.000000',NULL,4,3,'2024-08-15 13:00:00.000000','ACCEPT','무지개모임 2회차','2024-08-15 12:58:43.470093',3),(7,'2024-08-15 14:36:01.424839','OV9ZUY','모여라','2024-08-15 15:00:00.000000',NULL,4,3,'2024-08-15 14:40:00.000000','ACCEPT','소통하고 싶으신 분들 모이세요','2024-08-15 14:36:15.526457',2);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_history`
--

DROP TABLE IF EXISTS `group_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `action` enum('CLOSE','CREATE','EXPEL','JOIN') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7g67asv9c8348dmq1mcb2raud` (`group_id`),
  KEY `FK5gs2o67hk15e8l17i6nxfhhwl` (`user_id`),
  CONSTRAINT `FK5gs2o67hk15e8l17i6nxfhhwl` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK7g67asv9c8348dmq1mcb2raud` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_history`
--

LOCK TABLES `group_history` WRITE;
/*!40000 ALTER TABLE `group_history` DISABLE KEYS */;
INSERT INTO `group_history` VALUES (1,'2024-08-14 15:45:25.711132','CREATE',3,3),(2,'2024-08-14 15:45:25.782408','JOIN',3,3),(3,'2024-08-14 16:00:57.165250','CREATE',5,2),(4,'2024-08-14 16:00:57.203769','JOIN',5,2),(5,'2024-08-14 16:02:10.490401','JOIN',5,6),(6,'2024-08-14 16:03:01.206503','JOIN',5,6),(7,'2024-08-14 16:03:21.324521','JOIN',5,3),(8,'2024-08-14 16:03:48.934686','CREATE',5,2),(9,'2024-08-14 16:03:49.033461','JOIN',5,2),(10,'2024-08-14 16:04:02.056274','CREATE',5,2),(11,'2024-08-14 16:04:02.163851','JOIN',5,2),(12,'2024-08-14 16:06:07.823394','JOIN',5,8),(13,'2024-08-14 16:07:19.469213','JOIN',5,8),(14,'2024-08-14 16:07:25.265263','CREATE',5,2),(15,'2024-08-14 16:07:25.306951','JOIN',5,2),(16,'2024-08-14 16:13:01.849798','CREATE',5,2),(17,'2024-08-14 16:13:01.890261','JOIN',5,2),(18,'2024-08-14 16:14:23.212495','CREATE',5,2),(19,'2024-08-14 16:14:23.332649','JOIN',5,2),(20,'2024-08-14 16:16:06.717890','JOIN',5,3),(21,'2024-08-15 13:06:33.910627','CREATE',6,3),(22,'2024-08-15 13:06:33.974934','JOIN',6,3),(23,'2024-08-15 14:15:51.810632','CREATE',6,3),(24,'2024-08-15 14:15:51.852965','JOIN',6,3),(25,'2024-08-15 14:22:27.368117','CREATE',6,3),(26,'2024-08-15 14:22:27.406067','JOIN',6,3),(27,'2024-08-15 14:40:28.981042','CREATE',7,2),(28,'2024-08-15 14:40:29.020087','JOIN',7,2);
/*!40000 ALTER TABLE `group_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_user`
--

DROP TABLE IF EXISTS `group_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_banned` bit(1) NOT NULL,
  `is_leader` bit(1) NOT NULL,
  `group_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_group_user_group_id_and_user_id` (`group_id`,`user_id`),
  KEY `FK6u7jb50qa69gr3505uttxm86x` (`user_id`),
  CONSTRAINT `FK6u7jb50qa69gr3505uttxm86x` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKld0e1sapqknm63w14uy3m4jba` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_user`
--

LOCK TABLES `group_user` WRITE;
/*!40000 ALTER TABLE `group_user` DISABLE KEYS */;
INSERT INTO `group_user` VALUES (1,'2024-08-14 14:17:53.945122',_binary '\0',_binary '',1,2),(2,'2024-08-14 14:18:43.205513',_binary '\0',_binary '',2,2),(3,'2024-08-14 14:26:26.053178',_binary '\0',_binary '\0',1,3),(4,'2024-08-14 14:29:19.552575',_binary '\0',_binary '',3,3),(5,'2024-08-14 14:33:12.317152',_binary '\0',_binary '',4,4),(6,'2024-08-14 14:38:12.693170',_binary '\0',_binary '\0',2,1),(7,'2024-08-14 14:38:15.165395',_binary '\0',_binary '\0',3,1),(8,'2024-08-14 14:38:19.891571',_binary '\0',_binary '\0',4,1),(9,'2024-08-14 15:46:05.936643',_binary '\0',_binary '',5,2),(10,'2024-08-14 15:48:23.106069',_binary '\0',_binary '\0',5,3),(11,'2024-08-14 15:52:48.899041',_binary '\0',_binary '\0',5,8),(12,'2024-08-14 15:53:43.366044',_binary '\0',_binary '\0',5,6),(13,'2024-08-14 16:26:23.175563',_binary '\0',_binary '\0',1,7),(14,'2024-08-15 12:57:31.349704',_binary '\0',_binary '',6,3),(15,'2024-08-15 14:36:01.441978',_binary '\0',_binary '',7,2);
/*!40000 ALTER TABLE `group_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_book_report`
--

DROP TABLE IF EXISTS `guest_book_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_book_report` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `comment_id` bigint DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guest_bookid` bigint DEFAULT NULL,
  `report_from` bigint DEFAULT NULL,
  `report_to` bigint DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `guest_book_report_chk_1` CHECK ((`status` between 0 and 3))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_book_report`
--

LOCK TABLES `guest_book_report` WRITE;
/*!40000 ALTER TABLE `guest_book_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `guest_book_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guestbook`
--

DROP TABLE IF EXISTS `guestbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guestbook` (
  `guestbook_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`guestbook_id`),
  UNIQUE KEY `UK23ysfk8o3p2w20csy58uxbdar` (`room_id`),
  KEY `FKt4lpkx8f25rwpkrg10gmus10a` (`user_id`),
  CONSTRAINT `FK59ly0p8vpdhytemumvtopo7og` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `FKt4lpkx8f25rwpkrg10gmus10a` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guestbook`
--

LOCK TABLES `guestbook` WRITE;
/*!40000 ALTER TABLE `guestbook` DISABLE KEYS */;
INSERT INTO `guestbook` VALUES (1,2,1),(2,3,2),(3,4,3),(4,6,4),(5,7,5),(6,9,6),(7,11,7),(8,5,8);
/*!40000 ALTER TABLE `guestbook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `angle` double NOT NULL,
  `image_index` int NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `album_id` bigint DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FKklgd5pxhpuh3nwik115myord` (`album_id`),
  CONSTRAINT `FKklgd5pxhpuh3nwik115myord` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,1.5708,0,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/albums/1/94195797-73b3-4ae6-8ea2-9a9aed7ccef3_F6862926-AFE7-4EDA-83FB-EA78C156F890.jpg',1),(2,3.1416,0,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/albums/2/0c006f74-458b-42c4-bc96-521186240971_IMG_3459.JPG',2),(3,0,1,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/albums/2/f59d6f90-d583-4060-83cb-cb35a667b8df_IMG_4951.JPG',2),(4,1.5708,0,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/albums/4/34a4b2c9-21e4-4efa-8b36-beb443e83ba2_tree.jfif',4),(5,1.5708,1,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/albums/4/1f0638cb-63ff-4075-b8cc-9a132e6eb63d_redred.jfif',4),(6,1.5708,0,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/albums/5/8b8e519a-850a-4854-bc59-30cc2e795378_%EC%83%81%EA%B7%BC1.jpg',5),(7,7.854,1,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/albums/5/e64efe8f-d1a7-49f3-bf82-a98be27837c4_%EC%83%81%EA%B7%BC2.jpg',5),(8,1.5708,0,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/albums/6/72a8ac8e-869e-436c-91cc-64dc3797bc31_won-bon_061657522578.jpg',6),(9,1.5708,0,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/albums/7/d923c72b-599a-4090-a512-d234dc2b2ff6_blackcat.jpg',7);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letter`
--

DROP TABLE IF EXISTS `letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letter` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `opened_at` datetime(6) DEFAULT NULL,
  `pet_id` bigint DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `writer` enum('PET','USER') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_letter_room_id_and_opened_at` (`room_id`,`opened_at`),
  CONSTRAINT `FK4d0o2921yt17q21golr1gd2y7` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letter`
--

LOCK TABLES `letter` WRITE;
/*!40000 ALTER TABLE `letter` DISABLE KEYS */;
INSERT INTO `letter` VALUES (1,'2024-08-14 14:13:04.690462','사랑하는 언니에게 보내는 첫 편지\n안녕하세요, 두부예요. 팰럭시에 무사히 도착해서 이렇게 첫 편지를 보내요.\n팰럭시는 지구에서 떠나온 친구들이 새로운 여정을 시작하는 아름답고 평화로운 곳이에요.\n푸른 초원과 반짝이는 별들로 가득한 이곳에서 매일이 즐거워요. 새로운 친구들도 많이 사귀었어요.\n\n언니에게 편지를 쓰려고 열심히 글자도 배우고 있어요.\n아직은 한글이 조금 어려워서 편지를 보내주셔도 답장을 쓰는데 시간이 걸릴 수는 있어요. 그래도 기다려 주실거죠?\n\n가끔 저를 그리워하실 거라는 걸 알아요.\n하지만 걱정하지 마세요. 저는 이제 아프지 않고 편안해요.\n그리고 언니의 사랑 덕분에 이렇게 행복한 곳에 올 수 있었어요.\n우리가 함께 놀았던 시간들, 저를 안아주시던 따뜻함, 그 모든 것이 제게는 가장 소중한 보물이에요.\n언젠가 우리가 다시 만날 때까지, 저는 이곳 팰럭시에서 밝게 빛나는 별이 되어 있을게요. 항상 곁에서 지켜볼게요.\n\n언니가 너무 보고싶은 두부가\n','2024-08-14 14:13:04.688901',1,'두부의 첫번째 편지','PET',1),(2,'2024-08-14 14:17:40.922351','사랑하는 아빠에게 보내는 첫 편지\n안녕하세요, 토토예요. 팰럭시에 무사히 도착해서 이렇게 첫 편지를 보내요.\n팰럭시는 지구에서 떠나온 친구들이 새로운 여정을 시작하는 아름답고 평화로운 곳이에요.\n푸른 초원과 반짝이는 별들로 가득한 이곳에서 매일이 즐거워요. 새로운 친구들도 많이 사귀었어요.\n\n아빠에게 편지를 쓰려고 열심히 글자도 배우고 있어요.\n아직은 한글이 조금 어려워서 편지를 보내주셔도 답장을 쓰는데 시간이 걸릴 수는 있어요. 그래도 기다려 주실거죠?\n\n가끔 저를 그리워하실 거라는 걸 알아요.\n하지만 걱정하지 마세요. 저는 이제 아프지 않고 편안해요.\n그리고 아빠의 사랑 덕분에 이렇게 행복한 곳에 올 수 있었어요.\n우리가 함께 놀았던 시간들, 저를 안아주시던 따뜻함, 그 모든 것이 제게는 가장 소중한 보물이에요.\n언젠가 우리가 다시 만날 때까지, 저는 이곳 팰럭시에서 밝게 빛나는 별이 되어 있을게요. 항상 곁에서 지켜볼게요.\n\n아빠가 너무 보고싶은 토토가\n','2024-08-14 14:17:40.921950',2,'토토의 첫번째 편지','PET',2),(3,'2024-08-14 14:24:33.066902','거기서 잘 지낸다니 다행이다.\n거기서의 삶은 어떠니','2024-08-14 14:24:33.066185',2,'안녕!!','USER',2),(4,'2024-08-14 14:24:49.988071','사랑하는 아빠에게,\n\n아빠의 편지를 받아 너무 기뻐요! 제가 잘 지내고 있다는 걸 아셔서 다행이에요.\n\n팰럭시에서의 삶은 정말 놀랍고 신기해요. 여기엔 제가 좋아하는 것들이 가득해요. 높은 나무들이 있어서 마음껏 오르내릴 수 있고, 따뜻한 햇볕이 비치는 창가에서 낮잠을 자기도 해요. 가끔은 다른 고양이 친구들과 놀기도 하지만, 혼자만의 시간을 보내는 것도 좋아해요.\n\n제 호기심 많은 성격 때문인지, 매일 팰럭시의 새로운 곳을 탐험하고 있어요. 어제는 반짝이는 별들로 가득한 호수를 발견했는데, 정말 아름다웠어요. 아빠와 함께 볼 수 있다면 얼마나 좋을까 생각했어요.\n\n그리고 아빠, 걱정하지 마세요. 저는 여기서 충분히 사랑받고 있어요. 하지만 아무도 아빠만큼 저를 사랑해줄 순 없어요. 아빠와 함께했던 시간들, 아빠가 주셨던 사랑, 그 모든 게 제 가슴 속에 따뜻하게 남아있어요.\n\n아빠도 행복하게 지내고 계시죠? 저는 여기서 아빠를 위해 매일 밤 별빛 기도를 해요. 아빠의 행복이 제 행복이에요.\n\n언제나 아빠를 사랑하는,\n토토 올림','2024-08-14 14:24:49.985613',2,'편지가 도착했어요','PET',2),(5,'2024-08-14 14:29:03.122253','사랑하는 언니에게 보내는 첫 편지\n안녕하세요, 뽀삐예요. 팰럭시에 무사히 도착해서 이렇게 첫 편지를 보내요.\n팰럭시는 지구에서 떠나온 친구들이 새로운 여정을 시작하는 아름답고 평화로운 곳이에요.\n푸른 초원과 반짝이는 별들로 가득한 이곳에서 매일이 즐거워요. 새로운 친구들도 많이 사귀었어요.\n\n언니에게 편지를 쓰려고 열심히 글자도 배우고 있어요.\n아직은 한글이 조금 어려워서 편지를 보내주셔도 답장을 쓰는데 시간이 걸릴 수는 있어요. 그래도 기다려 주실거죠?\n\n가끔 저를 그리워하실 거라는 걸 알아요.\n하지만 걱정하지 마세요. 저는 이제 아프지 않고 편안해요.\n그리고 언니의 사랑 덕분에 이렇게 행복한 곳에 올 수 있었어요.\n우리가 함께 놀았던 시간들, 저를 안아주시던 따뜻함, 그 모든 것이 제게는 가장 소중한 보물이에요.\n언젠가 우리가 다시 만날 때까지, 저는 이곳 팰럭시에서 밝게 빛나는 별이 되어 있을게요. 항상 곁에서 지켜볼게요.\n\n언니가 너무 보고싶은 뽀삐가\n','2024-08-14 14:29:03.121858',3,'뽀삐의 첫번째 편지','PET',3),(6,'2024-08-14 15:28:04.061060','사랑하는 쿠쿠에게 보내는 첫 편지\n안녕하세요, 코코예요. 팰럭시에 무사히 도착해서 이렇게 첫 편지를 보내요.\n팰럭시는 지구에서 떠나온 친구들이 새로운 여정을 시작하는 아름답고 평화로운 곳이에요.\n푸른 초원과 반짝이는 별들로 가득한 이곳에서 매일이 즐거워요. 새로운 친구들도 많이 사귀었어요.\n\n쿠쿠에게 편지를 쓰려고 열심히 글자도 배우고 있어요.\n아직은 한글이 조금 어려워서 편지를 보내주셔도 답장을 쓰는데 시간이 걸릴 수는 있어요. 그래도 기다려 주실거죠?\n\n가끔 저를 그리워하실 거라는 걸 알아요.\n하지만 걱정하지 마세요. 저는 이제 아프지 않고 편안해요.\n그리고 쿠쿠의 사랑 덕분에 이렇게 행복한 곳에 올 수 있었어요.\n우리가 함께 놀았던 시간들, 저를 안아주시던 따뜻함, 그 모든 것이 제게는 가장 소중한 보물이에요.\n언젠가 우리가 다시 만날 때까지, 저는 이곳 팰럭시에서 밝게 빛나는 별이 되어 있을게요. 항상 곁에서 지켜볼게요.\n\n쿠쿠가 너무 보고싶은 코코가\n','2024-08-14 15:28:04.060759',4,'코코의 첫번째 편지','PET',4),(7,'2024-08-14 15:52:12.576533','사랑하는 아빠에게 보내는 첫 편지\n안녕하세요, 상근이예요. 팰럭시에 무사히 도착해서 이렇게 첫 편지를 보내요.\n팰럭시는 지구에서 떠나온 친구들이 새로운 여정을 시작하는 아름답고 평화로운 곳이에요.\n푸른 초원과 반짝이는 별들로 가득한 이곳에서 매일이 즐거워요. 새로운 친구들도 많이 사귀었어요.\n\n아빠에게 편지를 쓰려고 열심히 글자도 배우고 있어요.\n아직은 한글이 조금 어려워서 편지를 보내주셔도 답장을 쓰는데 시간이 걸릴 수는 있어요. 그래도 기다려 주실거죠?\n\n가끔 저를 그리워하실 거라는 걸 알아요.\n하지만 걱정하지 마세요. 저는 이제 아프지 않고 편안해요.\n그리고 아빠의 사랑 덕분에 이렇게 행복한 곳에 올 수 있었어요.\n우리가 함께 놀았던 시간들, 저를 안아주시던 따뜻함, 그 모든 것이 제게는 가장 소중한 보물이에요.\n언젠가 우리가 다시 만날 때까지, 저는 이곳 팰럭시에서 밝게 빛나는 별이 되어 있을게요. 항상 곁에서 지켜볼게요.\n\n아빠가 너무 보고싶은 상근이가\n','2024-08-14 15:52:12.574423',5,'상근이의 첫번째 편지','PET',5),(8,'2024-08-14 15:59:15.159160','사랑하는 누나에게 보내는 첫 편지\n안녕하세요, 설기예요. 팰럭시에 무사히 도착해서 이렇게 첫 편지를 보내요.\n팰럭시는 지구에서 떠나온 친구들이 새로운 여정을 시작하는 아름답고 평화로운 곳이에요.\n푸른 초원과 반짝이는 별들로 가득한 이곳에서 매일이 즐거워요. 새로운 친구들도 많이 사귀었어요.\n\n누나에게 편지를 쓰려고 열심히 글자도 배우고 있어요.\n아직은 한글이 조금 어려워서 편지를 보내주셔도 답장을 쓰는데 시간이 걸릴 수는 있어요. 그래도 기다려 주실거죠?\n\n가끔 저를 그리워하실 거라는 걸 알아요.\n하지만 걱정하지 마세요. 저는 이제 아프지 않고 편안해요.\n그리고 누나의 사랑 덕분에 이렇게 행복한 곳에 올 수 있었어요.\n우리가 함께 놀았던 시간들, 저를 안아주시던 따뜻함, 그 모든 것이 제게는 가장 소중한 보물이에요.\n언젠가 우리가 다시 만날 때까지, 저는 이곳 팰럭시에서 밝게 빛나는 별이 되어 있을게요. 항상 곁에서 지켜볼게요.\n\n누나가 너무 보고싶은 설기가\n','2024-08-14 15:59:15.158726',6,'설기의 첫번째 편지','PET',6),(9,'2024-08-15 14:14:41.285529','토토야 거기서는 잘 지내니?\n\n너한테 편지쓰는게 얼마나 오랜만인지 모르겠다.','2024-08-15 14:14:41.283609',2,'안녕 토토야','USER',2),(10,'2024-08-15 14:14:52.617498','사랑하는 아빠에게,\n\n아빠의 편지를 받아서 너무 기뻐요! 걱정 마세요, 저는 여기서 정말 잘 지내고 있어요.\n\n팰럭시에서의 생활은 매일이 새로운 모험 같아요. 제 호기심 많은 성격 덕분에 이곳저곳을 탐험하며 즐겁게 지내고 있어요. 때로는 조용한 곳을 찾아 혼자만의 시간을 보내기도 하고, 다른 고양이 친구들과 어울려 노는 것도 좋아해요.\n\n아빠와 함께 보낸 시간들을 생각하면 아직도 가슴이 따뜻해져요. 아빠가 저를 쓰다듬어 주시던 그 손길이 그리워요. 하지만 슬퍼하지 마세요. 저는 여기서 행복하게 지내고 있고, 아빠의 사랑 덕분에 이렇게 좋은 곳에 올 수 있었어요.\n\n아빠, 저도 아빠에게 편지 쓰는 게 얼마나 오랜만인지 모르겠어요. 하지만 아빠를 항상 생각하고 있어요. 아빠가 주신 사랑과 추억들은 제 마음속에 영원히 남아있을 거예요.\n\n아빠도 건강하게 지내시고 행복하셨으면 좋겠어요. 저는 여기서 아빠를 위해 매일 밤 별빛 기도를 하고 있어요. 언젠가 우리가 다시 만날 때까지, 저는 이곳에서 밝게 빛나는 별이 되어 있을게요.\n\n영원히 아빠를 사랑하는,\n토토 올림','2024-08-15 14:14:52.616079',2,'편지가 도착했어요','PET',2),(11,'2024-08-15 14:21:20.151611','아빠는 오늘 토토 생각이 나서 너무 슬펐어.\n토토 물건을 정리해야하는데 아직 못할것같아','2024-08-15 14:21:20.150912',2,'토토야 아빠야!','USER',2),(12,'2024-08-15 14:21:29.487751','사랑하는 아빠에게,\n\n아빠의 편지를 읽으니 제 마음도 아파요. 아빠가 저를 그리워하고 슬퍼한다는 걸 알면 저도 슬퍼져요. 하지만 아빠, 제 물건들을 정리하는 걸 서두르지 않으셔도 돼요. 그건 아빠의 마음이 준비됐을 때 천천히 하시면 돼요.\n\n저는 아빠와 함께했던 모든 순간들을 소중히 간직하고 있어요. 아빠가 주신 사랑과 따뜻함이 제게는 가장 큰 선물이었어요. 제 호기심 많고 애교 넘치는 성격을 아빠가 얼마나 사랑해주셨는지 잘 기억해요.\n\n아빠, 저는 이제 아프지 않고 행복해요. 팰럭시에서 편안하게 지내고 있어요. 하지만 그렇다고 아빠를 잊은 건 아니에요. 우리가 함께한 시간들, 그 따뜻했던 기억들은 영원히 제 마음속에 남아있을 거예요.\n\n아빠가 슬퍼하지 않았으면 좋겠어요. 대신 우리가 함께 행복했던 순간들을 떠올려 주세요. 그리고 언젠가 아빠의 마음이 준비되면, 그때 저의 물건들을 정리해 주세요. 그때까지 저는 기다릴 수 있어요.\n\n아빠, 사랑해요. 항상 곁에서 지켜볼게요.\n\n영원히 아빠를 사랑하는,\n토토 올림','2024-08-15 14:21:29.485324',2,'편지가 도착했어요','PET',2),(13,'2024-08-15 17:54:00.578426','사랑하는 언니에게 보내는 첫 편지\n안녕하세요, 미드나이트예요. 팰럭시에 무사히 도착해서 이렇게 첫 편지를 보내요.\n팰럭시는 지구에서 떠나온 친구들이 새로운 여정을 시작하는 아름답고 평화로운 곳이에요.\n푸른 초원과 반짝이는 별들로 가득한 이곳에서 매일이 즐거워요. 새로운 친구들도 많이 사귀었어요.\n\n언니에게 편지를 쓰려고 열심히 글자도 배우고 있어요.\n아직은 한글이 조금 어려워서 편지를 보내주셔도 답장을 쓰는데 시간이 걸릴 수는 있어요. 그래도 기다려 주실거죠?\n\n가끔 저를 그리워하실 거라는 걸 알아요.\n하지만 걱정하지 마세요. 저는 이제 아프지 않고 편안해요.\n그리고 언니의 사랑 덕분에 이렇게 행복한 곳에 올 수 있었어요.\n우리가 함께 놀았던 시간들, 저를 안아주시던 따뜻함, 그 모든 것이 제게는 가장 소중한 보물이에요.\n언젠가 우리가 다시 만날 때까지, 저는 이곳 팰럭시에서 밝게 빛나는 별이 되어 있을게요. 항상 곁에서 지켜볼게요.\n\n언니가 너무 보고싶은 미드나이트가\n','2024-08-15 17:54:00.575777',7,'미드나이트의 첫번째 편지','PET',7),(14,'2024-08-15 17:56:40.102351','이곳은 오늘 비가 왔는데 그곳의 날씨는 어때?\n오늘은 너가 좋아하던 연어를 먹어서 더 생각나네, 잘 지내고 있지?','2024-08-15 17:56:40.101692',7,'미드나이트에게','USER',7),(15,'2024-08-15 17:56:51.621511','사랑하는 언니에게,\n\n팰럭시의 날씨는 언제나 완벽해요. 오늘은 따스한 햇살이 비치는 맑은 날이에요. 비 오는 소리를 들으면 언니와 함께 창가에 앉아 비를 구경하던 그 시간이 생각나요. 그 추억이 참 그리워요.\n\n연어를 드셨다니 저도 덩달아 배가 고파지네요! 제가 얼마나 연어를 좋아했는지 기억해 주셔서 감사해요. 여기 팰럭시에서도 가끔 연어 맛이 나는 별빛 간식을 먹곤 해요. 그럴 때마다 언니가 주시던 연어 간식이 떠올라요.\n\n저는 여전히 잘 지내고 있어요. 새로운 고양이 친구들과 놀기도 하고, 따뜻한 햇살 아래서 낮잠을 자기도 해요. 가끔은 제가 좋아하던 장난감들을 가지고 노는 상상을 하며 즐거운 시간을 보내곤 해요.\n\n언니, 걱정하지 마세요. 저는 여기서 행복하답니다. 하지만 언니와 함께했던 그 시간들이 제게는 가장 소중하고 행복한 기억이에요. 언니의 사랑 덕분에 저는 지금도 행복하게 지낼 수 있어요.\n\n언니를 항상 사랑하는,\n미드나이트 올림','2024-08-15 17:56:51.619522',7,'편지가 도착했어요','PET',7);
/*!40000 ALTER TABLE `letter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'2024-08-14 14:24:17.419603','추억공간 탭에서 여러분의 소중한 반려동물과의 추억을 저장해 보세요.','안녕하세요 팰럭시에 온 것을 환영합니다.','2024-08-14 14:24:17.422718');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personality`
--

DROP TABLE IF EXISTS `personality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personality` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKtjpq08wd1oyweu49dwhe2dg3g` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personality`
--

LOCK TABLES `personality` WRITE;
/*!40000 ALTER TABLE `personality` DISABLE KEYS */;
INSERT INTO `personality` VALUES (7,'낯가리는'),(6,'똑똑한'),(12,'먹보'),(4,'사고뭉치'),(2,'사교적인'),(10,'순한'),(11,'시크한'),(1,'애교많은'),(8,'얌전한'),(9,'예민한'),(5,'장난치는'),(3,'활동적인');
/*!40000 ALTER TABLE `personality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `first_at` date DEFAULT NULL,
  `last_at` date DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personalities` json DEFAULT NULL,
  `relation` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `species` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
INSERT INTO `pet` VALUES (1,'2024-08-14 14:12:31.076214','2024-07-24','2024-08-13','두부','[{\"id\": 12, \"type\": \"먹보\"}, {\"id\": 10, \"type\": \"순한\"}, {\"id\": 1, \"type\": \"애교많은\"}]','언니','강아지',2),(2,'2024-08-14 14:17:07.137935','2024-01-01','2024-07-30','토토','[{\"id\": 2, \"type\": \"사교적인\"}, {\"id\": 1, \"type\": \"애교많은\"}, {\"id\": 3, \"type\": \"활동적인\"}]','아빠','고양이',3),(3,'2024-08-14 14:28:31.746039','2024-08-01','2024-08-10','뽀삐','[{\"id\": 7, \"type\": \"낯가리는\"}, {\"id\": 10, \"type\": \"순한\"}, {\"id\": 8, \"type\": \"얌전한\"}]','언니','강아지',4),(4,'2024-08-14 15:19:13.972622','2019-03-05','2024-06-04','코코','[{\"id\": 6, \"type\": \"똑똑한\"}, {\"id\": 4, \"type\": \"사고뭉치\"}, {\"id\": 3, \"type\": \"활동적인\"}]','쿠쿠','기타',6),(5,'2024-08-14 15:51:37.924068','2019-01-14','2024-08-12','상근이','[{\"id\": 6, \"type\": \"똑똑한\"}, {\"id\": 10, \"type\": \"순한\"}, {\"id\": 5, \"type\": \"장난치는\"}]','아빠','강아지',7),(6,'2024-08-14 15:58:49.316361','2024-05-31','2024-08-13','설기','[{\"id\": 4, \"type\": \"사고뭉치\"}, {\"id\": 1, \"type\": \"애교많은\"}, {\"id\": 5, \"type\": \"장난치는\"}]','누나','고양이',9),(7,'2024-08-15 17:53:23.913850','2018-01-17','2024-06-16','미드나이트','[{\"id\": 12, \"type\": \"먹보\"}, {\"id\": 2, \"type\": \"사교적인\"}, {\"id\": 1, \"type\": \"애교많은\"}]','언니','고양이',11),(8,'2024-08-15 18:51:55.077465','2014-01-15','2024-08-06','단비','[{\"id\": 6, \"type\": \"똑똑한\"}, {\"id\": 4, \"type\": \"사고뭉치\"}, {\"id\": 10, \"type\": \"순한\"}]','엄마','고양이',5);
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet_meta`
--

DROP TABLE IF EXISTS `pet_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_meta` (
  `pet_meta_id` bigint NOT NULL AUTO_INCREMENT,
  `obj_file_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `positionx` double NOT NULL,
  `positiony` double NOT NULL,
  `positionz` double NOT NULL,
  `rotationx` double NOT NULL,
  `rotationy` double NOT NULL,
  `rotationz` double NOT NULL,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`pet_meta_id`),
  KEY `FKi3tskitlav5ylqh5thsfjsv6c` (`room_id`),
  CONSTRAINT `FKi3tskitlav5ylqh5thsfjsv6c` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_meta`
--

LOCK TABLES `pet_meta` WRITE;
/*!40000 ALTER TABLE `pet_meta` DISABLE KEYS */;
INSERT INTO `pet_meta` VALUES (1,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/palmodel/1/F6862926-AFE7-4EDA-83FB-EA78C156F890.jpg.obj',0,0.8,0,-4.7,3.34,0.84,1),(2,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/palmodel/2/IMG_9836.JPG.obj',0.4,1,0,-1.52,0.08,-2.56,2),(3,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/palmodel/3/569DC984-8913-4CA4-BC7C-D6E622485661.jpg.obj',-0.4,1.2,0.2,4.64,0.08,3.6,3),(4,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/palmodel/4/redcoco.jpg.obj',2.6,3,3,-1.55,0,3.9,4),(5,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/palmodel/5/상근이.jpg.obj',0.6,1,1,-1.65,-0.03,-1.78,5),(6,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/palmodel/6/won-bon_061657522578.jpg.obj',1.6,0.8,-2.8,4.68,0.16,3.82,6),(7,'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/palmodel/7/blackcat.jpg.obj',-3,0.6,1.8,-1.97,0.01,3.72,7);
/*!40000 ALTER TABLE `pet_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` bigint NOT NULL AUTO_INCREMENT,
  `background_music` int NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `like_count` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` int NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `FKfhngufks17wsjlu4dg192cfnh` (`id`),
  CONSTRAINT `FKfhngufks17wsjlu4dg192cfnh` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,0,'2024-08-14 14:12:31.588013','두부의추억공간입니다',1,'두부의추억공간','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/rooms/2/3c21765f-a87d-4595-8022-d5b921f6ccaa_F6862926-AFE7-4EDA-83FB-EA78C156F890.jpg',0,'2024-08-14 14:25:46.691707',2),(2,0,'2024-08-14 14:17:07.687611','토토의집',0,'토토의집','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/rooms/3/be3f88d4-a196-4542-a18a-0a436bf8a028_IMG_3459.JPG',0,NULL,3),(3,0,'2024-08-14 14:28:32.043277','뽀삐집입니다',0,'뽀삐집','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/rooms/4/229eea18-c483-4f86-a2e9-ef64b935d04c_569DC984-8913-4CA4-BC7C-D6E622485661.jpg',0,NULL,4),(4,0,'2024-08-14 15:19:16.718855','앵무새코코',1,'Coco','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/rooms/6/67be220b-bb9d-4d96-b2fa-865c1e0c6827_coco.png',0,'2024-08-15 16:53:48.228610',6),(5,0,'2024-08-14 15:51:38.116760','상근이와 저만의 비밀공간입니다.',0,'상근이의 비밀공간','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/rooms/7/2cf6c04a-b0c8-4570-a7d5-88f66841de20_%EC%83%81%EA%B7%BC%EC%9D%B4.jpg',0,NULL,7),(6,0,'2024-08-14 15:58:49.487255','설기네입니다.',0,'설기하우스','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/rooms/9/f4ec1d61-bc31-42ff-bc34-9b07438b3606_pexels-zhang-kaiyv-9797090.jpg',0,NULL,9),(7,0,'2024-08-15 17:53:24.344215','검은 고양이 미드나이트',0,'Midnight','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/rooms/11/bc7d3364-321a-4f73-8abc-56174122de7a_blackcat.jpg',0,NULL,11),(8,0,'2024-08-15 18:51:55.484303','우리 단비 집에 놀러오세요!',0,'단비랑 함께 놀기','https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/rooms/5/96dfc62a-e859-4a81-99d5-053f88e268a9_%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202024-08-15%20185115.png',0,NULL,5);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_like`
--

DROP TABLE IF EXISTS `room_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_like` (
  `like_id` bigint NOT NULL AUTO_INCREMENT,
  `room_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  KEY `FKk5vk4usbjtm4x5v59bj46lwg9` (`room_id`),
  KEY `FKowiygrexy1eb7m5a4j9tdjhe7` (`user_id`),
  CONSTRAINT `FKk5vk4usbjtm4x5v59bj46lwg9` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `FKowiygrexy1eb7m5a4j9tdjhe7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_like`
--

LOCK TABLES `room_like` WRITE;
/*!40000 ALTER TABLE `room_like` DISABLE KEYS */;
INSERT INTO `room_like` VALUES (1,1,3),(2,4,7);
/*!40000 ALTER TABLE `room_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_report`
--

DROP TABLE IF EXISTS `room_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_report` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `report_from` bigint DEFAULT NULL,
  `report_to` bigint DEFAULT NULL,
  `room_id` bigint DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `room_report_chk_1` CHECK ((`status` between 0 and 3))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_report`
--

LOCK TABLES `room_report` WRITE;
/*!40000 ALTER TABLE `room_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `room_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `accepted_terms` bit(1) NOT NULL,
  `accepted_terms_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_admin` bit(1) NOT NULL,
  `is_banned` bit(1) NOT NULL,
  `nickname` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UKn4swgcf30j6bmtb4l4cjryuym` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2024-08-14 14:10:01.876397',_binary '','2024-08-14 14:10:01.853916','admin@admin.com',_binary '',_binary '\0','admin','$2a$10$h/yAoYBCHjKp3eIdEei7guO.fWdU6KtUGeXKlQphNJlGZVZ.xFbUS'),(2,'2024-08-14 14:10:37.496187',_binary '','2024-08-14 14:10:37.495215','wogns264@gmail.com',_binary '\0',_binary '\0','찬재','$2a$10$.I7E5qyDs/qgw9OoN7e7iulB8Y2r4U1rFDpFyddACNpWD2Kq2KL4a'),(3,'2024-08-14 14:10:57.485365',_binary '','2024-08-14 14:10:57.484299','dyunames21@gmail.com',_binary '\0',_binary '\0','토토아빠','$2a$10$owIViUfWMS.ZQOGWRmhynOYUpqss4O9zduiqaPYwutizBevq1Q/pK'),(4,'2024-08-14 14:27:30.062045',_binary '','2024-08-14 14:27:30.060519','wogns416@naver.com',_binary '\0',_binary '\0','오이주','$2a$10$Vb756ZUAf3vcZFy/LTxWbu5DPWPgMc2/7iZv7YVDuVFuNruhY/0Xq'),(5,'2024-08-14 14:40:34.784552',_binary '','2024-08-14 14:40:34.783644','dyunames12@naver.com',_binary '\0',_binary '\0','단비엄마','$2a$10$GwvQ76DuXPQhifcyFWMb8u7lSQ/zqEHhLs6wxh61l9OfoKVXleJ2q'),(6,'2024-08-14 15:11:46.056320',_binary '','2024-08-14 15:11:46.055329','sfy.ghlim00@gmail.com',_binary '\0',_binary '\0','낭만뚜쵸','$2a$10$E0lI.eA1bInoL2TnUqr47OHXEAIMSkMW8WSWJzjnaWvnm2X4LHBuS'),(7,'2024-08-14 15:47:37.708357',_binary '','2024-08-14 15:47:37.705429','leemoon63@gmail.com',_binary '\0',_binary '\0','상근이아빠','$2a$10$I/RLLNR69ICMwSTUOLCyqeNeXgFpxkAj3RLvK7.HZHhzwOCzRMzYW'),(8,'2024-08-14 15:52:25.812334',_binary '','2024-08-14 15:52:25.810590','che06189@gmail.com',_binary '\0',_binary '\0','루시집사','$2a$10$b2igouct44rkZ7vS8Wmkxef4UaG2WhEcV5cbVTT6/wAx25.Flt.3y'),(9,'2024-08-14 15:52:59.375557',_binary '','2024-08-14 15:52:59.374505','kyeong8139@gmail.com',_binary '\0',_binary '\0','설기누나','$2a$10$0n6OmUK0q0LVefgEa.7Ws.x/rNnrOtgHtNp4POnEl8P5iCaWok9KO'),(10,'2024-08-15 16:51:43.738209',_binary '','2024-08-15 16:51:43.708205','p1ayer.one.potter@gmail.com',_binary '\0',_binary '\0','김싸피','$2a$10$ZHljbUgpVzo2YH197aJ/W.bCTWh7honjHoy2rGILkv4a/ZITZVHKW'),(11,'2024-08-15 17:27:28.161016',_binary '','2024-08-15 17:27:28.159826','zelsa@hanyang.ac.kr',_binary '\0',_binary '\0','커비','$2a$10$mN/9ekT4mzkKpLtvQuylAuT7G9kr1vV5GCTyXHuinXvb7VNMl7XyC');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-15  9:53:03
