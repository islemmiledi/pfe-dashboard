import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const InformationSalle = () => {
  const [users, setUsers] = useState([
   
    // Ajoutez d'autres utilisateurs si nécessaire
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

  const handleEditClick = (item) => {
    toggleEditModal();
  };

 
  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Information </h1>
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm shadow-md hover:bg-blue-600 transition-all mt-2 float-right"
        >
          Ajouter
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nom
              </th>
              <th scope="col" className="px-6 py-3">
                Typeabonnement
              </th>
              <th scope="col" className="px-6 py-3">
                Caracteristiques
              </th>
              <th scope="col" className="px-6 py-3">
                Logo
              </th>
              <th scope="col" className="px-6 py-3">
                Titre
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                AboutTitre
              </th>
              <th scope="col" className="px-6 py-3">
                AboutInfoTitre
              </th>
              <th scope="col" className="px-6 py-3">
                AboutDescription
              </th>
              <th scope="col" className="px-6 py-3">
                AboutInformation
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.Nomdelasalle}</td>
                <td className="px-6 py-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.imageUrl}
                    alt="Logo"
                  />
                </td>

                <td className="px-6 py-4">{user.Description}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-start space-x-3">
                    <button >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                        alt="Edit"
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

    

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Modifer des nouveaux informations
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    name="Nom de la salle"
                    placeholder="Nom de la salle"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {/* <input
                    type="text"
                    name="Logo"
                    placeholder="Logo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  /> */}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    name="Description"
                    placeholder="Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                  ></textarea>
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={toggleEditModal}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Modifier
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    
    </>
  );
};
export default InformationSalle;
