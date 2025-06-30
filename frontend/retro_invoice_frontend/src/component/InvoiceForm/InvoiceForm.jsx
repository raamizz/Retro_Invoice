// pages/invoice-form.tsx
"use client";
import React from "react";
import Link from "next/link";

export default function InvoiceForm() {
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      
      <div className="flex justify-between items-center">
        <Link href={'/dashboard'}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Back to Main Page</button></Link>
        <h2 className="text-xl font-semibold">Total Amount</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">🔄</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block font-medium">Status</label>
          <div className="bg-green-500 text-white px-2 py-1 rounded text-center">Active</div>
        </div>
        <div>
          <label className="block font-medium">Approval Status</label>
          <div className="bg-red-500 text-white px-2 py-1 rounded text-center">Pending</div>
        </div>
        <div>
          <label className="block">Invoice Type *</label>
          <select className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block">Invoice Date *</label>
          <input type="date" className="w-full border px-2 py-1 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label>Organization *</label>
          <select  className="w-full border px-2 py-1 rounded">
            <option>Seven Islands Shipping Ltd</option>
            <option>Active Marine</option>
            <option>SIMTI</option>
          </select>
        </div>
        <div>
          <label>Dry Dock</label>
          <select className="w-full border px-2 py-1 rounded">
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
        <div>
          <label>Counter Party *</label>
          <select className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label>Proforma Invoice</label>
          <div className="flex gap-1">
            <input type="text" className="w-full border px-2 py-1 rounded" />
            <button className="px-2 bg-blue-500 text-white rounded">🔍</button>
            <button className="px-2 bg-red-500 text-white rounded">✖</button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <label className="font-medium">Charter Type:</label>
        <label><input type="radio" name="charter" /> N/A</label>
        <label><input type="radio" name="charter" /> Time Charter</label>
        <label><input type="radio" name="charter" /> Voyage Charter</label>
        <label><input type="radio" name="charter" /> Pool Expenses</label>
      </div>

      <div className="flex gap-4">
        <label className="font-medium">RCM GST Applicable:</label>
        <label><input type="radio" name="gst" /> RCM Appl.</label>
        <label><input type="radio" name="gst" /> GST Appl.</label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label>Purchase Order</label>
          <div className="flex gap-1">
            <input type="text" className="w-full border px-2 py-1 rounded" />
            <button className="px-2 bg-blue-500 text-white rounded">🔍</button>
            <button className="px-2 bg-red-500 text-white rounded">✖</button>
          </div>
        </div>
        <div>
          <label>Received Date *</label>
          <input type="date" className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label>Counter Party Reference</label>
          <input type="text" className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label>Takeover Expense</label>
          <select className="w-full border px-2 py-1 rounded">
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
        <div>
          <label>Officer / Vessel</label>
          <input type="text" className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label>Due Date</label>
          <input type="date" className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label>Department *</label>
          <select className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label>Currency *</label>
          <select className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label>Cost Center (Budget Code) *</label>
          <select className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label>Cargo Type</label>
          <select className="w-full border px-2 py-1 rounded" />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Save</button>
        <button className="bg-red-500 text-white px-6 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
};