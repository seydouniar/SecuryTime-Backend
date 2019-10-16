-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 16 oct. 2019 à 04:49
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
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

DROP TABLE IF EXISTS `agents`;
CREATE TABLE IF NOT EXISTS `agents` (
  `id_agent` int(11) NOT NULL AUTO_INCREMENT,
  `matricule` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `genre` varchar(11) NOT NULL,
  `adresse` json DEFAULT NULL,
  `contacts` json DEFAULT NULL,
  PRIMARY KEY (`id_agent`),
  UNIQUE KEY `matricule` (`matricule`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `agents`
--

INSERT INTO `agents` (`id_agent`, `matricule`, `nom`, `genre`, `adresse`, `contacts`) VALUES
(43, 1, 'Niaré Seydou', 'Monsieur', '{\"rue\": \"Saint Martins D\' Hères, Condillac Batiment Vieux A\", \"pays\": \"France\", \"ville\": \"Grenoble\", \"code_postale\": \"38400\"}', '{\"fixe\": \"78-32-27-28\", \"email\": \"seydouniar@gmail.com\", \"mobile\": \"78-75-78-45\"}'),
(44, 55666, 'carrefour rmlmmdf', 'Monsieur', '{\"rue\": \"255 opjh\", \"pays\": \"fr\", \"ville\": \"mtp\", \"code_postale\": \"34000\"}', '{\"fixe\": \"78-58-41-86\", \"email\": \"keitanouhoum@live.fr\", \"mobile\": \"78-58-89-45\"}');

-- --------------------------------------------------------

--
-- Structure de la table `cartes`
--

DROP TABLE IF EXISTS `cartes`;
CREATE TABLE IF NOT EXISTS `cartes` (
  `id_carte` int(11) NOT NULL AUTO_INCREMENT,
  `id_agent` int(11) NOT NULL,
  `delivre` date NOT NULL,
  `fin` text NOT NULL,
  `numero` varchar(30) NOT NULL,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id_carte`),
  UNIQUE KEY `numero` (`numero`) USING BTREE,
  KEY `id_agent` (`id_agent`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `cartes`
--

INSERT INTO `cartes` (`id_carte`, `id_agent`, `delivre`, `fin`, `numero`, `type`) VALUES
(11, 43, '2019-10-05', '2020-10-27', '5554454', 'cni'),
(12, 43, '2019-10-04', '2020-10-31', 'sfds5dfs', 'ca'),
(13, 44, '2019-10-01', '2019-10-31', '78152666', 'cni'),
(14, 44, '2019-10-02', '2019-10-31', '651415', 'ca');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id_client` int(11) NOT NULL AUTO_INCREMENT,
  `client_data` json NOT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id_client`, `client_data`) VALUES
(1, '{\"nom\": \"rmlmmdf\", \"adresse\": {\"rue\": \"255 opjh\", \"pays\": \"France\", \"ville\": \"mtp\", \"code_postale\": \"34000\"}, \"contacts\": {\"fixe\": \"78-58-41-86\", \"email\": \"keitanouhoum@live.fr\", \"mobile\": \"7069666636\"}, \"code_facture\": \"4547\"}'),
(2, '{\"nom\": \"seydou\", \"adresse\": {\"rue\": \"25 rue des arts\", \"pays\": \"France\", \"ville\": \"Montpellier\", \"code_postale\": \"34000\"}, \"contacts\": {\"fixe\": \"0752825307\", \"email\": \"keitanouhoum@live.fr\", \"mobile\": \"0752825307\"}, \"code_facture\": \"483\"}');

-- --------------------------------------------------------

--
-- Structure de la table `sites`
--

DROP TABLE IF EXISTS `sites`;
CREATE TABLE IF NOT EXISTS `sites` (
  `id_site` int(11) NOT NULL AUTO_INCREMENT,
  `id_client` int(11) NOT NULL,
  `data_site` json NOT NULL,
  `adresse` json NOT NULL,
  PRIMARY KEY (`id_site`),
  KEY `id_client` (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `sites`
--

INSERT INTO `sites` (`id_site`, `id_client`, `data_site`, `adresse`) VALUES
(4, 2, '{\"nom\": \"general society\", \"tel\": \"0250283069\", \"email\": \"keitanouhoum@live.fr\", \"couleur\": \"#ffffff\", \"code_site\": \"k55\", \"nom_agence\": \"a2p\", \"responsable\": \"nous meme\"}', '{\"pays\": \"France\", \"voie\": \"255 opjh\", \"ville\": \"mtp\", \"commune\": \"mtp\", \"complement\": \"\"}');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`) VALUES
(1, 'Niaré', 'Seydou'),
(2, 'alum', 'jean'),
(3, 'Niaré', 'Seydou'),
(4, 'Niarémm', 'Seydou\'rtr'),
(5, 'Niaré', 'SEYDOU');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cartes`
--
ALTER TABLE `cartes`
  ADD CONSTRAINT `cartes_ibfk_1` FOREIGN KEY (`id_agent`) REFERENCES `agents` (`id_agent`) ON DELETE CASCADE;

--
-- Contraintes pour la table `sites`
--
ALTER TABLE `sites`
  ADD CONSTRAINT `sites_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id_client`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
