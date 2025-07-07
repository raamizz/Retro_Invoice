import React, { useState } from "react";
import InvoiceForm from "./InvoiceForm";
import AdditionalCostTable from "./AdditionalCostTable";
import GSTDetailsTable from "./GSTDetailsTable";
import OrganisationDropdown from "./OrganisationDropdown";
import axios from "../utils/axios"

const Invoice = () => {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [gstDetails, setGstDetails] = useState({});
  const [additionalCosts, setAdditionalCosts] = useState([]);
  const [message, setMessage] = useState("");

  // Placeholder: You should update GSTDetailsTable and AdditionalCostTable to accept value/onChange props
  // and lift their state up to here. For now, we use empty objects/arrays.

  const handleInvoiceSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/invoices",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Invoice created successfully!");
    } catch (err) {
      setMessage("Error creating invoice: " + (err.response?.data?.message || err.message));
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
          <p className="text-2xl font-semibold">{selectedOrg.name || selectedOrg}</p>
          <div className="flex justify-between gap-1">
            <div className="md:w-2/4 w-full">
              <InvoiceForm
                orgId={selectedOrg.id || selectedOrg}
                gstDetails={gstDetails}
                additionalCosts={additionalCosts}
                onSubmit={handleInvoiceSubmit}
              />
              {message && <div className="mt-2 text-green-600">{message}</div>}
            </div>
            <div className="md:w-2/4 w-full">
              <GSTDetailsTable />
              <AdditionalCostTable />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Invoice;
