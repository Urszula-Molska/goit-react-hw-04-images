import { useAppContext } from '../../context/index.js';
import { GalleryContext } from '../../context/index.js';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
export const ImageGallery = () => {
  const { pictures, openModal } = useAppContext();

  return (
    <ul className={css.imageGallery}>
      <GalleryContext.Provider value={{ pictures, openModal }}>
        {pictures.map(picture => (
          <ImageGalleryItem
            key={picture.id}
            picture={picture}
            openModal={openModal}
          />
        ))}
      </GalleryContext.Provider>
    </ul>
  );
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};
