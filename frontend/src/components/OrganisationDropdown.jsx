import { useState, useEffect } from "react";

const OrganisationDropdown = ({ onSelect }) => {
  const [organisations, setOrganisations] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("organizations");
    if (stored) {
      try {
        setOrganisations(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse organizations from localStorage:", e);
      }
    }
  }, []);

   const handleChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedOrg = organisations.find((org) => org.id === selectedId);
    if (selectedOrg) {
      onSelect(selectedOrg); 
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <label className="block mb-2 font-semibold text-gray-700">
          Select Organization
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          defaultValue=""
          onChange={handleChange}
        >
          <option value="" disabled>
            -- Choose an organization --
          </option>
          {organisations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrganisationDropdown;
