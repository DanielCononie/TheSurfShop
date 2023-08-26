const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3003;
const cors = require('cors')

app.use(express.json())
app.use(cors())

// Connect to MongoDB (assuming it's running on localhost)
mongoose.connect('mongodb+srv://(username):(password)@cluster1.saxsa1i.mongodb.net/ProductDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProductModel = require('./models/ProductModel');

const upload = multer({ dest: 'uploads/' });

// GET all products
app.get('/Product', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Failed to retrieve products.' });
  }
});

// POST new product
app.post('/AddProduct', upload.single('productImage'), async (req, res) => {
  try {
    const { name, description, price, type, brand } = req.body;
    const image = req.file;

    const newProduct = new ProductModel({
      name: name,
      description: description,
      price: price,
      type: type,
      brand: brand,
      productImage: { data: image.buffer, contentType: image.mimetype },
    });

    if (image) {
      const imageData = fs.readFileSync(image.path);
      newProduct.productImage.data = imageData;
      newProduct.productImage.contentType = image.mimetype;

      fs.unlinkSync(image.path);
    }

    await newProduct.save();

    res.json({ success: true, message: 'Product created' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Product creation failed.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});