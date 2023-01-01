import React, { Component } from 'react';
import { fetchPictures } from './Api/Api.js';
import { Gallery } from './Gallery/Gallery.jsx';
import { Modal } from './Modal/Modal.jsx';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      isLoading: false,
      error: null,
      search_term: 'cats',
      page: 1,
      totalPages: 0,
      per_page: 12,
      idForModal: 0,
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
        this.setState(
          {
            pictures: response.hits,
            totalPages: response.totalHits / this.state.per_page,
          },
          () => {
            console.log(this.state);
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
        const response = await fetchPictures(
          this.state.search_term,
          this.state.page
        );
        this.setState(
          {
            pictures: response.hits,
            totalPages: response.totalHits / this.state.per_page,
          },
          () => {
            console.log(this.state);
          }
        );
      }
    );
  };

  getIdForModal = event => {
    event.preventDefault();
    console.log(event.currentTarget);
    const { id } = event.currentTarget;
    this.setState({ idForModal: id });
    console.log(id);
  };

  modal = id => {
    const { pictures } = this.state;
    //trzeba wyfiltrować tablicę żeby był tylko obiekt z danym id i najlepiej włożyć to do funkcji get IdForModal
    const modal = {
      largeimage: pictures.largeImageURL,
      description: pictures.tags,
    };
    console.log({ modal });
    return { modal };
  };

  render() {
    const { pictures, search_term } = this.state;
    const { idForModal } = this.state;

    return (
      <>
        <div className="container">
          <form
            onSubmit={this.handleSubmit}
            className="search-form"
            id="search-form"
          >
            <input
              type="text"
              name="searchQuery"
              autoComplete="off"
              placeholder="Search images..."
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div>
          {pictures.length > 0 ? (
            <Gallery
              pictures={pictures}
              search_term={search_term}
              openModal={this.getIdForModal}
            />
          ) : null}
        </div>
        <div className="button-container is-hidden">
          <button
            onClick={this.loadMorePictures}
            type="button"
            className="load-more"
          >
            Load more
          </button>
        </div>
        <Modal />
      </>
    );
  }
}
