import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ largeImage, alt, closeModal }) => (
  <div className={css.overlay} onClick={closeModal}>
    <div className={css.modal}>
      <img src={largeImage} alt={alt} />
    </div>
  </div>
);
Modal.propTypes = {
  largeImage: PropTypes.string,
  alt: PropTypes.string,
  closeModal: PropTypes.func,
};
