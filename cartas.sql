CREATE SCHEMA IF NOT EXISTS `cartas`;
USE `cartas` ;

-- -----------------------------------------------------
-- Table `cartas`.`equipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartas`.`equipo` (
  `equipo_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`equipo_id`));


-- -----------------------------------------------------
-- Table `cartas`.`jugador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartas`.`jugador` (
  `jugador_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `foto` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`jugador_id`));


-- -----------------------------------------------------
-- Table `cartas`.`posicion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartas`.`posicion` (
  `posicion_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`posicion_id`));


-- -----------------------------------------------------
-- Table `cartas`.`rareza`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartas`.`rareza` (
  `rareza_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`rareza_id`));


-- -----------------------------------------------------
-- Table `cartas`.`serie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartas`.`serie` (
  `serie_id` INT NOT NULL AUTO_INCREMENT,
  `fecha_emision` DATE NOT NULL,
  PRIMARY KEY (`serie_id`));


-- -----------------------------------------------------
-- Table `cartas`.`carta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartas`.`carta` (
  `carta_id` INT NOT NULL AUTO_INCREMENT,
  `jugador_id` INT NOT NULL,
  `posicion_id` INT NOT NULL,
  `serie_id` INT NOT NULL,
  `rareza_id` INT NOT NULL,
  `equipo_id` INT NOT NULL,
  `borrado` DATETIME,
  PRIMARY KEY (`carta_id`),
  CONSTRAINT `equipo_carta`
    FOREIGN KEY (`equipo_id`)
    REFERENCES `cartas`.`equipo` (`equipo_id`),
  CONSTRAINT `jugador_carta`
    FOREIGN KEY (`jugador_id`)
    REFERENCES `cartas`.`jugador` (`jugador_id`),
  CONSTRAINT `posicion_carta`
    FOREIGN KEY (`posicion_id`)
    REFERENCES `cartas`.`posicion` (`posicion_id`),
  CONSTRAINT `rareza_carta`
    FOREIGN KEY (`rareza_id`)
    REFERENCES `cartas`.`rareza` (`rareza_id`),
  CONSTRAINT `serie_carta`
    FOREIGN KEY (`serie_id`)
    REFERENCES `cartas`.`serie` (`serie_id`));


-- -----------------------------------------------------
-- Table `cartas`.`coleccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartas`.`coleccion` (
  `coleccion_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `serie_id` INT NOT NULL,
  PRIMARY KEY (`coleccion_id`),
  CONSTRAINT `serie`
    FOREIGN KEY (`serie_id`)
    REFERENCES `cartas`.`serie` (`serie_id`));


-- -----------------------------------------------------
-- Table `cartas`.`carta_coleccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartas`.`carta_coleccion` (
  `carta_coleccion_id` INT NOT NULL AUTO_INCREMENT,
  `carta_id` INT NOT NULL,
  `coleccion_id` INT NOT NULL,
  PRIMARY KEY (`carta_coleccion_id`),
  CONSTRAINT `carta_coleccion`
    FOREIGN KEY (`carta_id`)
    REFERENCES `cartas`.`carta` (`carta_id`),
  CONSTRAINT `coleccion_coleccion`
    FOREIGN KEY (`coleccion_id`)
    REFERENCES `cartas`.`coleccion` (`coleccion_id`));


-- -----------------------------------------------------
-- Table `cartas`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartas`.`rol` (
  `rol_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`rol_id`));


-- -----------------------------------------------------
-- Table `cartas`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartas`.`usuario` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(45) NOT NULL,
  `contrasena` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `rol_id` INT NULL DEFAULT NULL,
  `borrado` DATETIME,
  PRIMARY KEY (`usuario_id`),
  CONSTRAINT `usuario_rol`
    FOREIGN KEY (`rol_id`)
    REFERENCES `cartas`.`rol` (`rol_id`));


-- -----------------------------------------------------
-- Table `cartas`.`usuario_carta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartas`.`usuario_carta` (
  `usuario_carta_id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `carta_id` INT NOT NULL,
  PRIMARY KEY (`usuario_carta_id`),
  CONSTRAINT `usuario_carta_carta`
    FOREIGN KEY (`carta_id`)
    REFERENCES `cartas`.`carta` (`carta_id`),
  CONSTRAINT `usuario_carta_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `cartas`.`usuario` (`usuario_id`));

INSERT INTO `cartas`.`equipo` (`nombre`) VALUES ('equipo 1');
INSERT INTO `cartas`.`equipo` (`nombre`) VALUES ('equipo 2');
INSERT INTO `cartas`.`equipo` (`nombre`) VALUES ('equipo 3');

INSERT INTO `cartas`.`jugador` (`nombre`, `apellido`, `foto`) VALUES ('Martin', 'Acosta', 'foto 1');
INSERT INTO `cartas`.`jugador` (`nombre`, `apellido`, `foto`) VALUES ('Hugo', 'Rodrigez', 'foto 2');
INSERT INTO `cartas`.`jugador` (`nombre`, `apellido`, `foto`) VALUES ('Manuel', 'Rojas', 'foto 3');
INSERT INTO `cartas`.`jugador` (`nombre`, `apellido`, `foto`) VALUES ('David', 'Diaz', 'foto 4');
INSERT INTO `cartas`.`jugador` (`nombre`, `apellido`, `foto`) VALUES ('Mario', 'Perez', 'foto 5');
INSERT INTO `cartas`.`jugador` (`nombre`, `apellido`, `foto`) VALUES ('Alejando', 'Flores', 'foto 6');

INSERT INTO `cartas`.`posicion` (`nombre`) VALUES ('posicion 1');
INSERT INTO `cartas`.`posicion` (`nombre`) VALUES ('posicion 2');
INSERT INTO `cartas`.`posicion` (`nombre`) VALUES ('posicion 3');

INSERT INTO `cartas`.`rareza` (`nombre`) VALUES ('bronce');
INSERT INTO `cartas`.`rareza` (`nombre`) VALUES ('plata');
INSERT INTO `cartas`.`rareza` (`nombre`) VALUES ('oro');

INSERT INTO `cartas`.`rol` (`nombre`) VALUES ('administrador');
INSERT INTO `cartas`.`rol` (`nombre`) VALUES ('coleccionista');

INSERT INTO `cartas`.`serie` (`fecha_emision`) VALUES ('2001-01-01');
INSERT INTO `cartas`.`serie` (`fecha_emision`) VALUES ('2002-01-01');
INSERT INTO `cartas`.`serie` (`fecha_emision`) VALUES ('2003-01-01');
