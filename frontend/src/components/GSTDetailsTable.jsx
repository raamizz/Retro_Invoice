import React, { useState } from "react";

const rates = [0, 3, 5, 12, 18, 28];

const GSTDetailsTable = () => {
  const [gstType, setGstType] = useState("");
  const [amounts, setAmounts] = useState(rates.map(() => ""));

  const handleAmountChange = (index, value) => {
    const updated = [...amounts];
    updated[index] = value;
    setAmounts(updated);
  };

  const calculate = (amount, rate) => {
    const amt = parseFloat(amount || 0);
    const taxRate = parseFloat(rate || 0);

    if (gstType === "cgst_sgst") {
      const halfTax = (amt * taxRate) / 200;
      const taxTotal = halfTax * 2;
      const total = amt + taxTotal;
      return {
        cgst: halfTax,
        sgst: halfTax,
        igst: 0,
        taxTotal,
        total,
      };
    } else if (gstType === "igst") {
      const igst = (amt * taxRate) / 100;
      const total = amt + igst;
      return {
        cgst: 0,
        sgst: 0,
        igst,
        taxTotal: igst,
        total,
      };
    } else {
      return {
        cgst: 0,
        sgst: 0,
        igst: 0,
        taxTotal: 0,
        total: amt,
      };
    }
  };

  const rows = rates.map((rate, idx) => {
    const amt = amounts[idx];
    return {
      rate,
      amount: parseFloat(amt || 0),
      ...calculate(amt, rate),
    };
  });

  const grandTotal = rows.reduce((acc, item) => acc + item.total, 0);

  return (
    <React.Fragment>
      <div className="flex flex-col col-span-2">
        <label className="font-medium mb-1">
          GST Treatment (Maritime) <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-4 mt-1">
          <label className="flex items-center">
            <input
              type="radio"
              name="gstTreatment"
              className="mr-1"
              value="cgst_sgst"
              checked={gstType === "cgst_sgst"}
              onChange={(e) => setGstType(e.target.value)}
            />
            CGST+SGST
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gstTreatment"
              className="mr-1"
              value="zero_rated"
              checked={gstType === "zero_rated"}
              onChange={(e) => setGstType(e.target.value)}
            />
            Export/Zero-Rated
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gstTreatment"
              className="mr-1"
              value="igst"
              checked={gstType === "igst"}
              onChange={(e) => setGstType(e.target.value)}
            />
            IGST
          </label>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 border border-gray-200 rounded p-3 mt-4">
        <h3 className="text-base font-semibold mb-2">
          GST Details (Please enter item level amounts)
        </h3>
        <table className="w-full border-collapse bg-white text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
                Rate (%)
              </th>
              <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
                Amount
              </th>
              <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
                HSN/ SAC
              </th>
              <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
                CGST
              </th>
              <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
                SGST
              </th>
              <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
                IGST
              </th>
              <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
                Tax Total
              </th>
              <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 text-right">
                  {row.rate}
                </td>
                <td className="border border-gray-300 text-right">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amounts[idx]}
                    className="w-full text-right px-2 py-1 focus:outline-none focus:ring-0"
                    onChange={(e) => handleAmountChange(idx, e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 text-center">
                  <input
                    type="text"
                    className="w-full focus:outline-none focus:ring-0"
                  />
                </td>
                <td className="border border-gray-300 text-right">
                  {row.cgst.toFixed(2)}
                </td>
                <td className="border border-gray-300 text-right">
                  {row.sgst.toFixed(2)}
                </td>
                <td className="border border-gray-300 text-right">
                  {row.igst.toFixed(2)}
                </td>
                <td className="border border-gray-300 text-right">
                  {row.taxTotal.toFixed(2)}
                </td>
                <td className="border border-gray-300 text-right">
                  {row.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="7"
                className="border border-gray-300 text-right font-bold bg-gray-100"
              >
                Grand Total:
              </td>
              <td className="border border-gray-300 text-right font-bold bg-gray-100">
                {grandTotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </React.Fragment>
  );
};

export default GSTDetailsTable;
