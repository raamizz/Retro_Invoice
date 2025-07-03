import React, { useState } from "react";
import InvoiceForm from "./InvoiceForm";
import AdditionalCostTable from "./AdditionalCostTable";
import GSTDetailsTable from "./GSTDetailsTable";
import OrganisationDropdown from "./OrganisationDropdown";

const Invoice = () => {
  const [selectedOrg, setSelectedOrg] = useState(null);

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
          <p className="text-2xl font-semibold">{selectedOrg}</p>
          <div className="flex justify-between gap-1">
            <div className="md:w-2/4 w-full">
              <InvoiceForm />
            </div>
            <div className="md:w-2/4 w-full">
              <div className="flex flex-col col-span-2">
                <label className="font-medium mb-1">
                  GST Treatment (Maritime){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-4 mt-1">
                  <label className="flex items-center">
                    <input type="radio" name="gstTreatment" className="mr-1" />
                    CGST+SGST
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="gstTreatment" className="mr-1" />
                    Export/Zero-Rated
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="gstTreatment" className="mr-1" />
                    IGST
                  </label>
                </div>
              </div>
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
