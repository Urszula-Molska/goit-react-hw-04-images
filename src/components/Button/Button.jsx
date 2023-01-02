//import css from './Button.module.css';

export const Button = ({ loadMorePictures }) => {
  return (
    <div className="button-container is-hidden">
      <button onClick={loadMorePictures} type="button" className="load-more">
        Load more
      </button>
    </div>
  );
};
