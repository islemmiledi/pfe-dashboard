import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllProgduitsByUser,
  ajoutProduit,
  deleteProduit,
  getAllProduit,
  updateProduit,
} from "../../api/actions/produit.actions";
const Produit = () => {
  const dispatch = useDispatch();

  const datauser = useSelector(
    (state) => state?.gerant?.current?.data?.salle?.id
  );
  const salleId = datauser;
  const produitsalle = useSelector(
    (state) => state?.Produit?.produitsuser?.data
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  const [produit, setProduit] = useState({
    Nomproduit: "",
    Description: "",
    Prix: "",
    file: "",
    salle: salleId,
  });

  const { Nomproduit, Description, Prix, file, salle } = produit;

  const handleImageChange = (e) => {
    setProduit({ ...produit, file: e.target.files[0] });
  };

  useEffect(() => {
    if (salleId) {
      setProduit({ ...produit, salle: salleId });
    }
    dispatch(getAllProgduitsByUser());
  }, [dispatch, datauser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("Nomproduit", Nomproduit);
    myForm.set("Description", Description);
    myForm.set("Prix", Prix);
    myForm.set("file", file);
    myForm.set("salle", salle);

    dispatch(ajoutProduit(myForm)).then(() => {
      dispatch(getAllProgduitsByUser());
    });

    setModalOpen(!isModalOpen);
  };

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId); // Marquer l'ID pour suppression
    toggleDeleteModal(); // Ouvrir le modal pour demander confirmation
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteProduit(itemToDelete)).then(() => {
        dispatch(getAllProduit()); // Recharger les données après suppression
        toggleDeleteModal(); // Fermer le modal après la suppression
      });
    }
  };

  const handleEditClick = (item) => {
    // Assurez-vous que l'objet est copié proprement.
    setSelectedItem({ ...item });
    toggleEditModal();
  };

  const handleEdit = () => {
    // console.log({ selectedItem });

    dispatch(updateProduit({ id: selectedItem.id, selectedItem })).then(() => {
      dispatch(getAllProgduitsByUser()); // C'est une bonne pratique de recharger les données
      setEditModalOpen(false); // Fermer le modal d'édition ici
    });
  };

  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Produit</h1>
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
                Nom Produit
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Prix
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {produitsalle &&
              produitsalle.map((produit) => (
                <tr key={produit.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{produit.Nomproduit}</td>
                  <td className="px-6 py-4">{produit.Description}</td>
                  <td className="px-6 py-4">{produit.Prix}</td>
                  <td className="px-6 py-4">
                    <img
                      src={produit.file}
                      alt={produit.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-start space-x-3">
                      <button onClick={() => handleEditClick(produit)}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                          alt="Edit"
                          className="w-6 h-6"
                        />
                      </button>
                      <button onClick={() => handleDeleteClick(produit.id)}>
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
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Ajouter Nouveau Produit
                    </h3>
                    <div className="mt-2">
                      {/* Formulaire d'ajout */}
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Nom"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setProduit({
                              ...produit,
                              Nomproduit: e.target.value,
                            })
                          }
                        />

                        <textarea
                          placeholder="Description"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setProduit({
                              ...produit,
                              Description: e.target.value,
                            })
                          }
                          rows="3"
                        ></textarea>
                        <input
                          type="text"
                          placeholder="prix"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setProduit({ ...produit, Prix: e.target.value })
                          }
                        />
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={handleImageChange}
                        />
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
                  Supprimer Produit
                </h3>

                <div className="mt-4 mb-6">
                  <p className="text-base font-light text-gray-700 tracking-wide">
                    Êtes-vous sûr de vouloir supprimer ce Produit ?
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
                      Modifier Produit
                    </h3>
                    <div className="mt-2">
                      {/* Formulaire de modification */}
                      <form className="space-y-4">
                        <input
                          type="text"
                          placeholder="Nomproduit "
                          value={selectedItem.Nomproduit}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              Nomproduit: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <textarea
                          placeholder="Description"
                          value={selectedItem.Description}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              Description: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows="3"
                        ></textarea>

                        <input
                          type="text"
                          placeholder="Prix"
                          value={selectedItem.Prix}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              Prix: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="file"
                          name="file"
                          accept="image/*"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              file: e.target.files[0],
                            })
                          }
                        />
                      </form>
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
                  onClick={handleEdit}
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
};

export default Produit;
