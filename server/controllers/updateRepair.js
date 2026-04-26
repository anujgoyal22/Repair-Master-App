const Repair = require('../models/Repair');

const updateRepair = async (req, res) => {
    try {
        const { item, issue, cost } = req.body;
        // ID ke base par dhoondna aur naya data set karna
        await Repair.findByIdAndUpdate(
            req.params.id, 
            { item, issue, cost },
            { new: true } // Isse updated data return hota hai
        );
        res.json({ message: "Record Updated in MongoDB!" });
    } catch (err) {
        res.status(500).json({ message: "Update error: " + err.message });
    }
};

module.exports = updateRepair;