import express from "express";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/static", express.static(path.join(__dirname, "static")));

const dbConfig = {
  host: "bd",
  user: "lukas",
  password: "lukas123",
  database: "prueba_bd"
};

app.get("/", async (req, res) => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      "SELECT hora, actividad, estado, imagen FROM log"
    );

    let html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Prueba Docker - Log de Actividades</title>
        <style>
            body { font-family: sans-serif; text-align: center; padding: 20px; }
            table { margin: 0 auto; border-collapse: collapse; width: 80%; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
            img.log-img { width: 50px; height: 50px; object-fit: cover; }
            .logo { width: 150px; margin-bottom: 20px; }
            .status-ok { color: green; font-weight: bold; }
            .status-error { color: red; font-weight: bold; }
        </style>
    </head>
    <body>

        <img src="/static/img/logo.png" alt="Logo" class="logo">

        <h1>Registro de Actividades</h1>

        <p class='status-ok'>Conexión a BD Exitosa</p>
    `;

    if (rows.length > 0) {
      html += `
        <table>
            <tr><th>Hora</th><th>Actividad</th><th>Estado</th><th>Imagen</th></tr>
      `;

      for (const row of rows) {
        html += `
            <tr>
                <td>${row.hora}</td>
                <td>${row.actividad}</td>
                <td>${row.estado}</td>
                <td><img src="/static/img/${row.imagen}" class="log-img"></td>
            </tr>
        `;
      }

      html += "</table>";
    } else {
      html += "<p>0 resultados en la tabla log</p>";
    }

    html += "</body></html>";

    res.send(html);

  } catch (error) {
    res.send(`
      <p class="status-error">
        Error al conectar o consultar la BD: ${error.message}
      </p>
    `);
  } finally {
    if (connection) await connection.end();
  }
});

app.listen(3000, () => {
  console.log("Servidor Node corriendo en puerto 3000");
});
