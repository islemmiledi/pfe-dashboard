import React, { useState } from "react";

const Contact = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      Email: "neil.sims@flowbite.com",
      Nom: "Neil Sims",
      Adresse: "React Developer",
      Message: "rpm coaching",
    },

    // ... autres utilisateurs
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Nouvel état pour le modal de suppression

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

  const handleDeleteClick = (itemId) => {
    toggleDeleteModal();
  };

  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Contact</h1>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Nom
              </th>
              <th scope="col" className="px-6 py-3">
                Adresse
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.Email}</td>
                <td className="px-6 py-4">{user.Nom}</td>
                <td className="px-6 py-4">{user.Adresse}</td>
                <td className="px-6 py-4">{user.Message}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-start space-x-3">
                    <button onClick={() => handleDeleteClick(user.id)}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png"
                        alt="Delete"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Contact;
