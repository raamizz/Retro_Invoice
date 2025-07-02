import React from 'react';
import AdditionalCostTable from './AdditionalCostTable';
import GSTDetailsTable from './GSTDetailsTable';

const InvoiceForm = () => (
  <form className="">
    {/* Top Form Fields Grid */}
    <div className="grid grid-cols-2 gap-4 mb-8">
      {/* Row 1 */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Total Amount <span className="text-red-500">*</span></label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Invoice Type <span className="text-red-500">*</span></label>
        <select className="border rounded px-2 py-1"><option>Vendor Credit Note</option></select>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Purchase Order No.</label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Office/Vessel <span className="text-red-500">*</span></label>
        <select className="border rounded px-2 py-1"><option>INCH-MT HARI PRAKASH (vessel)</option></select>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Department <span className="text-red-500">*</span></label>
        <select className="border rounded px-2 py-1"><option>Finance Department</option></select>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Dry Dock</label>
        <select className="border rounded px-2 py-1"><option>-- Select --</option></select>
      </div>
      {/* Row 2 */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Invoice Date <span className="text-red-500">*</span></label>
        <input type="date" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Currency <span className="text-red-500">*</span></label>
        <select className="border rounded px-2 py-1"><option>INR</option></select>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Received Date</label>
        <input type="date" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Due Date (Leave empty to auto generate)</label>
        <input type="date" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Counter Party <span className="text-red-500">*</span></label>
        <input type="text" placeholder="Counter Party" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Corresponding Proforma Invoice</label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
      {/* Row 3 */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Received Date</label>
        <input type="date" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Invoice Due Date</label>
        <input type="date" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col col-span-2">
        <label className="font-semibold mb-1">Charter Type</label>
        <div className="flex flex-wrap gap-4 mt-1">
          <label className="flex items-center"><input type="radio" name="charterType" className="mr-1" /> N/A</label>
          <label className="flex items-center"><input type="radio" name="charterType" className="mr-1" /> Time Charter</label>
          <label className="flex items-center"><input type="radio" name="charterType" className="mr-1" /> Voyage Charter</label>
          <label className="flex items-center"><input type="radio" name="charterType" className="mr-1" /> Pool Expenses</label>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Takeover Expense</label>
        <select className="border rounded px-2 py-1"><option>-- Select --</option></select>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Narration / Expenses</label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Counter Party Invoice Ref</label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
      {/* Row 4 */}
      <div className="flex flex-col col-span-2">
        <label className="font-semibold mb-1">Cost Center (Budget Code) <span className="text-red-500">*</span></label>
        <select className="border rounded px-2 py-1"><option>Select a Cost Center (Budget Code)</option></select>
      </div>
      <div className="flex flex-col col-span-2">
        <label className="font-semibold mb-1">GST Treatment (Maritime) <span className="text-red-500">*</span></label>
        <div className="flex flex-wrap gap-4 mt-1">
          <label className="flex items-center"><input type="radio" name="gstTreatment" className="mr-1" /> CGST+SGST</label>
          <label className="flex items-center"><input type="radio" name="gstTreatment" className="mr-1" /> Export/Zero-Rated</label>
          <label className="flex items-center"><input type="radio" name="gstTreatment" className="mr-1" /> Domestic (IGST)</label>
        </div>
      </div>
      <div className="flex flex-col col-span-2">
        <label className="font-semibold mb-1">Cargo Type</label>
        <input type="text" className="border rounded px-2 py-1" />
      </div>
    </div>
    {/* Tables Section */}
    
  </form>

);

export default InvoiceForm; 