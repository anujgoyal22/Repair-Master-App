const express = require('express');
const router = express.Router();
const Repair = require('../models/Repair');

// 1. GET: MongoDB se saara data lana
router.get('/mongo-read', async (req, res) => {
    try {
        const data = await Repair.find().sort({ createdAt: -1 });
        res.json(data); 
    } catch (err) {
        res.status(500).json({ message: "Error fetching data from MongoDB" });
    }
});

// 2. POST: MongoDB mein naya record save karna
router.post('/mongo-save', async (req, res) => {
    try {
        const { item, issue, cost } = req.body;
        const newEntry = new Repair({ item, issue, cost });
        await newEntry.save();
        res.json({ message: "Record Saved in MongoDB!" });
    } catch (err) {
        res.status(500).json({ message: "Error saving to MongoDB" });
    }
});

// 3. DELETE: MongoDB se ID ke base par delete karna
router.delete('/mongo-delete/:id', async (req, res) => {
    try {
        await Repair.findByIdAndDelete(req.params.id);
        res.json({ message: "Record Deleted from MongoDB!" });
    } catch (err) {
        res.status(500).json({ message: "Delete error" });
    }
});

// 4. PUT: MongoDB mein Update karna
router.put('/mongo-update/:id', async (req, res) => {
    try {
        const { item, issue, cost } = req.body;
        await Repair.findByIdAndUpdate(req.params.id, { item, issue, cost });
        res.json({ message: "Record Updated in MongoDB!" });
    } catch (err) {
        res.status(500).json({ message: "Update error" });
    }
});

module.exports = router;