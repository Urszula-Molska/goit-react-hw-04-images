import React, { Component } from 'react';
import { fetchPictures } from './Api/Api.js';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Modal } from './Modal/Modal.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Section } from './Section/Section.jsx';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      isLoading: false,
      search_term: '',
      page: 1,
      totalPages: 0,
      per_page: 12,
      modal: {
        show: false,
        img: '',
        imgAlt: '',
      },
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    this.setState(
      {
        search_term: form.elements.searchQuery.value,
        page: 1,
      },
      async () => {
        this.setState({
          isLoading: true,
        });
        const response = await fetchPictures(
          this.state.search_term,
          this.state.page,
          this.state.per_page
        );
        this.setState({
          pictures: response.hits,
          isLoading: false,
          totalPages: response.totalHits / this.state.per_page,
        });
      }
    );
  };

  loadMorePictures = () => {
    this.setState(
      prevState => {
        return { page: prevState.page + 1 };
      },
      async () => {
        await fetchPictures(
          this.state.search_term,
          this.state.page,
          this.state.per_page
        ).then(response => {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...response.hits],
          }));
        });
      }
    );
  };

  openModal = event => {
    const { pictures } = this.state;
    event.preventDefault();
    const idForModal = event.currentTarget.id;
    const picture = pictures.find(
      picture => picture.id.toString() === idForModal
    );
    this.setState({
      modal: { show: true, img: picture.largeImageURL, imgAlt: picture.tags },
    });
  };

  closeModal = event => {
    this.setState({ modal: { show: false } });
  };

  render() {
    const { pictures, search_term, isLoading, modal } = this.state;
    const showButton = this.state.totalPages > this.state.page;

    return (
      <>
        <Section>
          <a href="https://urszula-molska.github.io/goit-react-hw-03-image-finder/">
            https://urszula-molska.github.io/goit-react-hw-03-image-finder
          </a>
          <a href="https://github.com/Urszula-Molska/goit-react-hw-03-image-finder">
            https://github.com/Urszula-Molska/goit-react-hw-03-image-finder
          </a>
        </Section>
        <div className="container">
          <Searchbar handleSubmit={this.handleSubmit} />
        </div>
        {isLoading === false ? (
          <ImageGallery>
            <ImageGalleryItem
              pictures={pictures}
              search_term={search_term}
              openModal={this.openModal}
            />
          </ImageGallery>
        ) : (
          <div>
            <Loader />
          </div>
        )}
        {showButton && <Button loadMorePictures={this.loadMorePictures} />}
        {modal.show && (
          <Modal
            closeModal={this.closeModal}
            largeImage={modal.img}
            alt={modal.imgAlt}
          />
        )}
      </>
    );
  }
}
