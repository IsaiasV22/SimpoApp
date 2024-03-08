-- MySQL Script generated by MySQL Workbench
-- Fri Mar  8 10:10:51 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema srse
-- -----------------------------------------------------

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
  `FK_tipo_evento` INT NOT NULL,
  `evento_contenedor_PK_evento_contenedor` INT NOT NULL,
  `evento_contenedor_FK_tipo_evento` INT NOT NULL,
  `evento_contenedor_PK_evento_contenedor1` INT NOT NULL,
  `evento_contenedor_FK_tipo_evento1` INT NOT NULL,
  `evento_contenedor_evento_contenedor_PK_evento_contenedor` INT NOT NULL,
  `evento_contenedor_evento_contenedor_FK_tipo_evento` INT NOT NULL,
  PRIMARY KEY (`PK_evento_contenedor`, `FK_tipo_evento`, `evento_contenedor_PK_evento_contenedor`, `evento_contenedor_FK_tipo_evento`, `evento_contenedor_PK_evento_contenedor1`, `evento_contenedor_FK_tipo_evento1`, `evento_contenedor_evento_contenedor_PK_evento_contenedor`, `evento_contenedor_evento_contenedor_FK_tipo_evento`),
  INDEX `fk_evento_contenedor_tipoEvento1_idx` (`FK_tipo_evento` ASC) VISIBLE,
  INDEX `fk_evento_contenedor_evento_contenedor1_idx` (`evento_contenedor_PK_evento_contenedor` ASC, `evento_contenedor_FK_tipo_evento` ASC) VISIBLE,
  INDEX `fk_evento_contenedor_evento_contenedor2_idx` (`evento_contenedor_PK_evento_contenedor1` ASC, `evento_contenedor_FK_tipo_evento1` ASC, `evento_contenedor_evento_contenedor_PK_evento_contenedor` ASC, `evento_contenedor_evento_contenedor_FK_tipo_evento` ASC) VISIBLE,
  CONSTRAINT `fk_evento_contenedor_tipoEvento1`
    FOREIGN KEY (`FK_tipo_evento`)
    REFERENCES `srse`.`tipo_evento` (`PK_tipo_evento`),
  CONSTRAINT `fk_evento_contenedor_evento_contenedor1`
    FOREIGN KEY (`evento_contenedor_PK_evento_contenedor` , `evento_contenedor_FK_tipo_evento`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor` , `FK_tipo_evento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_evento_contenedor_evento_contenedor2`
    FOREIGN KEY (`evento_contenedor_PK_evento_contenedor1` , `evento_contenedor_FK_tipo_evento1` , `evento_contenedor_evento_contenedor_PK_evento_contenedor` , `evento_contenedor_evento_contenedor_FK_tipo_evento`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor` , `FK_tipo_evento` , `evento_contenedor_PK_evento_contenedor` , `evento_contenedor_FK_tipo_evento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


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
  `codigo_activacion` VARCHAR(64) NULL,
  `FK_rol` INT NOT NULL,
  `FK_estatus` INT NOT NULL,
  PRIMARY KEY (`PK_nombre_usuario`, `FK_rol`, `FK_estatus`),
  INDEX `fk_usuario_estatus1_idx` (`FK_estatus` ASC) VISIBLE,
  INDEX `fk_usuario_rol1_idx` (`FK_rol` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_estatus1`
    FOREIGN KEY (`FK_estatus`)
    REFERENCES `srse`.`estatus` (`PK_estatus`),
  CONSTRAINT `fk_usuario_rol1`
    FOREIGN KEY (`FK_rol`)
    REFERENCES `srse`.`rol` (`PK_rol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


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
  `actividad_PK_actividad` INT NOT NULL,
  `actividad_FK_tema` INT NOT NULL,
  `actividad_FK_taller` INT NOT NULL,
  `actividad_FK_evento_contenedor` INT NOT NULL,
  `actividad_FK_estado` INT NOT NULL,
  `actividad_FK_usuario_remitente` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`PK_actividad`, `FK_tema`, `FK_taller`, `FK_evento_contenedor`, `FK_estado`, `FK_usuario_remitente`, `actividad_PK_actividad`, `actividad_FK_tema`, `actividad_FK_taller`, `actividad_FK_evento_contenedor`, `actividad_FK_estado`, `actividad_FK_usuario_remitente`),
  INDEX `fk_actividades_temas1_idx` (`FK_tema` ASC) VISIBLE,
  INDEX `fk_actividades_talleres1_idx` (`FK_taller` ASC) VISIBLE,
  INDEX `fk_actividades_evento_contenedor1_idx` (`FK_evento_contenedor` ASC) VISIBLE,
  INDEX `fk_actividad_estado1_idx` (`FK_estado` ASC) VISIBLE,
  INDEX `fk_actividad_usuario1_idx` (`FK_usuario_remitente` ASC) VISIBLE,
  INDEX `fk_actividad_actividad1_idx` (`actividad_PK_actividad` ASC, `actividad_FK_tema` ASC, `actividad_FK_taller` ASC, `actividad_FK_evento_contenedor` ASC, `actividad_FK_estado` ASC, `actividad_FK_usuario_remitente` ASC) VISIBLE,
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
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_actividad_actividad1`
    FOREIGN KEY (`actividad_PK_actividad` , `actividad_FK_tema` , `actividad_FK_taller` , `actividad_FK_evento_contenedor` , `actividad_FK_estado` , `actividad_FK_usuario_remitente`)
    REFERENCES `srse`.`actividad` (`PK_actividad` , `FK_tema` , `FK_taller` , `FK_evento_contenedor` , `FK_estado` , `FK_usuario_remitente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


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
  INDEX `fk_eventoC_mOrganizacion_tipoC1_idx` (`FK_tipo_comite` ASC) VISIBLE,
  INDEX `fk_eventoC_mOrganizacion_mComite1_idx` (`FK_miembro_comite` ASC) VISIBLE,
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


-- -----------------------------------------------------
-- Table `srse`.`evento_contenedor_taller`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`evento_contenedor_taller` (
  `FK_evento_contenedor` INT NOT NULL,
  `FK_taller` INT NOT NULL,
  PRIMARY KEY (`FK_evento_contenedor`, `FK_taller`),
  INDEX `fk_eventoC_taller_talleres1` (`FK_taller` ASC) VISIBLE,
  INDEX `fk_eventoC_taller_evento_contenedor1_idx` (`FK_evento_contenedor` ASC) VISIBLE,
  CONSTRAINT `fk_eventoC_taller_evento_contenedor1`
    FOREIGN KEY (`FK_evento_contenedor`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor`),
  CONSTRAINT `fk_eventoC_taller_talleres1`
    FOREIGN KEY (`FK_taller`)
    REFERENCES `srse`.`taller` (`PK_taller`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`gestion_usuario_actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`gestion_usuario_actividad` (
  `FK_actividad` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`FK_actividad`, `FK_usuario`),
  INDEX `fk_usuario_gestionaA_actividades1_idx` (`FK_actividad` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_gestionaA_actividades1`
    FOREIGN KEY (`FK_actividad`)
    REFERENCES `srse`.`actividad` (`PK_actividad`),
  CONSTRAINT `fk_usuario_gestionaA_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


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
-- Table `srse`.`notificacion_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`notificacion_usuario` (
  `FK_notificacion` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`FK_notificacion`, `FK_usuario`),
  INDEX `fk_notificacion_usuario_usuario1_idx` (`FK_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_notificacion_usuario_notificacion1`
    FOREIGN KEY (`FK_notificacion`)
    REFERENCES `srse`.`informacion_notificacion` (`PK_informacion_notificacion`),
  CONSTRAINT `fk_notificacion_usuario_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`participacion_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`participacion_usuario` (
  `FK_evento_contenedor` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  `tipo_participante` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`FK_evento_contenedor`, `FK_usuario`),
  INDEX `fk_usuario_participaE_evento_contenedor1` (`FK_evento_contenedor` ASC) VISIBLE,
  INDEX `fk_usuario_participaE_usuario1_idx` (`FK_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_participaE_evento_contenedor1`
    FOREIGN KEY (`FK_evento_contenedor`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor`),
  CONSTRAINT `fk_usuario_participaE_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`presentacion_usuario_actvidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`presentacion_usuario_actvidad` (
  `FK_actividad` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`FK_actividad`, `FK_usuario`),
  INDEX `fk_usuario_exponenteA_usuario1_idx` (`FK_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_exponenteA_actividades1`
    FOREIGN KEY (`FK_actividad`)
    REFERENCES `srse`.`actividad` (`PK_actividad`),
  CONSTRAINT `fk_usuario_exponenteA_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`tema_evento_contenedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`tema_evento_contenedor` (
  `FK_tema` INT NOT NULL,
  `FK_evento_contenedor` INT NOT NULL,
  PRIMARY KEY (`FK_tema`, `FK_evento_contenedor`),
  INDEX `fk_temas_eventoC_evento_contenedor1_idx` (`FK_evento_contenedor` ASC) VISIBLE,
  CONSTRAINT `fk_temas_eventoC_evento_contenedor1`
    FOREIGN KEY (`FK_evento_contenedor`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor`),
  CONSTRAINT `fk_temas_eventoC_temas1`
    FOREIGN KEY (`FK_tema`)
    REFERENCES `srse`.`tema` (`PK_tema`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`usuario_asignado_evento_contenedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`usuario_asignado_evento_contenedor` (
  `FK_evento_contenedor` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`FK_evento_contenedor`, `FK_usuario`),
  INDEX `fk_usuario_asignadoEC_usuario1_idx` (`FK_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_asignadoEC_evento_contenedor1`
    FOREIGN KEY (`FK_evento_contenedor`)
    REFERENCES `srse`.`evento_contenedor` (`PK_evento_contenedor`),
  CONSTRAINT `fk_usuario_asignadoEC_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `srse`.`calendario_u`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`calendario_u` (
  `F_actividad` INT NOT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`F_actividad`, `FK_usuario`),
  INDEX `fk_calendarioU_actividad1_idx` (`F_actividad` ASC) VISIBLE,
  INDEX `fk_calendarioU_usuario1_idx` (`FK_usuario` ASC) VISIBLE,
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
  PRIMARY KEY (`PK_revision`, `FK_usuario`, `FK_actividad`),
  INDEX `fk_revision_actividad1_idx` (`FK_actividad` ASC) VISIBLE,
  INDEX `fk_revision_usuario1_idx` (`FK_usuario` ASC) VISIBLE,
  INDEX `fk_revision_estado1_idx` (`FK_estado` ASC) VISIBLE)
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `srse`.`password_reset_token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`password_reset_token` (
  `PK_password_reset_token` BIGINT NOT NULL,
  `token` VARCHAR(45) NOT NULL,
  `fecha_expiracion` DATETIME(6) NULL,
  `token_usado` BIT NULL,
  `FK_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`PK_password_reset_token`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC) VISIBLE,
  INDEX `fk_password_reset_token_usuario1_idx` (`FK_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_password_reset_token_usuario1`
    FOREIGN KEY (`FK_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `srse`.`asistencia_actividad_evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `srse`.`asistencia_actividad_evento` (
  `FK_nombre_usuario` VARCHAR(50) NOT NULL,
  `FK_actividad` INT NOT NULL,
  PRIMARY KEY (`FK_nombre_usuario`, `FK_actividad`),
  INDEX `FK_nombre_usuario_idx` (`FK_nombre_usuario` ASC) VISIBLE,
  INDEX `FK_actividad_idx` (`FK_actividad` ASC) VISIBLE,
  CONSTRAINT `FK_nombre_usuario`
    FOREIGN KEY (`FK_nombre_usuario`)
    REFERENCES `srse`.`usuario` (`PK_nombre_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_actividad`
    FOREIGN KEY (`FK_actividad`)
    REFERENCES `srse`.`actividad` (`PK_actividad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
