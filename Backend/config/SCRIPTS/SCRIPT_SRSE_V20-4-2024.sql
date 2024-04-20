-- MySQL Script generated by MySQL Workbench
-- Sat Apr 20 16:03:13 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema srse
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `srse` ;

-- -----------------------------------------------------
-- Schema srse
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `srse` DEFAULT CHARACTER SET utf8mb3 ;
USE `srse` ;

-- -----------------------------------------------------
-- Table `srse`.`tipo_evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`tipo_evento` (
  `PK_tipo_evento` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`PK_tipo_evento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`evento_contenedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`evento_contenedor` (
  `PK_evento_contenedor` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(2000) NOT NULL,
  `lugar` VARCHAR(500) NOT NULL,
  `dia_inicio` DATE NOT NULL,
  `dia_final` DATE NOT NULL,
  `activo` TINYINT NOT NULL,
  `direccion` VARCHAR(70) NULL,
  `FK_tipo_evento` INT NOT NULL,
  PRIMARY KEY (`PK_evento_contenedor`, `FK_tipo_evento`),
  CONSTRAINT `fk_evento_contenedor_tipoEvento1`
    FOREIGN KEY (`FK_tipo_evento`)
    REFERENCES `srse`.`tipo_evento` (`PK_tipo_evento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

CREATE INDEX `fk_evento_contenedor_tipoEvento1_idx` ON `srse`.`evento_contenedor` (`FK_tipo_evento` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`taller`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`taller` (
  `PK_taller` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`PK_taller`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`tema`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`tema` (
  `PK_tema` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`PK_tema`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`estado` (
  `codigo` INT NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`codigo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `srse`.`estatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`estatus` (
  `PK_estatus` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`PK_estatus`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`rol` (
  `PK_rol` INT NOT NULL,
  `descripcion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`PK_rol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`usuario` (
  `PK_nombre_usuario` VARCHAR(50) NOT NULL,
  `tipo_id` VARCHAR(30) NULL,
  `cedula` VARCHAR(15) NULL,
  `password` VARCHAR(600) NOT NULL,
  `nombre` VARCHAR(50) NULL,
  `segundo_nombre` VARCHAR(50) NULL,
  `apellidos` VARCHAR(100) NULL,
  `iniciales` VARCHAR(4) NULL,
  `genero` VARCHAR(1) NULL,
  `nombre_documentos` VARCHAR(100) NULL,
  `afiliacion` VARCHAR(400) NULL,
  `correo` VARCHAR(400) NULL,
  `pais` VARCHAR(50) NULL,
  `ciudad` VARCHAR(60) NULL,
  `telefono` VARCHAR(50) NULL,
  `verificado` INT NOT NULL DEFAULT 0,
  `recibir_notificaciones` INT NOT NULL DEFAULT 1,
  `codigo_activacion` VARCHAR(64) NULL,
  `FK_rol` INT NOT NULL,
  `FK_estatus` INT NOT NULL,
  PRIMARY KEY (`PK_nombre_usuario`, `FK_rol`, `FK_estatus`),
  CONSTRAINT `fk_usuario_estatus1`
    FOREIGN KEY (`FK_estatus`)
    REFERENCES `srse`.`estatus` (`PK_estatus`),
  CONSTRAINT `fk_usuario_rol1`
    FOREIGN KEY (`FK_rol`)
    REFERENCES `srse`.`rol` (`PK_rol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

CREATE INDEX `fk_usuario_estatus1_idx` ON `srse`.`usuario` (`FK_estatus` ASC) VISIBLE;

CREATE INDEX `fk_usuario_rol1_idx` ON `srse`.`usuario` (`FK_rol` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`actividad` (
  `PK_actividad` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(200) NOT NULL,
  `descripcion_d` VARCHAR(2000) NOT NULL,
  `dia_evento` DATE NULL,
  `hora_inicio` TIME NULL,
  `hora_final` TIME NULL,
  `fecha_envio` DATE NOT NULL,
  `palabras_claves` VARCHAR(500) NULL,
  `bibliografia` VARCHAR(1000) NULL,
  `estatus` INT NOT NULL DEFAULT 1,
  `ubicacion` VARCHAR(80) NOT NULL,
  `comentarios_director` VARCHAR(200) NULL,
  `FK_tema` INT NOT NULL,
  `FK_taller` INT NOT NULL,
  `FK_evento_contenedor` INT NOT NULL,
  `FK_estado` INT NOT NULL,
  `FK_usuario_remitente` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`PK_actividad`, `FK_tema`, `FK_taller`, `FK_evento_contenedor`, `FK_estado`, `FK_usuario_remitente`),
  CONSTRAINT `fk_actividades_evento_contenedor1`
    FOREIGN KEY (`FK_evento_contenedor`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor`),
  CONSTRAINT `fk_actividades_talleres1`
    FOREIGN KEY (`FK_taller`)
    REFERENCES `srse`.`taller` (`PK_taller`),
  CONSTRAINT `fk_actividades_temas1`
    FOREIGN KEY (`FK_tema`)
    REFERENCES `srse`.`tema` (`PK_tema`),
  CONSTRAINT `fk_actividad_estado1`
    FOREIGN KEY (`FK_estado`)
    REFERENCES `srse`.`estado` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_actividad_usuario1`
    FOREIGN KEY (`FK_usuario_remitente`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

CREATE INDEX `fk_actividades_temas1_idx` ON `srse`.`actividad` (`FK_tema` ASC) VISIBLE;

CREATE INDEX `fk_actividades_talleres1_idx` ON `srse`.`actividad` (`FK_taller` ASC) VISIBLE;

CREATE INDEX `fk_actividades_evento_contenedor1_idx` ON `srse`.`actividad` (`FK_evento_contenedor` ASC) VISIBLE;

CREATE INDEX `fk_actividad_estado1_idx` ON `srse`.`actividad` (`FK_estado` ASC) VISIBLE;

CREATE INDEX `fk_actividad_usuario1_idx` ON `srse`.`actividad` (`FK_usuario_remitente` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`miembro_comite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`miembro_comite` (
  `PK_cedula` VARCHAR(200) NOT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `universidad` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`PK_cedula`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`tipo_comite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`tipo_comite` (
  `PK_tipo_comite` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`PK_tipo_comite`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`evento_contenedor_organizacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`evento_contenedor_organizacion` (
  `FK_evento_contenedor` INT NOT NULL,
  `FK_miembro_comite` VARCHAR(200) NOT NULL,
  `FK_tipo_comite` INT NOT NULL,
  PRIMARY KEY (`FK_evento_contenedor`, `FK_miembro_comite`, `FK_tipo_comite`),
  CONSTRAINT `fk_eventoC_mOrganizacion_evento_contenedor`
    FOREIGN KEY (`FK_evento_contenedor`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor`),
  CONSTRAINT `fk_eventoC_mOrganizacion_mComite1`
    FOREIGN KEY (`FK_miembro_comite`)
    REFERENCES `srse`.`miembro_comite` (`PK_cedula`),
  CONSTRAINT `fk_eventoC_mOrganizacion_tipoC1`
    FOREIGN KEY (`FK_tipo_comite`)
    REFERENCES `srse`.`tipo_comite` (`PK_tipo_comite`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

CREATE INDEX `fk_eventoC_mOrganizacion_tipoC1_idx` ON `srse`.`evento_contenedor_organizacion` (`FK_tipo_comite` ASC) VISIBLE;

CREATE INDEX `fk_eventoC_mOrganizacion_mComite1_idx` ON `srse`.`evento_contenedor_organizacion` (`FK_miembro_comite` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`evento_contenedor_taller`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`evento_contenedor_taller` (
  `FK_evento_contenedor` INT NOT NULL,
  `FK_taller` INT NOT NULL,
  PRIMARY KEY (`FK_evento_contenedor`, `FK_taller`),
  CONSTRAINT `fk_eventoC_taller_evento_contenedor1`
    FOREIGN KEY (`FK_evento_contenedor`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor`),
  CONSTRAINT `fk_eventoC_taller_talleres1`
    FOREIGN KEY (`FK_taller`)
    REFERENCES `srse`.`taller` (`PK_taller`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

CREATE INDEX `fk_eventoC_taller_talleres1` ON `srse`.`evento_contenedor_taller` (`FK_taller` ASC) VISIBLE;

CREATE INDEX `fk_eventoC_taller_evento_contenedor1_idx` ON `srse`.`evento_contenedor_taller` (`FK_evento_contenedor` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`gestion_usuario_actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`gestion_usuario_actividad` (
  `FK_actividad` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`FK_actividad`, `FK_usuario`),
  CONSTRAINT `fk_usuario_gestionaA_actividades1`
    FOREIGN KEY (`FK_actividad`)
    REFERENCES `srse`.`actividad` (`PK_actividad`),
  CONSTRAINT `fk_usuario_gestionaA_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

CREATE INDEX `fk_usuario_gestionaA_actividades1_idx` ON `srse`.`gestion_usuario_actividad` (`FK_actividad` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`informacion_notificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`informacion_notificacion` (
  `PK_informacion_notificacion` INT NOT NULL AUTO_INCREMENT,
  `contenido` VARCHAR(2000) NOT NULL,
  PRIMARY KEY (`PK_informacion_notificacion`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`participacion_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`participacion_usuario` (
  `FK_evento_contenedor` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  `tipo_participante` VARCHAR(50) NOT NULL,
  `pagina` VARCHAR(200) NULL,
  `departamento` VARCHAR(45) NOT NULL,
  `becado` INT NOT NULL DEFAULT 0,
  `comentarios` VARCHAR(200) NULL,
  `condiciones` VARCHAR(200) NULL,
  PRIMARY KEY (`FK_evento_contenedor`, `FK_usuario`),
  CONSTRAINT `fk_usuario_participaE_evento_contenedor1`
    FOREIGN KEY (`FK_evento_contenedor`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor`),
  CONSTRAINT `fk_usuario_participaE_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

CREATE INDEX `fk_usuario_participaE_evento_contenedor1` ON `srse`.`participacion_usuario` (`FK_evento_contenedor` ASC) VISIBLE;

CREATE INDEX `fk_usuario_participaE_usuario1_idx` ON `srse`.`participacion_usuario` (`FK_usuario` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`presentacion_usuario_actvidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`presentacion_usuario_actvidad` (
  `FK_actividad` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`FK_actividad`, `FK_usuario`),
  CONSTRAINT `fk_usuario_exponenteA_actividades1`
    FOREIGN KEY (`FK_actividad`)
    REFERENCES `srse`.`actividad` (`PK_actividad`),
  CONSTRAINT `fk_usuario_exponenteA_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

CREATE INDEX `fk_usuario_exponenteA_usuario1_idx` ON `srse`.`presentacion_usuario_actvidad` (`FK_usuario` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`tema_evento_contenedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`tema_evento_contenedor` (
  `FK_tema` INT NOT NULL,
  `FK_evento_contenedor` INT NOT NULL,
  PRIMARY KEY (`FK_tema`, `FK_evento_contenedor`),
  CONSTRAINT `fk_temas_eventoC_evento_contenedor1`
    FOREIGN KEY (`FK_evento_contenedor`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor`),
  CONSTRAINT `fk_temas_eventoC_temas1`
    FOREIGN KEY (`FK_tema`)
    REFERENCES `srse`.`tema` (`PK_tema`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

CREATE INDEX `fk_temas_eventoC_evento_contenedor1_idx` ON `srse`.`tema_evento_contenedor` (`FK_evento_contenedor` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`usuario_asignado_evento_contenedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`usuario_asignado_evento_contenedor` (
  `FK_evento_contenedor` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`FK_evento_contenedor`, `FK_usuario`),
  CONSTRAINT `fk_usuario_asignadoEC_evento_contenedor1`
    FOREIGN KEY (`FK_evento_contenedor`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor`),
  CONSTRAINT `fk_usuario_asignadoEC_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

CREATE INDEX `fk_usuario_asignadoEC_usuario1_idx` ON `srse`.`usuario_asignado_evento_contenedor` (`FK_usuario` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`calendario_u`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`calendario_u` (
  `F_actividad` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`F_actividad`, `FK_usuario`),
  CONSTRAINT `fk_calendarioU_actividad1`
    FOREIGN KEY (`F_actividad`)
    REFERENCES `srse`.`actividad` (`PK_actividad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_calendarioU_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_calendarioU_actividad1_idx` ON `srse`.`calendario_u` (`F_actividad` ASC) VISIBLE;

CREATE INDEX `fk_calendarioU_usuario1_idx` ON `srse`.`calendario_u` (`FK_usuario` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`revision`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`revision` (
  `PK_revision` INT NOT NULL AUTO_INCREMENT,
  `FK_actividad` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  `justificacion` VARCHAR(1000) NULL,
  `fecha_revision` DATE NULL,
  `FK_estado` INT NOT NULL,
  PRIMARY KEY (`PK_revision`, `FK_usuario`, `FK_actividad`))
ENGINE = MyISAM;

CREATE INDEX `fk_revision_actividad1_idx` ON `srse`.`revision` (`FK_actividad` ASC) VISIBLE;

CREATE INDEX `fk_revision_usuario1_idx` ON `srse`.`revision` (`FK_usuario` ASC) VISIBLE;

CREATE INDEX `fk_revision_estado1_idx` ON `srse`.`revision` (`FK_estado` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`password_reset_token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`password_reset_token` (
  `PK_password_reset_token` BIGINT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(45) NOT NULL,
  `fecha_expiracion` DATETIME(6) NULL,
  `token_usado` BIT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`PK_password_reset_token`),
  CONSTRAINT `fk_password_reset_token_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `token_UNIQUE` ON `srse`.`password_reset_token` (`token` ASC) VISIBLE;

CREATE INDEX `fk_password_reset_token_usuario1_idx` ON `srse`.`password_reset_token` (`FK_usuario` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`notificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`notificacion` (
  `PK_notificacion` INT NOT NULL AUTO_INCREMENT,
  `FK_usuario` VARCHAR(50) NOT NULL,
  `contenido` VARCHAR(2000) NOT NULL,
  `encabezado` VARCHAR(200) NOT NULL,
  `vista` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`PK_notificacion`, `FK_usuario`),
  CONSTRAINT `fk_notificacion_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_notificacion_usuario1_idx` ON `srse`.`notificacion` (`FK_usuario` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `srse`.`simpo_app_notificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`simpo_app_notificacion` (
  `PK_p256dh` VARCHAR(255) NOT NULL,
  `endpoint` TEXT(5000) NOT NULL,
  `tiempo_expiracion` TIMESTAMP NULL,
  `autenticador` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`PK_p256dh`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `srse`.`usuario_notificacion_simpo_app`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`usuario_notificacion_simpo_app` (
  `PK_usuario_notificacion_simpo_app` INT NOT NULL AUTO_INCREMENT,
  `FK_usuario` VARCHAR(45) NOT NULL,
  `FK_simpo_app_notificacion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`PK_usuario_notificacion_simpo_app`, `FK_simpo_app_notificacion`, `FK_usuario`),
  CONSTRAINT `FK_usuario`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_simpo_app_notificacion`
    FOREIGN KEY (`FK_simpo_app_notificacion`)
    REFERENCES `srse`.`simpo_app_notificacion` (`PK_p256dh`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `FK_usuario_idx` ON `srse`.`usuario_notificacion_simpo_app` (`FK_usuario` ASC) VISIBLE;

CREATE INDEX `FK_simpo_app_notificacion_idx` ON `srse`.`usuario_notificacion_simpo_app` (`FK_simpo_app_notificacion` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
