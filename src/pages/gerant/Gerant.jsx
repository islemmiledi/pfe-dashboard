import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  ajoutGerant,
  deleteGerant,
  getAllGerant,
  getAllGerantWithPagination,
  getOneGerantById,
  updateGerant,
} from "../../api/actions/gerant.actions";

import crytpoRandomString from "crypto-random-string";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { getAllSalle } from "../../api/actions/salle.actions";

function Gerant() {
  const dispatch = useDispatch();
  const users = useSelector(
    (state) => state?.gerant?.usersPagination?.data?.users
  );
  const salles = useSelector((state) => state?.salle?.salles?.data);

  const totalPages = useSelector(
    (state) => state?.gerant?.usersPagination?.data?.totalPages
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const [gerant, setGerant] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
    file: "",
    salle: "",
  });

  const [page, setPage] = useState(1);
  const totalePages = totalPages;

  const { email, firstName, lastName, password, role, file, salle } = gerant;
  const handleSelectChange = (e) => {
    setGerant({ ...gerant, role: e.target.value });
  };
  const handleSelectSalleChange = (e) => {
    setGerant({ ...gerant, salle: e.target.value });
  };
  const handleImageChange = (e) => {
    setGerant({ ...gerant, file: e.target.files[0] });
  };

  const generateRandomPassword = () => {
    const randomPassword = crytpoRandomString({
      length: 10,
      type: "alphanumeric",
    });
    setGerant({ ...gerant, password: randomPassword });
  };

  useEffect(() => {
    dispatch(getAllGerantWithPagination(page));
    dispatch(getAllSalle());
  }, [dispatch, page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("role", role);
    myForm.set("file", file);
    myForm.set("salle", salle);

    dispatch(ajoutGerant(myForm)).then(() => {
      dispatch(getAllGerant());
    });

    setModalOpen(!isModalOpen);
  };

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

  const handleDeleteClick = (itemId) => {
    // dispatch(deleteGerant(itemId));
    setItemToDelete(itemId);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    console.log(itemToDelete);
    if (itemToDelete) {
      dispatch(deleteGerant(itemToDelete)).then(() => {
        dispatch(getAllGerant()); // Recharger les données après suppression
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
    dispatch(updateGerant({ id: selectedItem.id, selectedItem }));
  };

  // Exemple de données de gérants

  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Gérant</h1>
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm shadow-md hover:bg-blue-600 transition-all mt-2"
        >
          Ajouter
        </button>
      </div>
      <div className="flex flex-col mt-4">
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
                      Nom & Prénom
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Salle
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((gerant) => (
                      <tr
                        key={gerant.id}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {gerant.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">{`${gerant.firstName} ${gerant.lastName}`}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {gerant.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {gerant.role}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          {gerant?.salle?.Nom}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 flex items-center">
                          <button
                            className="text-yellow-500 hover:text-yellow-600 transition-all mr-2"
                            onClick={() => handleEditClick(gerant)}
                          >
                            <FontAwesomeIcon icon={faEdit} size="lg" />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-600 transition-all"
                            onClick={() => handleDeleteClick(gerant.id)}
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
          <ResponsivePagination
            current={page}
            total={totalePages}
            onPageChange={setPage}
          />
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
                      Ajouter Nouveau Gérant
                    </h3>
                    <div className="mt-2">
                      {/* Formulaire d'ajout */}
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <label>
                          <input
                            type="text"
                            placeholder="Nom"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            onChange={(e) =>
                              setGerant({
                                ...gerant,
                                firstName: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          <input
                            type="text"
                            placeholder="Prenom"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            onChange={(e) =>
                              setGerant({
                                ...gerant,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          {" "}
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            onChange={(e) =>
                              setGerant({
                                ...gerant,
                                email: e.target.value,
                              })
                            }
                          />
                        </label>

                        <input
                          type="password"
                          value={gerant.password}
                          placeholder="Password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setGerant({ ...gerant, password: e.target.value })
                          }
                        />
                        <button onClick={generateRandomPassword} type="button">
                          Generate Password
                        </button>

                        <label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer"
                            onChange={handleSelectChange}
                          >
                            <option value="select">Sélectionnez un rôle</option>
                            <option value="admin">Admin</option>
                            <option value="gerant">Gérant</option>
                          </select>
                        </label>
                        <label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer"
                            onChange={handleSelectSalleChange}
                          >
                            <option value="">Sélectionnez une salle</option>
                            {salles &&
                              salles.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.Nom}
                                </option>
                              ))}
                          </select>
                        </label>

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
                  Supprimer Membre
                </h3>

                <div className="mt-4 mb-6">
                  <p className="text-base font-light text-gray-700 tracking-wide">
                    Êtes-vous sûr de vouloir supprimer ce membre ?
                  </p>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all"
                  onClick={() => confirmDelete()}
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
                      Modifier Gérant
                    </h3>
                    <div className="mt-2">
                      {/* Formulaire de modification */}
                      <form className="space-y-4">
                        <input
                          type="text"
                          placeholder="Nom"
                          value={selectedItem.firstName}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Type D'abonnement"
                          value={selectedItem.lastName}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Caracteristiques"
                          value={selectedItem.email}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
}

export default Gerant;
