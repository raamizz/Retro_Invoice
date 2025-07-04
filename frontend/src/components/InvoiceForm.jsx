import React from "react";
import AdditionalCostTable from "./AdditionalCostTable";
import GSTDetailsTable from "./GSTDetailsTable";

const InvoiceForm = () => (
  <form className="">
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="flex flex-col">
        <label className="font-medium">
          Invoice Type <span className="text-red-500">*</span>
        </label>
        <select className="border rounded p-1">
          <option>Vendor Invoice</option>
          <option>Vendor Proforma Invoice</option>
          <option>Vendor PDA</option>
          <option>Vendor FDA</option>
          <option>Vendor Credit Note</option>
          <option>Vendor Debit Note</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">
          Corresponding Proforma Invoice (If Any)
        </label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">
          Invoice No. <span className="text-red-500">*</span>
        </label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">
          Invoice Date <span className="text-red-500">*</span>
        </label>
        <input type="date" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">Invoice Due Date</label>
        <input type="date" className="border rounded px-2 py-1" />
      </div>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Purchase Order No.</label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">Received Date</label>
        <input type="date" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">Port </label>
        <select className="border rounded px-2 py-1">
          <option>Mumbai Port</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">Office/Vessel </label>
        <select className="border rounded px-2 py-1">
          <option>Willows (vessel)</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">
          Currency <span className="text-red-500">*</span>
        </label>
        <select className="border rounded px-2 py-1">
          <option>INR</option>
        </select>
      </div>
      {/* <div className="flex flex-col">
        <label className="font-medium mb-1">
          Counter Party <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Counter Party"
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Counter Party Invoice Ref</label>
        <input type="text" className="border rounded px-2 py-1" />
      </div> */}

      <div className="flex flex-col">
        <label className="font-medium mb-1">
          Total Amount <span className="text-red-500">*</span>
        </label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
    </div>
  </form>
);

export default InvoiceForm;
