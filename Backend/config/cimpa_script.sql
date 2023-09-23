-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS simpo;

-- Crear la base de datos
CREATE DATABASE simpo;

-- Usar la base de datos creada
USE simpo;

-- Creación de la tabla 'estatus'
CREATE TABLE estatus (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(15)
);

-- Creación de la tabla 'TipoC'
CREATE TABLE TipoC (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    descripcion INT
);

-- Creación de la tabla 'mComite'
CREATE TABLE mComite (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40),
    universidad VARCHAR(40)
);

-- Creación de la tabla 'temas'
CREATE TABLE temas (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(200)
);

-- Creación de la tabla 'talleres'
CREATE TABLE talleres (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(50)
);

-- Creación de la tabla 'usuario'
CREATE TABLE usuario (
    cedula VARCHAR(40) PRIMARY KEY,
    nombreUsuario VARCHAR(40),
    rol INT,
    tipoID VARCHAR(15),
    password VARCHAR(30),
    nombre VARCHAR(10),
    segundo_nombre VARCHAR(10),
    apellidos VARCHAR(30),
    iniciales VARCHAR(4),
    gender VARCHAR(1),
    nombreDocumentos VARCHAR(50),
    afiliacion VARCHAR(50),
    correo VARCHAR(50),
    pais VARCHAR(20),
    ciudad VARCHAR(30),
    telefono INT,
    estatus INT,
    FOREIGN KEY (estatus) REFERENCES estatus(codigo)
);

-- Creación de la tabla 'evento_contenedor'
CREATE TABLE evento_contenedor (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(200),
    diaInicio DATE,
    diaFinal DATE,
    activo BOOLEAN,
    codigo_tipoEvento INT,
    FOREIGN KEY (codigo_tipoEvento) REFERENCES TipoC(codigo)
);

-- Creación de la tabla 'EventosC_taller'
CREATE TABLE eventosC_taller (
    evento_C INT,
    talleres_C INT,
    FOREIGN KEY (evento_C) REFERENCES evento_contenedor(codigo),
    FOREIGN KEY (talleres_C) REFERENCES talleres(codigo)
);

-- Creación de la tabla 'temas_eventoC'
CREATE TABLE temas_eventoC (
    temas_C INT,
    evento_C INT,
    FOREIGN KEY (temas_C) REFERENCES temas(codigo),
    FOREIGN KEY (evento_C) REFERENCES evento_contenedor(codigo)
);

-- Creación de la tabla 'actividad'
CREATE TABLE actividad (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(200),
    diaEvento DATE,
    ubicacion VARCHAR(80),
    estatus INT,
    temas INT,
    talleres INT,
    evento_C INT,
    FOREIGN KEY (temas) REFERENCES temas(codigo),
    FOREIGN KEY (talleres) REFERENCES talleres(codigo),
    FOREIGN KEY (evento_C) REFERENCES evento_contenedor(codigo)
);

-- Creación de la tabla 'usuario_aignadoEC'
CREATE TABLE usuario_asignadoEC (
    usuario_N VARCHAR(40),
    eventoC INT,
    FOREIGN KEY (usuario_N) REFERENCES usuario(cedula),
    FOREIGN KEY (eventoC) REFERENCES evento_contenedor(codigo)
);

-- Creación de la tabla 'usuario_participaE'
CREATE TABLE usuario_participaE (
    usuario_N VARCHAR(40),
    evento_C INT,
    FOREIGN KEY (usuario_N) REFERENCES usuario(cedula),
    FOREIGN KEY (evento_C) REFERENCES evento_contenedor(codigo)
);

-- Creación de la tabla 'usuario_exponenteA'
CREATE TABLE usuario_exponenteA (
    usuario_N VARCHAR(40),
    actividad_C INT,
    FOREIGN KEY (usuario_N) REFERENCES usuario(cedula),
    FOREIGN KEY (actividad_C) REFERENCES actividad(codigo)
);

-- Creación de la tabla 'calendarioU'
CREATE TABLE calendarioU (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    codigoA INT,
    cedula VARCHAR(40),
    FOREIGN KEY (codigoA) REFERENCES actividad(codigo),
    FOREIGN KEY (cedula) REFERENCES usuario(cedula)
);

-- Creación de la tabla 'EventoC_mOrganizacion'
CREATE TABLE EventoC_mOrganizacion (
    evento_C INT,
    mComite_C INT,
    TipoC_C INT,
    FOREIGN KEY (evento_C) REFERENCES evento_contenedor(codigo),
    FOREIGN KEY (mComite_C) REFERENCES mComite(codigo),
    FOREIGN KEY (TipoC_C) REFERENCES TipoC(codigo)
);


-- Inserción de prueba en la tabla 'estatus'
INSERT INTO estatus (descripcion) VALUES ('Activo');
INSERT INTO estatus (descripcion) VALUES ('Inactivo');

-- Inserción de prueba en la tabla 'TipoC'
INSERT INTO TipoC (descripcion) VALUES (1);
INSERT INTO TipoC (descripcion) VALUES (2);
INSERT INTO TipoC (descripcion) VALUES (3);

-- Inserción de prueba en la tabla 'mComite'
INSERT INTO mComite (nombre, universidad) VALUES ('Comité 1', 'Universidad A');
INSERT INTO mComite (nombre, universidad) VALUES ('Comité 2', 'Universidad B');

-- Inserción de prueba en la tabla 'temas'
INSERT INTO temas (descripcion) VALUES ('Tema 1');
INSERT INTO temas (descripcion) VALUES ('Tema 2');

-- Inserción de prueba en la tabla 'talleres'
INSERT INTO talleres (descripcion) VALUES ('Taller 1');
INSERT INTO talleres (descripcion) VALUES ('Taller 2');

-- Inserción de prueba en la tabla 'usuario'
INSERT INTO usuario (cedula, nombreUsuario, rol, tipoID, password, nombre, apellidos, correo, pais, ciudad, telefono, estatus) VALUES
('12345', 'usuario1', 1, 'ID1', 'password1', 'Nombre1', 'Apellido1', 'correo1@example.com', 'Pais1', 'Ciudad1', 123456789, 1);

-- Inserción de prueba en la tabla 'evento_contenedor'
INSERT INTO evento_contenedor (descripcion, diaInicio, diaFinal, activo, codigo_tipoEvento) VALUES
('Evento 1', '2023-09-01', '2023-09-03', 1, 1);
INSERT INTO evento_contenedor (descripcion, diaInicio, diaFinal, activo, codigo_tipoEvento) VALUES
('Evento 2', '2023-10-10', '2023-10-12', 1, 2);

-- Inserción de prueba en la tabla 'eventosC_taller'
INSERT INTO eventosC_taller (evento_C, talleres_C) VALUES (1, 1);
INSERT INTO eventosC_taller (evento_C, talleres_C) VALUES (2, 2);

-- Inserción de prueba en la tabla 'temas_eventoC'
INSERT INTO temas_eventoC (temas_C, evento_C) VALUES (1, 1);
INSERT INTO temas_eventoC (temas_C, evento_C) VALUES (2, 2);

-- Inserción de prueba en la tabla 'usuario_aignadoEC'
INSERT INTO usuario_asignadoEC (usuario_N, eventoC) VALUES ('12345', 1);
INSERT INTO usuario_asignadoEC (usuario_N, eventoC) VALUES ('12345', 2);

-- Inserción de prueba en la tabla 'usuario_participaE'
INSERT INTO usuario_participaE (usuario_N, evento_C) VALUES ('12345', 1);
INSERT INTO usuario_participaE (usuario_N, evento_C) VALUES ('12345', 2);

-- Inserción de prueba en la tabla 'actividad'
INSERT INTO actividad (descripcion, diaEvento, ubicacion, estatus, temas, talleres, evento_C) VALUES
('Actividad 1', '2023-09-02', 'Ubicación A', 1, 1, 1, 1);
INSERT INTO actividad (descripcion, diaEvento, ubicacion, estatus, temas, talleres, evento_C) VALUES
('Actividad 2', '2023-10-11', 'Ubicación B', 1, 2, 2, 2);

-- Inserción de prueba en la tabla 'usuario_exponenteA'
INSERT INTO usuario_exponenteA (usuario_N, actividad_C) VALUES ('12345', 1);
INSERT INTO usuario_exponenteA (usuario_N, actividad_C) VALUES ('12345', 2);

-- Inserción de prueba en la tabla 'calendarioU'
INSERT INTO calendarioU (codigoA, cedula) VALUES (1, '12345');
INSERT INTO calendarioU (codigoA, cedula) VALUES (2, '12345');

-- Inserción de prueba en la tabla 'EventoC_mOrganizacion'
INSERT INTO EventoC_mOrganizacion (evento_C, mComite_C, TipoC_C) VALUES (1, 1, 1);
INSERT INTO EventoC_mOrganizacion (evento_C, mComite_C, TipoC_C) VALUES (2, 2, 2);

