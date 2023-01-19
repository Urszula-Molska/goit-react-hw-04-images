import { useImageFinderContext } from '../../Context/ImageFinderContext.jsx';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
export const ImageGallery = () => {
  const { pictures, openModal } = useImageFinderContext();

  return (
    <ul className={css.imageGallery}>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          picture={picture}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};
