import React, { useState } from "react";

const initialForm = {
  invoice_type: "Vendor Invoice",
  corresponding_proforma_invoice: "",
  invoice_no: "",
  invoice_date: "",
  invoice_due_date: "",
  purchase_order_no: "",
  received_date: "",
  port: "Mumbai Port",
  office_vessel: "Willows (vessel)",
  currency: "INR",
  total_amount: "",
};

const InvoiceForm = ({ orgId, gstDetails, additionalCosts, onSubmit }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ ...form, org_id: orgId, ...gstDetails, additional_costs: additionalCosts });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col">
          <label className="font-medium">Invoice Type *</label>
          <select name="invoice_type" value={form.invoice_type} onChange={handleChange} className="border rounded p-1">
            <option>Vendor Invoice</option>
            <option>Vendor Proforma Invoice</option>
            <option>Vendor PDA</option>
            <option>Vendor FDA</option>
            <option>Vendor Credit Note</option>
            <option>Vendor Debit Note</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Corresponding Proforma Invoice (If Any)</label>
          <input name="corresponding_proforma_invoice" value={form.corresponding_proforma_invoice} onChange={handleChange} type="text" className="border rounded px-2 py-1" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Invoice No. *</label>
          <input name="invoice_no" value={form.invoice_no} onChange={handleChange} type="text" className="border rounded px-2 py-1" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Invoice Date *</label>
          <input name="invoice_date" value={form.invoice_date} onChange={handleChange} type="date" className="border rounded px-2 py-1" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Invoice Due Date</label>
          <input name="invoice_due_date" value={form.invoice_due_date} onChange={handleChange} type="date" className="border rounded px-2 py-1" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Purchase Order No.</label>
          <input name="purchase_order_no" value={form.purchase_order_no} onChange={handleChange} type="text" className="border rounded px-2 py-1" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Received Date</label>
          <input name="received_date" value={form.received_date} onChange={handleChange} type="date" className="border rounded px-2 py-1" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Port</label>
          <select name="port" value={form.port} onChange={handleChange} className="border rounded px-2 py-1">
            <option>Mumbai Port</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Office/Vessel</label>
          <select name="office_vessel" value={form.office_vessel} onChange={handleChange} className="border rounded px-2 py-1">
            <option>Willows (vessel)</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Currency *</label>
          <select name="currency" value={form.currency} onChange={handleChange} className="border rounded px-2 py-1">
            <option>INR</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Total Amount *</label>
          <input name="total_amount" value={form.total_amount} onChange={handleChange} type="text" className="border rounded px-2 py-1" />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Invoice</button>
    </form>
  );
};

export default InvoiceForm;
