export const Gallery = ({ pictures, openModal }) => {
  return (
    <ul className="gallery">
      {pictures.map(picture => {
        return (
          <li
            onClick={openModal}
            data-modal-open
            id={picture.id}
            key={picture.id}
            className="photo-card"
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
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
};
