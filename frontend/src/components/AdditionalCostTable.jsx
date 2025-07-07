import React, { useState ,useEffect} from "react";

const rows = [
  { name: "Cess" },
  { name: "Courier Charge" },
  { name: "Transportation Charge" },
  { name: "Delivery Charge" },
];

const gstRates = [0, 3, 5, 12, 18, 28];

const AdditionalCostTable = ({additionalCost}) => {
  const [costData, setCostData] = useState(
    rows.map(() => ({ hsn: "", amount: "", gstRate: 0 }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...costData];
    updated[index][field] = field === "amount" ? parseFloat(value || 0) : value;
    setCostData(updated);
  };

  const calculateRow = (amount, rate) => {
    const amt = parseFloat(amount || 0);
    const gst = parseFloat(rate || 0);
    const taxTotal = (amt * gst) / 100;
    const total = amt + taxTotal;
    return { taxTotal, total };
  };

  const grandTotal = costData.reduce((acc, item) => {
    const { total } = calculateRow(item.amount, item.gstRate);
    return acc + total;
  }, 0);

  useEffect(() => {
   additionalCost(grandTotal)
  }, [grandTotal])
  
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
              costData[idx].amount,
              costData[idx].gstRate
            );
            return (
              <tr key={idx}>
                <td className="border border-gray-300 text-left">{row.name}</td>
                <td className="border border-gray-300">
                  <input
                    type="text"
                    className="w-full focus:outline-none focus:ring-0 px-2 py-1"
                    value={costData[idx].hsn}
                    onChange={(e) => handleChange(idx, "hsn", e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 text-right">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full text-right px-2 py-1 focus:outline-none focus:ring-0"
                    value={costData[idx].amount}
                    onChange={(e) =>
                      handleChange(idx, "amount", e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 text-right">
                  <select
                    className="w-full px-2 py-1 border-none text-right bg-transparent focus:outline-none"
                    value={costData[idx].gstRate}
                    onChange={(e) =>
                      handleChange(idx, "gstRate", parseFloat(e.target.value))
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
