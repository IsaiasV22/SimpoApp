#SCRIPT PARA LOS DATOS DE LA BASE DE DATOS SRSE

#estados
INSERT INTO ESTADO (`codigo`,`descripcion`) VALUES (1,'En revisión');
INSERT INTO ESTADO (`codigo`,`descripcion`) VALUES (2,'Completado');
INSERT INTO ESTADO (`codigo`,`descripcion`) VALUES (3,'Rechazado');
INSERT INTO ESTADO (`codigo`,`descripcion`) VALUES (4,'Requiere cambios');
INSERT INTO ESTADO (`codigo`,`descripcion`) VALUES (5,'Aceptado');

#estatus
INSERT INTO ESTATUS (`PK_estatus`,`descripcion`) VALUES (1,'Inscrito');

#roles
INSERT INTO ROL (`PK_rol`,`descripcion`) VALUES (1,'Administrador');
INSERT INTO ROL (`PK_rol`,`descripcion`) VALUES (2,'Director');
INSERT INTO ROL (`PK_rol`,`descripcion`) VALUES (3,'Revisor');
INSERT INTO ROL (`PK_rol`,`descripcion`) VALUES (4,'Expositor');
INSERT INTO ROL (`PK_rol`,`descripcion`) VALUES (5,'Oyente');

#talleres
INSERT INTO TALLER (`PK_taller`,`descripcion`) VALUES (1,'Ponencia');
INSERT INTO TALLER (`PK_taller`,`descripcion`) VALUES (2,'Charla Corta');
INSERT INTO TALLER (`PK_taller`,`descripcion`) VALUES (3,'Charla Larga');
INSERT INTO TALLER (`PK_taller`,`descripcion`) VALUES (4,'Minicurso');

#temas
INSERT INTO TEMA (`PK_tema`,`descripcion`) VALUES (1,'Algebra');
INSERT INTO TEMA (`PK_tema`,`descripcion`) VALUES (2,'Estadistica');
INSERT INTO TEMA (`PK_tema`,`descripcion`) VALUES (3,'Optimizacion');
INSERT INTO TEMA (`PK_tema`,`descripcion`) VALUES (4,'Ciencias de Datos');
INSERT INTO TEMA (`PK_tema`,`descripcion`) VALUES (5,'Ecuaciones Diferenciales');
INSERT INTO TEMA (`PK_tema`,`descripcion`) VALUES (6,'Aplicaciones');
INSERT INTO TEMA (`PK_tema`,`descripcion`) VALUES (7,'Aproximacion');

#tipo de eventos
INSERT INTO TIPO_EVENTO (`PK_tipo_evento`,`descripcion`) VALUES (1,'Simposio');
INSERT INTO TIPO_EVENTO (`PK_tipo_evento`,`descripcion`) VALUES (2,'Conferencia');
INSERT INTO TIPO_EVENTO (`PK_tipo_evento`,`descripcion`) VALUES (3,'Curso');
INSERT INTO TIPO_EVENTO (`PK_tipo_evento`,`descripcion`) VALUES (4,'Seminario');

#usuarios
#username = CIMPA | password = cimpa
INSERT INTO USUARIO (`PK_nombre_usuario`,`tipo_id`,`cedula`,`password`,`nombre`,`segundo_nombre`,`apellidos`,`iniciales`,`genero`,`nombre_documentos`,`afiliacion`,`correo`,`pais`,`ciudad`,`telefono`,`FK_rol`,`FK_estatus`) VALUES ('CIMPA','Cedula','111111111','$2a$10$NiUoReMT21MNcrzFNb78leHtdBrzf0koIKExabBahi0u0TzlFqdSe','CIMPA',' ',' ',' ','o',' ','Universidad de Costa Rica',' ','Costa Rica','San Jose','1111111',1,1);
#username = María Luisa | password = Marilugc12.
INSERT INTO USUARIO (`PK_nombre_usuario`,`tipo_id`,`cedula`,`password`,`nombre`,`segundo_nombre`,`apellidos`,`iniciales`,`genero`,`nombre_documentos`,`afiliacion`,`correo`,`pais`,`ciudad`,`telefono`,`FK_rol`,`FK_estatus`) VALUES ('María Luisa','Cedula','109970958','$2a$10$e3j..0jyGajqH.YOI/ussOkHnt3lXlkZpbLacZS1DCrGfny47V5bW','María',' Luisa','González Campos','MLGC','f','María Luisa González Campos','Universidad de Costa Rica','maria.gonzalezcampos@ucr.ac.cr','Costa Rica','San Pedro','25116606',2,1);
#username = Felipe | password = felipe.prueba1
INSERT INTO USUARIO (`PK_nombre_usuario`,`tipo_id`,`cedula`,`password`,`nombre`,`segundo_nombre`,`apellidos`,`iniciales`,`genero`,`nombre_documentos`,`afiliacion`,`correo`,`pais`,`ciudad`,`telefono`,`FK_rol`,`FK_estatus`) VALUES ('Felipe','Cedula','115340616','$2a$10$BVj1s0i4UfX1KKm47JI3huZFFqaj/HA7niu0cQxqVKpPgvmfifVH2','Felipe',' ','Escalante Guido','FEG','m','Felipe Escalante Guido','Universidad de Costa Rica','felipe.escalanteguido@ucr.ac.cr','Costa Rica','San Pedro','25116609',3,1);
#username = richieli | password = richi
INSERT INTO USUARIO (`PK_nombre_usuario`,`tipo_id`,`cedula`,`password`,`nombre`,`segundo_nombre`,`apellidos`,`iniciales`,`genero`,`nombre_documentos`,`afiliacion`,`correo`,`pais`,`ciudad`,`telefono`,`FK_rol`,`FK_estatus`) VALUES ('richieli','Cedula','305370787','$2a$10$wLb9DobngNyjGyzRMc/d7u4P3lTlkyPxGwKFi0bTXxqA4ZwS/i3M6','Ricardo','Joel','Sanabria Li','RJSL','m','Ricardo Joel Sanabria Li','Universidad de Costa Rica','richie@gmail.com','Costa Rica','San Miguel','12345678',4,1);
#username = andresito03 | password = andresito
INSERT INTO USUARIO (`PK_nombre_usuario`,`tipo_id`,`cedula`,`password`,`nombre`,`segundo_nombre`,`apellidos`,`iniciales`,`genero`,`nombre_documentos`,`afiliacion`,`correo`,`pais`,`ciudad`,`telefono`,`FK_rol`,`FK_estatus`) VALUES ('andresito03','Cedula','402600456','$2a$10$axwqttMB2TanHC9P.UGtN.oonYDbTZ4Uj2zampw.nf1x3.UALSJ2S','Angel','Andres','Villalobos Irias','AAVI','m','Angel Andres Villalobos Irias','Universidad Nacional','angel@gmail.com','Costa Rica','Santa Rosa','12345678',5,1);

#Comite
INSERT INTO MIEMBRO_COMITE (`PK_cedula`,`nombre`,`universidad`) VALUES ('adrianaSanchez@gmail.com','Adriana Sánchez','Universidad de Costa Rica');
INSERT INTO MIEMBRO_COMITE (`PK_cedula`,`nombre`,`universidad`) VALUES ('alexanderRamirez@gmail.com','Alexander Ramírez','Universidad de Costa Rica.');
INSERT INTO MIEMBRO_COMITE (`PK_cedula`,`nombre`,`universidad`) VALUES ('allanBerrocal@gmail.com','Allan Berrocal','Universidad de Costa Rica');
INSERT INTO MIEMBRO_COMITE (`PK_cedula`,`nombre`,`universidad`) VALUES ('darioMena@gmail.com','Dario Mena','Universidad de Costa Rica');
INSERT INTO MIEMBRO_COMITE (`PK_cedula`,`nombre`,`universidad`) VALUES ('javierTrejos@gmail.com','Javier Trejos','Universidad de Costa Rica');
INSERT INTO MIEMBRO_COMITE (`PK_cedula`,`nombre`,`universidad`) VALUES ('jenniferAcuña@gmail.com','Jennifer Acuña','Universidad de Costa Rica');
INSERT INTO MIEMBRO_COMITE (`PK_cedula`,`nombre`,`universidad`) VALUES ('marcelaAlfaro@gmail.com','Marcela Alfaro','University of California');
INSERT INTO MIEMBRO_COMITE (`PK_cedula`,`nombre`,`universidad`) VALUES ('pamelaDelgado@gmail.com','Pamela Delgado','Christian Brothers University');

#tipo de comite
INSERT INTO TIPO_COMITE (`PK_tipo_comite`,`descripcion`) VALUES (1,'Cientifico');
INSERT INTO TIPO_COMITE (`PK_tipo_comite`,`descripcion`) VALUES (2,'Organizador');
INSERT INTO TIPO_COMITE (`PK_tipo_comite`,`descripcion`) VALUES (3,'Apoyo');

#Eventos
INSERT INTO EVENTO_CONTENEDOR (`PK_evento_contenedor`,`nombre`,`descripcion`,`lugar`,`dia_inicio`,`dia_final`,`activo`,`FK_tipo_evento`) VALUES (1,'XXIV International Symposium of Mathematical Methods Applied to Sciences','The XXIV International Symposium of Mathematical Methods Applied to Sciences (XXIV SIMMAC) is the most important applied mathematics event in Central America. It is organized by the Center for Research in Pure and Applied Mathematics (CIMPA) of the University of Costa Rica (UCR) every two years, with the collaboration of the School of Mathematics (EMat).','Guanacaste Campus, Liberia, University of Costa Rica (UCR).','2024-02-20','2024-02-24',1,1);
INSERT INTO EVENTO_CONTENEDOR (`PK_evento_contenedor`,`nombre`,`descripcion`,`lugar`,`dia_inicio`,`dia_final`,`activo`,`FK_tipo_evento`) VALUES (2,'18th International Federation of Classification Societies','The International Federation of Classification Societies (IFCS) groups the national or regional classification societies all around the world. The IFCS organizes an international conference every two years since 1987.\n\nThe 18th conference of the International Federation of Classification Societies will take place in San José, Costa Rica, on 15-29 July 2024.\n\nFor 2024, the University of Costa Rica has been chosen to host the IFCS Conference, that will be organized by the Central American and Caribbean Society for Classification and Data Analysis (SoCCCAD).',' .','2024-07-15','2024-07-19',1,2);

#evento_contenedor_organizacion
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (1,'adrianaSanchez@gmail.com',1);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (1,'marcelaAlfaro@gmail.com',1);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (1,'pamelaDelgado@gmail.com',1);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (2,'javierTrejos@gmail.com',1);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (1,'adrianaSanchez@gmail.com',2);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (1,'alexanderRamirez@gmail.com',2);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (1,'darioMena@gmail.com',2);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (1,'javierTrejos@gmail.com',2);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (1,'jenniferAcuña@gmail.com',2);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (2,'adrianaSanchez@gmail.com',2);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (2,'allanBerrocal@gmail.com',2);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (2,'javierTrejos@gmail.com',2);

# evento_contenedor_taller
INSERT INTO evento_contenedor_taller (`FK_evento_contenedor`,`FK_taller`) VALUES (2,1);
INSERT INTO evento_contenedor_taller (`FK_evento_contenedor`,`FK_taller`) VALUES (1,2);
INSERT INTO evento_contenedor_taller (`FK_evento_contenedor`,`FK_taller`) VALUES (1,3);
INSERT INTO evento_contenedor_taller (`FK_evento_contenedor`,`FK_taller`) VALUES (2,3);
INSERT INTO evento_contenedor_taller (`FK_evento_contenedor`,`FK_taller`) VALUES (1,4);

# tema_evento_contenedor
INSERT INTO tema_evento_contenedor (`FK_tema`,`FK_evento_contenedor`) VALUES (2,1);
INSERT INTO tema_evento_contenedor (`FK_tema`,`FK_evento_contenedor`) VALUES (3,1);
INSERT INTO tema_evento_contenedor (`FK_tema`,`FK_evento_contenedor`) VALUES (4,2);

