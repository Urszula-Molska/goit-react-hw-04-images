import { useAppContext } from '../../context/index.js';
import { GalleryContext } from '../../context/index.js';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
export const ImageGallery = ({ children }) => {
  const { pictures, openModal } = useAppContext();

  return (
    <ul className={css.imageGallery}>
      <GalleryContext.Provider value={{ openModal, pictures }}>
        {children}
      </GalleryContext.Provider>
    </ul>
  );
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};
