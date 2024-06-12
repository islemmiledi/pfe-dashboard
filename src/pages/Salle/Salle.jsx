import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSalle,
  ajoutSalle,
  deleteSalle,
  updateSalle,
  getOneSalleById,
} from "../../api/actions/salle.actions";

import Select from "react-select";

function Salle() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.salle.salles);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  // const [salle, setSalle] = useState({
  //   Nom: "",
  //   Caracteristiques: [],
  //   Typeabonnement: "",
  // });
  const [salle, setSalle] = useState({
    Nom: "",
    titre: "",
    file: "",
    description: "",
    Typetheme: "",
  });

  const { Nom, titre, file, description, Typetheme } = salle;

  // const options = [
  //   { value: "wifi", label: "Wifi" },
  //   { value: "climatisation", label: "Climatisation" },
  //   { value: "douche", label: "Douche" },
  //   // Ajoutez plus d'options ici
  // ];

  const handleSelectChange = (e) => {
    setSalle({ ...salle, Typetheme: e.target.value });
  };
  const handleImageChange = (e) => {
    setSalle({ ...salle, file: e.target.files[0] });
  };
  const handleImageUpdateChange = (e) => {
    setSelectedItem({ ...selectedItem, file: e.target.files[0] });
  };

  useEffect(() => {
    dispatch(getAllSalle());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("Nom", Nom);
    myForm.set("titre", titre);
    myForm.set("file", file);
    myForm.set("description", description);
    myForm.set("Typetheme", Typetheme);

    dispatch(ajoutSalle(myForm)).then(() => {
      dispatch(getAllSalle());
    });

    setModalOpen(!isModalOpen);
  };

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

  // const handleDeleteClick = (itemId) => {
  //   dispatch(deleteSalle(itemId));
  //   setItemToDelete(itemId);
  //   toggleDeleteModal();
  // };

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId); // Marquer l'ID pour suppression
    toggleDeleteModal(); // Ouvrir le modal pour demander confirmation
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteSalle(itemToDelete)).then(() => {
        dispatch(getAllSalle()); // Recharger les données après suppression
        toggleDeleteModal(); // Fermer le modal après la suppression
      });
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    toggleEditModal();
  };

  const handleEdit = () => {
    console.log(selectedItem);

    dispatch(updateSalle({ id: selectedItem.id, selectedItem })).then(() => {
      dispatch(getAllSalle()); // C'est une bonne pratique de recharger les données
      setEditModalOpen(false); // Fermer le modal d'édition ici
    });
  };

  // const handleCaracteristiquesChange = (selectedOptions) => {
  //   setSalle({
  //     ...salle,
  //     Caracteristiques: selectedOptions
  //       ? selectedOptions.map((option) => option.value)
  //       : [],
  //   });
  // };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="text-2xl font-semibold text-gray-900">Salles</h1>

        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm shadow-md hover:bg-blue-600 transition-all"
        >
          Ajouter
        </button>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nom
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Typetheme
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Logo
                    </th>

                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((salle) => (
                      <tr
                        key={salle.id}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {salle.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {salle.Nom}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {salle.titre}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {salle.description}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {salle.Typetheme}
                        </td>
                        {/* <td className="whitespace-nowrap px-6 py-4">
                          {salle.Caracteristiques.join(", ")}
                        </td> */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <img
                            src={salle.file}
                            alt="Logo"
                            className="h-10 w-10 rounded-full"
                          />
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 flex items-center">
                          <button
                            className="text-yellow-500 hover:text-yellow-600 transition-all mr-2"
                            onClick={() => handleEditClick(salle)}
                          >
                            <FontAwesomeIcon icon={faEdit} size="lg" />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-600 transition-all"
                            onClick={() => handleDeleteClick(salle.id)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'ajout */}
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
                      Ajouter Nouveau Salle
                    </h3>
                    <div className="mt-2">
                      {/* Formulaire d'ajout */}
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Nom"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setSalle({ ...salle, Nom: e.target.value })
                          }
                        />

                        <input
                          type="text"
                          placeholder="titre"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setSalle({ ...salle, titre: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          placeholder="description"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setSalle({ ...salle, description: e.target.value })
                          }
                        />
                        {/* <input
                          type="text"
                          placeholder="Typetheme"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setSalle({ ...salle, Typetheme: e.target.value })
                          }
                        /> */}

                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={handleImageChange}
                        />

                        {/* <label>
                          <input
                            type="text"
                            placeholder="Caracteristiques"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            onChange={(e) =>
                              setSalle({
                                ...salle,
                                Caracteristiques: e.target.value,
                              })
                            }
                          />
                        </label> */}
                        {/* 
                        <label>
                          <Select
                            isMulti
                            name="Caracteristiques"
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleCaracteristiquesChange}
                            placeholder="Caracteristiques"
                          />
                        </label> */}

                        <select onChange={handleSelectChange}>
                          <option value="select">Select type theme</option>
                          <option value="premium">Premium</option>
                          <option value="silver">Silver</option>
                          <option value="gold">Gold</option>
                        </select>

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
                  Supprimer Salle
                </h3>

                <div className="mt-4 mb-6">
                  <p className="text-base font-light text-gray-700 tracking-wide">
                    Êtes-vous sûr de vouloir supprimer cette salle ?
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
                  onClick={toggleDeleteModal}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de modification */}
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
                      Modifier Salle
                    </h3>
                    <div className="mt-2">
                      {/* Formulaire de modification */}
                      <form className="space-y-4">
                        <input
                          type="text"
                          placeholder="Nom"
                          value={selectedItem.Nom}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              Nom: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="titre"
                          value={selectedItem.titre}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              titre: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="description"
                          value={selectedItem.description}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              description: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={handleImageUpdateChange}
                        />
                        {/* <input
                          type="text"
                          placeholder="Type D'abonnement"
                          value={selectedItem.Typeabonnement}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              Typeabonnement: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        /> */}
                        {/* <input
                          type="text"
                          placeholder="Caracteristiques"
                          value={selectedItem.Caracteristiques}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              Caracteristiques: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        /> */}
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
}

export default Salle;
