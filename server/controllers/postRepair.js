const Repair = require('../models/Repair');
const postRepair = async (req, res) => {
    try {
        const newEntry = new Repair(req.body);
        await newEntry.save();
        res.json({ message: "Record Saved in MongoDB!" });
    } catch (err) { res.status(500).json({ message: "Error saving" }); }
};
module.exports = postRepair;