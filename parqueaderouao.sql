-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: parqueaderouao
-- ------------------------------------------------------
-- Server version	5.7.11-log

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
-- Table structure for table `entradas`
--

DROP TABLE IF EXISTS `entradas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entradas` (
  `idEntrada` int(11) NOT NULL AUTO_INCREMENT,
  `placaVehiculoEntrada` varchar(6) NOT NULL,
  `horaEntrada` datetime NOT NULL,
  PRIMARY KEY (`idEntrada`),
  KEY `placaVehiculoEntrada` (`placaVehiculoEntrada`),
  CONSTRAINT `entradas_ibfk_1` FOREIGN KEY (`placaVehiculoEntrada`) REFERENCES `vehiculos` (`placa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entradas`
--

LOCK TABLES `entradas` WRITE;
/*!40000 ALTER TABLE `entradas` DISABLE KEYS */;
/*!40000 ALTER TABLE `entradas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fichas`
--

DROP TABLE IF EXISTS `fichas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fichas` (
  `numero` varchar(15) NOT NULL,
  `codigoUsuarioFicha` varchar(10) NOT NULL,
  `placaVehiculoFicha` varchar(6) NOT NULL,
  PRIMARY KEY (`numero`),
  KEY `codigoUsuarioFicha` (`codigoUsuarioFicha`),
  KEY `placaVehiculoFicha` (`placaVehiculoFicha`),
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`codigoUsuarioFicha`) REFERENCES `usuarios` (`codigo`),
  CONSTRAINT `fichas_ibfk_2` FOREIGN KEY (`placaVehiculoFicha`) REFERENCES `vehiculos` (`placa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
/*!40000 ALTER TABLE `fichas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `identificacionRol` tinyint(1) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) NOT NULL,
  `codigoUsuario` varchar(10) NOT NULL,
  PRIMARY KEY (`identificacionRol`),
  KEY `codigoUsuario` (`codigoUsuario`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`codigoUsuario`) REFERENCES `usuarios` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salidas`
--

DROP TABLE IF EXISTS `salidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salidas` (
  `idSalida` int(11) NOT NULL AUTO_INCREMENT,
  `placaVehiculoSalida` varchar(6) NOT NULL,
  `horaSalida` datetime NOT NULL,
  PRIMARY KEY (`idSalida`),
  KEY `placaVehiculoSalida` (`placaVehiculoSalida`),
  CONSTRAINT `salidas_ibfk_1` FOREIGN KEY (`placaVehiculoSalida`) REFERENCES `vehiculos` (`placa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salidas`
--

LOCK TABLES `salidas` WRITE;
/*!40000 ALTER TABLE `salidas` DISABLE KEYS */;
/*!40000 ALTER TABLE `salidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ultimo_conductor`
--

DROP TABLE IF EXISTS `ultimo_conductor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ultimo_conductor` (
  `codigoUltimoConductor` varchar(10) NOT NULL,
  `placaVehiculoUltimoConductor` varchar(6) NOT NULL,
  `ultimaFotoConductor` blob NOT NULL,
  PRIMARY KEY (`codigoUltimoConductor`),
  KEY `placaVehiculoUltimoConductor` (`placaVehiculoUltimoConductor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ultimo_conductor`
--

LOCK TABLES `ultimo_conductor` WRITE;
/*!40000 ALTER TABLE `ultimo_conductor` DISABLE KEYS */;
/*!40000 ALTER TABLE `ultimo_conductor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `codigo` varchar(10) NOT NULL,
  `nombre1` varchar(10) NOT NULL,
  `nombre2` varchar(10) DEFAULT NULL,
  `apellido1` varchar(10) NOT NULL,
  `identificacionUsu` varchar(10) NOT NULL,
  `edad` int(11) NOT NULL,
  `foto` blob NOT NULL,
  `pago` tinyint(1) NOT NULL,
  `pagoVencimiento` datetime NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehiculos` (
  `placa` varchar(6) NOT NULL,
  `modelo` varchar(15) NOT NULL,
  `color` varchar(10) NOT NULL,
  `horaEntrada` datetime NOT NULL,
  `idVehiculo` int(11) NOT NULL,
  PRIMARY KEY (`placa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
INSERT INTO `vehiculos` VALUES ('ASDFGH','2012','Azul','2016-04-09 21:28:05',0),('QWERTY','2011','Verde','2016-04-09 21:27:35',0),('sdf21f','2015','Rojo','2016-04-09 20:36:31',0),('ZXCVBN','2013','Amarillo','2016-04-09 21:30:41',0);
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-09 22:33:29
