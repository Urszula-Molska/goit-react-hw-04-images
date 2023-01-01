import React, { Component } from 'react';
import axios from 'axios';
import { fetchPictures } from './Api/Api.jsx';
import { Gallery } from './Gallery/Gallery.jsx';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      isLoading: false,
      error: null,
      search_term: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { search_term } = this.state;
    const form = event.target;
    this.setState(
      {
        search_term: form.elements.searchQuery.value,
      },
      () => {
        console.log(this.state.search_term);
      }
    );
  };

  /*async fetchPictures() {
    let params = new URLSearchParams({
      key: '30974723-e837a19c04863567111943fb7',
      //search_term: this.state.search_term,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: per_page,
      page: page,
    });
    const URL = `https://pixabay.com/api/?${params}&q=${this.state.search_term}`;
    try {
      const response = await axios.get(`${URL}`);
      this.setState({ pictures: response.data.hits }, () => {
        console.log(this.state);
      });
    } catch (error) {
      console.error(error);
    }
  }*/
  shouldComponentUpdate;

  async componentDidUpdate(prevProps, prevState) {
    const { search_term } = this.state;
    try {
      if (this.state.pictures === prevState.pictures) {
        const response = await fetchPictures(this.state.search_term);
        this.setState({ pictures: response });
      } else {
        return;
      }
    } catch (error) {
      console.error('something went wrong');
    }
  }

  /*searchByTopic = search_term => {
    this.setState({ search_term: search_term }, async () => {
      const response = await fetchPictures(this.state.search_term);
    });
  };*/

  //componentDidMount() {

  /*getImagesBySearchTopic = search_term => {
    const { search_term } = this.state;
  };*/

  render() {
    const { pictures, search_term } = this.state;
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
            <Gallery pictures={pictures} search_term={search_term} />
          ) : null}
        </div>
        <div className="button-container is-hidden">
          <button type="button" className="load-more">
            Load more
          </button>
        </div>
      </>
    );
  }
}
