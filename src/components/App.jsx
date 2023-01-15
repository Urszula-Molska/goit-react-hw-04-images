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
  const [search_term, setSearch_term] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(12);
  const [modal, setModal] = useState({ show: false, img: '', imgAlt: '' });

  const handleSubmit = event => {
    event.preventDefault();
    setPage(1);
    const form = event.target;
    const search_value = form.elements.searchQuery.value;
    setSearch_term(search_value);
  };

  const fetchImages = async (search_term, page, per_page) => {
    setLoading(true);
    await fetchPictures(search_term, page, per_page).then(response => {
      setPictures(response.hits);
      setTotalPages(response.totalHits / per_page);
    });
    setLoading(false);
  };

  /* useEffect(() => {
    if (search_term.length === '') {
      return;
    }
    fetchImages(search_term, page, per_page);
  }, [search_term]);*/

  //LOAD MORE PICTURES
  const loadMorePictures = () => {
    setPage(page + 1);

    const fetchMorePictures = async (search_term, page, per_page) => {
      await fetchPictures(search_term, page, per_page).then(response => {
        setPictures([...pictures, ...response.hits]);
      });
    };
    fetchMorePictures(search_term, page, per_page);
    console.log(pictures, page, search_term);
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
            search_term={search_term}
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
