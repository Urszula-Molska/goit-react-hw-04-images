import axios from 'axios';

const per_page = 12;

export const fetchPictures = async (search_term, page, per_page) => {
  let params = new URLSearchParams({
    key: '30974723-e837a19c04863567111943fb7',
    //search_term: this.state.search_term,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: per_page,
    page: page,
  });

  const URL = `https://pixabay.com/api/?${params}&q=${search_term}`;
  try {
    const response = await axios.get(`${URL}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
