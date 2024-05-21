import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import {
  getAllAccueil,
  ajoutAccueil,
  updateAccueil,
  deleteAccueil,
  getAllAccueilsByUser,
} from "../../api/actions/accueil.actions";

const Accueil = () => {
  const dispatch = useDispatch();
  const datauser = useSelector(
    (state) => state?.gerant?.current?.data?.salle?.id
  );
  const salleId = datauser;
  const accueilsalle = useSelector(
    (state) => state?.accueil?.accueilsuser?.data
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [accueil, setAccueil] = useState({
    title: "",
    description: "",
    file: "",

    salle: salleId,
  });

  const { title, description, file, salle } = accueil;

  const handleImageChange = (e) => {
    setAccueil({ ...accueil, file: e.target.files[0] });
  };

  useEffect(() => {
    if (salleId) {
      setAccueil({ ...accueil, salle: salleId });
    }
    dispatch(getAllAccueilsByUser());
  }, [dispatch, salleId]);

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("description", description);
    myForm.set("file", file);

    myForm.set("salle", salle);

    dispatch(ajoutAccueil(myForm)).then(() => {
      dispatch(getAllAccueilsByUser());
    });

    setModalOpen(!isModalOpen);
  };

  const handleEditClick = (footer) => {
    // Assurez-vous que l'objet est copié proprement.
    setSelectedItem({ ...footer });
    toggleEditModal();
  };

  const handleEdit = () => {
    console.log({ selectedItem });

    dispatch(updateAccueil({ id: selectedItem.id, selectedItem })).then(() => {
      dispatch(getAllAccueilsByUser()); // C'est une bonne pratique de recharger les données
      setEditModalOpen(false); // Fermer le modal d'édition ici
    });
  };

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteAccueil(itemToDelete)).then(() => {
        dispatch(getAllAccueil());
        toggleDeleteModal();
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Accueil</h1>
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
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>

              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {accueilsalle &&
              accueilsalle.map((accueil) => (
                <tr key={accueil.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{accueil.title}</td>
                  <td className="px-6 py-4">{accueil.description}</td>
                  <td className="px-6 py-4">
                    <img
                      src={accueil.file}
                      alt={accueil.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button onClick={() => handleEditClick(accueil)}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                          alt="Edit"
                          className="w-6 h-6"
                        />
                      </button>
                      <button onClick={() => handleDeleteClick(accueil.id)}>
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
                      Ajouter Nouveau Accueil
                    </h3>
                    <div className="mt-2">
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <label>
                          <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            onChange={(e) =>
                              setAccueil({ ...accueil, title: e.target.value })
                            }
                          />
                        </label>
                        <textarea
                          placeholder="Description"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            setAccueil({
                              ...accueil,
                              description: e.target.value,
                            })
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
                  Modifier l'accueil
                </h3>
                <form className="space-y-4">
                  <label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={selectedItem.title || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          title: e.target.value,
                        })
                      }
                    />
                  </label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={selectedItem.description || ""}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        description: e.target.value,
                      })
                    }
                    rows="3"
                  ></textarea>
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
                      onClick={handleEdit}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
                  Supprimer accueil
                </h3>
                <div className="mt-4 mb-6">
                  <p className="text-base font-light text-gray-700 tracking-wide">
                    Êtes-vous sûr de vouloir supprimer cet accueil ?
                  </p>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all"
                  onClick={confirmDelete}
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
    </>
  );
};

export default Accueil;
