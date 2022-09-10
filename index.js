const fsPromise = require("fs").promises;

/**
 * 1.- Importamos Express
 * 2.- Instanciamos una nueva aplicación
 * // 3.- Configuración (Middlewares)
 * 4.- Diseño de las rutas
 * 5.- Levantar servidor
 */

const alumnos = ["Pedro", "Maria", "Jesus", "Luis"];

//! 1.- Importamos Express
const express = require("express");

//! 2.- Instanciamos una nueva aplicación
const app = express();

//! 3.- Configuración (Middlewares)
app.use(express.json());

//! 4.- Diseño de las rutas
app.get("/", (req, res) => {
  console.log("Entraste a la petición");
  res.json(alumnos);
});

//! Parametros de la ruta
app.get("/:saludo/:nombre", (req, res) => {
  console.log(req.params);
  res.send(`${req.params.saludo} ${req.params.nombre}`);
});

app.get("/coleccion/:coleccionId/registro/:registroId", (req, res) => {
  console.log(req.params);
  res.send(`${req.params.coleccionId} ${req.params.registroId}`);
});

//! Query Strings
app.get("/query", (req, res) => {
  console.log(req.query);
  res.send(`${req.query.saludo} ${req.query.nombre}`);
});

//! Body
app.get("/body", (req, res) => {
  console.log(req.body);
  res.send(`${req.body.saludo} ${req.body.nombre}`);
});

app.put("/", (req, res) => {
  alumnos[req.body.index] = req.body.nombre;
  res.send(alumnos);
});

app.delete("/", (req, res) => {
  const eliminados = alumnos.splice(req.body.index, 1);
  if (eliminados.length === 0) {
    res.send("No se eliminó ningún elemento");
  }
  res.send(alumnos);
});

//! Ejercicio #1
/* PATH: /:NombreParametro/:NombreParametro2... */
app.get("/mensaje/:nombre/:apellido", (req, res) => {
  res.json({ mensaje: `Mensaje: ${req.params.nombre} ${req.params.apellido}` });
});

app.get("/mensaje", (req, res) => {
  if (req.query.nombre) {
    if (req.query.nombre && req.query.apellido) {
      res.json({
        mensaje: `Mensaje: ${req.query.nombre} ${req.query.apellido}`,
      });
    }
  } else if (req.body.nombre) {
    if (req.body.nombre && req.body.apellido) {
      res.json({ mensaje: `Mensaje: ${req.body.nombre} ${req.body.apellido}` });
    }
  }

  res.json({ error: `Pasa info` });
});

app.get("/:index", (req, res) => {
  console.log(req.params);
  res.send(alumnos[req.params.index]);
});

app.post("/archivo", async (req, res) => {
  try {
    await fsPromise.appendFile("./nuevoArchivo.txt", req.body.contenido);
    res.send("Archivo creado");
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

//! 5.- Levantar servidor
app.listen(3001, () => {
  console.log("Servidor corriendo en el puerto 3001");
});