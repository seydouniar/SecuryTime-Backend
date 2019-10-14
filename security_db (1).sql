-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Lun 14 Octobre 2019 à 21:00
-- Version du serveur :  5.7.27-0ubuntu0.18.04.1
-- Version de PHP :  7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `security_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `agents`
--

CREATE TABLE `agents` (
  `id_agent` int(11) NOT NULL,
  `matricule` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `genre` varchar(11) NOT NULL,
  `adresse` json DEFAULT NULL,
  `contacts` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `agents`
--

INSERT INTO `agents` (`id_agent`, `matricule`, `nom`, `genre`, `adresse`, `contacts`) VALUES
(43, 1, 'Niaré Seydou', 'Monsieur', '{\"rue\": \"Saint Martins D\' Hères, Condillac Batiment Vieux A\", \"pays\": \"France\", \"ville\": \"Grenoble\", \"code_postale\": \"38400\"}', '{\"fixe\": \"78-32-27-28\", \"email\": \"seydouniar@gmail.com\", \"mobile\": \"78-75-78-45\"}');

-- --------------------------------------------------------

--
-- Structure de la table `cartes`
--

CREATE TABLE `cartes` (
  `id_carte` int(11) NOT NULL,
  `id_agent` int(11) NOT NULL,
  `delivre` date NOT NULL,
  `fin` text NOT NULL,
  `numero` varchar(30) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `cartes`
--

INSERT INTO `cartes` (`id_carte`, `id_agent`, `delivre`, `fin`, `numero`, `type`) VALUES
(11, 43, '2019-10-05', '2020-10-27', '5554454', 'cni'),
(12, 43, '2019-10-04', '2020-10-31', 'sfds5dfs', 'ca');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`) VALUES
(1, 'Niaré', 'Seydou'),
(2, 'alum', 'jean'),
(3, 'Niaré', 'Seydou'),
(4, 'Niarémm', 'Seydou\'rtr'),
(5, 'Niaré', 'SEYDOU');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id_agent`),
  ADD UNIQUE KEY `matricule` (`matricule`);

--
-- Index pour la table `cartes`
--
ALTER TABLE `cartes`
  ADD PRIMARY KEY (`id_carte`),
  ADD UNIQUE KEY `numero` (`numero`) USING BTREE,
  ADD KEY `id_agent` (`id_agent`) USING BTREE;

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `agents`
--
ALTER TABLE `agents`
  MODIFY `id_agent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT pour la table `cartes`
--
ALTER TABLE `cartes`
  MODIFY `id_carte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `cartes`
--
ALTER TABLE `cartes`
  ADD CONSTRAINT `cartes_ibfk_1` FOREIGN KEY (`id_agent`) REFERENCES `agents` (`id_agent`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
