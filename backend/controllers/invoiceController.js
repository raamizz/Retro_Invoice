const pool = require('../config/database');


exports.createInvoice = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      org_id, invoice_type, corresponding_proforma_invoice, invoice_no, invoice_date, invoice_due_date,
      purchase_order_no, received_date, port, office_vessel, currency, total_amount,
      additional_costs, additional_costs_total, tax_details, tax_details_total
    } = req.body;
 
    // Handle files
    const invoiceFile = req.files['invoice_file'] ? req.files['invoice_file'][0].path : null;
    const supportingDocs = req.files['supporting_documents']
      ? req.files['supporting_documents'].map(f => f.path)
      : [];

    const result = await pool.query(
      `INSERT INTO invoices (
        user_id, org_id, invoice_type, corresponding_proforma_invoice, invoice_no, invoice_date, invoice_due_date,
        purchase_order_no, received_date, port, office_vessel, currency, total_amount,
        additional_costs, additional_costs_total, tax_details, tax_details_total,
        invoice_file, supporting_documents
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING id`,
      [
        userId, org_id, invoice_type, corresponding_proforma_invoice, invoice_no, invoice_date, invoice_due_date,
        purchase_order_no, received_date, port, office_vessel, currency, total_amount,
        additional_costs ? JSON.stringify(additional_costs) : null,
        additional_costs_total,
        tax_details ? JSON.stringify(tax_details) : null,
        tax_details_total,
        invoiceFile,
        JSON.stringify(supportingDocs)
      ]
    );
    res.status(201).json({ message: 'Invoice created', invoice_id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating invoice', error: err.message });
  }
};