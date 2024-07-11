// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./database');
const Product = require('./product');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// MIDDLEWARES
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

connectDB();

//RUTA PRINCIPAL
app.get('/', (req, res) => {
    res.json('Bienvenido a la API de mobiliarios !')
  })

// ENDPOINT PARA OBTENER TODOS LOS PRODUCTOS
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

//ENDPOINT PARA OBTENER UN PRODUCTO POR ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ codigo: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
});

// ENDPOINT PARA FILTRAR PRODUCTOS POR NOMBRE
app.get('/products/search/:name', async (req, res) => {
    try {
        const regex = new RegExp(req.params.name, 'i');
        const products = await Product.find({ nombre: regex });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No se encontraron coincidencias' });
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar los productos' });
    }
});

// ENDPOINT PARA AGREGAR UN NUEVO PRODUCTO
app.post('/products', async (req, res) => {
    try {
        const { codigo, nombre, precio, categoria } = req.body;
        const newProduct = new Product({ codigo, nombre, precio, categoria });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error al agregar el producto' });
    }
});

// ENDPOINT PARA MODIFICAR EL PRECIO DE UN PRODUCTO
app.patch('/products/:id', async (req, res) => {
    try {
        const { precio } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { precio: precio }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Precio actualizado', product });
    } catch (error) {
        console.error('Error al actualizar el precio:', error);
        res.status(500).json({ message: 'Error al actualizar el precio' });
    }
});

//ENDPOINT PARA BORRAR UN PRODUCTO POR OBJETCID O CODIGO
app.delete('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let product;

        if (ObjectId.isValid(id)) {
            product = await Product.findOneAndDelete({ _id: id });
        } else {
            product = await Product.findOneAndDelete({ codigo: id });
        }

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.json({ message: 'Producto borrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al borrar el producto' });
    }
});

// CONTROL DE RUTAS NO EXISTENTE
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
