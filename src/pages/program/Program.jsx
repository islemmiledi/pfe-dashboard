import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ajoutProgram,
  getAllProgram,
  deleteProgram,
  updateProgram,
  getAllProgramsByUser,
} from "../../api/actions/program.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { getfindOneWithId } from "../../api/actions/gerant.actions";

const Program = () => {
  const dispatch = useDispatch();

  const datauser = useSelector(
    (state) => state?.gerant?.current?.data?.salle?.id
  );
  const salleId = datauser;
  const programsalle = useSelector(
    (state) => state?.Program?.programsuser?.data
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const [itemToDelete, setItemToDelete] = useState(null);

  const [program, setProgram] = useState({
    title: "",
    description: "",
    file: "",
    salle: salleId,
  });

  const [updateprogram, setUpdateProgram] = useState({
    title: "",
    description: "",
    file: "",
  });

  const handleImageChange = (e) => {
    setProgram({ ...program, file: e.target.files[0] });
  };
  const handleImageUpdateChange = (e) => {
    setSelectedItem({ ...selectedItem, file: e.target.files[0] });
  };

  useEffect(() => {
    if (salleId) {
      setProgram({ ...program, salle: salleId });
    }
    dispatch(getAllProgramsByUser());
  }, [dispatch, datauser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("id", program.id);
    myForm.set("title", program.title);
    myForm.set("description", program.description);
    myForm.set("file", program.file);
    myForm.set("salle", program.salle);

    dispatch(ajoutProgram(myForm)).then(() => {
      dispatch(getAllProgramsByUser());
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
  const handleEditClick = (item) => {
    // Assurez-vous que l'objet est copié proprement.
    setSelectedItem({ ...item });
    toggleEditModal();
  };

  const handleEdit = () => {
    // console.log({ selectedItem });

    dispatch(updateProgram({ id: selectedItem.id, selectedItem })).then(() => {
      dispatch(getAllProgramsByUser()); // C'est une bonne pratique de recharger les données
      setEditModalOpen(false); // Fermer le modal d'édition ici
    });
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteProgram(itemToDelete)).then(() => {
        dispatch(getAllProgram()); // Recharger les données après suppression
        toggleDeleteModal(); // Fermer le modal après la suppression
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Programme</h1>
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm shadow-md hover:bg-blue-600 transition-all mt-2"
        >
          Ajouter
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                title
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>
              <th scope="col" className="px-6 py-3">
                image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {programsalle &&
              programsalle.map((program) => (
                <tr key={program.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{program.id}</td>
                  <td className="px-6 py-4">{program.title}</td>
                  <td className="px-6 py-4">{program.description}</td>
                  <td className="px-6 py-4">
                    <img
                      src={program.file}
                      alt={program.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-start space-x-3">
                      <button onClick={() => handleEditClick(program)}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                          alt="Edit"
                          className="w-6 h-6"
                        />
                      </button>
                      <button onClick={() => handleDeleteClick(program.id)}>
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
                            Ajouter Nouveau Programme
                          </h3>
                          <div className="mt-2">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                              <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                onChange={(e) =>
                                  setProgram({
                                    ...program,
                                    title: e.target.value,
                                  })
                                }
                              />
                              <textarea
                                name="description"
                                placeholder="Description"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                onChange={(e) =>
                                  setProgram({
                                    ...program,
                                    description: e.target.value,
                                  })
                                }
                              />
                              <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={handleImageChange}
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
                                placeholder="title "
                                value={selectedItem.title}
                                onChange={(e) =>
                                  setSelectedItem({
                                    ...selectedItem,
                                    title: e.target.value,
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

                              <textarea
                                placeholder="description"
                                value={selectedItem.description}
                                onChange={(e) =>
                                  setSelectedItem({
                                    ...selectedItem,
                                    description: e.target.value,
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
                        Supprimer Programm
                      </h3>

                      <div className="mt-4 mb-6">
                        <p className="text-base font-light text-gray-700 tracking-wide">
                          Êtes-vous sûr de vouloir supprimer ce Programme ?
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Program;
