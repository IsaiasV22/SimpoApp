UPDATE actividad
SET hora_inicio = '7:00:00', hora_final = '8:30:00',
 dia_evento = '2024-04-10'
WHERE PK_actividad IN (3, 6, 8, 12);

UPDATE actividad
SET hora_inicio = '9:00:00', hora_final = '12:15:00' , dia_evento = '2024-04-10'
WHERE   PK_actividad IN (2, 5, 7, 11, 14);

UPDATE actividad
SET hora_inicio = '15:30:00', hora_final = '17:30:00', dia_evento = '2024-04-10' 
WHERE PK_actividad IN (1, 4, 9, 10, 13, 15, 16, 17, 18, 19, 20, 21, 22);