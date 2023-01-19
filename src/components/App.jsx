import { useImageFinderContext } from '../Context/ImageFinderContext.jsx';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Modal } from './Modal/Modal.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Section } from './Section/Section.jsx';

export const App = () => {
  const {
    isLoading,
    modal,
    closeModal,
    handleSubmit,
    loadMorePictures,
    showButton,
  } = useImageFinderContext();

  return (
    <>
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
        <ImageGallery />
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
