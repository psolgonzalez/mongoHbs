const express = require ('express')
const mongoose = require ('mongoose')
const Product = require('./models/Product')
const hbs = require('hbs')
require('dotenv').config()


const app = express()

const PORT = process.env.PORT || 8080 
const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const CONNECTION_URL = `mongodb+srv://pamelasoledadgon:${DB_PASSWORD}@cluster0.anj1ab7.mongodb.net/${DB_NAME}`


mongoose.connect(CONNECTION_URL,
    {
        useNewUrlParser: true,
    }
    )
.then(()=>{
    console.log('Coneccion Exitosa!!!');
})
.catch (()=>{
    console.error(err);
})


//handlebars
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

//endpoints
app.get('/products', async (req, res)=>{
    try{ 
        const products = await Product.find()
        console.log(products)
        res.status(200).render('products', {products})
    }
    catch(err){
        res.status(500).send('Error al obtener la lista de productos')
    }
})

//req y res
app.get ('/product/detail' , async (req, res) =>{
   const {productId}= req.query
   const product = await Product.findById(productId)
   if(product){
    res.render('detail',{product})
   }
   else{
    res.render('error')
   }
})


//endpoint product/new
app.get('/product/new',(req, res)=>{
    res.render('newProduct')
})

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}/products`)
})

const createProduct = async (product)=> {
    try{ 
        const newproduct = new Product(product)
        await newproduct.save()
        console.log('Producto guardado')
    }
    catch(err){
      throw error
    }
}


/* createProduct({
    nombre: 'Harina 0000',
    precio: 700,
    stock: 10,
    descripcion: 'Harina leudante 0000'
}) */