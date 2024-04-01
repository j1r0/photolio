CREATE DATABASE  IF NOT EXISTS `photolio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `photolio`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: photolio
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Albums`
--

DROP TABLE IF EXISTS `Albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Albums` (
  `albumID` int NOT NULL AUTO_INCREMENT,
  `albumName` varchar(60) DEFAULT NULL,
  `creationDate` date DEFAULT NULL,
  PRIMARY KEY (`albumID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Albums`
--

LOCK TABLES `Albums` WRITE;
/*!40000 ALTER TABLE `Albums` DISABLE KEYS */;
INSERT INTO `Albums` VALUES (1,'testAlbum1','2023-10-03'),(2,'testAlbum2','2023-10-04');
/*!40000 ALTER TABLE `Albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cameras`
--

DROP TABLE IF EXISTS `Cameras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cameras` (
  `make` varchar(20) NOT NULL,
  `model` varchar(40) NOT NULL,
  PRIMARY KEY (`make`,`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cameras`
--

LOCK TABLES `Cameras` WRITE;
/*!40000 ALTER TABLE `Cameras` DISABLE KEYS */;
INSERT INTO `Cameras` VALUES ('Fujifilm','X-T5'),('Sony','A7IV');
/*!40000 ALTER TABLE `Cameras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HasTag`
--

DROP TABLE IF EXISTS `HasTag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HasTag` (
  `tagName` varchar(60) NOT NULL,
  `photoID` int NOT NULL,
  PRIMARY KEY (`tagName`,`photoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HasTag`
--

LOCK TABLES `HasTag` WRITE;
/*!40000 ALTER TABLE `HasTag` DISABLE KEYS */;
INSERT INTO `HasTag` VALUES ('Street',2),('Wildlife',1);
/*!40000 ALTER TABLE `HasTag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InAlbum`
--

DROP TABLE IF EXISTS `InAlbum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InAlbum` (
  `photoID` int NOT NULL,
  `albumID` int NOT NULL,
  `uploadDate` date DEFAULT NULL,
  PRIMARY KEY (`photoID`,`albumID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InAlbum`
--

LOCK TABLES `InAlbum` WRITE;
/*!40000 ALTER TABLE `InAlbum` DISABLE KEYS */;
INSERT INTO `InAlbum` VALUES (1,2,'2024-02-10'),(2,2,'2024-02-11');
/*!40000 ALTER TABLE `InAlbum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Photos`
--

DROP TABLE IF EXISTS `Photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Photos` (
  `photoID` int NOT NULL AUTO_INCREMENT,
  `fileName` varchar(60) NOT NULL,
  `fileSize` double NOT NULL,
  `fileType` varchar(10) NOT NULL,
  `height` int NOT NULL,
  `width` int NOT NULL,
  PRIMARY KEY (`photoID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Photos`
--

LOCK TABLES `Photos` WRITE;
/*!40000 ALTER TABLE `Photos` DISABLE KEYS */;
INSERT INTO `Photos` VALUES (1,'testPhoto',100.23,'PNG',100,300),(2,'testPhoto1',10.3,'JPEG',300,500),(3,'testPhoto2',43.5,'PNG',400,200),(4,'testPhoto2',43.5,'PNG',340,400),(5,'photo4',10,'PNG',240,240);
/*!40000 ALTER TABLE `Photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tags`
--

DROP TABLE IF EXISTS `Tags`;
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
INSERT INTO `Tags` VALUES ('Street','Street-style candids'),('Wildlife','Pictures of animals');
/*!40000 ALTER TABLE `Tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TakenWith`
--

DROP TABLE IF EXISTS `TakenWith`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TakenWith` (
  `photoID` int NOT NULL,
  `make` varchar(20) NOT NULL,
  `model` varchar(30) NOT NULL,
  `dateTaken` date DEFAULT NULL,
  PRIMARY KEY (`photoID`,`make`,`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TakenWith`
--

LOCK TABLES `TakenWith` WRITE;
/*!40000 ALTER TABLE `TakenWith` DISABLE KEYS */;
INSERT INTO `TakenWith` VALUES (1,'Fujifilm','X-T5','2024-01-13'),(2,'Sony','A7IV','2024-01-15');
/*!40000 ALTER TABLE `TakenWith` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-01 14:58:45
