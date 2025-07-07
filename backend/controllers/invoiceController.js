const pool = require('../config/database');

exports.createInvoice = async (req, res) => {
  try {
    const userId = req.id;
    const {
      org_id, invoice_type, corresponding_proforma_invoice, invoice_no, invoice_date, invoice_due_date,
      purchase_order_no, received_date, port, office_vessel, currency, total_amount,
      gstin, cgst, sgst, igst, additional_costs
    } = req.body;

    const result = await pool.query(
      `INSERT INTO invoices (
        user_id, org_id, invoice_type, corresponding_proforma_invoice, invoice_no, invoice_date, invoice_due_date,
        purchase_order_no, received_date, port, office_vessel, currency, total_amount,
        gstin, cgst, sgst, igst, additional_costs
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING id`,
      [
        userId, org_id, invoice_type, corresponding_proforma_invoice, invoice_no, invoice_date, invoice_due_date,
        purchase_order_no, received_date, port, office_vessel, currency, total_amount,
        gstin, cgst, sgst, igst,
        JSON.stringify(additional_costs)
      ]
    );
    res.status(201).json({ message: 'Invoice created', invoice_id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating invoice', error: err.message });
  }
}; 