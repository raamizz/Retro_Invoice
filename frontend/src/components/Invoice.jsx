import React, { useState, useEffect } from "react";
import InvoiceForm from "./InvoiceForm";
import AdditionalCostTable from "./AdditionalCostTable";
import GSTDetailsTable from "./GSTDetailsTable";
import OrganisationDropdown from "./OrganisationDropdown";
import axios from "axios";
import instance from "../utils/axios";

const defaultForm = {
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
  invoice_file: null,
  supporting_documents: [],
};

const defaultAdditionalCosts = [
  { type: "Cess", hsn_sac: "", amount: 0, tax_rate: 0 },
  { type: "Courier Charge", hsn_sac: "", amount: 0, tax_rate: 0 },
  { type: "Transportation Charge", hsn_sac: "", amount: 0, tax_rate: 0 },
  { type: "Delivery Charge", hsn_sac: "", amount: 0, tax_rate: 0 },
];

const defaultGSTDetails = {
  gstType: "cgst_sgst",
  rows: [
    { rate: 0, amount: 0, hsn_sac: "", sgst: 0, cgst: 0, igst: 0, taxTotal: 0 },
    { rate: 3, amount: 0, hsn_sac: "", sgst: 0, cgst: 0, igst: 0, taxTotal: 0 },
    { rate: 5, amount: 0, hsn_sac: "", sgst: 0, cgst: 0, igst: 0, taxTotal: 0 },
    { rate: 12, amount: 0, hsn_sac: "", sgst: 0, cgst: 0, igst: 0, taxTotal: 0 },
    { rate: 18, amount: 0, hsn_sac: "", sgst: 0, cgst: 0, igst: 0, taxTotal: 0 },
    { rate: 28, amount: 0, hsn_sac: "", sgst: 0, cgst: 0, igst: 0, taxTotal: 0 },
  ],
};

const Invoice = () => {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [additionalCosts, setAdditionalCosts] = useState(defaultAdditionalCosts);
  const [gstDetails, setGstDetails] = useState(defaultGSTDetails);
  const [totalAmount, setTotalAmount] = useState(0);
  const [additionalCostsTotal, setAdditionalCostsTotal] = useState(0);
  const [taxDetailsTotal, setTaxDetailsTotal] = useState(0);

  // Handlers for InvoiceForm fields
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handlers for AdditionalCostTable
  const handleAdditionalCostChange = (index, field, value) => {
    setAdditionalCosts((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // Handlers for GSTDetailsTable
  const handleGSTDetailsChange = (index, field, value) => {
    setGstDetails((prev) => {
      const updatedRows = [...prev.rows];
      updatedRows[index][field] = value;
      return { ...prev, rows: updatedRows };
    });
  };
  const handleGSTTypeChange = (value) => {
    setGstDetails((prev) => ({ ...prev, gstType: value }));
  };

  // Calculate totals
  useEffect(() => {
    // Additional Costs Total
    const addTotal = additionalCosts.reduce((acc, item) => {
      const amt = parseFloat(item.amount || 0);
      const gst = parseFloat(item.tax_rate || 0);
      const taxTotal = (amt * gst) / 100;
      return acc + amt + taxTotal;
    }, 0); 
    setAdditionalCostsTotal(addTotal);

    // GST Details Total (use same logic as GSTDetailsTable)
    const calcGSTRowTotal = (amount, rate, gstType) => {
      const amt = parseFloat(amount || 0);
      const taxRate = parseFloat(rate || 0);
      if (gstType === "cgst_sgst") {
        const halfTax = (amt * taxRate) / 200;
        const taxTotal = halfTax * 2;
        return amt + taxTotal;
      } else if (gstType === "igst") {
        const igst = (amt * taxRate) / 100;
        return amt + igst;
      } else {
        return amt;
      }
    };
    const gstTotal = gstDetails.rows.reduce(
      (acc, item) => acc + calcGSTRowTotal(item.amount, item.rate, gstDetails.gstType),
      0
    );
    setTaxDetailsTotal(gstTotal);

    // Grand Total
    setTotalAmount(addTotal + gstTotal);
  }, [additionalCosts, gstDetails]);

  // Calculate CGST, SGST, IGST totals for JSON
  const cgstTotal = gstDetails.rows.reduce((acc, item) => {
    const amt = parseFloat(item.amount || 0);
    const taxRate = parseFloat(item.rate || 0);
    if (gstDetails.gstType === "cgst_sgst") {
      return acc + (amt * taxRate) / 200;
    }
    return acc;
  }, 0);
  const sgstTotal = cgstTotal;
  const igstTotal = gstDetails.rows.reduce((acc, item) => {
    const amt = parseFloat(item.amount || 0);
    const taxRate = parseFloat(item.rate || 0);
    if (gstDetails.gstType === "igst") {
      return acc + (amt * taxRate) / 100;
    }
    return acc;
  }, 0);

  // Save handler
  const handleSave = async () => {
    const token = localStorage.getItem("refreshToken");
  
    // Prepare tax_details array
    const taxDetails = gstDetails.rows
      .filter((r) => r.amount > 0)
      .map((r) => {
        const amt = parseFloat(r.amount || 0);
        const rate = parseFloat(r.rate || 0);
        let sgst = 0,
          cgst = 0,
          igst = 0;
        if (gstDetails.gstType === "cgst_sgst") {
          sgst = (amt * rate) / 200;
          cgst = (amt * rate) / 200;
        } else if (gstDetails.gstType === "igst") {
          igst = (amt * rate) / 100;
        }
        return {
          sgst,
          cgst,
          igst,
          hsn_sac: r.hsn_sac,
          tax_rate: rate,
        };
      });
  
    // Create FormData
    const formData = new FormData();
    formData.append("org_id", selectedOrg?.id || "");
    formData.append("invoice_type", form.invoice_type);
    formData.append("corresponding_proforma_invoice", form.corresponding_proforma_invoice);
    formData.append("invoice_no", form.invoice_no);
    formData.append("invoice_date", form.invoice_date);
    formData.append("invoice_due_date", form.invoice_due_date);
    formData.append("purchase_order_no", form.purchase_order_no);
    formData.append("received_date", form.received_date);
    formData.append("port", form.port);
    formData.append("office_vessel", form.office_vessel);
    formData.append("currency", form.currency);
    formData.append("total_amount", totalAmount.toFixed(2));
    formData.append("additional_costs_total", additionalCostsTotal.toFixed(2));
    formData.append("tax_details_total", taxDetailsTotal.toFixed(2));
    formData.append("igst_total", igstTotal.toFixed(2));
  
    // Append invoice_file
    if (form.invoice_file) {
      formData.append("invoice_file", form.invoice_file);
    }
  
    // Append supporting_documents (multiple files)
    form.supporting_documents.forEach((file) => {
      formData.append("supporting_documents", file);
    });
  
    // Stringify JSON arrays
    const additionalCostsJson = additionalCosts
      .filter((c) => c.amount > 0)
      .map((c) => ({
        type: c.type,
        amount: Number(c.amount),
        hsn_sac: c.hsn_sac,
        tax_rate: Number(c.tax_rate),
      }));
  
    formData.append("additional_costs", JSON.stringify(additionalCostsJson));
    formData.append("tax_details", JSON.stringify(taxDetails));
  
    try {
      const response = await instance.post("/api/invoices", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Server response:", response.data);
      alert("Invoice saved successfully!");
    } catch (error) {
      console.error("Error saving invoice:", error.response?.data || error.message);
      alert("Failed to save invoice.");
    }
  };

  return (
    <div className="px-4">
      {/* Show dropdown only if no org is selected */}
      {!selectedOrg && (
        <div className="mb-4">
          <OrganisationDropdown onSelect={setSelectedOrg} />
        </div>
      )}

      {/* Show the rest of the form only if an organization is selected */}
      {selectedOrg && (
        <React.Fragment>
          <p className="text-2xl font-semibold">{selectedOrg.name}</p>
          <div className="flex justify-between gap-1">
            <div className="md:w-2/4 w-full">
              <InvoiceForm
                form={form}
                onFormChange={handleFormChange}
                total={totalAmount}
              />
              <button className="bg-blue-600 text-white px-4 py-2 mt-4" onClick={handleSave} type="button">Save</button>
            </div>
            <div className="md:w-2/4 w-full">
              <GSTDetailsTable
                gstDetails={gstDetails}
                onGSTDetailsChange={handleGSTDetailsChange}
                onGSTTypeChange={handleGSTTypeChange}
              />
              <AdditionalCostTable
                additionalCosts={additionalCosts}
                onAdditionalCostChange={handleAdditionalCostChange}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Invoice;