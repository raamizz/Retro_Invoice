const OrganisationDropdown = ({ onSelect }) => {
  const handleChange = (e) => {
    onSelect(e.target.value);
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
          <option value="Organisation1">Org 1</option>
          <option value="Organisation2">Org 2</option>
        </select>
      </div>
    </div>
  );
};

export default OrganisationDropdown;
