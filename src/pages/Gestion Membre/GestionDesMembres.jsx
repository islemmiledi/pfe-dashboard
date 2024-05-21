import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const GestionDesMembres = () => {
  // État pour la gestion des membres
  const [users, setUsers] = useState([
    {
      id: 1,
      Nom: "Neil Sims",
      Sexe: "neil.sims@flowbite.com",
      NumérodeTelephone: "99192298",
      DatedeNaissance: "01/01/2000",
      DateDinscription: "04/23/2023",
      TypeDabonnement: "Silver",
    },
  ]);
  const [nom, setNom] = useState("");
  const [sexe, setSexe] = useState("");
  const [phone, setPhone] = useState("");
  const [dateDeNaissance, setDateDeNaissance] = useState("");
  const [dateDInscription, setDateDInscription] = useState("");
  const [typeDAbonnement, setTypeDAbonnement] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

  const handleAddMembre = (event) => {
    event.preventDefault();
    const newMember = {
      NumérodeTelephone: phone,
    };
    setUsers([...users, newMember]);
    toggleModal();
  };

  // const handleChange = (event) => {
  //   const input = event.target.value;
  //   // Limiter l'entrée à 8 chiffres numériques
  //   if (input.length <= 8 && /^[0-9]*$/.test(input)) {
  //     setPhone(input);
  //   }
  // };

  const handleEditMembre = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const membreData = {
      nom: formData.get("Nom"),
      sexe: formData.get("Sexe"),
      Numerodetelephone: formData.get("NumérodeTelephone"),
      dateDeNaissance: formData.get("DatedeNaissance"),
      dateDInscription: formData.get("DateDinscription"),
      TypeDAbonnement: formData.get("TypeDabonnement"),
    };

    console.log(membreData);
    toggleEditModal();
  };
  const handleDeleteClick = (itemId) => {
    toggleDeleteModal();
  };

  const handleEditClick = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setNom(userToEdit.Nom);
      setSexe(userToEdit.Sexe);
      setPhone(userToEdit.NumérodeTelephone);
      setDateDeNaissance(userToEdit.DatedeNaissance);
      setDateDInscription(userToEdit.DateDinscription);
      setTypeDAbonnement(userToEdit.TypeDabonnement);
      setEditModalOpen(true);
    } else {
      console.log("Membre non trouvé");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Membre</h1>
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
                Nom
              </th>
              <th scope="col" className="px-6 py-3">
                Sexe
              </th>
              <th scope="col" className="px-6 py-3">
                Numéro de Telephone
              </th>
              <th scope="col" className="px-6 py-3">
                Date de Naissance
              </th>
              <th scope="col" className="px-6 py-3">
                Date D'inscription
              </th>
              <th scope="col" className="px-6 py-3">
                Type D'abonnement
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.Nom}</td>
                <td className="px-6 py-4">{user.Sexe}</td>
                <td className="px-6 py-4">{user.Numerodetelephone}</td>

                <td className="px-6 py-4">{user.DatedeNaissance}</td>
                <td className="px-6 py-4">{user.DateDinscription}</td>
                <td className="px-6 py-4">{user.TypeDabonnement}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-start space-x-3">
                    <button onClick={() => handleEditClick(user.id)}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                        alt="Edit"
                        className="w-6 h-6"
                      />
                    </button>
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

      {/* Modal d'ajout de membre */}
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
                      <form className="space-y-4" onSubmit={handleAddMembre}>
                        <input
                          type="text"
                          name="Nom"
                          placeholder="Nom"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <select
                          name="Sexe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Sélectionnez le sexe</option>
                          <option value="Homme">Homme</option>
                          <option value="Femme">Femme</option>
                          <option value="Femme">Autre</option>
                        </select>

                        {/* <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-md">
                          <span className="text-gray-500 sm:text-sm">+216</span>

                          <PhoneInput
                            placeholder="Entrez le numéro de téléphone"
                            value={phone}
                            onChange={setPhone}
                            className="input-phone"
                          />
                        </div> */}
                        <input
                          type="tel"
                          name=" Numerodetelephone"
                          placeholder="Entrez votre numéro de téléphone"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />

                        <input
                          type="date"
                          name="DatedeNaissance"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="date"
                          name="DateDinscription"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          name="TypeDabonnement"
                          placeholder="Type D'abonnement"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all"
                    onClick={handleDeleteClick}
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
        </div>
      )}

      {/* Edit Modal */}
      {/* Modal de modification de membre */}
      {isEditModalOpen && (
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
                      Modifier Membre
                    </h3>
                    <div className="mt-2">
                      <form className="space-y-4" onSubmit={handleEditMembre}>
                        <input
                          type="text"
                          name="Nom"
                          placeholder="Nom"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          // Vous devriez ajouter une valeur par défaut ici, basée sur les données du membre à modifier
                        />
                        <select
                          name="Sexe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          // Ajouter une valeur sélectionnée par défaut
                        >
                          <option value="">Sélectionnez le sexe</option>
                          <option value="Homme">Homme</option>
                          <option value="Femme">Femme</option>
                        </select>

                        <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-md">
                          <span className="text-gray-500 sm:text-sm">+216</span>

                          <PhoneInput
                            placeholder="Entrez le numéro de téléphone"
                            value={phone}
                            onChange={setPhone}
                            className="input-phone"
                          />
                        </div>

                        <input
                          type="date"
                          name="DatedeNaissance"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          // Ajouter une valeur par défaut
                        />
                        <input
                          type="date"
                          name="DateDinscription"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          // Ajouter une valeur par défaut
                        />
                        <select
                          name="TypeDabonnement"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          // Ajouter une valeur sélectionnée par défaut
                        >
                          <option value="">Type d'abonnement</option>
                          <option value="Silver">Silver</option>
                          <option value="Gold">Gold</option>
                          <option value="Platinum">Platinum</option>
                        </select>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={toggleEditModal}
                          >
                            Annuler
                          </button>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Modifier
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
    </>
  );
};

export default GestionDesMembres;
