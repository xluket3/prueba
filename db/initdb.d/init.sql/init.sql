CREATE DATABASE IF NOT EXISTS prueba_bd;
USE prueba_bd;

CREATE TABLE IF NOT EXISTS log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora VARCHAR(50),
    actividad VARCHAR(100),
    estado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    imagen VARCHAR(100)
);

INSERT INTO log (hora, actividad, estado, imagen) VALUES 
('12:30', 'Inicio de contenedores', 'OK', 'logo.png'),
('12:30', 'Conexión a base de datos', 'OK', 'logo.png'),
('12:30', 'Verificación', 'OK', 'logo.png'),
('12:30', 'final', 'OK', 'logo.png');
