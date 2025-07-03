import React from 'react';
import AdditionalCostTable from './AdditionalCostTable';
import GSTDetailsTable from './GSTDetailsTable';

const InvoiceForm = () => (
  <form className="">
    {/* Top Form Fields Grid */}
    <div className="grid grid-cols-2 gap-4 mb-8">
      {/* Row 1 */}
      <div className="flex flex-col">
        <label className="font-medium">Invoice Type <span className="text-red-500">*</span></label>
        <select className="border rounded p-1"><option>Vendor Credit Note</option></select>
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">Proforma Invoice</label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">Invoice No. <span className="text-red-500">*</span></label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">Invoice Date <span className="text-red-500">*</span></label>
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
        <select className="border rounded px-2 py-1"><option>Mumbai Port</option></select>
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">Office/Vessel </label>
        <select className="border rounded px-2 py-1"><option>Willows (vessel)</option></select>
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">Dry Dock</label>
        <select className="border rounded px-2 py-1"><option>-- Select --</option></select>
      </div>
      {/* Row 2 */}
     
      <div className="flex flex-col">
        <label className="font-medium mb-1">Currency <span className="text-red-500">*</span></label>
        <select className="border rounded px-2 py-1"><option>INR</option></select>
      </div>
      <div className="flex flex-col">
        <label className="font-medium mb-1">Counter Party <span className="text-red-500">*</span></label>
        <input type="text" placeholder="Counter Party" className="border rounded px-2 py-1" />
      </div>
     
      {/* Row 3 */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Counter Party Invoice Ref</label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
      {/* Row 4 */}
    
      <div className="flex flex-col">
        <label className="font-medium mb-1">Total Amount <span className="text-red-500">*</span></label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
    </div>
    {/* Tables Section */}
    
  </form>

);

export default InvoiceForm; 