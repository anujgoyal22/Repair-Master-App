const express = require('express');
const router = express.Router();
const fs = require('fs');
const FILE_NAME = 'database.txt';
// 1. Read Route
router.get('/read', (req, res) => {
    fs.readFile(FILE_NAME, 'utf8', (err, data) => {
        if (err) return res.json({ message: "" });
        res.json({ message: data });
    });
});
// 2. Write Route
router.post('/save', (req, res) => {
    const { item, issue, cost } = req.body;
    const entry = `Item:${item}|Issue:${issue}|Cost:${cost}\n`;
    fs.appendFile(FILE_NAME, entry, (err) => {
        if (err) return res.status(500).json({ message: "Error saving!" });
        res.json({ message: "Record Saved Successfully!" });
    });
});
// 3. DELETE Route: File se record hatane ke liye
router.delete('/delete-repair', (req, res) => {
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
// 4. Update Route
router.put('/update-repair', (req, res) => {
    // React se index aur naya data (item, issue, cost) aayega
    const { index, item, issue, cost } = req.body;

    // Nayi line ka format banaiye (Waisa hi jaisa hum save karte hain)
    const updatedLine = `Item:${item}|Issue:${issue}|Cost:${cost}`;

    fs.readFile('database.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: "File read error" });
// 1. Line se pehle: File ka asli data (Jo ek lambi string hai)
    console.log("--- STEP 1: data (File se jo aya) ---");
    console.log(JSON.stringify(data)); // JSON.stringify se \n (new lines) saaf dikhengi
    console.log("\n");
    // Step 1: Sirf Split (Tukde karega)
const allPieces = data.split('\n'); 
console.log("allPieces ="+allPieces); 
// Step 2: Filter (Khali lines ko nikaal dega)
const cleanLines = allPieces.filter(line => line.trim() !== "");
console.log("--- 2. Filter ke baad (Sirf kaam ka data bacha) ---");
console.log(cleanLines);  
    // 1. Poori file ko lines mein tod dein
        let lines = data.split('\n').filter(line => line.trim() !== "");
    console.log("--- STEP 2: lines (Array banne ke baad) ---");
    console.log(lines); 
    console.log("Total Lines:", lines.length);
    console.log("------------------------------------------");
        // 2. Us specific index par purani line ko hata kar nayi line daal dein
        // lines[index] ko direct badal dete hain
        if (lines[index]) {console.log("lines ="+lines);
            lines[index] = updatedLine;
        }
       // console.log("-----------"+lines);

        // 3. Wapas string banayein aur file mein save karein
        const updatedFileContent = lines.join('\n') + '\n';
console.log ("updatedFileContent ="+ updatedFileContent);
        fs.writeFile('database.txt', updatedFileContent, (err) => {
            if (err) return res.status(500).json({ message: "File write error" });
            res.json({ message: "Record updated successfully!" });
        });
    });
});
module.exports = router; // Ise export karna zaroori hai