-- Inserción de prueba en la tabla 'estatus'
INSERT INTO
    estatus (descripcion)
VALUES
    ('Profesor');

INSERT INTO
    estatus (descripcion)
VALUES
    ('Estudiante');

INSERT INTO
    estatus (descripcion)
VALUES
    ('Profesional');

INSERT INTO
    estatus (descripcion)
VALUES
    ('Otro');

-- Inserción de prueba en la tabla 'TipoC'
INSERT INTO
    tipo_comite (descripcion)
VALUES
    ('Científico');

INSERT INTO
    tipo_comite (descripcion)
VALUES
    ('Organizacional');

-- Inserción de prueba en la tabla 'mComite'
INSERT INTO
    miembro_comite (PK_Cedula, nombre, universidad)
VALUES
    ('123456789', 'Adriana Sanchez', 'UCR');

INSERT INTO
    miembro_comite (PK_Cedula, nombre, universidad)
VALUES
    (
        '987654321',
        'Pamela Delgado',
        'Christian Brothers University'
    );

-- Inserción de prueba en la tabla 'temas'
INSERT INTO
    tema (descripcion)
VALUES
    ('Numerical Analysis');

INSERT INTO
    tema (descripcion)
VALUES
    ('Modeling');

INSERT INTO
    tema (descripcion)
VALUES
    (
        'LACSC-New developments in Genomic Selection and Prediction studies'
    );

INSERT INTO
    tema (descripcion)
VALUES
    (
        'LACSC-Recent advances in Statistical Computing 1'
    );

INSERT INTO
    tema (descripcion)
VALUES
    ('LACSC-Statistical Computing for Data Science');

INSERT INTO
    tema (descripcion)
VALUES
    ('Aplications');

INSERT INTO
    tema (descripcion)
VALUES
    ('LACSC-Statistical Computing 4');

INSERT INTO
    tema (descripcion)
VALUES
    ('Operations Research');

-- Inserción de prueba en la tabla 'talleres'
INSERT INTO
    taller (descripcion)
VALUES
    ('Ponencias');

INSERT INTO
    taller (descripcion)
VALUES
    ('Minicursos');

-- Inserción de prueba en la tabla 'tipoEvento'
INSERT INTO
    tipo_evento (descripcion)
VALUES
    ("Simposios");

INSERT INTO
    tipo_evento (descripcion)
VALUES
    ("Congresos");

INSERT INTO
    tipo_evento (descripcion)
VALUES
    ("Jornadas");

INSERT INTO
    tipo_evento (descripcion)
VALUES
    ("Talleres");

-- Inserción de prueba en la tabla 'rol'
INSERT INTO
    rol (PK_Rol, descripcion)
VALUES
    (1, "Administrador");

INSERT INTO
    rol (PK_Rol, descripcion)
VALUES
    (2, "Director");

INSERT INTO
    rol (PK_Rol, descripcion)
VALUES
    (3, "Revisor");

INSERT INTO
    rol (PK_Rol, descripcion)
VALUES
    (4, "Expositor");

INSERT INTO
    rol (PK_Rol, descripcion)
VALUES
    (5, "Oyente");

-- Inserción de prueba en la tabla 'usuario'
INSERT INTO
    usuario (
        PK_Nombre_usuario,
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
        FK_Rol,
        FK_Estatus
    )
VALUES
    (
        'Elvio111',
        'cedula',
        '11111111',
        '$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.',
        'Elvio',
        ' ',
        'Accinelli',
        'EA',
        'H',
        ' ',
        'Departamento de Economía',
        'elvio.accinelli@eco.uaslp.mx',
        'Uruguay',
        'Montevideo',
        5555555,
        4,
        3
    );

INSERT INTO
    usuario (
        PK_Nombre_usuario,
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
        FK_Rol,
        FK_Estatus
    )
VALUES
    (
        'Guillermo111',
        'cedula',
        '22222222',
        '$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.',
        'Guillermo',
        'Andre',
        'Oliva Mercado',
        'GO',
        'H',
        ' ',
        'Departamento de Astrofísica',
        'gandreoliva@gmail.com',
        'Costa Rica',
        'San José',
        5555515,
        4,
        3
    );


    INSERT INTO
    usuario (
        PK_Nombre_usuario,
        tipo_id,
        cedula,
        password,
        nombre,
        apellidos,
        iniciales,
        genero,
        nombre_documentos,
        afiliacion,
        correo,
        pais,
        ciudad,
        telefono,
        FK_Rol,
        FK_Estatus
    )
VALUES
    (
        'Fabio111',
        'cedula',
        '22222223',
        '$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.',
        'Fabio',
        'Sanchez',
        'FS',
        'H',
        ' ',
        'Universidad de Costa Rica',
        'fabiosanchez@gmail.com',
        'Costa Rica',
        'San José',
        5555515,
        4,
        3
    );

-- Admin
INSERT INTO
    usuario (
        PK_Nombre_usuario,
        password,
        nombre,
        FK_Rol,
        FK_Estatus
    )
VALUES
    (
        'root',
        '$2a$12$S8uiC/vjIE3b/s3zyy7f6OyD4j3Z/FbaQQlrRKiZbzFtWuxGg5Dwe',
        ' Administrador',
        1,
        4
    );

-- Director
INSERT INTO
    usuario (
        PK_Nombre_usuario,
        tipo_id,
        cedula,
        password,
        nombre,
        apellidos,
        iniciales,
        genero,
        afiliacion,
        correo,
        pais,
        ciudad,
        FK_Rol,
        FK_Estatus
    )
VALUES
    (
        'orodriguezrojas',
        'cedula',
        '22222222',
        '$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.',
        'Oldemar',
        'Rodriguez Rojas',
        'ORR',
        'H',
        'Universidad de Costa Rica',
        'oldemar.rodriguez@ucr.ac.cr',
        'Costa Rica',
        'San José',
        2,
        1
    );

-- Revisor
INSERT INTO
    usuario (
        PK_Nombre_usuario,
        tipo_id,
        cedula,
        password,
        nombre,
        segundo_nombre,
        apellidos,
        iniciales,
        genero,
        afiliacion,
        correo,
        pais,
        ciudad,
        telefono,
        FK_Rol,
        FK_Estatus
    )
VALUES
    (
        'hugof',
        'pasaporte',
        '110590488',
        '$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.',
        'Hugo',
        'Alberto',
        'Flores Arguedas',
        'HFA',
        'H',
        'Instituto de Matematicas, Universidad Nacional Autonoma de Mexico',
        'hflores@im.unam.mx',
        'Mexico',
        'DF',
        '524731148134',
        3,
        3
    );

-- Oyente
INSERT INTO
    usuario (
        PK_Nombre_usuario,
        tipo_id,
        cedula,
        password,
        nombre,
        segundo_nombre,
        apellidos,
        iniciales,
        genero,
        correo,
        pais,
        ciudad,
        telefono,
        FK_Rol,
        FK_Estatus
    )
VALUES
    (
        'Andres21sb',
        'cedula',
        '111111111',
        '$2a$12$6fH4sUh2p/gWLCHRQmHziOMrmZKO7yf7/UY02sERKUhpe21PcWmO.',
        'Andres',
        'Aaron',
        'Méndez Solano',
        'AMS',
        'H',
        'andresmesol09@gmail.com',
        'Costa Rica',
        'San José ',
        '555555555',
        5,
        4
    );

-- Inserción de prueba en la tabla 'evento_contenedor'
INSERT INTO
    evento_contenedor (
        nombre,
        descripcion,
        lugar,
        dia_inicio,
        dia_final,
        activo,
        FK_Tipo_Evento
    )
VALUES
    (
        'SIMMAC XXI',
        'El XXI SIMMAC es un simposio internacional que reúne a expertos en estadísticas y matemáticas aplicadas para compartir conocimientos y avances en diversos campos.',
        'UCR Ciudad de la Investigación',
        '2018-02-27',
        '2018-03-02',
        1,
        1
    );

    -- Inserción de SIMMAC XX
INSERT INTO
    evento_contenedor (
        nombre,
        descripcion,
        lugar,
        dia_inicio,
        dia_final,
        activo,
        FK_Tipo_Evento
    )
VALUES
    (
        'SIMMAC XX',
        'XX Simposio Internacional de Métodos Matemáticos Aplicados a las Ciencias (SIMMAC)',
        'Facultad de Educación y  Edificio de Escuelas de Física y Matemática de la Universidad de Costa Rica',
        '2016-02-23',
        '2016-02-26',
        1,
        1
    );

-- Inserción de prueba en la tabla 'eventosC_taller'
INSERT INTO
    evento_contenedor_taller (FK_Evento_contenedor, FK_taller)
VALUES
    (1, 1);

INSERT INTO
    evento_contenedor_taller (FK_Evento_contenedor, FK_taller)
VALUES
    (1, 2);

-- Inserción de prueba en la tabla 'temas_eventoC'
INSERT INTO
    tema_evento_contenedor (FK_tema, FK_Evento_contenedor)
VALUES
    (1, 1);

INSERT INTO
    tema_evento_contenedor (FK_tema, FK_Evento_contenedor)
VALUES
    (2, 1);

INSERT INTO
    tema_evento_contenedor (FK_tema, FK_Evento_contenedor)
VALUES
    (3, 1);

INSERT INTO
    tema_evento_contenedor (FK_tema, FK_Evento_contenedor)
VALUES
    (4, 1);

INSERT INTO
    tema_evento_contenedor (FK_tema, FK_Evento_contenedor)
VALUES
    (5, 1);

INSERT INTO
    tema_evento_contenedor (FK_tema, FK_Evento_contenedor)
VALUES
    (6, 1);

INSERT INTO
    tema_evento_contenedor (FK_tema, FK_Evento_contenedor)
VALUES
    (7, 1);

INSERT INTO
    tema_evento_contenedor (FK_tema, FK_Evento_contenedor)
VALUES
    (8, 1);

-- Inserción de prueba en la tabla 'usuario_aignadoEC'
INSERT INTO
    usuario_asignado_evento_contenedor (FK_usuario, FK_evento_contenedor)
VALUES
    ('orodriguezrojas', 1);

INSERT INTO
    usuario_asignado_evento_contenedor (FK_usuario, FK_evento_contenedor)
VALUES
    ('hugof', 1);

-- Inserción de prueba en la tabla 'usuario_participaE'
INSERT INTO
    participacion_usuario (
        FK_evento_contenedor,
        FK_usuario,
        tipo_participante
    )
VALUES
    (1, 'Andres21sb', 'Oyente');

-- Inserción de prueba en la tabla 'actividad'
INSERT INTO
    actividad (
        descripcion,
        descripcion_d,
        dia_evento,
        hora_inicio,
        hora_final,
        ubicacion,
        estatus,
        FK_tema,
        FK_taller,
        FK_evento_contenedor
    )
VALUES
    (
        'A nonlinear relapse model with disaggregated contact rates: analysis of a forward-backward bifurcation',
        'Throughout the progress of epidemic scenarios it is expected to have different average daily contact behavior for individuals that are at different health classes. This contact heterogeneity has been studied in recent adaptive models and it allows to better captures the inherent differences across health statuses. Diseases with reinfection bring out more complex scenarios and they offer an important application in which to consider contact disaggregation. Therefore, we developed a nonlinear differential equation model to explore the dynamics of relapse phenomena and contact differences across health statuses. Our incidence rate function is formulated, taking inspiration from recent adaptive algorithms. It incorporates contact behavior for individuals in each health class. We use constant contact rates at each health status for our analytical results and prove conditions for different forward-backward bifurcation scenarios. The relationship between the different contact rates heavily influences these conditions. Numerical examples highlight the effect of temporarily recovered individuals and initial conditions on infected population persistence.',
        '2018-02-27',
        '14:00:00',
        '16:00:00',
        'Salón principal',
        1,
        1,
        1,
        1
    );
    


-- Inserción de prueba en la tabla 'usuario_exponenteA'
INSERT INTO
    presentacion_usuario_actvidad (FK_actividad, FK_usuario)
VALUES
    (1, 'Fabio111');

-- Inserción de prueba en la tabla 'calendarioU'
INSERT INTO
    calendario_u (F_actividad, FK_usuario)
VALUES
    (1, 'Andres21sb');

-- Inserción de prueba en la tabla 'EventoC_mOrganizacion'
INSERT INTO
    evento_contenedor_organizacion (FK_evento_contenedor, FK_miembro_comite, FK_tipo_comite)
VALUES
    (1, '123456789', 1);