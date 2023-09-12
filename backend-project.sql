-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2023 at 05:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend-project`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `articleTopic` varchar(512) NOT NULL,
  `headline` varchar(512) NOT NULL,
  `articleDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `textBlock` varchar(2560) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `articleTopic`, `headline`, `articleDate`, `textBlock`) VALUES
(1, 'Management', 'Hilton: Sauron Becomes CEO', '2023-06-25 17:13:35', 'Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem. Adipiscing veni amet luctus enim sem libero tellus viverra venenatis aliquam. Commodo natoque quam pulvinar elit. Eget aenean tellus venenatis. Donec odio tempus. Felis arcu pretium metus nullam quam aenean sociis quis sem neque vici libero. Venenatis nullam fringilla pretium magnis aliquam nunc vulputate integer augue ultricies cras. Eget viverra feu'),
(2, 'Net Zero', 'Tronald Dump Builds a Wall on His Allotment', '2023-07-15 20:13:35', 'Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem. Adipiscing veni amet luctus enim sem libero tellus viverra venenatis aliquam. Commodo natoque quam pulvinar elit. Eget aenean tellus venenatis. Donec odio tempus. Felis arcu pretium metus nullam quam aenean sociis quis sem neque vici libero. Venenatis nullam fringilla pretium magnis aliquam nunc vulputate integer augue ultricies cras. Eget viverra feugiat cras ut. Sit natoque montes tempus ligula eget vitae pede rhoncus maecenas consectetuer commodo condimentum aenean.'),
(3, 'Gossip', 'Bank of England: The PhDs May Be Correct, Or Not', '2023-07-29 20:14:35', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
(4, 'M&A', 'Travelodge: Rats and Cockroaches Battle for Control of Hotel Portfolio', '2023-08-19 20:15:55', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
(6, 'Important update', 'Our new blog', '2023-08-20 11:59:00', 'Lorem ipsum is overrated!'),
(8, 'Testing sorting by date', 'Latest blog post', '2023-08-20 15:26:19', 'This text will show at the top, because it\'s the latest!'),
(12, 'Test', 'Hello', '2023-09-09 23:00:00', 'This is a second major text of the blog interface. This is a second major text of the blog interface.This is a second major text of the blog interface.This is a second major text of the blog interface.This is a second major text of the blog interface.This is a second major text of the blog interface.This is a second major text of the blog interface.This is a second major text of the blog interface.This is a second major text of the blog interface.This is a second major text of the blog interface.This is a second major text of the blog interface.This is a second major text of the blog interface.');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(32) NOT NULL,
  `surname` varchar(32) NOT NULL,
  `company` varchar(32) NOT NULL,
  `email` varchar(128) NOT NULL,
  `phone` varchar(64) NOT NULL,
  `contactDate` date NOT NULL,
  `job` varchar(64) NOT NULL,
  `role` varchar(64) NOT NULL,
  `city` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `userId`, `created`, `name`, `surname`, `company`, `email`, `phone`, `contactDate`, `job`, `role`, `city`) VALUES
(1, 8, '2023-08-30 14:49:34', 'Nathaniel', 'Rothschild', 'Rothschild & Co.', 'n@rothschild.com', '2147483647', '2023-08-18', 'MD', 'investor', 'London'),
(2, 8, '2023-08-30 15:17:10', 'James', 'Rothschild', 'Rothschild & Co.', 'j@rothschild.com', '2147483647', '2023-08-12', 'Chairman', 'investor', 'New York'),
(3, 8, '2023-08-30 15:27:51', 'Lior', 'Rothschild', 'GC', 'l@gc.com', '07777600800', '2023-03-06', 'MD', 'investor', 'London'),
(4, 8, '2023-08-30 17:58:17', 'Rocco', 'Forte', 'RF', 'rf@rfhotels.com', '077712345678', '2023-06-02', 'Founder', 'investor', 'London'),
(8, 8, '2023-08-30 18:36:48', 'Donald', 'Bigbuck', 'Donald\'s', 'dick@bigbuck.com', '001123456789', '2023-08-28', 'CEO', 'investor', 'Salt Lake City'),
(9, 8, '2023-08-30 20:15:51', 'Abdul', 'Al Thani', 'UAE Sovereign', 'ay@crown.dubai', '004878912345', '2023-02-06', 'Emir', 'investor', 'Dubai'),
(11, 8, '2023-09-01 10:05:05', 'Alfred', 'Nobel', 'Nobel & Co.', 'a@nobel.no', '00122354567', '2023-08-22', 'CEO', 'advisor', 'Oslo'),
(13, 8, '2023-09-01 10:06:24', 'Cynthia', 'Calderone', 'Cocos', 'cc@cocos.es', '0035412654479', '2023-08-28', 'Analyst', 'broker', 'Madrid'),
(14, 8, '2023-09-01 10:07:13', 'Deborah', 'Johnson', 'C&W', 'd@candw.com', '00145678912', '2023-08-31', 'Associate', 'broker', 'New York'),
(15, 8, '2023-09-01 10:07:51', 'Eva', 'Greene', 'C&W', 'e@candw.co.uk', '07841354697', '2023-08-29', 'Analyst', 'investor', 'London'),
(16, 8, '2023-09-01 10:08:33', 'Frederica', 'Noble', 'Noble & Co.', 'f@noble.com', '0044567897456', '2022-08-30', 'Owner', 'investor', 'London'),
(22, 8, '2023-09-04 20:13:50', 'Yehuda', 'Vrangel', '', 'yehuda@gmail.com', '074561236548', '2023-08-29', '', 'broker', 'Tel Aviv');

-- --------------------------------------------------------

--
-- Table structure for table `investors`
--

CREATE TABLE `investors` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `investorName` varchar(32) NOT NULL,
  `strategyName` varchar(64) NOT NULL,
  `assetClass` varchar(32) NOT NULL,
  `development` varchar(32) NOT NULL,
  `futureAssetClass` varchar(32) NOT NULL,
  `targetDescription` tinytext NOT NULL,
  `targetGeography` tinytext NOT NULL,
  `minSize` int(11) NOT NULL,
  `maxSize` int(11) NOT NULL,
  `ccy` varchar(16) NOT NULL,
  `minWalb` float NOT NULL,
  `maxWalb` float NOT NULL,
  `minYield` float NOT NULL,
  `contactId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `investors`
--

INSERT INTO `investors` (`id`, `userId`, `created`, `investorName`, `strategyName`, `assetClass`, `development`, `futureAssetClass`, `targetDescription`, `targetGeography`, `minSize`, `maxSize`, `ccy`, `minWalb`, `maxWalb`, `minYield`, `contactId`) VALUES
(1, 8, '2023-08-30 19:10:34', 'BigBuck Fund', 'Value add office allocation', 'office', 'development', 'hotel', 'Repositioning of Grade C office stock into owner-operated US loft-style apart-hotels. ', 'South East England,South West England,Greater London,Central London', 7500000, 50000000, 'GBP', 0, 3, 7.25, 8),
(2, 8, '2023-08-30 20:17:58', 'Al Thani Family Office', 'Retail value-add fund', 'retail', 'development', 'student', 'Acquisition of big-box retail assets during consumer recession with the intention to redevelop into student housing. ', 'Greater London,Central London,South East England,South West England', 25000000, 500000000, 'GBP', 0, 5, 5, 9),
(4, 8, '2023-09-04 20:14:48', 'Haredi family', 'Retail value-add stratagy', 'retail', 'completed', '', 'Acquisition of shopping centres at low capital value. ', 'Northern England,Midlands,South West England,South East England,Greater London,Central London', 5000000, 50000000, 'GBP', 0, 30, 10, 22);

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(64) NOT NULL,
  `street` varchar(128) NOT NULL,
  `city` varchar(64) NOT NULL,
  `postcode` varchar(32) NOT NULL,
  `lat` int(16) NOT NULL,
  `lon` int(16) NOT NULL,
  `price` int(16) NOT NULL,
  `ccy` varchar(16) NOT NULL,
  `tenure` varchar(32) NOT NULL,
  `groundRent` int(16) NOT NULL,
  `leaseholdTerm` int(11) NOT NULL,
  `dealType` varchar(64) NOT NULL,
  `development` varchar(32) NOT NULL,
  `gdv` int(16) NOT NULL,
  `capex` int(16) NOT NULL,
  `units` varchar(16) NOT NULL,
  `siteArea` int(16) NOT NULL,
  `areaGross` int(16) NOT NULL,
  `areaNet` int(16) NOT NULL,
  `futureAreaGross` int(16) NOT NULL,
  `futureAreaNet` int(16) NOT NULL,
  `passingRent` int(16) NOT NULL,
  `opex` int(16) NOT NULL,
  `passingNoi` int(16) NOT NULL,
  `futureRent` int(16) NOT NULL,
  `futureOpex` int(16) NOT NULL,
  `futureNoi` int(16) NOT NULL,
  `occupancy` int(16) NOT NULL,
  `leaseBreak` date NOT NULL,
  `leaseExpiry` date NOT NULL,
  `assetClass` varchar(32) NOT NULL,
  `futureAssetClass` varchar(32) NOT NULL,
  `feeStructure` varchar(32) NOT NULL,
  `brokerFee` float NOT NULL,
  `image` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `userId`, `created`, `name`, `street`, `city`, `postcode`, `lat`, `lon`, `price`, `ccy`, `tenure`, `groundRent`, `leaseholdTerm`, `dealType`, `development`, `gdv`, `capex`, `units`, `siteArea`, `areaGross`, `areaNet`, `futureAreaGross`, `futureAreaNet`, `passingRent`, `opex`, `passingNoi`, `futureRent`, `futureOpex`, `futureNoi`, `occupancy`, `leaseBreak`, `leaseExpiry`, `assetClass`, `futureAssetClass`, `feeStructure`, `brokerFee`, `image`) VALUES
(3, 8, '2023-08-27 13:21:18', 'Building A', '45 Gordon Square', 'London', 'WC3D 7WQ', 0, 0, 15000000, 'GBP', 'leasehold', 10000, 150, 'assetDeal', 'development', 25000000, 5000000, 'sqft', 3000, 20000, 15000, 25000, 20000, 500000, -50000, 450000, 1000000, -200000, 800000, 100, '2027-08-23', '2037-08-22', 'office', 'residential', 'seller', 2, 'image_1694021211564.jpg'),
(4, 8, '2023-08-27 14:32:47', 'Sutton House', '78 Sutton Square', 'Sutton', 'SU1 7ER', 0, 0, 15000000, 'GBP', 'leasehold', 10000, 150, 'assetDeal', 'completed', 0, 0, 'sqft', 0, 20000, 15000, 0, 0, 750000, -250000, 500000, 0, 0, 0, 80, '2028-08-26', '2033-08-27', 'residential', '', 'buyer', 1, 'image_1694021413732.jpg'),
(6, 8, '2023-08-27 14:53:20', '', '120 High Holborn', 'London', 'WC1V 7AA', 0, 0, 120000000, 'GBP', 'freehold', 0, 0, 'assetDeal', 'completed', 0, 0, 'sqft', 0, 200000, 180000, 0, 0, 6800000, -100000, 6700000, 0, 0, 0, 87, '2025-02-11', '2027-02-11', 'office', '', 'buyer', 1.5, ''),
(7, 8, '2023-08-27 18:26:25', 'Building C', '47 Rachman Street', 'London', 'W1K 5PQ', 0, 0, 10000000, 'GBP', 'freehold', 0, 0, 'shareDeal', 'completed', 0, 0, 'sqft', 0, 30000, 24000, 0, 0, 780000, 0, 780000, 0, 0, 0, 100, '0000-00-00', '0000-00-00', 'hotel', '', 'buyer', 5, ''),
(8, 8, '2023-08-27 18:38:36', 'Dolphin Square Buildings', '212 Dolphin Square', 'London', 'SW1V 3NQ', 0, 0, 200000000, 'GBP', 'freehold', 0, 0, 'assetDeal', 'completed', 0, 0, 'sqft', 0, 250000, 200000, 0, 0, 12000000, -2000000, 10000000, 0, 0, 0, 100, '0000-00-00', '0000-00-00', 'residential', '', 'buyer', 1.25, 'image_1693768764100.jpg'),
(9, 8, '2023-08-27 19:13:55', 'OpernTurm', 'Bockenheimer Landstraße 2-4', 'Frankfurt', '60325', 0, 0, 500000000, 'EUR', 'freehold', 0, 0, 'assetDeal', 'completed', 0, 0, 'sqm', 0, 140000, 100000, 0, 0, 30000000, -3000000, 27000000, 0, 0, 0, 100, '2030-01-01', '2040-01-01', 'office', '', 'buyer', 1.5, 'image_1693768735988.jpg'),
(12, 7, '2023-08-28 20:19:34', 'The Adams Building', '78 Adams Street', 'London', 'WC2X 5HQ', 0, 0, 10000000, 'GBP', 'freehold', 0, 0, 'assetDeal', 'completed', 0, 0, 'sqft', 0, 15000, 10000, 0, 0, 250000, -75000, 175000, 0, 0, 0, 90, '2026-02-26', '2028-08-28', 'office', '', 'buyer', 1.75, '');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `token_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`token_id`, `user_id`, `token`) VALUES
(1, 8, '458e051a-013b-498a-8e71-dbb06bf7d852'),
(2, 1, '5ebe78f9-13f6-44fe-8114-d8647631444d'),
(3, 1, 'ffae3824-ad50-4413-8a88-8f553138f993'),
(4, 1, '8bfb85ee-af66-4459-b2e2-cd5828dbf95d'),
(5, 1, 'a931d994-f44e-4d4a-a1fa-f15560481531'),
(6, 1, '5f9a427f-0f75-4f9c-b664-c2b3256517e5'),
(7, 1, 'be083480-6892-4a56-8c1a-1d529939c742'),
(8, 1, '38fec4d8-e8b5-41b3-97f0-10becfe98a22'),
(9, 1, '5f38f9c5-e7de-4707-9ab7-054f54671847'),
(10, 1, '06edebc4-ec64-43f3-b63f-3a305e34a515'),
(11, 1, '5df8b4fe-3a1b-46ab-a0f0-37719e8fe6b7'),
(12, 1, '26fdddb5-4785-4757-9817-f745a30ccbd5'),
(13, 1, '61ca94a6-f0c9-42be-a1d7-272efe28f511'),
(14, 1, 'db6e60ba-720b-4323-b1d3-a96e6a8ad8bd'),
(15, 1, '4fd0c0ca-a170-4dce-8e03-9250ef618944'),
(16, 1, 'a35bbdb5-3173-4deb-a294-9ce085ac7b93'),
(17, 1, '2dd0c0cc-c773-4f19-87c0-b7982b54606d'),
(18, 1, '2bfc9b81-d61a-46ae-b1da-51d0664370ad'),
(19, 1, 'aa3771cd-57ea-44bc-9d12-aeeff20efe95'),
(20, 1, '3f367857-5963-4028-9ee6-9bab883f3afb'),
(21, 1, '58d6e34d-a171-4599-8afa-351a403133d5'),
(22, 1, '0deb71b0-09d9-4d89-8082-5259eddc49b6'),
(23, 1, '2a03dad8-71c5-4118-a584-f99e2a67c59e'),
(24, 1, 'f77a1c35-f74c-48a1-8b48-fcd7e80dafd9'),
(25, 1, '505bc34a-eb0e-4c1a-866a-6328bc6352ed'),
(26, 1, 'abbc19f6-526b-48b5-81f4-d3088fc27c5a'),
(27, 1, 'ce87aa20-6132-4bc7-9f66-d9418754f2e6'),
(28, 1, '7248b415-ff11-4e85-a717-8d60d3aca703'),
(29, 1, '865b4d77-e3b0-419a-a911-9dce9d393bbd'),
(30, 1, '496dbd03-e358-48cb-834f-b01d4a8c315e'),
(31, 1, 'ba1c8603-b096-4251-a351-b3a8dd5ded20'),
(32, 1, 'fe722f05-c1a0-4bb1-ab48-81ebfdadd808'),
(33, 1, '7b3facee-1737-45d9-831c-fcfebc9efb5a'),
(34, 1, 'a7539389-74db-42b1-afba-58dec4344955'),
(35, 1, '8380cedf-c98d-4245-bd95-b927748cd394'),
(36, 1, '121c8612-38d0-46d8-8745-e7916978baf5'),
(37, 1, '6655a222-0003-4737-944a-6fdace01cc5d'),
(38, 1, '2bf0450a-2e18-47cc-b3ac-4e4da7179738'),
(39, 1, '0622b1f3-291a-4e15-80e5-1fed92167924'),
(40, 1, '49305f3d-ceb0-4adc-8c07-636a48189710'),
(41, 1, 'ab04d35e-d2d3-45ec-89b0-0be5cc28fa7c'),
(42, 1, 'a10629c6-d6a2-43d3-90cf-102f2968cde7'),
(43, 1, '5a4b53ac-8a6f-4379-82c2-eba6658cb3fa'),
(44, 1, '5bc343cf-d6a9-498d-bec3-d0edcd20cc2c'),
(45, 1, '0d7652e6-8513-45d4-b1b6-92b0227a5b24'),
(46, 1, 'b825e8ed-d542-4bb1-b33a-a1e9ea00af57'),
(47, 1, 'ebbae3b6-e280-4e0c-a2fc-c7ac3ec8ac34'),
(48, 1, '4ff7689d-d425-42fa-8ad9-dd5846758891'),
(49, 1, 'e1903c61-ad24-4c62-a9d0-00d51eaca2a3'),
(50, 1, '999f5ae0-fd33-4f00-acb0-9f1d177f022c'),
(51, 1, '96e0aa75-e991-45e6-bdef-1979b6488c31'),
(52, 1, '25401e41-2ac5-40ad-9d0d-cf1c77457b60'),
(53, 1, 'af7bd0be-a8e0-4174-bc51-2953d2da0ed7'),
(54, 1, '36789050-8fed-4218-956e-575d0f472d44'),
(55, 1, '03f172da-b69b-4b95-9ed7-22fd498fab59'),
(56, 1, 'd9586410-0565-4019-8102-650376faabda'),
(57, 1, 'b39af7f5-ada1-4df8-95f0-ad6bab7987ab'),
(58, 1, '50963016-7cb0-4259-b7b0-ea03d02d94c8'),
(59, 1, '418e2a3a-3b37-4c8d-a8cd-14edbc3e224a'),
(60, 1, 'baf974b3-c2a7-4f86-9bd0-3537e2083dd5'),
(61, 1, '246af76e-8482-4656-b2a0-54c19b5bb08f'),
(62, 1, '63a68ef6-9613-49d9-93d4-76c1285b9d7d'),
(63, 1, '7da29bb4-4f16-4721-992d-cc3e83d12599'),
(64, 1, 'add7bcbf-06cf-493a-90a9-d5ac18701e10'),
(65, 1, '76e385bd-67de-4059-bcd1-76570399a1ac'),
(66, 1, '433f3d0c-1556-44b6-a8d1-6af695194fd3'),
(67, 1, 'a662e170-88c4-471d-a7a4-b708fd67035c'),
(68, 1, 'c0682f51-996b-4a54-a68f-1c7a615f0f03'),
(69, 1, 'b0f20f0c-2f83-4cb8-996f-10b6602f2706'),
(70, 1, 'd17db905-804e-438b-a551-78cc0105454b'),
(71, 1, '49f448d3-27ea-4e7e-9601-fdf06a9d1861'),
(72, 1, 'c01932f0-568d-4c28-aca2-e91d2d18c4e2'),
(73, 1, '72c186a9-cffa-4c2a-815f-d9dcf95eee0a'),
(74, 1, '9113ffba-85e5-44cf-b97e-aa831498887b'),
(75, 1, '4043cdc1-6a44-4314-b4c0-22c23317a5ce'),
(76, 1, 'a44c3b8d-8f0a-4815-8369-d94506ca6305'),
(77, 1, '09ed6172-6264-417d-9a7a-b93df6e444d9'),
(78, 1, '9605c03c-f765-498e-8b1b-5a7b08768aa1'),
(79, 1, '5f7568cb-c1d6-472b-a1a5-4f89c1c327ab'),
(80, 1, 'bd460b3b-270f-4277-b60b-2e2725190a62'),
(81, 1, '2b59c39f-4925-4aff-8082-0eeba38b29ba'),
(82, 1, 'c8caf9c3-50b9-48df-8c31-1477d2324a61'),
(83, 1, '511a000a-8022-4567-bb23-8f9bca1295b8'),
(84, 1, '7fb3f056-b74b-4796-9722-0aa152e92383'),
(85, 1, '4f7c2240-4ff7-4f94-ba3e-af3569ac2f16'),
(86, 1, 'b162e57f-dc3a-488f-b3d5-cb4968cf047c'),
(87, 1, 'a7bb3c9b-4872-4431-b3b6-6af3b1ccb8d7'),
(88, 1, '5fe103af-419e-438f-b45c-d0d498ca7052'),
(89, 1, '16c32756-815f-4f10-8268-ffec52b91e02'),
(90, 1, 'd3391b23-15f8-46b7-9b6e-9902b0969e90'),
(91, 1, '8d65fbfe-30f9-4a29-bf06-fd35d5ca12ee'),
(92, 1, '2ff4cce0-c150-40d5-baf0-5f22138b0585'),
(93, 1, 'c8f289ef-7e0c-47df-87ed-1396573ec7ab'),
(94, 1, '1fce7e45-5bf3-4401-99cb-3e19656f10e5'),
(95, 1, '17818f65-97b4-4a0a-9bb3-7c5e5e53b639'),
(96, 1, '1218882d-9636-4ea0-9a9f-a2d2b0083dcb'),
(97, 1, '33ec2bde-07ce-4c03-91e7-bbe59037c84e'),
(98, 1, '3b7e5b97-8730-42a8-827b-4a558907e6bc'),
(99, 1, '2e2677dd-9247-4461-a33b-d5c9b519c8c8'),
(100, 1, '7eb22cae-de60-453d-bbea-e309ce8fe91b'),
(101, 1, 'b7523da4-94ce-4f99-9b33-16069039aa09'),
(102, 1, '5ff950f5-f112-463f-84b7-f06cdffcd0b8'),
(103, 1, '5f9060ea-8926-4d50-8e90-c4c6082e974a'),
(104, 1, '3e87c737-01d6-4f43-9881-e594423ab2ae'),
(105, 1, 'a15cec14-7840-41ea-9fa8-951eee6b8a46'),
(106, 1, 'a2bfb1e9-9155-432e-b8f2-fa42c4f99a0f'),
(107, 1, 'b3427487-2e89-4abf-b368-e5c1ea6abc64'),
(108, 1, '48189b01-533d-4b76-a4dc-81c227d129d9'),
(109, 1, 'd40c38c0-3b6a-47b9-b041-7f05d8984c52'),
(110, 1, 'b4f25a03-2c12-4fae-b34c-94c65765cd5a'),
(111, 1, '1e8ec2b9-0c17-4aff-b4e9-37f771485e13'),
(112, 1, '57d9e79c-6ae5-4750-bdd9-310b37b630bb'),
(113, 1, '01539db8-e86f-4ea7-b22c-117ea8171b67'),
(114, 1, '77235b4b-5d02-42ac-ac66-b6b88cd28960'),
(115, 1, 'a6ae1694-22b3-449f-a647-d9999206ac98'),
(116, 1, 'b2ec509c-f147-4a55-8ff8-1f109255303b'),
(117, 1, 'fdd1cde2-dfbf-4db1-8cdc-726a4bec9f6a'),
(118, 1, '32cd5905-16db-4c0d-9ea0-edd2f1e35a94'),
(119, 1, 'f53f4092-d471-4e3d-95b7-766055826e8a'),
(120, 1, '946b2965-a363-4283-a5b6-14ee637ed5a1'),
(121, 1, '10ac6497-9270-47a7-a312-4818986fbcb8'),
(122, 1, '0ff16fc6-15d0-492e-8c6c-53732858833c'),
(123, 1, '6363ceea-8c28-4e5d-ac0f-498d310638aa'),
(124, 1, '94b063c3-c868-4607-a70e-b7c5b4a95861'),
(125, 1, '95c8e815-53d9-4dc5-9eab-8ed60d8aa72e'),
(126, 1, 'bf6f27d6-8de1-4afa-a3c6-cd8819b37d40'),
(127, 1, '4f9a382d-5337-452d-a01a-e91d47b99abe'),
(128, 1, '64645f83-8044-41ab-9b3d-d9accc243f70'),
(129, 1, 'ae86204a-fc49-4774-b3a6-ca201d5feb76'),
(130, 1, '43079f5d-dc9c-4fe7-8338-40ad700e95e9'),
(131, 1, 'ef42f0d0-8cbc-4e22-a503-e91ccf685e3a'),
(132, 1, '35ac27e9-d79d-4d6a-90ee-43eb3548873b'),
(133, 1, '140bb608-2f07-45c1-9a1f-1f5c61f38d52'),
(134, 1, 'e24d5d69-8d22-40ae-b65a-208f9e230b7f'),
(135, 1, 'ffc284b3-997c-4161-b2ad-0a18fbfa7511'),
(136, 1, 'c53543f0-586d-439a-9b9f-8a56cd8b749c'),
(137, 1, '41e24395-63f7-4241-b4bb-67f14c1f42de'),
(138, 1, 'dced8666-2ffd-4f3a-840e-22b8ab0985a9'),
(139, 1, '506de511-2d52-4089-8251-06bb7da032c5'),
(140, 1, 'ac35556f-d294-497e-ae3c-521609db5aba'),
(141, 1, '2a44caf1-9c3d-4e57-b082-1a86198dd8ee'),
(142, 1, 'd0a15bce-4902-410e-854b-e356d70055c3'),
(143, 1, '023fb80d-3c1c-48fb-8716-1faed40a1336'),
(144, 1, 'c3c72a3b-b02c-40f2-9ff2-5c3081ad4a05'),
(145, 1, '970b9e18-0c13-4540-9740-7f8ab3985f76'),
(146, 1, '4a935489-087c-49d0-a891-be9a9877b20e'),
(147, 1, '902668e9-a323-458e-b942-8bf1e3c3b085'),
(148, 1, 'd26987dd-d20a-4863-bca6-f13ac8913f5c'),
(149, 1, '3b5f677e-6acd-414e-981a-6c70953dff0e'),
(150, 11, 'd820d5b0-b8eb-47d8-b95d-ead123b60412'),
(151, 11, '3ce078e3-cc69-43ce-8753-208d1220d1c3'),
(152, 11, '0ffe4558-8a84-4d50-96d4-d51f914c9669'),
(153, 11, '9ef93cc4-672b-42e4-9f98-48cfaa0cd564'),
(154, 11, 'b5b645b6-038d-4be8-b280-8338cca3e465'),
(155, 11, '13cb0f5d-bb7b-46a8-89bd-6ad97081e9cb'),
(156, 11, '81fd9cca-6331-4e2e-82b8-913bba6e591e'),
(157, 4, '6ea441d3-4a07-4209-b30c-745aaeb60e0b'),
(158, 4, 'f198757a-07bb-48b7-91a7-e63537bf0671'),
(159, 4, 'daf7949a-2ef7-47b6-9c9c-21e86bfef029'),
(160, 4, 'e1e0f4db-70fa-4735-be81-e446026995f9'),
(161, 4, 'ba0ec6a4-5265-4f9d-bb9e-fbae015c4198'),
(162, 4, '788a82e6-8e8f-4f48-b476-9e3effcaecfb'),
(163, 4, 'eecbffcb-8286-4915-83ab-bee3a8f2deb1'),
(164, 4, '1d7acef3-bfe3-4307-a049-f664c6fe21a9'),
(165, 4, 'c126044c-1093-47bf-8d15-3f470168b5f1'),
(166, 4, '76d62a96-40d7-4744-a509-2c5f33d57b44'),
(167, 4, '2f7d04fa-3f66-4fac-8fc9-3a939d198ff7'),
(168, 4, '23862d98-375c-4da5-a65e-7c40bd62f22d'),
(169, 4, '331cdbdf-16cc-4bc0-8a55-1a799a90f9e0'),
(170, 4, 'b95b0a33-e540-44dd-b2f5-1de926299689'),
(171, 4, '014bc378-cd0e-4ab2-8061-165214dda542'),
(172, 4, '14e0f4a9-47a0-4218-ae68-820b9669b595'),
(173, 4, '886ab369-bb55-4851-9363-2acd4e126f13'),
(174, 5, '2a39ef64-bd67-47d8-8340-d76422b91299'),
(175, 7, '3aeac83b-313d-4866-a636-507ebd7c7e6a'),
(176, 8, '0ee4a81f-b5bf-47ac-94c6-d08a2501fe67'),
(177, 8, '7355f49f-4580-4d82-b293-174495878342'),
(178, 8, 'ed0647b1-8b5b-46a9-ac77-e84adba1c8da'),
(179, 7, 'a179614b-76d8-4f64-8980-45b9d676d2bf'),
(180, 7, 'ba7d6034-fcc7-4ad9-801a-00dc3ca545cf'),
(181, 8, '96429a71-f57b-474c-a629-d93ab74881d7'),
(182, 7, 'fb618918-6452-4e77-bb43-29ca46101a4b'),
(183, 8, '0ad803d7-f6a4-449a-bba7-0b29c8c42775'),
(184, 8, 'f0090eab-ad20-4b7f-80b1-2c6c5eb9467a'),
(185, 8, '9a7d48b5-c4c0-492f-84b7-40dff78d97ce'),
(186, 8, '8427ea70-1b20-46a7-b9ce-316bc956a427'),
(187, 7, 'e0894519-7c34-47d2-939d-27f34e4b873b'),
(188, 8, 'a24d51f5-9ceb-4420-9173-2e4059c980dd'),
(189, 7, '2e95ada7-f324-471c-b699-7a9e54fffb17'),
(190, 7, '3aa560fa-da2d-4de1-8e69-ba2b08aeced8'),
(191, 8, 'e1fe0fad-46d0-4b60-8f75-b58517f9a5ea'),
(192, 8, '313a3237-f4e2-4244-a6e3-f1f871f7673e'),
(193, 9, '39036cc6-c07e-4996-8183-743e23f5e1fa'),
(194, 9, 'c71fff00-a4be-4f5d-9ced-05d6c7113339'),
(195, 9, 'a0f999b6-d0ac-40b0-b1dc-e207f7f8ea9c'),
(196, 8, '0545a069-2cea-470f-a097-cf239a41f85c'),
(197, 9, '9b8a83cf-772f-4221-a0ae-b4483d404fad'),
(198, 10, '7a222cdf-f8bc-4ab2-b2a8-a8c68fb53a53'),
(199, 7, 'f2d937dc-e843-4ca5-890e-6b76467917ec'),
(200, 10, '49acdaa8-2e20-41b2-b40c-e42d02e45bea'),
(201, 10, '04925980-4fab-43ed-bc66-61bbefea4a97'),
(202, 8, '1d1cc156-7973-4fdb-aa79-9b59c371c1a2'),
(203, 11, 'd2f5dcdd-8931-40a1-8dc8-c393762e09bc'),
(204, 10, '318670f7-2eaa-4e2b-aba6-b519fe882935'),
(205, 8, '32307cbd-e48a-4e76-b04a-6260e2025a1d'),
(206, 8, '40d264ee-0a95-4c41-ad2c-cb0b7b7273c2'),
(207, 8, '5c6c58b5-29d8-4213-a4c6-bd6589868591'),
(208, 8, 'dc8f993b-2df7-4b5b-b714-927db3fb5348'),
(209, 8, 'fda829f1-cccb-4172-b8ad-8b0d16d31cf3'),
(210, 8, '9f01ff65-3461-426b-bf27-f010d62e1300'),
(211, 8, '621efc01-0bf7-4629-b8e1-cb89405c69ea'),
(212, 8, '599f0ed8-a173-4e5a-b174-a83309c13e99'),
(213, 8, 'add80322-51ab-45f8-b573-109ffad68dbb'),
(214, 8, 'e76abbc1-7bad-46e3-9a6a-36ecabf228f5'),
(215, 8, '69154b3d-810b-4124-b373-157a956df778'),
(216, 8, 'd073e3b5-fb0d-4e88-ae69-4455f936924c'),
(217, 8, '26322b7c-4d54-4a1b-89b7-20f9fcefd1d3'),
(218, 7, 'fb787e77-3c84-4b14-aa0d-992e48e97eb4'),
(219, 7, '34d3b821-3ede-4437-a704-dad460c7b800'),
(220, 8, '28dfa73f-1c92-43ed-b63e-48571f7973b9'),
(221, 8, '8e5e8f97-9146-4c1c-8e85-f897976ab8a8'),
(222, 8, 'd758d239-4a72-42f4-bf79-1360b958785a'),
(223, 10, '330b7168-6864-483a-ae5c-e1003c564758'),
(224, 10, '48366235-c393-41f7-bda6-a972bc58cbde'),
(225, 8, 'd206c47a-155a-4314-82c5-31bfa4385f7e'),
(226, 8, '933823ca-c311-4394-8652-812e95bfc5c4'),
(227, 8, '5e60a927-1304-42b3-98b4-074fc4e038c0'),
(228, 8, '71d71b0f-8853-4d06-b2af-9bf45e9068c7'),
(229, 8, '274da9a4-928c-43f2-8ee6-6307b4f1d9b6'),
(230, 8, '4594ed18-5609-4c52-9264-f62867519a18'),
(231, 8, '1e9ad544-89dc-4ffa-b597-1cf822feac53'),
(232, 8, 'a090e6ad-d648-4aaa-8d0f-6572ab860993'),
(233, 8, '30111ba3-b4e0-4771-b3ec-c12c9e05c644'),
(234, 7, 'b143fa03-2710-40ef-8ad7-20b156962792'),
(235, 8, '78bf3db4-52dc-4e36-bef8-4d2ee608dbe7'),
(236, 8, '059996bd-4832-4d0d-b24c-4de3011fb14c'),
(237, 8, '549ee70b-d893-43f5-9b77-63b71a9298d2'),
(238, 8, 'b7bbfca2-fb12-42a7-a4a2-46e7a658f140'),
(239, 8, '48b42213-0ee5-4584-a208-5f09235b5d2b'),
(240, 8, '2c962246-7406-4f5d-bdb6-473badac337e'),
(241, 8, '5c2c371f-e621-4af5-82fa-8598c476dc26'),
(242, 8, 'ceeabe52-d287-4247-baf7-3cdcc89c00ce'),
(243, 8, '6912e434-f1d3-431b-b725-4bfd3e33e129'),
(244, 8, '0148c642-fe7d-4b1f-a9f5-38a951309283'),
(245, 8, 'a2443e1e-1acb-4466-ada7-8632ba3da6ae'),
(246, 8, '42e21841-4a1a-488b-b396-6f008f67948a'),
(247, 8, '33be47d7-0b4a-4ee6-a795-8822740e2b84'),
(248, 8, '7ee1b912-487e-4eef-bed1-685a9139f3cd'),
(249, 8, '8d642a94-a037-4110-9e1c-6c77bce413ff'),
(250, 8, '49c2f135-9510-4149-8ad7-349c562a9f5b'),
(251, 8, '71814c41-f8d7-4891-8872-142c39708514'),
(252, 8, '438ec3e6-7950-4b6f-824a-5988f9f1e854'),
(253, 8, 'e6f5b100-a924-4eb6-bb39-1a338854fbef'),
(254, 8, '0a444368-00d3-439e-9978-2fd54802b079'),
(255, 8, '9a0cd5ee-54e6-48a0-b554-9881947a3131'),
(256, 10, '7384b3ac-03af-4f6a-9d16-2cb5aa201452'),
(257, 8, '2b8ed67b-6fa7-450c-bf49-3a9ea2a71b6a'),
(258, 10, 'e3c40c10-8c39-4d4a-9d81-0d8f17cf2e2e'),
(259, 8, '70ced95f-1b52-4a3b-8d12-5ebea69a001c'),
(260, 10, '5f30765b-174e-4366-a679-ed28b15be001'),
(261, 8, '95d51f62-7141-427c-b343-ad3e7ccd9dc6');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(16) NOT NULL,
  `name` varchar(64) NOT NULL,
  `surname` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  `user_type` varchar(64) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `user_type`, `created`) VALUES
(7, 'Adam', 'First', 'adam@gmail.com', 'a6f75cea92c36d12704eaa2868be234fcee33fe55f85898d12626ca779909622', 'user', '2023-08-15 10:14:13'),
(8, 'Amy', 'First', 'amy@gmail.com', 'a6f75cea92c36d12704eaa2868be234fcee33fe55f85898d12626ca779909622', 'user', '2023-08-15 10:15:20'),
(9, 'Ashley', 'Second', 'ashley@gmail.com', 'a6f75cea92c36d12704eaa2868be234fcee33fe55f85898d12626ca779909622', 'user', '2023-08-17 07:32:14'),
(10, 'Arnold', 'Adminus', 'arnold@gmail.com', 'a6f75cea92c36d12704eaa2868be234fcee33fe55f85898d12626ca779909622', 'admin', '2023-08-20 07:34:31'),
(11, 'Magick', 'Johnson', 'magick@gmail.com', 'a6f75cea92c36d12704eaa2868be234fcee33fe55f85898d12626ca779909622', 'user', '2023-08-20 19:19:26'),
(20, 'Berry', 'Johnson', 'bj@Johnson.com', 'a6f75cea92c36d12704eaa2868be234fcee33fe55f85898d12626ca779909622', 'user', '2023-09-08 13:48:43'),
(21, 'Jan', 'Albany', 'ja@albany.ny.com', 'a6f75cea92c36d12704eaa2868be234fcee33fe55f85898d12626ca779909622', 'user', '2023-09-08 14:02:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investors`
--
ALTER TABLE `investors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`token_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `investors`
--
ALTER TABLE `investors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=262;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
