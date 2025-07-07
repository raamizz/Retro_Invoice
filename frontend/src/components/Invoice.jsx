import React, { useState,useEffect } from "react";
import InvoiceForm from "./InvoiceForm";
import AdditionalCostTable from "./AdditionalCostTable";
import GSTDetailsTable from "./GSTDetailsTable";
import OrganisationDropdown from "./OrganisationDropdown";

const Invoice = () => {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [gstTotal,setGstTotal]=useState(0);
  const [additionalCost,setAdditionalCost]=useState(0);
  const [total,setTotal]=useState(0);
  useEffect(() => {
    setTotal(Number(gstTotal) + Number(additionalCost));
  }, [gstTotal, additionalCost]);

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
              <InvoiceForm  result={total}/>
            </div>
            <div className="md:w-2/4 w-full">
              
              <GSTDetailsTable gstTotal={setGstTotal}/>
              <AdditionalCostTable additionalCost={setAdditionalCost}/>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Invoice;
