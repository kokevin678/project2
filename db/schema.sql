### Schema

DROP DATABASE IF EXISTs monopolyDB;

CREATE DATABASE monopolyDB;

USE monopolyDB;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'playerPropertyGame'
-- 
-- ---

DROP TABLE IF EXISTS `playerPropertyGame`;
		
CREATE TABLE `playerPropertyGame` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `playerID` INTEGER NULL DEFAULT NULL,
  `propertyID` INTEGER NULL DEFAULT NULL,
  `gameID` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'player'
-- 
-- ---

DROP TABLE IF EXISTS `player`;
		
CREATE TABLE `player` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `token` VARCHAR NULL DEFAULT NULL,
  `money` INTEGER NULL DEFAULT NULL,
  `gameID` INTEGER NULL DEFAULT NULL,
  `propertyID` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'game'
-- 
-- ---

DROP TABLE IF EXISTS `game`;
		
CREATE TABLE `game` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'property'
-- 
-- ---

DROP TABLE IF EXISTS `property`;
		
CREATE TABLE `property` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `hex` VARCHAR NULL DEFAULT NULL,
  `price` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `playerPropertyGame` ADD FOREIGN KEY (playerID) REFERENCES `player` (`id`);
ALTER TABLE `playerPropertyGame` ADD FOREIGN KEY (propertyID) REFERENCES `property` (`id`);
ALTER TABLE `playerPropertyGame` ADD FOREIGN KEY (gameID) REFERENCES `game` (`id`);
ALTER TABLE `player` ADD FOREIGN KEY (gameID) REFERENCES `game` (`id`);
ALTER TABLE `player` ADD FOREIGN KEY (propertyID) REFERENCES `property` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `playerPropertyGame` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `player` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `game` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `property` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `playerPropertyGame` (`id`,`playerID`,`propertyID`,`gameID`) VALUES
-- ('','','','');
-- INSERT INTO `player` (`id`,`name`,`token`,`money`,`gameID`,`propertyID`) VALUES
-- ('','','','','','');
-- INSERT INTO `game` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `property` (`id`,`name`,`hex`,`price`) VALUES
-- ('','','','');