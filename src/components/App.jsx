import React, { Component } from 'react';
import { fetchPictures } from './Api/Api.js';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Modal } from './Modal/Modal.jsx';
import { Loader } from './Loader/Loader.js';
import { Section } from './Section/Section.jsx';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      isLoading: false,
      isModalOpen: false,
      showBtn: false,
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
        this.setState({
          isLoading: true,
          showBtn: false,
        });
        const response = await fetchPictures(
          this.state.search_term,
          this.state.page,
          this.state.per_page
        );
        //console.log(response.totalHits);
        this.setState(
          {
            pictures: response.hits,
            isLoading: false,
            totalPages: response.totalHits / this.state.per_page,
          },
          () => {
            if (this.state.totalPages > this.state.page) {
              this.setState({ showBtn: true });
            } else {
              this.setState({ showBtn: false });
            }
          }
        );
      }
    );
  };

  loadMorePictures = () => {
    this.setState(
      prevState => {
        return { page: prevState.page + 1 };
      },
      async () => {
        this.setState({
          isLoading: true,
          showBtn: false,
        });
        await fetchPictures(
          this.state.search_term,
          this.state.page,
          this.state.per_page
        ).then(response => {
          this.setState(
            prevState => ({
              pictures: [...prevState.pictures, ...response.hits],
              isLoading: false,
            }),
            () => {
              if (this.state.totalPages > this.state.page) {
                this.setState({ showBtn: true });
              } else {
                this.setState({ showBtn: false });
              }
            }
          );
        });
      }
    );
  };

  openModal = event => {
    const { pictures } = this.state;
    event.preventDefault();
    //console.log(event.currentTarget);
    this.setState({ idForModal: event.currentTarget.id }, () => {
      const picture = pictures.find(
        picture => picture.id.toString() === this.state.idForModal
      );
      //console.log(picture, typeof picture);
      //console.log(this.state);
      this.setState({
        isModalOpen: true,
        imgForModal: picture.largeImageURL,
        altforModal: picture.tags,
      });
    });
  };

  closeModal = event => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      pictures,
      search_term,
      imgForModal,
      altForModal,
      isLoading,
      isModalOpen,
      showBtn,
    } = this.state;

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

        {showBtn && <Button loadMorePictures={this.loadMorePictures} />}
        {isModalOpen && (
          <Modal
            closeModal={this.closeModal}
            largeImage={imgForModal}
            description={altForModal}
          />
        )}
      </>
    );
  }
}
