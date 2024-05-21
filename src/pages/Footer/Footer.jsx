import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import {
  getAllFooter,
  updateFooter,
  deleteFooter,
  getAllFootersByUser,
} from "../../api/actions/footer.actions";

const Footer = () => {
  const dispatch = useDispatch();
  // const { data } = useSelector((state) => state.footer.footers);
  const datauser = useSelector(
    (state) => state?.gerant?.current?.data?.salle?.id
  );
  const salleId = datauser;
  const footersalle = useSelector((state) => state?.footer?.footersuser?.data);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  const [footer, setFooter] = useState({
    Adresse: "",
    NumerodeTelephone: "",
    TempsDeTravail: "",
    salle: salleId,
  });

  const { Adresse, NumerodeTelephone, TempsDeTravail, salle } = footer;

  useEffect(() => {
    if (salleId) {
      setFooter({ ...footer, salle: salleId });
    }
    dispatch(getAllFootersByUser());
  }, [dispatch, datauser]);

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    toggleEditModal();
  };
  const handleEdit = () => {
    console.log(selectedItem);

    dispatch(updateFooter({ id: selectedItem.id, selectedItem })).then(() => {
      dispatch(getAllFooter()); // C'est une bonne pratique de recharger les données
      setEditModalOpen(false); // Fermer le modal d'édition ici
    });
  };
  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId); // Marquer l'ID pour suppression
    toggleDeleteModal(); // Ouvrir le modal pour demander confirmation
  };
  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteFooter(itemToDelete)).then(() => {
        dispatch(getAllFooter()); // Recharger les données après suppression
        toggleDeleteModal(); // Fermer le modal après la suppression
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Footer</h1>
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
                id
              </th>
              <th scope="col" className="px-6 py-3">
                Adresse
              </th>
              <th scope="col" className="px-6 py-3">
                Numero de Telephone
              </th>
              <th scope="col" className="px-6 py-3">
                Temps De Travail
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {footersalle &&
              footersalle.map((footer) => (
                <tr key={footer.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{footer.id}</td>
                  <td className="px-6 py-4">{footer.Adresse}</td>
                  <td className="px-6 py-4">{footer.NumerodeTelephone}</td>
                  <td className="px-6 py-4">{footer.TempsDeTravail}</td>
                  <td className="px-6 py-4">
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-start space-x-3">
                        <button onClick={() => handleEditClick(footer)}>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                            alt="Edit"
                            className="w-6 h-6"
                          />
                        </button>
                        <button onClick={() => handleDeleteClick(footer.id)}>
                          {" "}
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png"
                            alt="Delete"
                            className="w-6 h-6"
                          />
                        </button>
                      </div>
                    </td>
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
                      Modifier Footer
                    </h3>
                    <div className="mt-2">
                      {/* Formulaire de modification */}
                      <form className="space-y-4">
                        <input
                          type="text"
                          placeholder="Adresse "
                          value={selectedItem.Adresse}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              Adresse: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="NumerodeTelephone"
                          value={selectedItem.NumerodeTelephone}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              NumerodeTelephone: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <textarea
                          placeholder="TempsDeTravail"
                          value={selectedItem.TempsDeTravail}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              TempsDeTravail: e.target.value,
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
                  Supprimer footer
                </h3>

                <div className="mt-4 mb-6">
                  <p className="text-base font-light text-gray-700 tracking-wide">
                    Êtes-vous sûr de vouloir supprimer ce footer ?
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
export default Footer;
