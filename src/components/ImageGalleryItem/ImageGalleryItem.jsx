import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ pictures, openModal }) => {
  return pictures.map(picture => {
    return (
      <li
        onClick={openModal}
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
        <a className="lightbox" href={picture.largeImageURL}>
          <img
            style={{ objectFit: 'cover' }}
            src={picture.webformatURL}
            alt={picture.tags}
            loading="lazy"
            width="263px"
            height="176px"
            className={css.ImageGalleryItemImage}
          />
        </a>
      </li>
    );
  });
};
ImageGalleryItem.propTypes = {
  pictures: PropTypes.node,
  openModal: PropTypes.func,
};
