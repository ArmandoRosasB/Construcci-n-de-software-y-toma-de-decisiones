-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2023 at 01:24 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `messages`
--

-- --------------------------------------------------------
CREATE DATABASE messages;
USE messages;
--
-- Table structure for table `mensaje`
--

CREATE TABLE `mensaje` (
  `id` int(11) NOT NULL,
  `fname` varchar(30) DEFAULT NULL,
  `lname` varchar(30) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `Planguage` varchar(15) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `img` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mensaje`
--

INSERT INTO `mensaje` (`id`, `fname`, `lname`, `email`, `Planguage`, `message`, `img`) VALUES
(4, 'Ramona', 'Najera', 'A01423596@tec.mx', 'C', 'Que vivan los sapoooos!!!', '483-Ramona.jpeg'),
(5, 'Rodrigo', 'Teran', 'rodrigo.teran@gmail.com', 'JavaScript', 'No se dice SQL, se dice Shkeleee!', '380-Teran.jpeg'),
(6, 'Armando', 'Rosas', 'A01704132@tec.mx', 'Java', 'Que bonita pagina.', '812-Armando.jpeg'),
(8, 'Uri', 'Gopar', 'A01709413@tec.mx', 'Python', 'Uwu.', '521-Uri.jpeg'),
(9, 'Mafer', 'Moreno', 'A01708653@tec.mx', 'JavaScript', 'Stream Harry Styles!!!!', '108-Mafer.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `privilegios`
--

CREATE TABLE `privilegios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privilegios`
--

INSERT INTO `privilegios` (`id`, `nombre`, `created_at`) VALUES
(1, 'Ver mensajes', '2023-03-15 04:30:26'),
(2, 'Escribir mensaje', '2023-03-15 04:30:26'),
(3, 'Jugar juegos', '2023-03-15 04:30:26');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `descripcion`, `created_at`) VALUES
(1, 'admin', NULL, '2023-03-15 04:30:26'),
(2, 'client', NULL, '2023-03-15 04:30:26');

-- --------------------------------------------------------

--
-- Table structure for table `rol_privilegio`
--

CREATE TABLE `rol_privilegio` (
  `idRol` int(11) NOT NULL,
  `idPrivilegio` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rol_privilegio`
--

INSERT INTO `rol_privilegio` (`idRol`, `idPrivilegio`, `created_at`) VALUES
(1, 1, '2023-03-15 04:30:26'),
(1, 2, '2023-03-15 04:30:26'),
(1, 3, '2023-03-15 04:30:26'),
(2, 2, '2023-03-15 04:30:26'),
(2, 3, '2023-03-15 04:30:26');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(400) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(400) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `username`, `password`, `created_at`) VALUES
(1, 'Armando', 'ArmandoRosasB', '$2a$12$x8zzu.Jrorif8NvQtqQGFuN4N73xeNOEWkcwpluOCftSVCA.1jfVu', '2023-03-14 16:12:29'),
(2, 'Armando Rosas', 'ArmandoRB', '$2a$12$.phogd6mCB62fk0OGU6UcePPVnVxkHdf6PFQIbSeVsnHBfQ9n5Ine', '2023-03-27 16:31:22');

-- --------------------------------------------------------

--
-- Table structure for table `usuario_rol`
--

CREATE TABLE `usuario_rol` (
  `idUsuario` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario_rol`
--

INSERT INTO `usuario_rol` (`idUsuario`, `idRol`, `created_at`) VALUES
(1, 1, '2023-03-15 04:30:26'),
(2, 1, '2023-03-27 16:40:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `privilegios`
--
ALTER TABLE `privilegios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rol_privilegio`
--
ALTER TABLE `rol_privilegio`
  ADD PRIMARY KEY (`idRol`,`idPrivilegio`),
  ADD KEY `idPrivilegio` (`idPrivilegio`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario_rol`
--
ALTER TABLE `usuario_rol`
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idRol` (`idRol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mensaje`
--
ALTER TABLE `mensaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `privilegios`
--
ALTER TABLE `privilegios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rol_privilegio`
--
ALTER TABLE `rol_privilegio`
  ADD CONSTRAINT `rol_privilegio_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `rol_privilegio_ibfk_2` FOREIGN KEY (`idPrivilegio`) REFERENCES `privilegios` (`id`);

--
-- Constraints for table `usuario_rol`
--
ALTER TABLE `usuario_rol`
  ADD CONSTRAINT `usuario_rol_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `usuario_rol_ibfk_2` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
