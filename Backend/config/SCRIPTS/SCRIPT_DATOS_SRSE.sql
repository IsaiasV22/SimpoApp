#SCRIPT PARA LOS DATOS DE LA BASE DE DATOS SRSE

#estados
INSERT INTO ESTADO (`codigo`,`descripcion`) VALUES (1,'En revisión');
INSERT INTO ESTADO (`codigo`,`descripcion`) VALUES (2,'Completado');
INSERT INTO ESTADO (`codigo`,`descripcion`) VALUES (3,'Rechazado');
INSERT INTO ESTADO (`codigo`,`descripcion`) VALUES (4,'Requiere cambios');
INSERT INTO ESTADO (`codigo`,`descripcion`) VALUES (5,'Aceptado');

#estatus
INSERT INTO ESTATUS (`PK_estatus`,`descripcion`) VALUES (1,'Profesor/a');
INSERT INTO ESTATUS (`PK_estatus`,`descripcion`) VALUES (2,'Estudiante');
INSERT INTO ESTATUS (`PK_estatus`,`descripcion`) VALUES (3,'Profesional');
INSERT INTO ESTATUS (`PK_estatus`,`descripcion`) VALUES (4,'Otro');

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
INSERT INTO TEMA (`PK_tema`,`descripcion`) VALUES (8,'Probabilidad');
INSERT INTO TEMA (`PK_tema`,`descripcion`) VALUES (9,'Modelado');
INSERT INTO TEMA (`PK_tema`,`descripcion`) VALUES (10,'Análisis de datos');
INSERT INTO TEMA (`PK_tema`,`descripcion`) VALUES (11,'Matemática Financiera');

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


# ACTUALIZACIONES ANDRÉS Y JOSE



# Eventos
INSERT INTO EVENTO_CONTENEDOR (`PK_evento_contenedor`,`nombre`,`descripcion`,`lugar`,`dia_inicio`,`dia_final`,`activo`,`FK_tipo_evento`) 
                              VALUES (3,'Mathemathical models in biology and medicine',
                              'Es común que eventos como estos reúnan a expertos en matemáticas aplicadas, biología y medicina para discutir y presentar investigaciones que involucren modelos matemáticos para comprender mejor los procesos biológicos y médicos. Estos modelos pueden abordar una variedad de temas, como la dinámica de poblaciones celulares, la propagación de enfermedades, la respuesta inmune, la farmacocinética, entre otros.',
                              'Guanacaste Campus, Liberia, University of Costa Rica (UCR).','2016-12-05','2016-12-16',1,1);

#evento_contenedor_organizacion
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (3,'adrianaSanchez@gmail.com',1);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (3,'marcelaAlfaro@gmail.com',1);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (3,'pamelaDelgado@gmail.com',1);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (3,'javierTrejos@gmail.com',1);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (3,'adrianaSanchez@gmail.com',2);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (3,'alexanderRamirez@gmail.com',2);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (3,'darioMena@gmail.com',2);
INSERT INTO evento_contenedor_organizacion (`FK_evento_contenedor`,`FK_miembro_comite`,`FK_tipo_comite`) VALUES (3,'javierTrejos@gmail.com',2);

#Talleres del evento
INSERT INTO evento_contenedor_taller (`FK_evento_contenedor`,`FK_taller`) VALUES (3,1);
INSERT INTO evento_contenedor_taller (`FK_evento_contenedor`,`FK_taller`) VALUES (3,2);
INSERT INTO evento_contenedor_taller (`FK_evento_contenedor`,`FK_taller`) VALUES (3,3);
INSERT INTO evento_contenedor_taller (`FK_evento_contenedor`,`FK_taller`) VALUES (3,4);

# tema_evento_contenedor
INSERT INTO tema_evento_contenedor (`FK_tema`,`FK_evento_contenedor`) VALUES (8,3);

# Actividades
INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Fluid limits of many-server queues with abandonments, general service time and continuous patience distributions',
    'La investigación sobre los "Fluid limits of many-server queues with abandonments, general service time, and continuous patience distributions" se sumerge en el fascinante mundo de la teoría de colas, una disciplina crucial en la optimización de sistemas que manejan flujos de llegada de clientes o solicitudes. En particular, este estudio se enfoca en sistemas con múltiples servidores, lo que es común en entornos donde la eficiencia y la capacidad de procesamiento son de vital importancia.',
    '2016-12-05',  -- Reemplaza con la fecha deseada
    '8:00:00',    -- Reemplaza con la hora de inicio deseada
    '10:00:00',    -- Reemplaza con la hora final deseada
    '2016-11-05',  -- Reemplaza con la fecha de envío deseada
    'Valor_palabras_Fluid Limits, Many-Server Queues, Abandonments, General Service Time, Continuous Patience Distributions, Queueing Theory, Stochastic Processes, System Optimization, Customer Patience, Service Dynamics, Asymptotic Analysis, Performance Modeling, Discrete-Event Systems, Queueing Networks, Markov Processes, Simulation Studies, Large-Scale Systems, Waiting Time Analysis, Queue Length Dynamics, Time-Varying Arrivals.claves',
    '"Stochastic Processes: Theory for Applications", Peter W. Jones',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula A1',
    'Sin comentarios de director',
    8,             -- Reemplaza con el valor de FK_tema deseado
    3,             -- Reemplaza con el valor de FK_taller deseado
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'Felipe'
);


INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Transmuted Rayleigh Distribution: Model Estimation and Applications',
    'El tema "Transmuted Rayleigh Distribution: Model Estimation and Applications" se centra en el estudio y la aplicación de la Distribución Rayleigh Transmutada, un modelo estadístico que ha demostrado ser útil en diversas áreas. La investigación aborda tanto la estimación del modelo como sus aplicaciones prácticas en contextos específicos.

La Distribución Rayleigh Transmutada es una variante de la Distribución Rayleigh que ha sido modificada o transformada mediante un proceso conocido como transmutación. Esta transmutación puede ser aplicada para adaptar la distribución a diferentes situaciones o conjuntos de datos, lo que permite una mayor flexibilidad en su aplicación a diversas condiciones del mundo real.

La investigación comienza explorando los métodos y técnicas utilizados para la estimación de parámetros en la Distribución Rayleigh Transmutada. Esto puede incluir el desarrollo de algoritmos, enfoques estadísticos y herramientas computacionales específicas para lograr una estimación precisa y eficiente de los parámetros del modelo.',
    '2016-12-05',  -- Reemplaza con la fecha deseada
    '9:00:00',    -- Reemplaza con la hora de inicio deseada
    '11:00:00',    -- Reemplaza con la hora final deseada
    '2016-10-05',  -- Reemplaza con la fecha de envío deseada
    'Distribución Rayleigh Transmutada, Modelado estadístico, Estimación de parámetros, Flexibilidad en distribuciones, Transmutación de distribuciones, Aplicaciones prácticas',
    '"Transmuted Rayleigh Distribution: Model Estimation and Applications", Autor1, Autor2, Autor3 (Nombre de la Revista/Libro),
"Statistical Inference for Transmuted Rayleigh Distribution: Properties and Applications", Autor4, Autor5 (Nombre de la Revista/Libro),
"Applications of Transmuted Distributions in Environmental Modeling", Autor6, Autor7 (Nombre de la Revista/Libro),',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula A2',
    'Sin comentarios de director',
    8,             -- Reemplaza con el valor de FK_tema deseado
    3,             -- Reemplaza con el valor de FK_taller deseado
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'Felipe'
);


#username = juanAntonio | password = juan123
INSERT INTO USUARIO (
    `PK_nombre_usuario`,
    `tipo_id`,
    `cedula`,
    `password`,
    `nombre`,
    `segundo_nombre`,
    `apellidos`,
    `iniciales`,
    `genero`,
    `nombre_documentos`,
    `afiliacion`,
    `correo`,
    `pais`,
    `ciudad`,
    `telefono`,
    `FK_rol`,
    `FK_estatus`
) VALUES (
    'juanAntonio',
    'Cedula',
    '123456789',
    '$2a$12$QLWfUnwhP8pL2EDgsrIFBebRNaE3tiFrkZ8SMI5Mi83.jRYEDnvhS',
    'Juan',
    'Antonio',
    'Pérez',
    'JAP',
    'm',
    'Juan Antonio Pérez',
    'Universidad de Costa Rica',
    'juanantonio@gmail.com',
    'Costa Rica',
    'San José',
    '98765432',
    4,  -- Expositor
    3   -- Profesional
);


INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'One-dimensional diffusion processes and orthogonal polynomials',
    'La actividad se centrará en explorar la intersección de los procesos de difusión unidimensionales y los polinomios ortogonales en el contexto matemático. Se abordarán conceptos clave y aplicaciones prácticas de estos temas, proporcionando a los participantes una comprensión más profunda de los procesos de difusión y su relación con los polinomios ortogonales en entornos matemáticos.',
    '2016-12-06',  -- Reemplaza con la fecha deseada
    '14:00:00',    -- Reemplaza con la hora de inicio deseada
    '16:00:00',    -- Reemplaza con la hora final deseada
    '2016-01-15',  -- Reemplaza con la fecha de envío deseada
    'Procesos de difusión, Polinomios ortogonales, Matemáticas aplicadas, Análisis matemático, Modelado matemático, Ecuaciones diferenciales estocásticas, Teoría de la probabilidad, Métodos numéricos, Aplicaciones prácticas.',
    '"Stochastic Differential Equations: An Introduction with Applications", Bernt Øksendal',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula B1',
    'Sin comentarios de director',
    8,             -- Reemplaza con el valor de FK_tema deseado (puedes ajustar según la temática)
    1,             -- Reemplaza con el valor de FK_taller deseado (puedes ajustar según el taller)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'juanAntonio'       -- Reemplaza con el nombre de usuario del remitente
);

#COAUTORES
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (3,'Felipe');

#username = cristianCruz | password = cristian123
INSERT INTO USUARIO (
    `PK_nombre_usuario`,
    `tipo_id`,
    `cedula`,
    `password`,
    `nombre`,
    `segundo_nombre`,
    `apellidos`,
    `iniciales`,
    `genero`,
    `nombre_documentos`,
    `afiliacion`,
    `correo`,
    `pais`,
    `ciudad`,
    `telefono`,
    `FK_rol`,
    `FK_estatus`
) VALUES (
    'cristianCruz',
    'Cedula',
    '987654321',
    '$2a$12$51XLUlGnXhxxXLjs4NeyVu/TxE.exQm7eXWP3YexUV7pSMGHX2gDq',
    'Cristian',
    'Andres',
    'Cruz Torres',
    'CACT',
    'm',
    'Cristian Andres Cruz Torres',
    'Universidad de Costa Rica',
    'cristian.cruz@gmail.com',
    'Costa Rica',
    'San José',
    '12348765',
    4,  -- Reemplaza con el valor correcto de FK_rol según tus necesidades
    1   -- Reemplaza con el valor correcto de FK_estatus según tus necesidades
);


INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Modelos DSGE con Varianza No Estructurada',
    'Esta actividad explorará los Modelos de Equilibrio General Dinámico Estocástico (DSGE) con varianza no estructurada, una rama importante en la modelización económica. Se abordarán los fundamentos teóricos y las aplicaciones prácticas de estos modelos, destacando la importancia de la varianza no estructurada en el análisis económico.',
    '2016-12-07',  -- Reemplaza con la fecha deseada
    '10:00:00',    -- Reemplaza con la hora de inicio deseada
    '12:00:00',    -- Reemplaza con la hora final deseada
    '2016-01-20',  -- Reemplaza con la fecha de envío deseada
    'DSGE, Modelos económicos, Varianza no estructurada, Teoría macroeconómica, Estabilidad económica, Política monetaria, Política fiscal, Ciclos económicos, Modelos estocásticos, Equilibrio general dinámico, Análisis económico.',
    '"Recursive Macroeconomic Theory", Lars Ljungqvist and Thomas J. Sargent',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula C1',
    'Sin comentarios de director',
    2,             -- Reemplaza con el valor de FK_tema deseado (puedes ajustar según la temática)
    3,             -- Reemplaza con el valor de FK_taller deseado (puedes ajustar según el taller)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'cristianCruz'       -- Reemplaza con el nombre de usuario del remitente
);

INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (4,'juanAntonio');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (4,'Felipe');

#username = JoseGranados | password = jose123
INSERT INTO USUARIO (
    `PK_nombre_usuario`,
    `tipo_id`,
    `cedula`,
    `password`,
    `nombre`,
    `segundo_nombre`,
    `apellidos`,
    `iniciales`,
    `genero`,
    `nombre_documentos`,
    `afiliacion`,
    `correo`,
    `pais`,
    `ciudad`,
    `telefono`,
    `FK_rol`,
    `FK_estatus`
) VALUES (
    'JoseGranados',
    'Cedula',
    '123456789',  -- Reemplaza con la cédula deseada
    '$2a$12$f3X6uYJN0s8R5tbNBH2pxO/e3g2B.V594rzMYsyutHi2um39IXdwW',  
    'Jose',
    'Jesus',
    'Granados Salazar',
    'JJGS',
    'm',  -- Reemplaza con el género deseado ('m' para masculino, 'f' para femenino, etc.)
    'Jose Jesus Granados Salazar',
    'Universidad de Costa Rica',
    'jose.granados@ucr.ac.cr',  -- Reemplaza con el correo deseado
    'Costa Rica',
    'San Jose',
    '123456789',  -- Reemplaza con el número de teléfono deseado
    4,  -- Reemplaza con el FK_rol deseado (puedes ajustar según el rol)
    1   -- Reemplaza con el FK_estatus deseado (puedes ajustar según el estatus)
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Generación de evidencia para la estructura de la gobernabilidad en Costa Rica mediante un análisis factorial confirmatorio de...',
    'Esta actividad se enfoca en la generación de evidencia para entender la estructura de la gobernabilidad en Costa Rica. Se utilizará un análisis factorial confirmatorio para examinar y validar las dimensiones clave relacionadas con la gobernabilidad en el contexto costarricense. La generación de esta evidencia es esencial para informar futuras decisiones y políticas gubernamentales.',
    '2016-12-07',  -- Reemplaza con la fecha deseada
    '11:00:00',    -- Reemplaza con la hora de inicio deseada
    '13:00:00',    -- Reemplaza con la hora final deseada
    '2016-11-20',  -- Reemplaza con la fecha de envío deseada
    'Gobernabilidad, Análisis factorial confirmatorio, Costa Rica, Estructura gubernamental, Políticas públicas, Toma de decisiones, Ciencia política, Evidencia empírica.',
    '"Gobernabilidad y Desarrollo en Costa Rica", Autor1, Autor2, Autor3 (Nombre de la Revista/Libro)',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula C4',
    'Sin comentarios de director',
    2,             -- Reemplaza con el valor de FK_tema deseado
    2,             -- Reemplaza con el valor de FK_taller deseado
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'JoseGranados' -- Reemplaza con el nombre de usuario del remitente
);

INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (5,'juanAntonio');

#username = LuisBMorales | password = luisB123
INSERT INTO USUARIO (
    `PK_nombre_usuario`,
    `tipo_id`,
    `cedula`,
    `password`,
    `nombre`,
    `segundo_nombre`,
    `apellidos`,
    `iniciales`,
    `genero`,
    `nombre_documentos`,
    `afiliacion`,
    `correo`,
    `pais`,
    `ciudad`,
    `telefono`,
    `FK_rol`,
    `FK_estatus`
) VALUES (
    'LuisBMorales',
    'Cedula',
    '123456789',
    '$2a$12$m53AbUS4P7z9UJW7Y1Jv2O4iSLN7zN.SOpgNDyWRU.7uN.zVRewx6', -- La contraseña encriptada, puedes utilizar la función de hash correspondiente para generarla.
    'Luis',
    'B.',
    'Morales Mendoza',
    'LBMM',
    'm',
    'Luis B. Morales Mendoza',
    'Institución Educativa',
    'luis.morales@example.com',
    'Costa Rica',
    'San José',
    '123456789',
    2, -- ID del rol según tu esquema
    1  -- ID del estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Construcción de diseños sobresaturados de niveles mixtos óptimos vía una búsqueda tabú',
    'Esta actividad se enfocará en la construcción de diseños sobresaturados de niveles mixtos mediante el uso de técnicas de búsqueda tabú. La búsqueda tabú es una estrategia heurística que puede ser aplicada para encontrar soluciones óptimas en problemas de optimización combinatoria. Se explorarán los fundamentos teóricos de esta metodología y se presentarán aplicaciones prácticas en el contexto de la construcción de diseños experimentales sobresaturados.',
    '2016-12-07',  -- Reemplaza con la fecha deseada
    '8:00:00',    -- Reemplaza con la hora de inicio deseada
    '12:00:00',    -- Reemplaza con la hora final deseada
    '2016-05-01',  -- Reemplaza con la fecha de envío deseada
    'Diseños experimentales, Niveles mixtos, Búsqueda tabú, Optimización combinatoria, Métodos heurísticos, Diseños sobresaturados, Aplicaciones prácticas.',
    '"Optimal Experimental Designs", Atkinson, A.C., Donev, A.N., Tobias, R.D.',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula D1',
    'Sin comentarios de director',
    3,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    4,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'LuisBMorales' -- Reemplaza con el nombre de usuario del remitente
);

INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (6,'JoseGranados');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (6,'juanAntonio');

#username = CindyCalderonArce | password = cindy123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'CindyCalderonArce',
    'Cedula',
    '123456789',
    '$2a$12$Ezf4xjfSDpFgI2gKoTTrtO0gibssq3bQiP/VX9mP8QtIujESoLxqC',  -- Contraseña encriptada, puedes cambiarla
    'Cindy',
    '',
    'Calderón-Arce',
    'CCA',
    'f',
    'Cindy Calderón-Arce',
    'Universidad de Costa Rica',
    'cindy.calderon@ucr.ac.cr',
    'Costa Rica',
    'San José',
    '123456789',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);


INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Optimización multiobjetivo: Problemas con funciones objetivo particulares',
    'Esta actividad abordará los desafíos y estrategias en la optimización multiobjetivo, centrándose en problemas específicos con funciones objetivo particulares. Se explorarán técnicas avanzadas de optimización, métodos heurísticos y casos prácticos relacionados con la resolución eficiente de problemas de optimización multiobjetivo en contextos diversos.',
    '2016-12-08',  -- Reemplaza con la fecha deseada
    '15:00:00',    -- Reemplaza con la hora de inicio deseada
    '17:00:00',    -- Reemplaza con la hora final deseada
    '2016-02-15',  -- Reemplaza con la fecha de envío deseada
    'Optimización multiobjetivo, Problemas de funciones objetivo, Estrategias de optimización, Métodos heurísticos, Resolución eficiente, Problemas prácticos, Técnicas avanzadas.',
    '"Multiobjective Optimization: Interactive and Evolutionary Approaches", Carlos A. Coello Coello',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula D1',
    'Sin comentarios de director',
    3,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    4,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'CindyCalderonArce' -- Reemplaza con el nombre de usuario del remitente
);

#COAUTORES
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (7,'LuisBMorales');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (7,'JoseGranados');

#username = NancyAguero | password = NancyA123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'NancyAguero',
    'Cedula',
    '987654321',
    '$2a$12$/iqsCH9pFi0pqWFEeLdPg.vvULqgRZNHG76cqjPNLk7Kztc9h/TnO',  -- Contraseña encriptada, puedes cambiarla
    'Nancy',
    '',
    'Agüero',
    'NA',
    'f',
    'Nancy Agüero',
    'Instituto de Matemática y Estadística, Universidad de São Paulo',
    'nancy.aguero@usp.br',
    'Brazil',
    'São Paulo',
    '987654321',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);


INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Simetría y dualidad en la teoría matemática de la música',
    'La actividad explorará la relación entre simetría y dualidad en la teoría matemática de la música. Se abordarán conceptos clave relacionados con la simetría y la dualidad en estructuras musicales, ofreciendo una perspectiva matemática única sobre la composición musical y la teoría de la música. Los participantes obtendrán una comprensión más profunda de cómo los principios matemáticos fundamentales se manifiestan en la estructura musical.',
    '2016-12-09',  -- Reemplaza con la fecha deseada
    '13:00:00',    -- Reemplaza con la hora de inicio deseada
    '13:30:00',    -- Reemplaza con la hora final deseada
    '2016-03-01',  -- Reemplaza con la fecha de envío deseada
    'Simetría, Dualidad, Teoría matemática de la música, Estructuras musicales, Composición musical, Principios matemáticos, Perspectiva matemática única.',
    '"Mathematics and Music: A Diderot Mathematical Forum", Gerard Assayag, Hans G. Feichtinger, and José Francisco Rodrigues',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula E1',
    'Sin comentarios de director',
    9,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    2,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'NancyAguero' -- Reemplaza con el nombre de usuario del remitente
);

#COAUTORES
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (8,'CindyCalderonArce');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (8,'LuisBMorales');

#username = IreneSGuevara | password = IreneS123

INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'IreneSGuevara',
    'Cedula',
    '876543210',
    '$2a$12$e4L72mTJF332O6jA0jB0k.nZ//DsJgI1hnfPgxUAgj.Rki0FW.4TS',  -- Contraseña encriptada, puedes cambiarla
    'Irene',
    '',
    'Sánchez Guevara',
    'ISG',
    'f',
    'Irene Sánchez Guevara',
    'Instituto de Ciencias Sociales y Humanidades "Alfonso Vélez Pliego", Benemérita Universidad Autónoma de Puebla',
    'irene.sanchez@buap.mx',
    'Mexico',
    'Puebla',
    '876543210',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);


INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Un modelo para la acción colectiva: El caso del movimiento de San Salvador Atenco',
    'La actividad presentará un modelo para entender la acción colectiva, centrándose en el caso del movimiento de San Salvador Atenco en México. Se analizarán los factores que contribuyen a la movilización colectiva, así como las dinámicas internas y externas que influyen en el desarrollo del movimiento. Los participantes obtendrán una perspectiva integral de los procesos de acción colectiva, aplicada a un caso específico y relevante.',
    '2016-12-10',  -- Reemplaza con la fecha deseada
    '15:00:00',    -- Reemplaza con la hora de inicio deseada
    '17:00:00',    -- Reemplaza con la hora final deseada
    '2016-04-01',  -- Reemplaza con la fecha de envío deseada
    'Acción colectiva, Movimiento social, San Salvador Atenco, Modelo de acción colectiva, Procesos de movilización, Dinámicas internas y externas, Perspectiva integral.',
    '"The Power of Identity: The Information Age: Economy, Society, and Culture, Volume II", Manuel Castells',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula F1',
    'Sin comentarios de director',
    9,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    1,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'IreneSGuevara' -- Reemplaza con el nombre de usuario del remitente
);

#COAUTORES
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (9,'NancyAguero');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (9,'CindyCalderonArce');

#username = HugoSSanchez | password = HugoS123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'HugoSSanchez',
    'Cedula',
    '987654321',
    '$2a$12$DDK4Pzc3qIQq0/pocSev4.RqT07dQok7FVz4zULjyMdwqF1DmiUym',  -- Contraseña encriptada, puedes cambiarla
    'Hugo',
    '',
    'Solís Sánchez',
    'HSS',
    'm',
    'Hugo Solís Sánchez',
    'Universidad Nacional Autónoma de México',
    'hugo.sanchez@unam.mx',
    'Mexico',
    'Ciudad de México',
    '987654321',
    2,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Using the Coupled Logistic Map in the Distributed Dynamics Encryption',
    'The activity will explore the application of the coupled logistic map in the field of distributed dynamics encryption. Key concepts and practical implementations will be discussed, providing participants with insights into utilizing the coupled logistic map for secure communication and information encryption in distributed systems.',
    '2016-12-08',  -- Reemplaza con la fecha deseada
    '14:45:00',    -- Reemplaza con la hora de inicio deseada
    '17:50:00',    -- Reemplaza con la hora final deseada
    '2016-05-20',  -- Reemplaza con la fecha de envío deseada
    'Coupled Logistic Map, Distributed Dynamics Encryption, Secure Communication, Information Encryption, Chaos Theory, Cryptography, Distributed Systems, Information Security, Cryptographic Algorithms, Key Generation.',
    '"Chaos-Based Cryptography: Theory, Algorithms and Applications", Vojtech Holub, Milan Starecek',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula C2',
    'Sin comentarios de director',
    9,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    2,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'HugoSSanchez' -- Reemplaza con el nombre de usuario del remitente
);

#COAUTORES
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (10,'IreneSGuevara');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (10,'juanAntonio');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (10,'CindyCalderonArce');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (10,'LuisBMorales');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (10,'JoseGranados');


#username = AlejandroCVargas | password = AlejandroCV123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'AlejandroCVargas',
    'Cedula',
    '876543210',
    '$2a$12$y9DVTHvTGnyeb5RJ5/3rJe0GTet99XjjJeJPcmCJK2tZ.juwcmKES',  -- Contraseña encriptada, puedes cambiarla
    'Alejandro',
    '',
    'Chacón Vargas',
    'ACV',
    'm',
    'Alejandro Chacón Vargas',
    'Instituto Tecnológico de Costa Rica',
    'alejandro.chacon@itcr.ac.cr',
    'Costa Rica',
    'San José',
    '876543210',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Clasificación de Datos Simbólicos tipo Histograma mediante Sobrecalentamiento Simulado – Clustering of Histogram type Symbolic Data using Simulated Annealing',
    'La actividad se centrará en la clasificación de datos simbólicos tipo histograma mediante sobrecalentamiento simulado, abordando el clustering de datos simbólicos utilizando la técnica de sobrecalentamiento simulado. Se explorarán conceptos clave y aplicaciones prácticas en el campo de la clasificación de datos simbólicos, proporcionando a los participantes una comprensión más profunda de las técnicas de clustering aplicadas a este tipo de datos.',
    '2016-12-08',  -- Reemplaza con la fecha deseada
    '13:00:00',    -- Reemplaza con la hora de inicio deseada
    '15:00:00',    -- Reemplaza con la hora final deseada
    '2016-06-10',  -- Reemplaza con la fecha de envío deseada
    'Clasificación de Datos Simbólicos, Histograma, Sobrecalentamiento Simulado, Clustering, Simulated Annealing, Técnicas de Clasificación, Symbolic Data, Machine Learning, Pattern Recognition, Data Mining, Data Clustering.',
    '"Symbolic Data Analysis and the SODAS Software", Edwin Diday, Monique Noirhomme-Fraiture, Michel Jambu',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula D1',
    'Sin comentarios de director',
    10,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    1,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'AlejandroCVargas' -- Reemplaza con el nombre de usuario del remitente
);

#COAUTORES
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (11,'HugoSSanchez');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (11,'NancyAguero');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (11,'IreneSGuevara');

#username = AlejandraJR | password = AlejandraJR123

INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'AlejandraJR',
    'Cedula',
    '987654321',
    '$2a$12$q1fxBM3W4R/5b3.1PEWEXu8lo5KS/BF/mKVPdAmvg8QLc9ZXjqX0m',  -- Contraseña encriptada, puedes cambiarla
    'Alejandra',
    '',
    'Jiménez Romero',
    'AJR',
    'f',
    'Alejandra Jiménez Romero',
    'Universidad Nacional de Costa Rica',
    'alejandra.jimenez@una.ac.cr',
    'Costa Rica',
    'Heredia',
    '987654321',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Clasificación de datos binarios mediante heurísticas poblacionales',
    'La actividad se enfocará en la clasificación de datos binarios utilizando heurísticas poblacionales. Se explorarán diversas heurísticas y su aplicación en la clasificación de datos binarios, proporcionando a los participantes una comprensión más profunda de las técnicas y enfoques utilizados en este contexto.',
    '2016-12-09',  -- Reemplaza con la fecha deseada
    '14:30:00',    -- Reemplaza con la hora de inicio deseada
    '16:30:00',    -- Reemplaza con la hora final deseada
    '2016-07-01',  -- Reemplaza con la fecha de envío deseada
    'Clasificación de Datos Binarios, Heurísticas Poblacionales, Machine Learning, Pattern Recognition, Data Mining, Binary Classification, Metaheuristics, Evolutionary Algorithms.',
    '"Introduction to Machine Learning", Alpaydin',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula C2',
    'Sin comentarios de director',
    10,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    4,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'AlejandraJR'  -- Reemplaza con el nombre de usuario del remitente
);

#SIN COAUTORES SOLO EL REMITENTE

#username = MarisolGS | password = MarisolGSS123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'MarisolGS',
    'Cedula',
    '876543210',
    '$2a$12$nGwcle5S8J5/WCFE5fR5o.rnVoii.milwmBUf5LBwh6r8IU.4EE3G',  -- Contraseña encriptada, puedes cambiarla
    'Marisol',
    '',
    'Gordillo Suarez',
    'MGS',
    'f',
    'Marisol Gordillo Suarez',
    'Universidad de Costa Rica',
    'marisol.gordillo@ucr.ac.cr',
    'Costa Rica',
    'San Jose',
    '876543210',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Optimización de la blancura de un bagazo de caña para producción de pulpa blanca',
    'La actividad se enfocará en la optimización de la blancura de un bagazo de caña con el objetivo de mejorar la producción de pulpa blanca. Se explorarán diferentes técnicas y estrategias para lograr una optimización efectiva, brindando a los participantes conocimientos especializados en el área.',
    '2016-12-10',  -- Reemplaza con la fecha deseada
    '10:00:00',    -- Reemplaza con la hora de inicio deseada
    '12:00:00',    -- Reemplaza con la hora final deseada
    '2016-09-01',  -- Reemplaza con la fecha de envío deseada
    'Optimización, Blancura, Bagazo de Caña, Producción de Pulpa Blanca, Ingeniería Química, Procesos Industriales, Industria Papelera, Optimización de Procesos, Biomasa.',
    '"Optimization Methods for Large-Scale Systems", William L. Cooper, Ken J. Kishimoto',
    1,             -- Reemplaza con el valor de estatus deseado
    'Laboratorio Q3',
    'Sin comentarios de director',
    3,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'MarisolGS'    -- Reemplaza con el nombre de usuario del remitente
);

INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (13,'AlejandraJR');

#username = JenniferIAQ | password = JenniferIAQ123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'JenniferIAQ',
    'Cedula',
    '987654321',
    '$2a$12$iDgYBan/tQLGHOSArw7os.PMYrggqrepXWs4/F.PUqAtHK0E9SwLu',  -- Contraseña encriptada, puedes cambiarla
    'Jennifer',
    'Irene',
    'Araya Quirós',
    'JIAQ',
    'f',
    'Jennifer Irene Araya Quirós',
    'Universidad de Costa Rica',
    'jennifer.araya@ucr.ac.cr',
    'Costa Rica',
    'San Jose',
    '987654321',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Estrategias de Aprendizaje Supervisado para la Detección de Fraudes en Seguros',
    'La actividad se enfocará en explorar estrategias de aprendizaje supervisado para mejorar la detección de fraudes en la industria de seguros. Se revisarán técnicas actuales y casos de estudio, proporcionando a los participantes conocimientos especializados en el campo de la inteligencia artificial aplicada a la detección de fraudes.',
    '2016-12-09',  -- Reemplaza con la fecha deseada
    '15:30:00',    -- Reemplaza con la hora de inicio deseada
    '17:30:00',    -- Reemplaza con la hora final deseada
    '2016-10-05',  -- Reemplaza con la fecha de envío deseada
    'Aprendizaje Supervisado, Detección de Fraudes, Seguros, Inteligencia Artificial, Machine Learning, Casos de Estudio.',
    '"Machine Learning Yearning", Andrew Ng',
    1,             -- Reemplaza con el valor de estatus deseado
    'Aula A5',
    'Sin comentarios de director',
    3,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    2,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'JenniferIAQ'  -- Reemplaza con el nombre de usuario del remitente
);

INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (14,'MarisolGS');

#username = RomanAMG | password = RomanAMG123

INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'RomanAMG',
    'Cedula',
    '123456789',
    '$2a$12$4Ynohk.di0FEHsvgnL2ZPujSrt6rhK3Gf.87xpxbbo1gAcRc5ls7S',  -- Contraseña encriptada, puedes cambiarla
    'Román',
    'Anselmo',
    'Mora Gutiérrez',
    'RAMG',
    'm',
    'Román Anselmo Mora Gutiérrez',
    'Universidad de Costa Rica',
    'roman.mora@ucr.ac.cr',
    'Costa Rica',
    'San Jose',
    '123456789',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Modification of the Method of Musical Composition based on principles of evolutionary psychology',
    'La actividad se enfocará en explorar la modificación del método de composición musical basado en los principios de la psicología evolutiva. Se examinarán conceptos clave y se discutirán aplicaciones prácticas de esta modificación en la composición musical, brindando a los participantes una perspectiva única sobre la relación entre la música y la psicología evolutiva.',
    '2016-12-11',  -- Reemplaza con la fecha deseada
    '10:00:00',    -- Reemplaza con la hora de inicio deseada
    '12:00:00',    -- Reemplaza con la hora final deseada
    '2016-08-01',  -- Reemplaza con la fecha de envío deseada
    'Composición Musical, Psicología Evolutiva, Música y Emoción, Creatividad Musical.',
    '"This Is Your Brain on Music: The Science of a Human Obsession", Daniel J. Levitin',
    1,             -- Reemplaza con el valor de estatus deseado
    'Sala de Conciertos',
    'Sin comentarios de director',
    3,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    1,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'RomanAMG'     -- Reemplaza con el nombre de usuario del remitente
);

INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (15,'JenniferIAQ');

#username = AlbertoAVC | password = AlbertoAVC123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'AlbertoAVC',
    'Cedula',
    '123456789',
    '$2a$12$BWkOr8TtaVfuhgISFi2eE.GNsra95Wmp5fT4ng20zkJzBl5RC3QVG',  -- Contraseña encriptada, puedes cambiarla
    'Alberto Alejandro',
    'Vásquez',
    'Cortés',
    'AAVC',
    'm',
    'Alberto Alejandro Vásquez Cortés',
    'Sociedad de Músicos',
    'alberto.vasquez@gmail.com',
    'Costa Rica',
    'San Jose',
    '123456789',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Composition process in a society of musicians',
    'La actividad se enfocará en explorar el proceso de composición en una sociedad de músicos. Se analizarán las dinámicas sociales, la colaboración musical y la influencia de la sociedad en la creación artística. Los participantes obtendrán perspectivas sobre cómo la composición musical puede reflejar y dar forma a la cultura y la identidad musical de una sociedad.',
    '2016-12-10',  -- Reemplaza con la fecha deseada
    '15:30:00',    -- Reemplaza con la hora de inicio deseada
    '17:30:00',    -- Reemplaza con la hora final deseada
    '2016-10-01',  -- Reemplaza con la fecha de envío deseada
    'Composición Musical, Sociedad de Músicos, Influencia Cultural, Colaboración Artística, Identidad Musical.',
    '"The Rest Is Noise: Listening to the Twentieth Century", Alex Ross',
    1,             -- Reemplaza con el valor de estatus deseado
    'Sala de Conciertos',
    'Sin comentarios de director',
    3,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    4,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'AlbertoAVC'   -- Reemplaza con el nombre de usuario del remitente
);


INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (16,'juanAntonio');


INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Hybrid algorithm for generating functions with applications in psychiatry',
    'La actividad se centrará en la presentación de un algoritmo híbrido para la generación de funciones, con aplicaciones específicas en el campo de la psiquiatría. Se explorarán casos de estudio y aplicaciones prácticas de este algoritmo en la generación de funciones relevantes para la investigación en salud mental.',
    '2016-12-06',  -- Reemplaza con la fecha deseada
    '13:00:00',    -- Reemplaza con la hora de inicio deseada
    '15:00:00',    -- Reemplaza con la hora final deseada
    '2016-08-01',  -- Reemplaza con la fecha de envío deseada
    'Algoritmo Híbrido, Generación de Funciones, Psiquiatría, Salud Mental, Investigación Aplicada.',
    '"Computational Psychiatry: New Perspectives on Mental Illness", ed. A. A. Adam Hampshire',
    1,             -- Reemplaza con el valor de estatus deseado
    'Sala de Conferencias',
    'Sin comentarios de director',
    3,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    2,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'RomanAMG'      -- Reemplaza con el nombre de usuario del remitente
);

INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (17,'MarisolGS');


#username = OswaldoGG | password = OswaldoGG123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'OswaldoGG',
    'Cedula',
    '123456789',
    '$2a$12$0H7836UbrDQffh9aPcetHeVabksCHZaVamS1BwOyrAfV8XI2L9q2y',  -- Contraseña encriptada, puedes cambiarla
    'Oswaldo',
    'González',
    'Gaxiola',
    'OGG',
    'm',
    'Oswaldo González Gaxiola',
    'Universidad Nacional Autónoma de México',
    'oswaldo@gmail.com',
    'México',
    'Ciudad de México',
    '987654321',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Una Conexión Entre la Matemática Financiera y la Física Cuántica',
    'La actividad explorará la conexión entre la matemática financiera y la física cuántica. Se presentarán conceptos clave, casos de estudio y aplicaciones prácticas que revelan la interrelación de estos campos aparentemente dispares. Los participantes obtendrán una comprensión única de cómo los principios cuánticos pueden influir en los modelos matemáticos financieros.',
    '2016-12-10',  -- Reemplaza con la fecha deseada
    '15:30:00',    -- Reemplaza con la hora de inicio deseada
    '17:30:00',    -- Reemplaza con la hora final deseada
    '2016-09-01',  -- Reemplaza con la fecha de envío deseada
    'Matemática Financiera, Física Cuántica, Modelos Matemáticos, Interconexión de Campos, Principios Cuánticos, Aplicaciones Financieras.',
    '"Quantum Finance: Path Integrals and Hamiltonians for Options and Interest Rates", Belal E. Baaquie',
    1,             -- Reemplaza con el valor de estatus deseado
    'Sala de Conferencias 2',
    'Sin comentarios de director',
    11,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    1,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'OswaldoGG'    -- Reemplaza con el nombre de usuario del remitente
);


INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (18,'AlejandraJR');

#username = AndreaET | password = AndreaET123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'AndreaET',
    'Cedula',
    '789012345',
    '$2a$12$p6WEwlvEOYTsoEThRcxuN.uzKqBHw0qUT6u4CikYRUgQ7aHK5RRN2',  -- Contraseña encriptada, puedes cambiarla
    'Andrea',
    'Ariete España',
    'Tinajero',
    'AAET',
    'f',
    'Andrea Ariete España Tinajero',
    'Universidad Autónoma de Madrid',
    'andrea@gmail.com',
    'España',
    'Madrid',
    '654321098',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'El índice de Gini',
    'La actividad se enfocará en el análisis del índice de Gini como medida de desigualdad en distribuciones. Se explorarán métodos de cálculo, interpretación de resultados y aplicaciones prácticas en diversos contextos económicos y sociales. Los participantes adquirirán una comprensión profunda de la utilidad y limitaciones de esta medida en el estudio de desigualdades.',
    '2016-08-22',  -- Reemplaza con la fecha deseada
    '10:00:00',    -- Reemplaza con la hora de inicio deseada
    '12:00:00',    -- Reemplaza con la hora final deseada
    '2016-07-01',  -- Reemplaza con la fecha de envío deseada
    'Índice de Gini, Desigualdad, Distribuciones, Medidas Socioeconómicas, Análisis Estadístico.',
    '"Measuring Inequality", Amartya Sen',
    1,             -- Reemplaza con el valor de estatus deseado
    'Sala de Conferencias 1',
    'Sin comentarios de director',
    11,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'AndreaET'     -- Reemplaza con el nombre de usuario del remitente
);

INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (19,'RomanAMG');

#username = LuisDFG | password = LuisDFG123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'LuisDFG',
    'Cedula',
    '123456789',
    '$2a$12$.OZHPNzjC9Hjy8NSIP8RlOtdHiP7fu6iGJ8JqhGL6AePxgd./LEZ2',  -- Contraseña encriptada, puedes cambiarla
    'Luis',
    'Diego',
    'Fernández Gómez',
    'LDFG',
    'm',
    'Luis Diego Fernández Gómez',
    'Universidad Nacional de Costa Rica',
    'luis@gmail.com',
    'Costa Rica',
    'San José',
    '987654321',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'A portfolio allocation study: copula-GARCH approach',
    'This activity will focus on a comprehensive study of portfolio allocation using a copula-GARCH approach. Key concepts, mathematical models, and practical applications will be explored, providing participants with a deeper understanding of portfolio optimization in financial markets.',
    '2016-12-15',  -- Reemplaza con la fecha deseada
    '09:30:00',    -- Reemplaza con la hora de inicio deseada
    '11:30:00',    -- Reemplaza con la hora final deseada
    '2016-08-01',  -- Reemplaza con la fecha de envío deseada
    'Portfolio allocation, Copula-GARCH, Financial markets, Optimization, Risk management.',
    '"Portfolio Selection: Efficient Diversification of Investments", Harry Markowitz',
    1,             -- Reemplaza con el valor de estatus deseado
    'Conference Room A',
    'No director comments',
    11,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'LuisDFG'      -- Reemplaza con el nombre de usuario del remitente
);

INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (20,'AlbertoAVC');



#username = CarlosCC | password = CarlosCC123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'CarlosCC',
    'Cedula',
    '987654321',
    '$2a$12$cH/isLPG.7Et2sinHOTXc.P7/.ATxPsYUM.XBEmHOjQ3nw8kUGxqi',  -- Contraseña encriptada, puedes cambiarla
    'Carlos',
    '',
    'Cuevas Covarrubias',
    'CCC',
    'm',
    'Carlos Cuevas Covarrubias',
    'Universidad Nacional Autónoma de México',
    'carlos@gmail.com',
    'México',
    'Ciudad de México',
    '555-1234',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Clasificación Estadística Dinámica',
    'Esta actividad se enfocará en la clasificación estadística dinámica, explorando métodos y técnicas avanzadas para el análisis de datos en constante cambio. Se abordarán conceptos clave y se discutirán aplicaciones prácticas en diversos campos.',
    '2016-12-16',  -- Reemplaza con la fecha deseada
    '15:00:00',    -- Reemplaza con la hora de inicio deseada
    '17:00:00',    -- Reemplaza con la hora final deseada
    '2016-10-10',  -- Reemplaza con la fecha de envío deseada
    'Clasificación Estadística, Análisis de Datos Dinámicos, Métodos Avanzados, Aplicaciones Prácticas.',
    '"Dynamic Statistical Classification", Katherine S. Montemurro',
    1,             -- Reemplaza con el valor de estatus deseado
    'Sala de Conferencias B',
    'Sin comentarios de director',
    10,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    2,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'CarlosCC'     -- Reemplaza con el nombre de usuario del remitente
);



#username = JorgeAG | password = JorgeAG123
INSERT INTO USUARIO (
    PK_nombre_usuario,
    tipo_id,
    cedula,
    password,
    nombre,
    segundo_nombre,
    apellidos,
    iniciales,
    genero,
    nombre_documentos,
    afiliacion,
    correo,
    pais,
    ciudad,
    telefono,
    FK_rol,
    FK_estatus
) VALUES (
    'JorgeAG',
    'Cedula',
    '123456789',
    '$2a$12$tOesprmy20KtsGXphN/QWOsqC0y7KmppOR1N3IVjMOPReCCHkkB.u',  -- Contraseña encriptada, puedes cambiarla
    'Jorge',
    'Emmanuel',
    'Arce Garro',
    'JEAG',
    'm',
    'Jorge Emmanuel Arce Garro',
    'Universidad de Costa Rica',
    'jorge@gmail.com',
    'Costa Rica',
    'San José',
    '555-9876',
    4,  -- ID de rol según tu esquema
    1   -- ID de estatus según tu esquema
);

INSERT INTO actividad (
    descripcion,
    descripcion_d,
    dia_evento,
    hora_inicio,
    hora_final,
    fecha_envio,
    palabras_claves,
    bibliografia,
    estatus,
    ubicacion,
    comentarios_director,
    FK_tema,
    FK_taller,
    FK_evento_contenedor,
    FK_estado,
    FK_usuario_remitente
) VALUES (
    'Principal Curves and Surfaces to Interval Valued Variables',
    'This activity will focus on exploring the application of principal curves and surfaces to interval-valued variables. Key concepts and practical applications in the field will be discussed, providing participants with insights into this specialized area of study.',
    '2016-12-15',  -- Reemplaza con la fecha deseada
    '13:30:00',    -- Reemplaza con la hora de inicio deseada
    '15:30:00',    -- Reemplaza con la hora final deseada
    '2017-02-20',  -- Reemplaza con la fecha de envío deseada
    'Principal Curves, Surfaces, Interval-Valued Variables, Data Analysis, Applications.',
    '"Statistics and Data Analysis for Financial Engineering", David Ruppert',
    1,             -- Reemplaza con el valor de estatus deseado
    'Room C2',
    'No director comments',
    10,             -- Reemplaza con el valor de FK_tema deseado (ajusta según tu esquema)
    1,             -- Reemplaza con el valor de FK_taller deseado (ajusta según tu esquema)
    3,             -- Reemplaza con el valor de FK_evento_contenedor deseado
    5,             -- Reemplaza con el valor de FK_estado deseado
    'JorgeAG'      -- Reemplaza con el nombre de usuario del remitente
);

INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (22,'AndreaET');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (22,'LuisDFG');
INSERT INTO presentacion_usuario_actvidad (FK_actividad ,FK_usuario) VALUES (22,'OswaldoGG');


-- Asignacion de un usuario al evento 3
INSERT INTO `srse`.`participacion_usuario` 
(`FK_evento_contenedor`, `FK_usuario`, `tipo_participante`, `pagina`, `departamento`,`becado`, `comentarios`) 
VALUES ('3', 'AlbertoAVC', 'Oyente', '.', 'mat', '2','.');