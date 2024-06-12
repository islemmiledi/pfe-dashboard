import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdres } from "../../api/actions/ordre.actions";

function Ordre() {
  const dispatch = useDispatch();
  const ordres = useSelector((state) => state?.Ordres?.ordres?.data);
  const datauser = useSelector(
    (state) => state?.gerant?.current?.data?.salle?.id
  );
  const salleId = datauser;
  const fitredData =
    ordres && ordres.filter((ordre) => ordre.salleId === salleId); // Filter the data
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [ordre, setOrdre] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdres());
  }, [dispatch]);

  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

  const handleEditClick = (item) => {
    setOrdre(item);

    toggleEditModal();
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nom
              </th>
              <th scope="col" className="px-6 py-3">
                prenom
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                adresse livraison
              </th>
              <th scope="col" className="px-6 py-3">
                numéro de tel
              </th>
              <th scope="col" className="px-6 py-3">
                voir ordre
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {fitredData &&
              fitredData.map((coach) => (
                <tr key={coach.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{coach.nom}</td>
                  <td className="px-6 py-4">{coach.prénom}</td>
                  <td className="px-6 py-4">{coach.email}</td>
                  <td className="px-6 py-4">{coach.adrlivraison}</td>
                  <td className="px-6 py-4">{coach.numtl}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-start space-x-3">
                      <button onClick={() => handleEditClick(coach.ordres)}>
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
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all m-4 sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Voir Produits
                    </h3>
                    <div className="mt-2">
                      {/* Formulaire de modification */}
                      {ordre &&
                        ordre.map((item) => {
                          return (
                            <div key={item.product}>
                              <span>{item.name}</span>
                              <span className="ml-2">{item.quantity}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all"
                  onClick={toggleEditModal}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Ordre;
