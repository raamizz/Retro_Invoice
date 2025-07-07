import React from "react";

const rows = [
  { name: "Cess" },
  { name: "Courier Charge" },
  { name: "Transportation Charge" },
  { name: "Delivery Charge" },
];

const gstRates = [0, 3, 5, 12, 18, 28];

const AdditionalCostTable = ({ additionalCosts, onAdditionalCostChange }) => {
  const calculateRow = (amount, rate) => {
    const amt = parseFloat(amount || 0);
    const gst = parseFloat(rate || 0);
    const taxTotal = (amt * gst) / 100;
    const total = amt + taxTotal;
    return { taxTotal, total };
  };

  const grandTotal = additionalCosts.reduce((acc, item) => {
    const { total } = calculateRow(item.amount, item.tax_rate);
    return acc + total;
  }, 0);

  return (
    <div className="flex-1 bg-gray-50 border border-gray-200 rounded p-3">
      <h3 className="text-base font-semibold mb-2">Additional Cost</h3>
      <table className="w-full border-collapse bg-white text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
              Name
            </th>
            <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
              HSN/ SAC
            </th>
            <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
              Amount
            </th>
            <th className="border border-gray-300 bg-gray-100 font-semibold text-center">
              GST Rate (%)
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
          {rows.map((row, idx) => {
            const { taxTotal, total } = calculateRow(
              additionalCosts[idx].amount,
              additionalCosts[idx].tax_rate
            );
            return (
              <tr key={idx}>
                <td className="border border-gray-300 text-left">{row.name}</td>
                <td className="border border-gray-300">
                  <input
                    type="text"
                    className="w-full focus:outline-none focus:ring-0 px-2 py-1"
                    value={additionalCosts[idx].hsn_sac}
                    onChange={(e) => onAdditionalCostChange(idx, "hsn_sac", e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 text-right">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full text-right px-2 py-1 focus:outline-none focus:ring-0"
                    value={additionalCosts[idx].amount}
                    onChange={(e) =>
                      onAdditionalCostChange(idx, "amount", e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 text-right">
                  <select
                    className="w-full px-2 py-1 border-none text-right bg-transparent focus:outline-none"
                    value={additionalCosts[idx].tax_rate}
                    onChange={(e) =>
                      onAdditionalCostChange(idx, "tax_rate", parseFloat(e.target.value))
                    }
                  >
                    {gstRates.map((rate) => (
                      <option key={rate} value={rate}>
                        {rate}%
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 text-right">
                  {taxTotal.toFixed(2)}
                </td>
                <td className="border border-gray-300 text-right">
                  {total.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan="5"
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
  );
};

export default AdditionalCostTable;
