import React from 'react';

const rates = [0, 3, 5, 12, 18, 28];

const GSTDetailsTable = () => (
  <div className="flex-1 bg-gray-50 border border-gray-200 rounded p-3">
    <h3 className="text-base font-semibold mb-2">GST Details (Please enter item level IGST or SGST+CGST amounts.)</h3>
    <table className="w-full border-collapse bg-white text-sm">
      <thead>
        <tr>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">Rate (%)</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">Amount</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">HSN/ SAC</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">CGST</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">SGST</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">IGST</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">Tax Total</th>
          <th className="border border-gray-300 bg-gray-100 font-semibold text-center">Total</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate, idx) => (
          <tr key={idx}>
            <td className="border border-gray-300 text-right">{rate}</td>
            <td className="border border-gray-300 text-right">0.00</td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300 text-right">0.00</td>
            <td className="border border-gray-300 text-right">0.00</td>
            <td className="border border-gray-300 text-right">0.00</td>
            <td className="border border-gray-300 text-right">0.00</td>
            <td className="border border-gray-300 text-right">0.00</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="7" className="border border-gray-300 text-right font-bold bg-gray-100">Grand Total:</td>
          <td className="border border-gray-300 text-right font-bold bg-gray-100">0.00</td>
        </tr>
      </tfoot>
    </table>
  </div>
);

export default GSTDetailsTable; 