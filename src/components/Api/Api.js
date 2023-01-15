import axios from 'axios';

export const fetchPictures = async (searchTerm, page, perPage) => {
  let params = new URLSearchParams({
    key: '30974723-e837a19c04863567111943fb7',
    searchTerm: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    perPage: perPage,
    page: page,
  });

  const URL = `https://pixabay.com/api/?${params}&q=${searchTerm}`;
  try {
    const response = await axios.get(`${URL}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
