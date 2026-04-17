require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const fs = require('fs');
// 1. App initialization (Sabse pehle ye hona chahiye)
const app = express();
// 2. Middlewares
app.use(cors());
app.use(express.json());
 // 3. Routes Import Naya route (MongoDB wala)
const repairRoutes = require('./routes/repairRoutes'); // Nayi file ko bulaiye
const mongoRepairRoutes = require('./routes/mongoRepairRoutes');
// 4. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log("Database connection error:", err));
//  Welcome Route (Testing ke liye)
// 5. Routes Use (app banne ke baad hi use ho sakte hain)
app.get('/config', (req, res) => {
    res.json({ shopName: process.env.SHOP_NAME });
});
  // Saare repair routes ko use karein
app.use('/', repairRoutes);
app.use('/api/v2', mongoRepairRoutes); // Iska path alag rakhte hain taaki confusion na ho
//const FILE_NAME = 'database.txt';
// 6. Port Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));