import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ loadMorePictures }) => {
  return (
    <div className={css.btnSection}>
      <button onClick={loadMorePictures} type="button" className={css.button}>
        Load more
      </button>
    </div>
  );
};
Button.propTypes = {
  loadMorePictures: PropTypes.func,
};
