-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.24-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Zrzut struktury bazy danych agreements_manager
CREATE DATABASE IF NOT EXISTS `agreements_manager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `agreements_manager`;

-- Zrzut struktury tabela agreements_manager.agreements
CREATE TABLE IF NOT EXISTS `agreements` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `institutionName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `institutionCity` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `institutionStreet` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `institutionZipCode` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personForContact` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personForContactMail` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personForContactPhone` int(9) DEFAULT NULL,
  `responseDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `offerSendingDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agreementNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agreementStartDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agreementEndDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeId1` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeId2` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `executionDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reportId` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reportDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceAmount` float(8,2) DEFAULT NULL,
  `invoiceDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `employeeId1` (`employeeId1`) USING BTREE,
  KEY `employeeId2` (`employeeId2`),
  CONSTRAINT `FK_agreements_employees` FOREIGN KEY (`employeeId1`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `FK_agreements_employees_2` FOREIGN KEY (`employeeId2`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli agreements_manager.agreements: ~0 rows (około)
INSERT INTO `agreements` (`id`, `institutionName`, `institutionCity`, `institutionStreet`, `institutionZipCode`, `personForContact`, `personForContactMail`, `personForContactPhone`, `responseDate`, `offerSendingDate`, `agreementNo`, `agreementStartDate`, `agreementEndDate`, `employeeId1`, `employeeId2`, `executionDate`, `reportId`, `reportDate`, `invoiceAmount`, `invoiceDate`, `notes`) VALUES
	('8aaa608b-2acc-4f26-8105-6f27a91f699b', 'Instytucja Pierwsza', 'Adamów', 'Adamowa 2', '10-100', 'Adam Adamski', 'adam.adamski@mail.com', 321321321, '2023-04-03', '', '', '', '', NULL, NULL, '', '', '', 0.00, '', ''),
	('2473507f-58aa-452e-a784-76c25eddb0fd', 'Instytucja Druga', 'Testerko', 'Testerkowa 3', '10-200', 'Test Testowy', 'test.testowy@mail.com', 654456654, '', '2023-04-14', '', '2023-04-11', '', '3f31eb75-12f2-4b0c-9b8f-fed436f56002', 'fdaf8e57-efce-4637-8232-0369d7dd8ed2', '', '', '', 80000.00, '', ''),
	('245f178a-fc2b-441e-95b7-80292ebc7122', 'Instytutcja Czwarta', 'Łódź', 'Łódzka 6', '90-300', 'Bałuciak Ludzki', 'baluciak.lodzki@mail.com', 987456321, '2023-03-24', '2023-03-29', '2314/4569/umowa/numer-4', '2023-03-30', '2023-05-30', '3d40e744-44f7-4ec5-a82b-57f80deb03d2', 'fdaf8e57-efce-4637-8232-0369d7dd8ed2', '2023-04-19', 'rapoty/numer-4', '2023-04-21', 12000.00, '2023-04-28', '');

-- Zrzut struktury tabela agreements_manager.agreements_archive
CREATE TABLE IF NOT EXISTS `agreements_archive` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `institutionName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `institutionCity` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `institutionStreet` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `institutionZipCode` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personForContact` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personForContactMail` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personForContactPhone` int(9) DEFAULT NULL,
  `responseDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `offerSendingDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agreementNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agreementStartDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agreementEndDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeId1` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeId2` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `executionDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reportId` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reportDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceAmount` float(8,2) DEFAULT NULL,
  `invoiceDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `employeeId1` (`employeeId1`) USING BTREE,
  KEY `employeeId2` (`employeeId2`) USING BTREE,
  CONSTRAINT `agreements_archive_ibfk_1` FOREIGN KEY (`employeeId1`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `agreements_archive_ibfk_2` FOREIGN KEY (`employeeId2`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Zrzucanie danych dla tabeli agreements_manager.agreements_archive: ~0 rows (około)
INSERT INTO `agreements_archive` (`id`, `institutionName`, `institutionCity`, `institutionStreet`, `institutionZipCode`, `personForContact`, `personForContactMail`, `personForContactPhone`, `responseDate`, `offerSendingDate`, `agreementNo`, `agreementStartDate`, `agreementEndDate`, `employeeId1`, `employeeId2`, `executionDate`, `reportId`, `reportDate`, `invoiceAmount`, `invoiceDate`, `notes`) VALUES
	('85dfa09d-dd81-40c1-9bee-c2b619bce026', 'Instytucja Trzecia', 'Katusze', 'Katuska 5', '20-300', 'Mega Kursowy', 'mega.kursowy@mail.com', 789987899, '2023-03-06', '2023-03-08', '2314/4569/umowa/numer-2', '2023-03-13', '2023-06-13', '3d40e744-44f7-4ec5-a82b-57f80deb03d2', '3f31eb75-12f2-4b0c-9b8f-fed436f56002', '2023-04-04', 'rapoty/numer-2', '2023-04-07', 25000.00, '2023-04-10', '');

-- Zrzut struktury tabela agreements_manager.employees
CREATE TABLE IF NOT EXISTS `employees` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli agreements_manager.employees: ~3 rows (około)
INSERT INTO `employees` (`id`, `firstName`, `lastName`, `email`, `phone`) VALUES
	('3d40e744-44f7-4ec5-a82b-57f80deb03d2', 'Testowa', 'Osoba', 'testowa.osoba@mail.pl', '123123123'),
	('3f31eb75-12f2-4b0c-9b8f-fed436f56002', 'Nowa', 'Testowa', 'nowa.testowa@mail.com', '456456456'),
	('fdaf8e57-efce-4637-8232-0369d7dd8ed2', 'Kursowa', 'Kursantka', 'kursowa.kursantka@mail.com', '789789789');

-- Zrzut struktury tabela agreements_manager.employees_archive
CREATE TABLE IF NOT EXISTS `employees_archive` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Zrzucanie danych dla tabeli agreements_manager.employees_archive: ~1 rows (około)
INSERT INTO `employees_archive` (`id`, `firstName`, `lastName`, `email`, `phone`) VALUES
	('4a0bb90d-6721-4556-94be-e1492bd3586e', 'Jola', 'Ka', 'jo.ka@mail.com', '456987456');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
