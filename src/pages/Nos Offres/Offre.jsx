import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOffre,
  ajoutOffre,
  updateOffre,
  deleteOffre,
  getAllOffresByUser,
} from "../../api/actions/offre.actions";

const Offre = () => {
  const dispatch = useDispatch();
  // const { data } = useSelector((state) => state.offre.offres);
  const datauser = useSelector(
    (state) => state?.gerant?.current?.data?.salle?.id
  );
  const salleId = datauser;
  // console.log(salleId);
  const offresalle = useSelector((state) => state?.offre?.offresuser?.data);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const [offre, setOffre] = useState({
    typeoffre: "",
    prix: "",
    description: "",
    salle: salleId,
  });

  const { typeoffre, prix, description, salle } = offre;

  const handleSelectChange = (e) => {
    setOffre({ ...offre, typeoffre: e.target.value });
  };

  useEffect(() => {
    if (salleId) {
      setOffre({ ...offre, salle: salleId });
    }
    dispatch(getAllOffresByUser());
  }, [dispatch, datauser]);

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(ajoutOffre(offre)).then(() => {
      dispatch(getAllOffresByUser());
    });
    setModalOpen(!isModalOpen);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    toggleEditModal();
  };

  const handleEdit = () => {
    console.log(selectedItem);

    dispatch(updateOffre({ id: selectedItem.id, selectedItem })).then(() => {
      dispatch(getAllOffre()); // C'est une bonne pratique de recharger les données
      setEditModalOpen(false); // Fermer le modal d'édition ici
    });
  };

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId); // Marquer l'ID pour suppression
    toggleDeleteModal(); // Ouvrir le modal pour demander confirmation
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteOffre(itemToDelete)).then(() => {
        dispatch(getAllOffre()); // Recharger les données après suppression
        toggleDeleteModal(); // Fermer le modal après la suppression
      });
    }
  };
  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Nos Offres</h1>
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
                type d'offre
              </th>
              <th scope="col" className="px-6 py-3">
                prix
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {offresalle &&
              offresalle.map((offre) => (
                <tr key={offre.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{offre.typeoffre}</td>
                  <td className="px-6 py-4">{offre.prix}</td>
                  <td className="px-6 py-4">{offre.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-start space-x-3">
                      <button onClick={() => handleEditClick(offre)}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                          alt="Edit"
                          className="w-6 h-6"
                        />
                      </button>
                      <button onClick={() => handleDeleteClick(offre.id)}>
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Ajouter une nouvelle offre
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <select onChange={handleSelectChange}>
                    <option value="select">Select type d'offre</option>
                    <option value="12mois">12 mois</option>
                    <option value="6mois">6 mois</option>
                    <option value="3mois">3 mois</option>
                    <option value="1mois">1 mois</option>
                  </select>
                  <label>
                    <input
                      type="text"
                      name="prix"
                      placeholder="Prix"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      onChange={(e) =>
                        setOffre({ ...offre, prix: e.target.value })
                      }
                    />
                  </label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                    onChange={(e) =>
                      setOffre({ ...offre, description: e.target.value })
                    }
                  ></textarea>
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={toggleModal}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Confirmer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal de modification */}
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
                  Modifier l'offre
                </h3>
                <form className="space-y-4">
                  <select
                    name="typeoffre"
                    value={selectedItem.typeoffre}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        typeoffre: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select type d'offre</option>{" "}
                    {/* Ensure there's a default selection */}
                    <option value="12mois">12 mois</option>
                    <option value="6mois">6 mois</option>
                    <option value="3mois">3 mois</option>
                    <option value="1mois">1 mois</option>
                  </select>
                  <input
                    type="text"
                    name="prix"
                    value={selectedItem.prix || ""} // Ensure fallback to an empty string if undefined
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        prix: e.target.value,
                      })
                    }
                  />
                  <textarea
                    name="description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                    value={selectedItem.description || ""} // Ensure fallback to an empty string if undefined
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        description: e.target.value, // Correcting the property to 'description'
                      })
                    }
                  ></textarea>

                  <div className="flex items-center justify-end space-x-4">
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
                      onClick={handleEdit}
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
      {/* Modal de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all m-4 sm:max-w-lg sm:w-full">
              <div className="bg-white text-center p-5 sm:p-6">
                <div className="mb-4">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    size="3x"
                    className="text-red-500 mx-auto"
                  />
                </div>
                <h3
                  className="text-xl leading-6 font-bold text-gray-900"
                  id="modal-title"
                >
                  Supprimer un offre
                </h3>

                <div className="mt-4 mb-6">
                  <p className="text-base font-light text-gray-700 tracking-wide">
                    Êtes-vous sûr de vouloir supprimer cet offre ?
                  </p>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all"
                  onClick={confirmDelete} // Utiliser confirmDelete ici
                >
                  Supprimer
                </button>

                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all"
                  onClick={toggleDeleteModal} // Juste fermer le modal
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Offre;
