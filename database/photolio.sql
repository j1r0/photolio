-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: photolio
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `Albums`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Albums` (
  `albumID` int NOT NULL AUTO_INCREMENT,
  `albumName` varchar(60) DEFAULT NULL,
  `creationDate` date DEFAULT NULL,
  PRIMARY KEY (`albumID`),
  UNIQUE KEY `albumName_UNIQUE` (`albumName`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Albums`
--

LOCK TABLES `Albums` WRITE;
/*!40000 ALTER TABLE `Albums` DISABLE KEYS */;
INSERT INTO `Albums` VALUES (38,'GBM','2024-04-25');
INSERT INTO `Albums` VALUES (39,'Cat','2024-04-25');
INSERT INTO `Albums` VALUES (40,'Perfumes','2024-04-25');
/*!40000 ALTER TABLE `Albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cameras`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cameras` (
  `make` varchar(20) NOT NULL,
  `model` varchar(40) NOT NULL,
  PRIMARY KEY (`make`,`model`),
  CONSTRAINT `cameras_chk_1` CHECK ((`make` in (_utf8mb4'Canon',_utf8mb4'Nikon',_utf8mb4'Sony',_utf8mb4'Panasonic',_utf8mb4'Fujifilm',_utf8mb4'Olympus',_utf8mb4'Leica',_utf8mb4'Pentax',_utf8mb4'GoPro',_utf8mb4'DJI',_utf8mb4'Apple',_utf8mb4'Samsung',_utf8mb4'Google',_utf8mb4'Huawei',_utf8mb4'OnePlus',_utf8mb4'Xiaomi',_utf8mb4'Oppo',_utf8mb4'Vivo',_utf8mb4'Motorola',_utf8mb4'LG')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cameras`
--

LOCK TABLES `Cameras` WRITE;
/*!40000 ALTER TABLE `Cameras` DISABLE KEYS */;
INSERT INTO `Cameras` VALUES ('Apple','iPhone 13');
INSERT INTO `Cameras` VALUES ('Apple','iPhone 15 Pro');
INSERT INTO `Cameras` VALUES ('Fujifilm','X-T5');
/*!40000 ALTER TABLE `Cameras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HasTag`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HasTag` (
  `tagName` varchar(60) NOT NULL,
  `photoID` int NOT NULL,
  PRIMARY KEY (`tagName`,`photoID`),
  KEY `photoTagFK` (`photoID`),
  CONSTRAINT `photoTagFK` FOREIGN KEY (`photoID`) REFERENCES `Photos` (`photoID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tagFK` FOREIGN KEY (`tagName`) REFERENCES `Tags` (`tagName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HasTag`
--

LOCK TABLES `HasTag` WRITE;
/*!40000 ALTER TABLE `HasTag` DISABLE KEYS */;
/*!40000 ALTER TABLE `HasTag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InAlbum`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InAlbum` (
  `photoID` int NOT NULL,
  `albumID` int NOT NULL,
  `uploadDate` date DEFAULT NULL,
  PRIMARY KEY (`photoID`,`albumID`),
  KEY `albumFK` (`albumID`),
  CONSTRAINT `albumFK` FOREIGN KEY (`albumID`) REFERENCES `Albums` (`albumID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `photoAlbumFK` FOREIGN KEY (`photoID`) REFERENCES `Photos` (`photoID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InAlbum`
--

LOCK TABLES `InAlbum` WRITE;
/*!40000 ALTER TABLE `InAlbum` DISABLE KEYS */;
/*!40000 ALTER TABLE `InAlbum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Photos`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Photos` (
  `photoID` int NOT NULL AUTO_INCREMENT,
  `fileName` varchar(60) DEFAULT NULL,
  `fileSize` double DEFAULT NULL,
  `fileType` varchar(10) DEFAULT NULL,
  `height` int DEFAULT NULL,
  `width` int DEFAULT NULL,
  PRIMARY KEY (`photoID`)
) ENGINE=InnoDB AUTO_INCREMENT=428 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Photos`
--

LOCK TABLES `Photos` WRITE;
/*!40000 ALTER TABLE `Photos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tags` (
  `tagName` varchar(60) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`tagName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tags`
--

LOCK TABLES `Tags` WRITE;
/*!40000 ALTER TABLE `Tags` DISABLE KEYS */;
INSERT INTO `Tags` VALUES ('',NULL);
INSERT INTO `Tags` VALUES ('Food','Yummy');
INSERT INTO `Tags` VALUES ('Happy',NULL);
/*!40000 ALTER TABLE `Tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TakenWith`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TakenWith` (
  `photoID` int NOT NULL,
  `make` varchar(20) NOT NULL,
  `model` varchar(30) NOT NULL,
  `dateTaken` date DEFAULT NULL,
  PRIMARY KEY (`photoID`,`make`,`model`),
  KEY `camFK` (`make`,`model`),
  CONSTRAINT `camFK` FOREIGN KEY (`make`, `model`) REFERENCES `Cameras` (`make`, `model`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `photoCamFK` FOREIGN KEY (`photoID`) REFERENCES `Photos` (`photoID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TakenWith`
--

LOCK TABLES `TakenWith` WRITE;
/*!40000 ALTER TABLE `TakenWith` DISABLE KEYS */;
/*!40000 ALTER TABLE `TakenWith` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'photolio'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-25 23:30:26
