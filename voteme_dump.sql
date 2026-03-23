/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.3.1-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: voteme
-- ------------------------------------------------------
-- Server version	12.3.1-MariaDB-ubu2404

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `inserted_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
(1,'Juego del Año','Premio al mejor juego del año 2025','2026-02-21 14:30:43','2026-03-23 11:56:20',1),
(2,'Mejor Dirección de Juego','Premio a la mejor dirección de juego','2026-02-21 14:30:43','2026-03-23 11:56:24',1),
(3,'Mejor Narrativa','Premio a la mejor narrativa en un juego','2026-02-21 14:30:43','2026-02-21 14:30:43',1),
(4,'Mejor Dirección de Arte','Premio a la mejor dirección de arte','2026-02-21 14:30:43','2026-03-19 18:28:40',1),
(5,'Mejor Banda Sonora','Premio a la mejor música o banda sonora','2026-02-21 14:30:43','2026-03-19 18:29:05',1),
(6,'Mejor Diseño de Sonido','Premio al mejor diseño de audio','2026-02-21 14:30:43','2026-03-19 16:44:27',0),
(7,'Mejor Actuación','Premio a la mejor actuación de un actor en un juego','2026-02-21 14:30:43','2026-03-19 16:44:28',0),
(8,'Mejor Juego en Curso','Premio al mejor juego en curso o con contenido continuo','2026-02-21 14:30:43','2026-03-19 16:44:30',0),
(9,'Mejor Juego Independiente','Premio al mejor juego independiente','2026-02-21 14:30:43','2026-03-19 16:44:31',0),
(10,'Mejor Juego Móvil','Premio al mejor juego para dispositivos móviles','2026-02-21 14:30:43','2026-03-19 16:44:34',0),
(11,'Mejor Juego VR/AR','Premio al mejor juego de realidad virtual o aumentada','2026-02-21 14:30:43','2026-02-21 14:30:43',1),
(12,'Mejor Juego de Acción','Premio al mejor juego de acción','2026-02-21 14:30:43','2026-02-21 14:30:43',1),
(13,'Mejor Juego de Acción/Aventura','Premio al mejor juego de acción y aventura','2026-02-21 14:30:43','2026-02-21 14:30:43',1),
(14,'Mejor Juego de Rol','Premio al mejor juego de rol','2026-02-21 14:30:43','2026-02-21 14:30:43',1),
(15,'Mejor Juego de Lucha','Premio al mejor juego de lucha','2026-02-21 14:30:43','2026-02-21 14:30:43',1),
(16,'Mejor Juego Familiar','Premio al mejor juego familiar','2026-02-21 14:30:43','2026-02-21 14:30:43',1),
(17,'Mejor Juego de Estrategia','Premio al mejor juego de estrategia','2026-02-21 14:30:43','2026-02-21 14:30:43',1),
(18,'Mejor Juego de Deportes/Carreras','Premio al mejor juego de deportes o carreras','2026-02-21 14:30:43','2026-02-21 14:30:43',1),
(19,'Mejor Juego Multijugador','Premio al mejor juego multijugador','2026-02-21 14:30:43','2026-02-21 14:30:43',1),
(20,'Innovación en Accesibilidad','Premio a la mejor innovación en accesibilidad','2026-02-21 14:30:43','2026-02-21 14:30:43',1);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `editions`
--

DROP TABLE IF EXISTS `editions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `editions` (
  `edition_id` uuid NOT NULL DEFAULT uuid(),
  `name` varchar(155) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_open` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`edition_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editions`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `editions` WRITE;
/*!40000 ALTER TABLE `editions` DISABLE KEYS */;
INSERT INTO `editions` VALUES
('1a2b3c4d-0f32-11f1-9584-c2159bee87c9','Periodo de votación GOTY 2025','2026-02-22','2026-02-27',0),
('69880730-217a-11f1-8c64-d00298f2f7fc','Test54','2026-03-22','2026-03-27',0),
('944c0f18-26b4-11f1-8cf3-d209b6762b78','test','2026-03-09','2026-03-14',1);
/*!40000 ALTER TABLE `editions` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `editions_categories`
--

DROP TABLE IF EXISTS `editions_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `editions_categories` (
  `edition_category_id` uuid NOT NULL DEFAULT uuid(),
  `edition_id` uuid NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`edition_category_id`),
  KEY `fk_category_id` (`category_id`),
  KEY `fk_edition_id` (`edition_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `fk_edition_id` FOREIGN KEY (`edition_id`) REFERENCES `editions` (`edition_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editions_categories`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `editions_categories` WRITE;
/*!40000 ALTER TABLE `editions_categories` DISABLE KEYS */;
INSERT INTO `editions_categories` VALUES
('9f63fb06-23b1-11f1-8c23-d0fe8ab7f8b3','1a2b3c4d-0f32-11f1-9584-c2159bee87c9',3),
('9f63fcaa-23b1-11f1-8c23-d0fe8ab7f8b3','1a2b3c4d-0f32-11f1-9584-c2159bee87c9',4),
('9f63fd08-23b1-11f1-8c23-d0fe8ab7f8b3','1a2b3c4d-0f32-11f1-9584-c2159bee87c9',5),
('9f63fd2b-23b1-11f1-8c23-d0fe8ab7f8b3','1a2b3c4d-0f32-11f1-9584-c2159bee87c9',6),
('9f63fd49-23b1-11f1-8c23-d0fe8ab7f8b3','1a2b3c4d-0f32-11f1-9584-c2159bee87c9',7),
('9f63fd66-23b1-11f1-8c23-d0fe8ab7f8b3','1a2b3c4d-0f32-11f1-9584-c2159bee87c9',8),
('9f63fd85-23b1-11f1-8c23-d0fe8ab7f8b3','1a2b3c4d-0f32-11f1-9584-c2159bee87c9',9),
('9f63fda2-23b1-11f1-8c23-d0fe8ab7f8b3','1a2b3c4d-0f32-11f1-9584-c2159bee87c9',10),
('944c852b-26b4-11f1-8cf3-d209b6762b78','944c0f18-26b4-11f1-8cf3-d209b6762b78',1),
('944c8796-26b4-11f1-8cf3-d209b6762b78','944c0f18-26b4-11f1-8cf3-d209b6762b78',2),
('9d60ccfc-26b7-11f1-8cf3-d209b6762b78','944c0f18-26b4-11f1-8cf3-d209b6762b78',11);
/*!40000 ALTER TABLE `editions_categories` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `editions_categories_nominees`
--

DROP TABLE IF EXISTS `editions_categories_nominees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `editions_categories_nominees` (
  `id` uuid NOT NULL DEFAULT uuid(),
  `edition_category_id` uuid NOT NULL,
  `nominee_id` uuid NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_edition_category_id` (`edition_category_id`),
  KEY `fk_nominee_id` (`nominee_id`),
  CONSTRAINT `fk_edition_category_id` FOREIGN KEY (`edition_category_id`) REFERENCES `editions_categories` (`edition_category_id`),
  CONSTRAINT `fk_nominee_id` FOREIGN KEY (`nominee_id`) REFERENCES `nominees` (`nominee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editions_categories_nominees`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `editions_categories_nominees` WRITE;
/*!40000 ALTER TABLE `editions_categories_nominees` DISABLE KEYS */;
INSERT INTO `editions_categories_nominees` VALUES
('3fa6c2f4-23b2-11f1-8c23-d0fe8ab7f8b3','9f63fb06-23b1-11f1-8c23-d0fe8ab7f8b3','128180d0-0f32-11f1-9584-c2159bee87c9'),
('3fa6c49a-23b2-11f1-8c23-d0fe8ab7f8b3','9f63fb06-23b1-11f1-8c23-d0fe8ab7f8b3','12818094-0f32-11f1-9584-c2159bee87c9'),
('3fa6c4fb-23b2-11f1-8c23-d0fe8ab7f8b3','9f63fb06-23b1-11f1-8c23-d0fe8ab7f8b3','1281821a-0f32-11f1-9584-c2159bee87c9'),
('3fa6c56c-23b2-11f1-8c23-d0fe8ab7f8b3','9f63fcaa-23b1-11f1-8c23-d0fe8ab7f8b3','12818008-0f32-11f1-9584-c2159bee87c9'),
('3fa6c58f-23b2-11f1-8c23-d0fe8ab7f8b3','9f63fcaa-23b1-11f1-8c23-d0fe8ab7f8b3','12818148-0f32-11f1-9584-c2159bee87c9'),
('3fa6c5b1-23b2-11f1-8c23-d0fe8ab7f8b3','9f63fd08-23b1-11f1-8c23-d0fe8ab7f8b3','128180e4-0f32-11f1-9584-c2159bee87c9'),
('3fa6c5d4-23b2-11f1-8c23-d0fe8ab7f8b3','9f63fd08-23b1-11f1-8c23-d0fe8ab7f8b3','128180d0-0f32-11f1-9584-c2159bee87c9'),
('9ae20560-26b4-11f1-8cf3-d209b6762b78','944c852b-26b4-11f1-8cf3-d209b6762b78','12817d1a-0f32-11f1-9584-c2159bee87c9'),
('9cdb45c0-26b4-11f1-8cf3-d209b6762b78','944c852b-26b4-11f1-8cf3-d209b6762b78','12818008-0f32-11f1-9584-c2159bee87c9'),
('a20c0905-26b7-11f1-8cf3-d209b6762b78','944c8796-26b4-11f1-8cf3-d209b6762b78','12818026-0f32-11f1-9584-c2159bee87c9'),
('a3517efa-26b7-11f1-8cf3-d209b6762b78','944c8796-26b4-11f1-8cf3-d209b6762b78','1281806c-0f32-11f1-9584-c2159bee87c9'),
('a59121ca-26b7-11f1-8cf3-d209b6762b78','9d60ccfc-26b7-11f1-8cf3-d209b6762b78','12818008-0f32-11f1-9584-c2159bee87c9'),
('a6ddbdd7-26b7-11f1-8cf3-d209b6762b78','9d60ccfc-26b7-11f1-8cf3-d209b6762b78','12818044-0f32-11f1-9584-c2159bee87c9'),
('6f52b304-26bd-11f1-8cf3-d209b6762b78','944c852b-26b4-11f1-8cf3-d209b6762b78','128180d0-0f32-11f1-9584-c2159bee87c9');
/*!40000 ALTER TABLE `editions_categories_nominees` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Temporary table structure for view `editions_view`
--

DROP TABLE IF EXISTS `editions_view`;
/*!50001 DROP VIEW IF EXISTS `editions_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `editions_view` AS SELECT
 1 AS `edition_id`,
  1 AS `name`,
  1 AS `start_date`,
  1 AS `end_date`,
  1 AS `is_open`,
  1 AS `total_categories`,
  1 AS `total_nominees` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nominees`
--

DROP TABLE IF EXISTS `nominees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `nominees` (
  `nominee_id` uuid NOT NULL DEFAULT uuid(),
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `inserted_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`nominee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nominees`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `nominees` WRITE;
/*!40000 ALTER TABLE `nominees` DISABLE KEYS */;
INSERT INTO `nominees` VALUES
('12817d1a-0f32-11f1-9584-c2159bee87c9','Clair Obscur: Expedición 33','Nominado en los Game Awards 2025 (varias categorías, incluido Juego del Año)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12817f86-0f32-11f1-9584-c2159bee87c9','Death Stranding 2: En la Playa','Nominado en los Game Awards 2025 (varias categorías, incluido Juego del Año)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12818008-0f32-11f1-9584-c2159bee87c9','Donkey Kong Bananza','Nominado en los Game Awards 2025 (Juego del Año)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12818026-0f32-11f1-9584-c2159bee87c9','Hades II','Nominado en los Game Awards 2025 (Juego del Año y otras categorías)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12818044-0f32-11f1-9584-c2159bee87c9','Hollow Knight: Silksong','Nominado en los Game Awards 2025 (Juego del Año y Mejor Arte/Música)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12818058-0f32-11f1-9584-c2159bee87c9','Kingdom Come: Deliverance II','Nominado en los Game Awards 2025 (Juego del Año y Mejor Narrativa)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('1281806c-0f32-11f1-9584-c2159bee87c9','Ghost of Yotei','Nominado en los Game Awards 2025 (Mejor Dirección, Arte, Narrativa)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12818080-0f32-11f1-9584-c2159bee87c9','Split Fiction','Nominado en los Game Awards 2025 (Mejor Dirección de Juego, Multijugador)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12818094-0f32-11f1-9584-c2159bee87c9','Battlefield 6','Nominado en los Game Awards 2025 (Mejor Diseño de Sonido, Multijugador)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('128180a8-0f32-11f1-9584-c2159bee87c9','Mario Kart World','Nominado en los Game Awards 2025 (Mejor Deportes/Carreras, Móvil)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('128180bc-0f32-11f1-9584-c2159bee87c9','Sonic Racing: CrossWorlds','Nominado en los Game Awards 2025 (Mejor Diseño de Sonido, Deportes/Carreras)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('128180d0-0f32-11f1-9584-c2159bee87c9','Arc Raiders','Nominado en los Game Awards 2025 (Mejor Multijugador)','/uploads/nominees/b26ceb22-938b-47cf-836b-0ab0773f9fbb.webp',1,'2026-02-21 14:31:55','2026-03-23 12:36:52'),
('128180e4-0f32-11f1-9584-c2159bee87c9','Elden Ring Nightreign','Nominado en los Game Awards 2025 (Mejor Multijugador)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('128180f8-0f32-11f1-9584-c2159bee87c9','Peak','Nominado en los Game Awards 2025 (Mejor Multijugador)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('1281810c-0f32-11f1-9584-c2159bee87c9','Final Fantasy XIV','Nominado en los Game Awards 2025 (Mejor Juego en Curso)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12818120-0f32-11f1-9584-c2159bee87c9','Fortnite','Nominado en los Game Awards 2025 (Mejor Juego en Curso)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12818134-0f32-11f1-9584-c2159bee87c9','Helldivers 2','Nominado en los Game Awards 2025 (Mejor Juego en Curso)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12818148-0f32-11f1-9584-c2159bee87c9','EA Sports FC 26','Nominado en los Game Awards 2025 (Mejor Deportes/Carreras)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('1281815c-0f32-11f1-9584-c2159bee87c9','F1 25','Nominado en los Game Awards 2025 (Mejor Deportes/Carreras)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('1281818e-0f32-11f1-9584-c2159bee87c9','The Alters','Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('128181a2-0f32-11f1-9584-c2159bee87c9','FINAL FANTASY TACTICS - Las Crónicas de Ivalice','Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12818206-0f32-11f1-9584-c2159bee87c9','Jurassic World Evolution 3','Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('1281821a-0f32-11f1-9584-c2159bee87c9','Civilization VII de Sid Meier','Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('1281822e-0f32-11f1-9584-c2159bee87c9','Tempest Rising','Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55'),
('12818242-0f32-11f1-9584-c2159bee87c9','Two Point Museum','Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)',NULL,1,'2026-02-21 14:31:55','2026-02-21 14:31:55');
/*!40000 ALTER TABLE `nominees` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` uuid NOT NULL DEFAULT uuid(),
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  `inserted_on` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('454b83c0-1019-11f1-9584-c2159bee87c9','sampf2006@gmail.com','$2b$10$k.CgXpn2H5HiVhKJMYxTn.7rSckHc1DNbZndZT7wugvWSOS1zyOIq','admin',1,'2026-02-22 18:06:54','2026-03-10 18:17:34'),
('c4dc57a8-10e7-11f1-9584-c2159bee87c9','gemmaraquel73@gmail.com','$2b$10$98jFom/9MVTABcirdDKoa..QtvfeEcPRN66ja9qsfg8EQblxlxpDa','user',1,'2026-02-23 18:45:05','2026-02-23 18:45:05'),
('318a3602-1a6d-11f1-9584-c2159bee87c9','estrella@gmail.com','$2b$10$T2vJIR2R17CSyNrYFl9xO.i1ThqX.z2XmRyZnubmwhk6NiQjUOde.','user',1,'2026-03-07 21:32:50','2026-03-07 21:32:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `vote_id` uuid NOT NULL DEFAULT uuid(),
  `user_id` uuid NOT NULL,
  `edition_category_nominee_id` uuid NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`vote_id`),
  KEY `fk_user_id` (`user_id`),
  KEY `fk_edition_category_nominee_id` (`edition_category_nominee_id`),
  CONSTRAINT `fk_edition_category_nominee_id` FOREIGN KEY (`edition_category_nominee_id`) REFERENCES `editions_categories_nominees` (`id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Final view structure for view `editions_view`
--

/*!50001 DROP VIEW IF EXISTS `editions_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `editions_view` AS select `e`.`edition_id` AS `edition_id`,`e`.`name` AS `name`,`e`.`start_date` AS `start_date`,`e`.`end_date` AS `end_date`,`e`.`is_open` AS `is_open`,count(distinct `ec`.`category_id`) AS `total_categories`,count(`ecn`.`nominee_id`) AS `total_nominees` from ((`editions` `e` join `editions_categories` `ec` on(`e`.`edition_id` = `ec`.`edition_id`)) left join `editions_categories_nominees` `ecn` on(`ec`.`edition_category_id` = `ecn`.`edition_category_id`)) group by `e`.`edition_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-03-23 15:07:04
