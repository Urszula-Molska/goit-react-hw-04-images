import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPictures } from '../components/Api/Api.js';

//App Context//
export const ImageFinderContext = createContext();
export const useImageFinderContext = () => useContext(ImageFinderContext);

export const ImageFinderContextProvider = ({ children }) => {
  const [pictures, setPictures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({ show: false, img: '', imgAlt: '' });

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const searchValue = form.elements.searchQuery.value;
    setSearchTerm(searchValue);

    const fetchImages = async (searchTerm, page) => {
      setLoading(true);
      const response = await fetchPictures(searchTerm, page);
      if (response.hits.length === 0) {
        setLoading(false);
        Notify.info(`There is no records that matches:  ${searchValue}  !`);
        setPictures(response.hits);
        setTotalPages(response.totalHits / 12);
      } else {
        setPictures(response.hits);
        setTotalPages(response.totalHits / 12);
        setLoading(false);
        console.log(response.hits.length);
      }
    };
    fetchImages(searchValue, page);
  };

  //LOAD MORE PICTURES
  const loadMorePictures = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const fetchMorePictures = async (searchTerm, nextPage) => {
      const response = await fetchPictures(searchTerm, nextPage);
      setPictures([...pictures, ...response.hits]);
    };

    fetchMorePictures(searchTerm, nextPage);
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
    <ImageFinderContext.Provider
      value={{
        searchTerm,
        pictures,
        isLoading,
        totalPages,
        page,
        modal,
        openModal,
        closeModal,
        handleSubmit,
        loadMorePictures,
        showButton,
      }}
    >
      {children}
    </ImageFinderContext.Provider>
  );
};

ImageFinderContext.Provider.propTypes = {
  searchTerm: PropTypes.string,
  isLoading: PropTypes.bool,
  totalPages: PropTypes.number,
  page: PropTypes.number,
  modal: PropTypes.object,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  handleSubmit: PropTypes.func,
  loadMorePictures: PropTypes.func,
  pictures: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ),
  showButton: PropTypes.bool,
};
