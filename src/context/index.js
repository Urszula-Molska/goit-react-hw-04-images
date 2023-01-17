import { createContext, useContext, useState } from 'react';
import { fetchPictures } from '../components/Api/Api.js';

//Gallery context//
export const GalleryContext = createContext();
export const useGalleryContext = () => useContext(GalleryContext);
//End of Gallery context//

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [pictures, setPictures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [modal, setModal] = useState({ show: false, img: '', imgAlt: '' });

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const searchValue = form.elements.searchQuery.value;
    setSearchTerm(searchValue);

    const fetchImages = async (searchTerm, page, perPage) => {
      setPerPage(12);
      setLoading(true);
      const response = await fetchPictures(searchTerm, page, perPage);
      setPictures(response.hits);
      setTotalPages(response.totalHits / perPage);
      setLoading(false);
    };
    fetchImages(searchValue, page, perPage);
  };

  //LOAD MORE PICTURES
  const loadMorePictures = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const fetchMorePictures = async (searchTerm, nextPage, perPage) => {
      const response = await fetchPictures(searchTerm, nextPage, perPage);
      setPictures([...pictures, ...response.hits]);
    };

    fetchMorePictures(searchTerm, nextPage, perPage);
  };

  const openModal = largeImageURL => {
    const picture = pictures.find(
      picture => picture.largeImageURL === largeImageURL
    );

    setModal({
      show: true,
      img: picture.largeImageURL,
      imgAlt: picture.tags,
    });
  };

  const closeModal = () => {
    setModal({ show: false });
  };

  const showButton = totalPages > page;

  return (
    <AppContext.Provider
      value={{
        searchTerm,
        pictures,
        isLoading,
        totalPages,
        page,
        perPage,
        modal,
        openModal,
        closeModal,
        handleSubmit,
        loadMorePictures,
        showButton,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
