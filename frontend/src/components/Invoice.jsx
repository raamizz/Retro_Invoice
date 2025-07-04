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
          <p className="text-2xl font-semibold">{selectedOrg.name}</p>
          <div className="flex justify-between gap-1">
            <div className="md:w-2/4 w-full">
              <InvoiceForm />
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
