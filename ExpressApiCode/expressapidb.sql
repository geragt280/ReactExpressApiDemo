-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2021 at 07:30 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expressapidb`
--

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` int(11) NOT NULL,
  `device_key` varchar(30) DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `device_key`, `created_at`) VALUES
(1, 'dnlAfnonewonewe8nfso8', '2021-09-15'),
(2, '12sgnsdlgk3456', '2021-09-15');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `device_id`, `user_id`, `action`, `created_at`) VALUES
(1, 1, 2, 'Login with new device', '2021-09-15'),
(2, 2, 1, 'Login with new device', '2021-09-15'),
(3, 2, 2, 'Login with old device', '2021-09-15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `bio` varchar(100) DEFAULT NULL,
  `cnic` varchar(20) DEFAULT NULL,
  `education` varchar(20) DEFAULT NULL,
  `address` varchar(70) DEFAULT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `created_at`, `bio`, `cnic`, `education`, `address`, `image`) VALUES
(1, 'gratty@gmail.com', '202cb962ac59075b964b07152d234b70', 'faiza', '0000-00-00', 'Fastest swimmer', '42201-21501345-8', 'Intermidiate', 'Kulsoom apartment Flat # 14 Gulistan e johar, Karachi', 'faiza.png'),
(2, 'gradle@gmail.com', '202cb962ac59075b964b07152d234b70', 'gradle', '2021-09-15', 'It the medium of Android and UI', '42201-21509876-1', 'Intermidiate', 'Crecent Academy Gulberg ', 'gradle.png'),
(5, 'bratty@gmail.com', 'ad9976a7bc2e4742532d2371ac9f9e8d', NULL, '2021-09-15', NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
