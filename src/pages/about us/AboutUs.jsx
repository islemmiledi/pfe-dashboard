import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  ajoutAboutUs,
  getAllAboutUs,
  updateAboutUs,
  deleteAboutUs,
  getAllAboutUssByUser,
} from "../../api/actions/aboutus.actions";

const AboutUs = () => {
  const dispatch = useDispatch();
  // const { data } = useSelector((state) => state.aboutus.aboutuss);
  const datauser = useSelector(
    (state) => state?.gerant?.current?.data?.salle?.id
  );
  const salleId = datauser;
  const aboutussalle = useSelector(
    (state) => state?.aboutus?.aboutussuser?.data
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [selectedItem, setSelectedItem] = useState({});

  const [aboutus, setAboutUs] = useState({
    communityHighlight: "",
    valueProposition: "",
    file: "",
    salle: salleId,
  });

  const { communityHighlight, valueProposition, file, salle } = aboutus;

  useEffect(() => {
    if (salleId) {
      setAboutUs({ ...aboutus, salle: salleId });
    }
    dispatch(getAllAboutUssByUser());
  }, [dispatch, datauser]);

  const handleImageChange = (e) => {
    setAboutUs({ ...aboutus, file: e.target.files[0] });
  };
  const handleImageUpdateChange = (e) => {
    setSelectedItem({ ...selectedItem, file: e.target.files[0] });
  };
  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);
  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    // myForm.set("sectionTitle", aboutus.sectionTitle);
    // myForm.set("introTitle", aboutus.introTitle);
    // myForm.set("introDescription", aboutus.introDescription);
    myForm.set("communityHighlight", aboutus.communityHighlight);
    myForm.set("valueProposition", aboutus.valueProposition);
    myForm.set("file", aboutus.file);
    myForm.set("salle", aboutus.salle);

    dispatch(ajoutAboutUs(myForm)).then(() => {
      dispatch(getAllAboutUssByUser());
    });

    setModalOpen(!isModalOpen);
  };
  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId); // Marquer l'ID pour suppression
    toggleDeleteModal(); // Ouvrir le modal pour demander confirmation
  };
  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteAboutUs(itemToDelete)).then(() => {
        dispatch(getAllAboutUs()); // Recharger les données après suppression
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

    dispatch(updateAboutUs({ id: selectedItem.id, selectedItem })).then(() => {
      dispatch(getAllAboutUssByUser()); // C'est une bonne pratique de recharger les données
      setEditModalOpen(false); // Fermer le modal d'édition ici
    });
  };

  return (
    <>
      <div className="flex justify-between items-center sm:px-6 md:px-0 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">About Us</h1>
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
              {/* <th scope="col" className="px-6 py-3">
                Section Title
              </th>
              <th scope="col" className="px-6 py-3">
                Intro Title
              </th>
              <th scope="col" className="px-6 py-3">
                Intro Description
              </th> */}
              <th scope="col" className="px-6 py-3">
                Community Highlight
              </th>
              <th scope="col" className="px-6 py-3">
                Value Proposition
              </th>
              <th scope="col" className="px-6 py-3">
                Images
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {aboutussalle &&
              aboutussalle.map((aboutus) => (
                <tr key={aboutus.id} className="border-b hover:bg-gray-50">
                  {/* <td className="px-6 py-4">{aboutus.sectionTitle}</td>
                  <td className="px-6 py-4">{aboutus.introTitle}</td>
                  <td className="px-6 py-4">{aboutus.introDescription}</td> */}
                  <td className="px-6 py-4">{aboutus.communityHighlight}</td>
                  <td className="px-6 py-4">{aboutus.valueProposition}</td>
                  <td className="px-6 py-4">
                    <img
                      src={aboutus.file}
                      alt={aboutus.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>{" "}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-start space-x-3">
                      <button onClick={() => handleEditClick(aboutus)}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                          alt="Edit"
                          className="w-6 h-6"
                        />
                      </button>
                      <button onClick={() => handleDeleteClick(aboutus.id)}>
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
                  {/* <input
                    type="text"
                    name="sectionTitle"
                    placeholder="Section Title"
                    value={aboutus.sectionTitle}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      setAboutUs({ ...aboutus, sectionTitle: e.target.value })
                    }
                  /> */}
                  {/* <input
                    type="text"
                    name="introTitle"
                    placeholder="Intro Title"
                    value={aboutus.introTitle}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      setAboutUs({ ...aboutus, introTitle: e.target.value })
                    }
                  /> */}
                  {/* <input
                    type="text"
                    name="introDescription"
                    placeholder="Intro Description"
                    value={aboutus.introDescription}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      setAboutUs({
                        ...aboutus,
                        introDescription: e.target.value,
                      })
                    }
                  /> */}
                  <input
                    type="text"
                    name="communityHighlight"
                    placeholder="Community Highlight"
                    // value={aboutus.communityHighlight}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      setAboutUs({
                        ...aboutus,
                        communityHighlight: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    name="valueProposition"
                    placeholder="Value Proposition"
                    // value={aboutus.valueProposition}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      setAboutUs({
                        ...aboutus,
                        valueProposition: e.target.value,
                      })
                    }
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={handleImageChange}
                  />
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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
                      Modifier About Us
                    </h3>
                    <form className="space-y-4">
                      {/* <input
                        type="text"
                        name="sectionTitle"
                        placeholder="Section Title"
                        value={selectedItem.sectionTitle}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            sectionTitle: e.target.value,
                          })
                        }
                      /> */}
                      {/* <input
                        type="text"
                        name="introTitle"
                        placeholder="Intro Title"
                        value={selectedItem.introTitle}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            introTitle: e.target.value,
                          })
                        }
                      /> */}
                      {/* <textarea
                        name="introDescription"
                        placeholder="Intro Description"
                        value={selectedItem.introDescription}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            introDescription: e.target.value,
                          })
                        }
                        rows="3"
                      ></textarea> */}
                      <input
                        type="text"
                        name="communityHighlight"
                        placeholder="Community Highlight"
                        value={selectedItem.communityHighlight}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            communityHighlight: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        name="valueProposition"
                        placeholder="Value Proposition"
                        value={selectedItem.valueProposition}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            valueProposition: e.target.value,
                          })
                        }
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        onChange={handleImageUpdateChange}
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
                  Supprimer aboutus
                </h3>

                <div className="mt-4 mb-6">
                  <p className="text-base font-light text-gray-700 tracking-wide">
                    Êtes-vous sûr de vouloir supprimer cet aboutus ?
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

export default AboutUs;
