const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://localhost:27017/BD_TAD");

var db = mongoose.connection;

db.on("error",()=>console.log("Error en conexión"))
db.once("open",()=>console.log("conectado a la base de datos"));

// Define el esquema de la colección "peliculas"
const peliculaSchema = new mongoose.Schema({
    nombre: String,
    productora: String
});

// Crea el modelo de la colección "peliculas"
const Pelicula = mongoose.model("Pelicula", peliculaSchema);

app.get("/consultar",async (req,res)=>{
    //var name = req.body.name;
    //var productora = req.body.productora;
    try {
        const peliculas = await Pelicula.find({});
        res.json(peliculas);
    } catch (err) {
        console.error("Error al consultar:", err);
        res.status(500).send("Error al consultar la base de datos");
    }
})

app.get("/inicio",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"public/index.html"))
})

app.listen(4000,()=>{
    console.log("Aplicación funcionando en el puerto 4000")
})