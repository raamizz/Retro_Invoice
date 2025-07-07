const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer')

router.post(
    '/user/invoice',
    auth,
    upload.fields([
      { name: 'invoice_file', maxCount: 1 },
      { name: 'supporting_documents', maxCount: 10 }
    ]), 
    invoiceController.createInvoice
  );
  

module.exports = router;   