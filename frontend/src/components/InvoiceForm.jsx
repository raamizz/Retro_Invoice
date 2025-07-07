import React, { useState } from "react";
import AdditionalCostTable from "./AdditionalCostTable";
import GSTDetailsTable from "./GSTDetailsTable";

const InvoiceForm = ({result}) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    e.target.value = null;
  };
  
  return (
    <form className="">
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex justify-between">
          <label className="font-medium">
            Invoice Type <span className="text-red-500">*</span>
          </label>
          <select className="border rounded p-1">
            <option>Vendor Credit Note</option>
            <option>Vendor Debit Note</option>
            <option>Vendor FDA</option>
            <option>Vendor Invoice</option>
            <option>Vendor Proforma Invoice</option>
          </select>
        </div>
        <div className="flex w-full justify-between">
          <label className="font-medium mb-1">Proforma Invoice</label>
          <input type="text" className="border rounded px-2 py-1" />
        </div>
        <div className="flex justify-between">
          <label className="font-medium mb-1">
            Invoice No. <span className="text-red-500">*</span>
          </label>
          <input type="text" className="border rounded px-2 py-1" />
        </div>
        <div className="flex justify-between">
          <label className="font-medium mb-1">
            Invoice Date <span className="text-red-500">*</span>
          </label>
          <input type="date" className="border rounded px-2 py-1 w-[58%]" />
        </div>
        <div className="flex justify-between">
          <label className="font-medium mb-1">Invoice Due Date</label>
          <input type="date" className="border rounded px-2 py-1 w-[58%]" />
        </div>

        <div className="flex justify-between">
          <label className="font-medium mb-1">Purchase Order No.</label>
          <input type="text" className="border rounded px-2 py-1" />
        </div>
        <div className="flex justify-between">
          <label className="font-medium mb-1">Received Date</label>
          <input type="date" className="border rounded px-2 py-1 w-[58%]" />
        </div>
        <div className="flex justify-between">
          <label className="font-medium mb-1">Port </label>
          <select className="border rounded px-2 py-1 w-[58%]">
            <option>Mumbai Port</option>
          </select>
        </div>
        <div className="flex justify-between">
          <label className="font-medium mb-1">Office/Vessel </label>
          <select className="border rounded px-2 py-1 w-[60%]">
            <option>Willows (vessel)</option>
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

      </div>
        <div className="flex w-[80%]">
          <label className="font-medium mb-1">
            Total Amount <span className="text-red-500">*</span>
          </label>
          <div className="ml-8 mr-2 w-[37%] bg-gray-200">{result}</div>
        </div>
      <div className="mb-6">
        <label className="font-medium block mb-2">
          Attachments (PDF, JPG, JPEG)<span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf, .jpg, .jpeg, image/jpeg, application/pdf"
          multiple
          className="block w-full border rounded px-2 py-2 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        {files.length > 0 && (
          <div className="mt-2 text-sm text-gray-700">
            <strong>{files.length}</strong> file{files.length > 1 ? "s" : ""}{" "}
            selected
          </div>
        )}
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
          {files.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      </div>
    </form> 
  ); 
};

export default InvoiceForm;