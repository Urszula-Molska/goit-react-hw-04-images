import React, { Component } from 'react';
import { fetchPictures } from './Api/Api.js';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Modal } from './Modal/Modal.jsx';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      isLoading: false,
      showBtn: false,
      isModalOpen: false,
      error: null,
      search_term: '',
      page: 1,
      totalPages: 0,
      per_page: 12,
      idForModal: '',
      imgForModal: '',
      altforModal: '',
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
        const response = await fetchPictures(
          this.state.search_term,
          this.state.page
        );
        this.setState({
          pictures: response.hits,
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
        await fetchPictures(this.state.search_term, this.state.page).then(
          response => {
            this.setState(prevState => ({
              pictures: [...prevState.pictures, ...response.hits],
            }));
          }
        );
      }
    );
  };

  openModal = event => {
    const { pictures } = this.state;
    event.preventDefault();
    console.log(event.currentTarget);
    this.setState({ idForModal: event.currentTarget.id }, () => {
      const picture = pictures.find(
        picture => picture.id.toString() === this.state.idForModal
      );
      console.log(picture, typeof picture);
      console.log(this.state);
      this.setState(
        {
          isModalOpen: true,
          imgForModal: picture.largeImageURL,
          altforModal: picture.tags,
        },
        () => {
          console.log(this.state);
        }
      );
    });
  };

  closeModal = event => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { pictures, search_term } = this.state;

    return (
      <>
        <div className="container">
          <Searchbar handleSubmit={this.handleSubmit} />
        </div>

        {pictures.length > 0 ? (
          <ImageGallery>
            <ImageGalleryItem
              pictures={pictures}
              search_term={search_term}
              openModal={this.openModal}
            />
          </ImageGallery>
        ) : null}

        <Button loadMorePictures={this.loadMorePictures} />
        {this.state.isModalOpen === true && (
          <Modal
            closeModal={this.closeModal}
            largeImage={this.state.imgForModal}
            description={this.state.altforModal}
          />
        )}
      </>
    );
  }
}
