import InvoiceForm from "./InvoiceForm";
import AdditionalCostTable from "./AdditionalCostTable";
import GSTDetailsTable from "./GSTDetailsTable";


const Invoice = ()=>{



    return (
        <div className="flex justify-between px-4">
            <div className="md:w-2/4 w-full">
                Fields Side
                <InvoiceForm/>
            </div>
            <div>
                Tables Side
                <AdditionalCostTable />
                <GSTDetailsTable />
            </div>
        </div>
    )
}
export default Invoice;