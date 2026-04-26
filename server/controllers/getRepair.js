const Repair = require('../models/Repair');
const getRepair = async (req, res) => {
    try {
        const data = await Repair.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: "Error fetching data" }); }
};
module.exports = getRepair;