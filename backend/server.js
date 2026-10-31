
/*const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Huella funcionando correctamente'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor de Huella escuchando en http://localhost:${PORT}`);
});*/

const express = require('express');
const pool = require('./db');

const app = express();
const PORT = 3000;

// Permite recibir datos en formato JSON
app.use(express.json());

// Ruta inicial para comprobar que la API funciona
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Huella funcionando correctamente'
  });
});

// Comprueba la conexión con PostgreSQL
app.get('/api/health/db', async (req, res) => {
  try {
    //const resultado = await pool.query('SELECT NOW() AS fecha');
    const resultado = await pool.query(`
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        ORDER BY tablename
    `);
    res.json({
      mensaje: 'Conexión con PostgreSQL correcta',
      baseDatos: 'huella',
      //fecha: resultado.rows[0].fecha
      tablas: resultado.rows.map(fila => fila.tablename)
    });
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error.message);
    res.status(500).json({
      mensaje: 'No se pudo conectar con PostgreSQL'
    });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor de Huella escuchando en http://localhost:${PORT}`);
});

