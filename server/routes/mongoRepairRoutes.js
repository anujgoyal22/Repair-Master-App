const express = require('express');
const router = express.Router();

// Controllers ko import karein
const getRepair = require('../controllers/getRepair');
const postRepair = require('../controllers/postRepair');
const deleteRepair = require('../controllers/deleteRepair');
const updateRepair = require('../controllers/updateRepair');

// Routes ab kitne saaf dikhenge:
router.get('/mongo-read', getRepair);//GET
router.post('/mongo-save', postRepair);//POST
router.delete('/mongo-delete/:id', deleteRepair);// DELETE
router.put('/mongo-update/:id', updateRepair);//PUT

module.exports = router;