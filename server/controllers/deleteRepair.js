const Repair = require('../models/Repair');

const deleteRepair = async (req, res) => {
    try {
        // URL se ID nikaalte hain (req.params.id)
        await Repair.findByIdAndDelete(req.params.id);
        res.json({ message: "Record Deleted from MongoDB!" });
    } catch (err) {
        res.status(500).json({ message: "Delete error: " + err.message });
    }
};

module.exports = deleteRepair;