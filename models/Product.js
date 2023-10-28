const mongoose = require('mongoose')
const dotenv = require ('dotenv')
dotenv.config()

const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const CONNECTION_URL = `mongodb+srv://pamelasoledadgon:${DB_PASSWORD}@cluster0.anj1ab7.mongodb.net/${DB_NAME}`

mongoose.connect(CONNECTION_URL,
{
    useNewUrlParser: true,
}
)

const Product = mongoose.model ('Producto', {
    nombre: String,
    precio: Number,
    stock: Number,
    descripcion: String
},)

module.exports = Product