require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const fs = require('fs');
const repairRoutes = require('./routes/repairRoutes'); // Nayi file ko bulaiye

const app = express();
app.use(cors());
app.use(express.json());

//const FILE_NAME = 'database.txt';
//  Welcome Route (Testing ke liye)
app.get('/config', (req, res) => {
    res.json({ shopName: process.env.SHOP_NAME });
});

// Saare repair routes ko use karein
app.use('/', repairRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));