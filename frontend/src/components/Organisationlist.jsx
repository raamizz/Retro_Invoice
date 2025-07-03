import React, { useState } from 'react';

const initialOrganisations = [
  { id: 1, name: 'Acme Corp' },
];

const Organisationlist = () => {
  const [organisations, setOrganisations] = useState(initialOrganisations);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '' });
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setForm({ name: '' });
    setError('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrganisation = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Organisation name is required.');
      return;
    }
    setOrganisations([
      ...organisations,
      { id: Date.now(), name: form.name },
    ]);
    setShowModal(false);
  };

  return (
    <div className="w-1/2 mx-auto mt-8 bg-white shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Organisations</h2>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2 py-2 rounded shadow transition"
        >
          + Add Organisation
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">No.</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">Organisation Name</th>
            </tr>
          </thead>
          <tbody>
            {organisations.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">No organisations found.</td>
              </tr>
            ) : (
              organisations.map((org, idx) => (
                <tr key={org.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 border-b">{idx + 1}</td>
                  <td className="px-6 py-4 border-b font-medium text-gray-800">{org.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Add Organisation</h3>
            <form onSubmit={handleAddOrganisation} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Organisation Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter organisation name"
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-3 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Organisationlist;
