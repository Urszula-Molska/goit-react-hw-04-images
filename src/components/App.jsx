import { useState, useEffect } from 'react';
import { fetchPictures } from './Api/Api.js';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Modal } from './Modal/Modal.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Section } from './Section/Section.jsx';

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
      setLoading(true);
      await fetchPictures(searchTerm, page, perPage).then(response => {
        setPictures(response.hits);
        setTotalPages(response.totalHits / perPage);
      });
      setLoading(false);
    };

    fetchImages(searchValue, page, perPage);
  };

  /*useEffect(() => {
      if (search_term.length === '') {
        return;
      }
      fetchImages(search_term, page, per_page);
    }, []);
  };*/

  //LOAD MORE PICTURES
  const loadMorePictures = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const fetchMorePictures = async (searchTerm, nextPage, perPage) => {
      await fetchPictures(searchTerm, nextPage, perPage).then(response => {
        setPictures([...pictures, ...response.hits]);
      });
    };
    fetchMorePictures(searchTerm, nextPage, perPage);
    console.log(pictures, page, searchTerm);
  };

  const openModal = event => {
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
  };

  const closeModal = event => {
    setModal({ show: false });
  };

  const showButton = totalPages > page;

  return (
    <>
      <Section>
        <a href="https://urszula-molska.github.io/goit-react-hw-04-image-finder/">
          https://urszula-molska.github.io/goit-react-hw-04-image-finder
        </a>
        <a href="https://github.com/Urszula-Molska/goit-react-hw-04-image-finder">
          https://github.com/Urszula-Molska/goit-react-hw-04-image-finder
        </a>
      </Section>
      <div className="container">
        <Searchbar handleSubmit={handleSubmit} />
      </div>
      {isLoading === false ? (
        <ImageGallery>
          <ImageGalleryItem
            pictures={pictures}
            searchTerm={searchTerm}
            openModal={openModal}
          />
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
    </>
  );
};
