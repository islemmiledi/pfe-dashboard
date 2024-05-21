import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllMembre, ajoutMembre } from "../../api/actions/membre.actions";
import Select from "react-select";

function Membres() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.membre.membres);

  // Use useDispatch to get the dispatch function
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedItemId, setEditedItemId] = useState(null);

  const [membre, setMembre] = useState({
    Datedenaissance: "",
    Sexe: "",
    Adresse: "",
    Numerodetelephone: "",
    Dateinscription: "",
    Typeabonnement: "",
  });

  const handleSelectChange = (e) => {
    setMembre({ ...membre, Typeabonnement: e.target.value });
  };

  useEffect(() => {
    dispatch(getAllMembre());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ajoutMembre(membre)).then(() => {
      dispatch(getAllMembre());
    });
    setModalOpen(!isModalOpen);
  };

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId);
    toggleDeleteModal();
  };

  const handleEditClick = (itemId) => {
    setEditedItemId(itemId);
    setEditModalOpen(true);
  };

  const [birthDate, setBirthDate] = useState(new Date());
  const [subscriptionDate, setSubscriptionDate] = useState(new Date());
  const [registrationDate, setRegistrationDate] = useState(new Date());

  // Component rendering continues here...

  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Membres</h1>
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm shadow-md hover:bg-blue-600 transition-all"
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
                      Date de naissance
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Sexe
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Type d'abonnement
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date d'inscription
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Adresse
                    </th>
                    <th scope="col" className="px-6 py-4">
                      N° de telephone
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((membre) => (
                      <tr
                        key={membre.id}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {membre.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {membre.Datedenaissance}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          {membre.Sexe}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {membre.Typeabonnement}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {membre.Adresse}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {membre.Numerodetelephone}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {membre.Dateinscription}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 flex items-center">
                          <button
                            onClick={() => handleEditClick(membre.id)} // Appel de handleEditClick au clic
                            className="text-yellow-500 hover:text-yellow-600 transition-all mr-2"
                          >
                            <FontAwesomeIcon icon={faEdit} size="lg" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(membre.id)}
                            className="text-red-500 hover:text-red-600 transition-all"
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
                      Ajouter Nouveau Membre
                    </h3>
                    <div className="mt-2">
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <label
                          htmlFor="birthDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date de naissance
                        </label>
                        <ReactDatePicker
                          id="birthDate"
                          selected={birthDate}
                          onChange={(date) => {
                            setBirthDate(date); // Mise à jour de l'état local pour le date picker
                            setMembre({ ...membre, Datedenaissance: date }); // Mise à jour de l'état du membre
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholderText="Sélectionner la date de naissance"
                        />

                        <label className="block text-sm font-medium text-gray-700">
                          Sexe
                        </label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            <input
                              id="male"
                              name="gender"
                              type="radio"
                              value="homme"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                            <label
                              htmlFor="male"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Homme
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="female"
                              name="gender"
                              type="radio"
                              value="femme"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                            <label
                              htmlFor="female"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Femme
                            </label>
                          </div>
                        </div>

                        <label
                          htmlFor="subscriptionType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Type d'abonnement
                        </label>
                        <select onChange={handleSelectChange}>
                          <option value="select">
                            Select type d'Abonnement
                          </option>
                          <option value="premium">Premium</option>
                          <option value="silver">Silver</option>
                          <option value="gold">Gold</option>
                        </select>

                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Adresse
                        </label>
                        <input
                          type="text"
                          id="address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Adresse"
                          onChange={(e) =>
                            setMembre({ ...membre, Adresse: e.target.value })
                          }
                        />

                        <label
                          htmlFor="telephone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          N° de téléphone
                        </label>
                        <input
                          type="tel"
                          id="telephone"
                          name="telephone"
                          placeholder="Entrez le numéro de téléphone"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={membre.Numerodetelephone}
                          onChange={(e) =>
                            setMembre({
                              ...membre,
                              Numerodetelephone: e.target.value,
                            })
                          }
                        />

                        <label
                          htmlFor="registrationDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date d'inscription
                        </label>
                        <ReactDatePicker
                          id="registrationDate"
                          selected={registrationDate}
                          onChange={(date) => {
                            setRegistrationDate(date); // Mise à jour de l'état local pour le date picker
                            setMembre({ ...membre, Dateinscription: date }); // Mise à jour de l'état du membre
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholderText="Sélectionner la date d'inscription"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={toggleModal}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirmer
                </button>
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
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all"
                  onClick={() => {
                    // Logique de suppression ici
                    toggleDeleteModal();
                  }}
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
                      Modifier Membre
                    </h3>
                    <div className="mt-2">
                      {/* Formulaire de modification */}
                      <form className="space-y-4">
                        <input
                          type="text"
                          placeholder="Nom"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Type D'abonnement"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Caracteristiques"
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
                  onClick={toggleEditModal}
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

export default Membres;
