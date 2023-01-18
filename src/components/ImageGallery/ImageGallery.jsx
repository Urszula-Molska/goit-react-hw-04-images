import { useImageFinderContext } from '../../ImageFinderContext/ImageFinderContext.js';
import { ImageFinderContext } from '../../ImageFinderContext/ImageFinderContext.js';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
export const ImageGallery = () => {
  const { pictures, openModal } = useImageFinderContext();

  return (
    <ul className={css.imageGallery}>
      <ImageFinderContext.Provider value={{ pictures, openModal }}>
        {pictures.map(picture => (
          <ImageGalleryItem
            key={picture.id}
            picture={picture}
            openModal={openModal}
          />
        ))}
      </ImageFinderContext.Provider>
    </ul>
  );
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};
