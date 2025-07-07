const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const auth = require('../middleware/auth');

router.post('/',auth,  invoiceController.createInvoice);

module.exports = router;   