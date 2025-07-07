import React from "react";

const InvoiceForm = ({ form, onFormChange, total }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormChange(name, value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // For demo, just store file names. In real use, convert to base64 or upload.
    if (e.target.name === "invoice_file") {
      onFormChange("invoice_file", files[0] || null);
    } else {
      onFormChange("supporting_documents", files);
    }
    e.target.value = null;
  };

  return (
    <form className="">
      <div className="gap-4 mb-8 text-sm">
        <div className="flex ">
          <label className="font-medium ">
            Invoice Type <span className="text-red-500">*</span>
          </label>
          <select
            className="border rounded "
            name="invoice_type"
            value={form.invoice_type}
            onChange={handleInputChange}
          >
            <option>Vendor Credit Note</option>
            <option>Vendor Debit Note</option>
            <option>Vendor FDA</option>
            <option>Vendor Invoice</option>
            <option>Vendor Proforma Invoice</option>
          </select>
        </div>
        <div className="flex w-full text-sm">
          <label className="font-medium mb-1">Correspondance Proforma Invoice(If Any)</label>
          <input
            type="text"
            className="border rounded "
            name="corresponding_proforma_invoice"
            value={form.corresponding_proforma_invoice}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex ">
          <label className="font-medium mb-1">
            Invoice No. <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="border rounded px-2 py-1"
            name="invoice_no"
            value={form.invoice_no}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex ">
          <label className="font-medium mb-1">
            Invoice Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="border rounded px-2 py-1 w-[58%]"
            name="invoice_date"
            value={form.invoice_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex ">
          <label className="font-medium mb-1">Invoice Due Date</label>
          <input
            type="date"
            className="border rounded px-2 py-1 w-[58%]"
            name="invoice_due_date"
            value={form.invoice_due_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex">
          <label className="font-medium mb-1">Purchase Order No.</label>
          <input
            type="text"
            className="border rounded px-2 py-1"
            name="purchase_order_no"
            value={form.purchase_order_no}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex">
          <label className="font-medium mb-1">Purchase Order Date</label>
          <input
            type="date"
            className="border rounded px-2 py-1 w-[58%]"
            name="received_date"
            value={form.received_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex">
          <label className="font-medium mb-1">Port </label>
          <select
            className="border rounded px-2 py-1 w-[58%]"
            name="port"
            value={form.port}
            onChange={handleInputChange}
          >
            <option>Mumbai Port</option>
          </select>
        </div>
        <div className="flex">
          <label className="font-medium mb-1">Office/Vessel </label>
          <select
            className="border rounded px-2 py-1 w-[60%]"
            name="office_vessel"
            value={form.office_vessel}
            onChange={handleInputChange}
          >
            <option>Willows (vessel)</option>
          </select>
        </div>
      </div>
      <div className="flex w-[80%]">
        <label className="font-medium mb-1">
          Total Amount <span className="text-red-500">*</span>
        </label>
        <div className="ml-8 mr-2 w-[37%] bg-gray-200">{total}</div>
      </div>
      <div className="mb-6">
        <label className="font-medium block mb-2">
          Attachments (PDF, JPG, JPEG)<span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="invoice_file"
          onChange={handleFileChange}
          accept=".pdf, .jpg, .jpeg, image/jpeg, application/pdf"
          className="block w-full border rounded px-2 py-2 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        <input
          type="file"
          name="supporting_documents"
          onChange={handleFileChange}
          accept=".pdf, .jpg, .jpeg, image/jpeg, application/pdf"
          multiple
          className="block w-full border rounded px-2 py-2 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 mt-2"
        />
        {form.supporting_documents && form.supporting_documents.length > 0 && (
          <div className="mt-2 text-sm text-gray-700">
            <strong>{form.supporting_documents.length}</strong> file{form.supporting_documents.length > 1 ? "s" : ""} selected
          </div>
        )}
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
          {form.supporting_documents && form.supporting_documents.map((file, idx) => (
            <li key={idx}>{file.name || file}</li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default InvoiceForm;