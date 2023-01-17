import { useState } from 'react';
import { fetchPictures } from './Api/Api.js';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Modal } from './Modal/Modal.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Section } from './Section/Section.jsx';
import { AppContext } from '../context/index.js';

export const App = () => {
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
    console.log(pictures, page, searchTerm);
  };

  const openModal = largeImageURL => {
    console.log(pictures, page, searchTerm);
    const picture = pictures.find(
      picture => picture.largeImageURL === largeImageURL
    );

    setModal({
      show: true,
      img: picture.largeImageURL,
      imgAlt: picture.tags,
    });
  };

  /* const openModal = event => {
    event.preventDefault();
    const idForModal = event.currentTarget.id;
    const picture = pictures.find(
      picture => picture.id.toString() === idForModal
    );
    setModal({
      show: true,
      img: picture.largeImageURL,
      imgAlt: picture.tags,
    });
  };*/

  const closeModal = () => {
    setModal({ show: false });
  };

  const showButton = totalPages > page;

  return (
    <>
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
        }}
      >
        <Section>
          <a href="https://urszula-molska.github.io/goit-react-hw-04-images/">
            https://urszula-molska.github.io/goit-react-hw-04-images
          </a>
          <a href="https://github.com/Urszula-Molska/goit-react-hw-04-images">
            https://github.com/Urszula-Molska/goit-react-hw-04-images
          </a>
        </Section>
        <div className="container">
          <Searchbar handleSubmit={handleSubmit} />
        </div>
        {isLoading === false ? (
          <ImageGallery>
            <ImageGalleryItem />
          </ImageGallery>
        ) : (
          <div>
            <Loader />
          </div>
        )}
        {showButton && <Button loadMorePictures={loadMorePictures} />}
        {modal.show && (
          <Modal
            closeModal={closeModal}
            largeImage={modal.img}
            alt={modal.imgAlt}
          />
        )}
      </AppContext.Provider>
    </>
  );
};
