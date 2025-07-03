import React from 'react';

const rows = [
  { name: 'Cess', amount: '0.00' },
  { name: 'Courier Charge', amount: '0.00' },
  { name: 'Transportation Charge', amount: '0.00' },
  { name: 'Delivery Charge', amount: '0.00' },
];

const AdditionalCostTable = () => (
  <div className="flex-1 bg-gray-50 border border-gray-200 rounded p-3">
    <h3 className="text-base font-semibold mb-2">Additional Cost</h3>
    <table className="w-full border-collapse bg-white text-sm">
      <thead>
        <tr>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">Name</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">HSN/ SAC</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">Amount</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">GST Rate (%)</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">Tax Total</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">Total</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            <td className="border border-gray-300 text-left">{row.name}</td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300 text-right">{row.amount}</td>
            <td className="border border-gray-300 text-right">0%</td>
            <td className="border border-gray-300 text-right">0.00</td>
            <td className="border border-gray-300 text-right">0.00</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5" className="border border-gray-300 text-right font-bold bg-gray-100">Grand Total:</td>
          <td className="border border-gray-300 text-right font-bold bg-gray-100">0.00</td>
        </tr>
      </tfoot>
    </table>
  </div>
);

export default AdditionalCostTable; 