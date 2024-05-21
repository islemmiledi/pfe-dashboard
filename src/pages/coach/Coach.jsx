import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCoach,
  ajoutCoach,
  deleteCoach,
  updateCoach,
  getAllCoachsByUser,
} from "../../api/actions/coach.actions";
const Coach = () => {
  const dispatch = useDispatch();
  // const { data } = useSelector((state) => state.coach.coachs);
  const datauser = useSelector(
    (state) => state?.gerant?.current?.data?.salle?.id
  );
  const salleId = datauser;
  const coachsalle = useSelector((state) => state?.coach?.coachsuser?.data);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  const [coach, setCoach] = useState({
    Nom: "",
    Specialite: "",
    Description: "",
    file: "",
    salle: salleId,
  });

  const { Nom, Specialite, Description, file, salle } = coach;

  const handleImageChange = (e) => {
    setCoach({ ...coach, file: e.target.files[0] });
  };
  const handleSelectChange = (e) => {
    setCoach({ ...coach, Specialite: e.target.value });
  };

  useEffect(() => {
    if (salleId) {
      setCoach({ ...coach, salle: salleId });
    }
    dispatch(getAllCoachsByUser());
  }, [dispatch, datauser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("Nom", Nom);
    myForm.set("Specialite", Specialite);
    myForm.set("Description", Description);
    myForm.set("file", file);
    myForm.set("salle", salle);

    dispatch(ajoutCoach(myForm)).then(() => {
      dispatch(getAllCoachsByUser());
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

  const handleEditClick = (footer) => {
    // Assurez-vous que l'objet est copié proprement.
    setSelectedItem({ ...footer });
    toggleEditModal();
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedItem((prev) => ({ ...prev, [name]: value }));
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteCoach(itemToDelete)).then(() => {
        dispatch(getAllCoach()); // Recharger les données après suppression
        toggleDeleteModal(); // Fermer le modal après la suppression
      });
    }
  };

  const handleEdit = () => {
    console.log(selectedItem);

    dispatch(updateCoach({ id: selectedItem.id, selectedItem })).then(() => {
      dispatch(getAllCoach()); // C'est une bonne pratique de recharger les données
      setEditModalOpen(false); // Fermer le modal d'édition ici
    });
  };

  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Coach</h1>
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
                Specialite
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {coachsalle &&
              coachsalle.map((coach) => (
                <tr key={coach.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{coach.Nom}</td>
                  <td className="px-6 py-4">{coach.Specialite}</td>
                  <td className="px-6 py-4">{coach.Description}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-start space-x-3">
                      <button onClick={() => handleEditClick(coach)}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                          alt="Edit"
                          className="w-6 h-6"
                        />
                      </button>
                      <button onClick={() => handleDeleteClick(coach.id)}>
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
                      Ajouter Nouveau Coach
                    </h3>
                    <div className="mt-2">
                      {/* Formulaire d'ajout */}
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Nom"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setCoach({ ...coach, Nom: e.target.value })
                          }
                        />
                        z
                        <select onChange={handleSelectChange}>
                          <option value="select">Select Specialite</option>
                          <option value="cardio_training">
                            Musculation et Conditionnement Physique
                          </option>
                          <option value="cardio_training">
                            Cardio-Training
                          </option>
                          <option value="crossfit">CrossFit</option>
                          <option value="yoga_pilates">Yoga et Pilates</option>
                          <option value="boxing_martial_arts">
                            Boxe et Arts Martiaux
                          </option>
                          <option value="functional_training">
                            Entraînement Fonctionnel
                          </option>
                          <option value="rehabilitation">
                            Spécialiste en Réhabilitation
                          </option>
                          <option value="nutrition_dietetics">
                            Nutrition et Diététique
                          </option>
                          <option value="senior_training">
                            Entraînement pour Seniors
                          </option>
                          <option value="sport_specific_training">
                            Entraînement Sportif Spécifique
                          </option>
                        </select>
                        <textarea
                          placeholder="Description"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setCoach({ ...coach, Description: e.target.value })
                          }
                          rows="3"
                        ></textarea>
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
                  Supprimer Coach
                </h3>

                <div className="mt-4 mb-6">
                  <p className="text-base font-light text-gray-700 tracking-wide">
                    Êtes-vous sûr de vouloir supprimer ce coach ?
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
                      Modifier Coach
                    </h3>
                    <div className="mt-2">
                      {/* Formulaire de modification */}
                      <form className="space-y-4">
                        <input
                          type="text"
                          placeholder="Nom "
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
                          placeholder="Spécialité"
                          value={selectedItem.Specialite}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              Specialite: e.target.value,
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

export default Coach;
