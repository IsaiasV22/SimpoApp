UPDATE
    actividad
SET
    hora_inicio = '7:00:00',
    hora_final = '8:30:00',
    dia_evento = '2024-04-10'
WHERE
    PK_actividad IN (3, 6, 8, 12);

UPDATE
    actividad
SET
    hora_inicio = '9:00:00',
    hora_final = '12:15:00',
    dia_evento = '2024-04-10'
WHERE
    PK_actividad IN (2, 5, 7, 11, 14);

UPDATE
    actividad
SET
    hora_inicio = '15:30:00',
    hora_final = '17:30:00',
    dia_evento = '2024-04-10'
WHERE
    PK_actividad IN (1, 4, 9, 10, 13, 15, 16, 17, 18, 19, 20, 21, 22);

/*new notificcation test*/
INSERT INTO
    simpo_app_notificacion (PK_p256dh,endpoint, tiempo_expiracion,autenticador)
VALUES
    (
        "BBfdSO2ym4jtzFr3ydhvdYgYvKXrZWgd0YjvhZPHKyaGdPufgvu7ri089hdRCKLR8gvZIF_UsPw-vCcb59qslsA",
        "https://fcm.googleapis.com/fcm/send/d9K2kD3H0AE:APA91bEEVdoOqSD7wMjrYgxbAakVT7H-IWhqsExCp5cckRi0LADbkFQIv9vbIUxZB_R5SRuIlb5R2ATvEAuKwxPY2J57s7VKNWqPydoyi-jXh-14Bep6W95BeSXZuE-8mz9E92ez8ipp",
        null,
        "pVJ2FosW2xSBgKbZ3OEXUg"
    );
    /*user and notification table insertion*/
INSERT INTO
    usuario_notificacion_simpo_app (FK_usuario, FK_simpo_app_notificacion)
VALUES
    ('AlbertoAVC',
    "BBfdSO2ym4jtzFr3ydhvdYgYvKXrZWgd0YjvhZPHKyaGdPufgvu7ri089hdRCKLR8gvZIF_UsPw-vCcb59qslsA"
    );


/*-----------------*/
SELECT sn.PK_p256dh, sn.endpoint, sn.tiempo_expiracion, sn.autenticador
FROM simpo_app_notificacion sn
JOIN usuario_notificacion_simpo_app unsa ON sn.PK_p256dh = unsa.FK_simpo_app_notificacion
JOIN usuario u ON unsa.FK_usuario = u.PK_nombre_usuario
WHERE u.PK_nombre_usuario = 'AlbertoAVC';


/**/
SELECT
    JSON_OBJECT(
        'endpoint', sn.endpoint,
        'expirationTime', sn.tiempo_expiracion,
        'keys', JSON_OBJECT(
            'p256dh', sn.PK_p256dh,
            'auth', sn.autenticador
        ),
        'user', u.PK_nombre_usuario
    ) AS notification
FROM 
    simpo_app_notificacion sn
JOIN 
    usuario_notificacion_simpo_app unsa ON sn.PK_p256dh = unsa.FK_simpo_app_notificacion
JOIN 
    usuario u ON unsa.FK_usuario = u.PK_nombre_usuario;


SELECT * FROM RECORDATORIO WHERE FK_ACTIVIDAD = 1;