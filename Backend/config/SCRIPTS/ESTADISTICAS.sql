

-- ALL INFO FROM ALL SIMPOSIOS
SELECT 
    ec.nombre AS nombre_evento,
    ec.lugar AS lugar_evento,
    ec.dia_inicio,
    ec.dia_final,
    ec.activo,
    te.descripcion AS tipo_evento,
    a.descripcion AS descripcion_actividad,
    a.dia_evento,
    a.hora_inicio,
    a.hora_final,
    a.ubicacion AS ubicacion_actividad,
    u.nombre AS nombre_usuario,
    u.apellidos AS apellidos_usuario
FROM 
    evento_contenedor ec
JOIN 
    tipo_evento te ON ec.FK_tipo_evento = te.PK_tipo_evento
LEFT JOIN 
    actividad a ON ec.PK_evento_contenedor = a.FK_evento_contenedor
LEFT JOIN 
    calendario_u cu ON a.PK_actividad = cu.F_actividad
LEFT JOIN 
    usuario u ON cu.FK_usuario = u.PK_nombre_usuario;


-- INFO SPECIFIC SIMPOSIUM
