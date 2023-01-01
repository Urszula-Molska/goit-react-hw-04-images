export const Modal = ({ largeImage, description }) => (
  <div className="overlay" data-modal>
    <div className="modal">
      <button
        type="button"
        className="modal-close-btn"
        data-modal-close
      ></button>
      <img src={largeImage} alt={description} />
    </div>
  </div>
);
