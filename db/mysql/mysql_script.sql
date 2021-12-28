-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema basic-game-api
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema basic-game-api
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `basic-game-api` DEFAULT CHARACTER SET utf8 ;
USE `basic-game-api` ;

-- -----------------------------------------------------
-- Table `basic-game-api`.`Publisher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `basic-game-api`.`Publisher` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `siret` DECIMAL(14,0) NOT NULL,
  `phone` VARCHAR(32) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `basic-game-api`.`Game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `basic-game-api`.`Game` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(64) NOT NULL,
  `price` DECIMAL(6,2) UNSIGNED NOT NULL,
  `releaseDate` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `tags` VARCHAR(512) NOT NULL DEFAULT '',
  `Publisher_id` INT UNSIGNED NOT NULL,
  `discount` DECIMAL(4,3) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `title_UNIQUE` (`title` ASC) VISIBLE,
  INDEX `fk_Game_Publisher_idx` (`Publisher_id` ASC) VISIBLE,
  CONSTRAINT `fk_Game_Publisher`
    FOREIGN KEY (`Publisher_id`)
    REFERENCES `basic-game-api`.`Publisher` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
