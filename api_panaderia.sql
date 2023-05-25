-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-08-2022 a las 01:58:08
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `api_panaderia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles`
--

CREATE TABLE `detalles` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `reporte_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalles`
--

INSERT INTO `detalles` (`id`, `producto_id`, `reporte_id`, `cantidad`, `created_at`, `updated_at`) VALUES
(21, 7, 17, 20, '2022-08-07 18:25:35', '2022-08-07 19:44:19'),
(27, 8, 17, 4, '2022-08-07 19:21:01', '2022-08-07 19:41:25'),
(28, 9, 17, 2, '2022-08-07 19:41:26', '2022-08-07 19:41:26'),
(29, 8, 18, 25, '2022-08-08 11:15:17', '2022-08-08 12:47:20'),
(30, 9, 18, 12, '2022-08-08 11:15:17', '2022-08-08 12:40:45'),
(31, 7, 18, 11, '2022-08-08 11:15:36', '2022-08-08 13:06:38'),
(32, 10, 18, 4, '2022-08-08 14:11:02', '2022-08-08 18:31:00'),
(33, 11, 18, 2, '2022-08-08 14:17:52', '2022-08-08 14:17:52'),
(34, 12, 18, 2, '2022-08-08 14:18:17', '2022-08-08 14:18:17'),
(35, 7, 19, 1, '2022-08-14 16:16:22', '2022-08-14 16:16:22'),
(36, 8, 19, 1, '2022-08-14 16:22:28', '2022-08-14 16:22:28'),
(37, 18, 20, 1, '2022-08-15 17:36:04', '2022-08-15 17:36:04'),
(38, 10, 20, 1, '2022-08-15 17:36:04', '2022-08-15 17:36:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `codigo` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `tipo` varchar(15) NOT NULL,
  `precio` double NOT NULL,
  `cantidad` int(11) NOT NULL,
  `cantidad_inve` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `codigo`, `nombre`, `tipo`, `precio`, `cantidad`, `cantidad_inve`, `created_at`, `updated_at`) VALUES
(7, 10, 'Bonetes', 'Pan', 1100, 1, 10, '2022-08-06 23:17:14', '2022-08-15 16:49:10'),
(8, 11, 'Baguette', 'Pan', 600, 1, 0, '2022-08-06 23:42:40', '2022-08-14 16:22:29'),
(9, 20, 'Quesadilla', 'Pan', 1100, 1, 0, '2022-08-07 19:41:01', '2022-08-08 15:37:46'),
(10, 1, 'Cafe', 'Bebidas', 900, 1, 5, '2022-08-08 14:10:50', '2022-08-15 17:36:05'),
(11, 2, 'Azucar', 'Abarrotes', 800, 2, 0, '2022-08-08 14:16:42', '2022-08-08 15:39:06'),
(12, 3, '1820', 'Abarrotes', 2250, 2, 3, '2022-08-08 14:17:13', '2022-08-08 15:39:14'),
(13, 51, 'Picos', 'Pan', 1100, 0, 10, '2022-08-08 14:31:33', '2022-08-08 15:39:19'),
(14, 30, 'Gatos', 'Pan', 900, 0, 50, '2022-08-08 14:32:28', '2022-08-08 15:39:41'),
(15, 71, 'Galletas', 'Pan', 250, 0, 10, '2022-08-08 14:32:55', '2022-08-08 15:39:35'),
(16, 19, 'Empanadas', 'Pan', 250, 0, 5, '2022-08-08 14:33:11', '2022-08-08 15:39:29'),
(17, 10, 'Prueba número 1', 'Pan', 1000, 0, 100, '2022-08-08 15:31:43', '2022-08-08 18:28:17'),
(18, 59, 'Empanadas Tostadas', 'Pan', 1300, 1, 1, '2022-08-08 18:29:03', '2022-08-15 17:36:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reportes`
--

INSERT INTO `reportes` (`id`, `fecha`, `created_at`, `updated_at`) VALUES
(17, '2022-08-07', '2022-08-07 01:18:53', '2022-08-07 01:18:53'),
(18, '2022-08-08', '2022-08-08 11:15:15', '2022-08-08 11:15:15'),
(19, '2022-08-14', '2022-08-14 16:16:19', '2022-08-14 16:16:19'),
(20, '2022-08-15', '2022-08-15 17:36:03', '2022-08-15 17:36:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `rol` varchar(16) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `remember_token` varchar(130) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `rol`, `contrasena`, `remember_token`, `created_at`, `updated_at`) VALUES
(5, 'Fernanda', 'vend', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '', '2022-08-02 05:04:01', '2022-08-15 16:44:55'),
(6, 'Yesenia', 'admin', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', NULL, '2022-08-02 18:40:38', '2022-08-02 18:40:38'),
(11, 'Valery', 'vend', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', NULL, '2022-08-15 16:32:06', '2022-08-15 16:32:06'),
(12, 'Yeimy', 'vend', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', NULL, '2022-08-15 16:32:20', '2022-08-15 16:32:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` double NOT NULL,
  `fecha` date NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `user_id`, `total`, `fecha`, `created_at`, `updated_at`) VALUES
(81, 6, 3400, '2022-08-07', '2022-08-07 19:40:21', '2022-08-07 19:40:21'),
(82, 6, 3900, '2022-08-07', '2022-08-07 19:41:21', '2022-08-07 19:41:21'),
(83, 6, 0, '2022-08-07', '2022-08-07 19:43:37', '2022-08-07 19:43:37'),
(84, 6, 1100, '2022-08-07', '2022-08-07 19:44:16', '2022-08-07 19:44:16'),
(85, 6, 2300, '2022-08-08', '2022-08-08 11:15:14', '2022-08-08 11:15:14'),
(86, 6, 1100, '2022-08-08', '2022-08-08 11:15:35', '2022-08-08 11:15:35'),
(87, 6, 2200, '2022-08-08', '2022-08-08 12:30:01', '2022-08-08 12:30:01'),
(88, 6, 2800, '2022-08-08', '2022-08-08 12:30:32', '2022-08-08 12:30:32'),
(89, 6, 600, '2022-08-08', '2022-08-08 12:31:16', '2022-08-08 12:31:16'),
(90, 6, 2300, '2022-08-08', '2022-08-08 12:31:45', '2022-08-08 12:31:45'),
(91, 6, 2300, '2022-08-08', '2022-08-08 12:32:02', '2022-08-08 12:32:02'),
(92, 6, 2800, '2022-08-08', '2022-08-08 12:33:34', '2022-08-08 12:33:34'),
(93, 6, 1700, '2022-08-08', '2022-08-08 12:38:53', '2022-08-08 12:38:53'),
(94, 6, 1200, '2022-08-08', '2022-08-08 12:39:13', '2022-08-08 12:39:13'),
(95, 6, 2800, '2022-08-08', '2022-08-08 12:39:32', '2022-08-08 12:39:32'),
(96, 6, 3900, '2022-08-08', '2022-08-08 12:40:00', '2022-08-08 12:40:00'),
(97, 6, 1100, '2022-08-08', '2022-08-08 12:40:43', '2022-08-08 12:40:43'),
(98, 6, 6600, '2022-08-08', '2022-08-08 12:47:17', '2022-08-08 12:47:17'),
(99, 6, 6600, '2022-08-08', '2022-08-08 13:06:35', '2022-08-08 13:06:35'),
(100, 6, 900, '2022-08-08', '2022-08-08 14:10:59', '2022-08-08 14:10:59'),
(101, 6, 1800, '2022-08-08', '2022-08-08 14:17:32', '2022-08-08 14:17:32'),
(102, 6, 1600, '2022-08-08', '2022-08-08 14:17:49', '2022-08-08 14:17:49'),
(103, 6, 4500, '2022-08-08', '2022-08-08 14:18:13', '2022-08-08 14:18:13'),
(104, 6, 900, '2022-08-08', '2022-08-08 18:30:57', '2022-08-08 18:30:57'),
(105, 6, 1100, '2022-08-14', '2022-08-14 16:16:18', '2022-08-14 16:16:18'),
(106, 6, 600, '2022-08-14', '2022-08-14 16:22:26', '2022-08-14 16:22:26'),
(107, 6, 2200, '2022-08-15', '2022-08-15 17:36:02', '2022-08-15 17:36:02');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_producto_detalle` (`producto_id`),
  ADD KEY `fk_reporte_detalle` (`reporte_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_venta` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalles`
--
ALTER TABLE `detalles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD CONSTRAINT `fk_producto_detalle` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `fk_reporte_detalle` FOREIGN KEY (`reporte_id`) REFERENCES `reportes` (`id`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_user_venta` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
