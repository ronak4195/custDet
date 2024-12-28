const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define model
const Record = require('./models/Record');

// Routes
app.post('/api/records', async (req, res) => {
    const { name, phone, vehicleModel } = req.body;

    try {
        const newRecord = new Record({ name, phone, vehicleModel });
        await newRecord.save();
        res.status(201).json({ message: 'Record saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save record.' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
