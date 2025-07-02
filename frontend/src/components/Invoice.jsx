import InvoiceForm from "./InvoiceForm";
import AdditionalCostTable from "./AdditionalCostTable";
import GSTDetailsTable from "./GSTDetailsTable";

const Invoice = () => {
  return (
    <div className="flex justify-between px-4 gap-1">
      <div className="md:w-2/4 w-full">
        Fields Side
        <InvoiceForm />
      </div>
      <div className="md:w-2/4 w-full">
        Tables Side
        <div className="flex flex-col col-span-2">
          <label className="font-medium mb-1">
            GST Treatment (Maritime) <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4 mt-1">
            <label className="flex items-center">
              <input type="radio" name="gstTreatment" className="mr-1" />{" "}
              CGST+SGST
            </label>
            <label className="flex items-center">
              <input type="radio" name="gstTreatment" className="mr-1" />{" "}
              Export/Zero-Rated
            </label>
            <label className="flex items-center">
              <input type="radio" name="gstTreatment" className="mr-1" />{" "}
              Domestic (IGST)
            </label>
          </div>
        </div>
        <GSTDetailsTable />
        <AdditionalCostTable />
      </div>
    </div>
  );
};
export default Invoice;
