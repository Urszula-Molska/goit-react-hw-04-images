//import { useAppContext } from '../../context/index.js';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ picture, openModal }) => {
  //const { pictures, openModal } = useAppContext();
  //return pictures.map(picture => {
  return (
    <li
      onClick={() => openModal(picture.largeImageURL)}
      data-modal-open
      id={picture.id}
      key={picture.id}
      className={css.imageGalleryItem}
      style={{
        border: 'gainsboro',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '5px',
      }}
    >
      <div className="lightbox" href={picture.largeImageURL}>
        <img
          style={{ objectFit: 'cover' }}
          src={picture.webformatURL}
          alt={picture.tags}
          loading="lazy"
          width="263px"
          height="176px"
          className={css.ImageGalleryItemImage}
        />
      </div>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func,
  pictures: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ),
};
