require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const FILE_NAME = 'database.txt';

// 1. Welcome Route (Testing ke liye)
app.get('/config', (req, res) => {
    res.json({ shopName: process.env.SHOP_NAME });
});

// 2. Read Route
app.get('/read', (req, res) => {
    fs.readFile(FILE_NAME, 'utf8', (err, data) => {
        if (err) return res.json({ message: "" });
        res.json({ message: data });
    });
});

// 3. Write Route (POST)
app.post('/save', (req, res) => {
    const { item, issue, cost } = req.body;
    const entry = `Item:${item}|Issue:${issue}|Cost:${cost}\n`;
    
    fs.appendFile(FILE_NAME, entry, (err) => {
        if (err) return res.status(500).json({ message: "Error saving!" });
        res.json({ message: "Record Saved Successfully!" });
    });
});
// DELETE Route: File se record hatane ke liye
app.delete('/delete-repair', (req, res) => {
    const { index } = req.body;
console.log(`inside delete `);
    fs.readFile('database.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: "File read error" });

        let lines = data.split('\n').filter(line => line.trim() !== "");
        
        // Us index waali line ko hata do
        lines.splice(index, 1); 

        // Baaki bachi lines ko wapas file mein likho
        const updatedContent = lines.join('\n') + (lines.length > 0 ? '\n' : '');
        
        fs.writeFile('database.txt', updatedContent, (err) => {
            if (err) return res.status(500).json({ message: "File write error" });
            res.json({ message: "Record deleted successfully!" });
        });
    });
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));