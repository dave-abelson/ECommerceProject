-- MySQL dump 10.13  Distrib 5.7.20, for osx10.12 (x86_64)
--
-- Host: localhost    Database: cse305
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CustOrder`
--

DROP TABLE IF EXISTS `CustOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CustOrder` (
  `OrderNo` int(11) NOT NULL AUTO_INCREMENT,
  `OrderStatus` varchar(20) DEFAULT NULL,
  `DatePlaced` datetime DEFAULT NULL,
  `EmployeeID` int(11) DEFAULT NULL,
  `CustomerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`OrderNo`),
  KEY `EmployeeID` (`EmployeeID`),
  KEY `CustomerID` (`CustomerID`),
  CONSTRAINT `custorder_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `Employee` (`ID`),
  CONSTRAINT `custorder_ibfk_2` FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customer` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(30) DEFAULT NULL,
  `LastName` varchar(30) DEFAULT NULL,
  `EmailAddress` varchar(50) NOT NULL,
  `Password` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SupervisorID` int(11) DEFAULT NULL,
  `Role` varchar(30) DEFAULT NULL,
  `DateJoined` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Inventory`
--

DROP TABLE IF EXISTS `Inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Inventory` (
  `ItemQuantity` int(11) NOT NULL,
  `ItemID` int(11) NOT NULL,
  PRIMARY KEY (`ItemID`,`ItemQuantity`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`ItemID`) REFERENCES `Item` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Item`
--

DROP TABLE IF EXISTS `Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Item` (
  `Name` varchar(20) DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Price` float NOT NULL,
  `Category` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PaymentInformation`
--

DROP TABLE IF EXISTS `PaymentInformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PaymentInformation` (
  `PaymentType` varchar(20) DEFAULT NULL,
  `CardNumber` varchar(16) NOT NULL,
  `ExpirationDate` date NOT NULL,
  `BillingAddress` varchar(50) DEFAULT NULL,
  `CVV` char(3) NOT NULL,
  `User` int(11) NOT NULL,
  PRIMARY KEY (`CardNumber`),
  KEY `User` (`User`),
  CONSTRAINT `paymentinformation_ibfk_1` FOREIGN KEY (`User`) REFERENCES `Customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Review`
--

DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Review` (
  `ReviewID` int(11) NOT NULL AUTO_INCREMENT,
  `Text` varchar(5000) DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `ItemID` int(11) DEFAULT NULL,
  `CustomerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ReviewID`),
  KEY `ItemID` (`ItemID`),
  KEY `CustomerID` (`CustomerID`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`ItemID`) REFERENCES `Item` (`ID`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Shipping`
--

DROP TABLE IF EXISTS `Shipping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Shipping` (
  `OrderNo` int(11) NOT NULL,
  `ShippingType` varchar(20) DEFAULT NULL,
  `ShippingAddress` varchar(100) DEFAULT NULL,
  `ShippingMethod` varchar(9) DEFAULT NULL,
  `ShippingCost` float NOT NULL,
  PRIMARY KEY (`OrderNo`),
  CONSTRAINT `shipping_ibfk_1` FOREIGN KEY (`OrderNo`) REFERENCES `CustOrder` (`OrderNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ShoppingCart`
--

DROP TABLE IF EXISTS `ShoppingCart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ShoppingCart` (
  `ItemQuantity` int(11) DEFAULT NULL,
  `ShoppingCartID` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerID` int(11) DEFAULT NULL,
  `ItemID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ShoppingCartID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `ItemID` (`ItemID`),
  CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`ID`),
  CONSTRAINT `shoppingcart_ibfk_2` FOREIGN KEY (`ItemID`) REFERENCES `Item` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Updates`
--

DROP TABLE IF EXISTS `Updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Updates` (
  `DateUpdated` datetime DEFAULT NULL,
  `TransactionNumber` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`TransactionNumber`),
  KEY `EmployeeID` (`EmployeeID`),
  CONSTRAINT `updates_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `Employee` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-08 19:51:23
