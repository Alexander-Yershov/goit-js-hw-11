import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '14763371-8ad954d112ffa98330dee37e7';
const IMAGES_PER_PAGE = 40;

axios.defaults.baseURL = BASE_URL;

export default class ApiGetImages {
  constructor() {
    this.key = API_KEY;
    this.apiQuery = '';
    this.page = 1;
    this.perPage = IMAGES_PER_PAGE;
  }

  get query() {
    return this.apiQuery;
  }

  set query(searchQuery) {
    this.apiQuery = searchQuery;
  }

  getOptions() {
    const options = new URLSearchParams({
      key: `${this.key}`,
      q: `${this.apiQuery}`,
      page: `${this.page}`,
      per_page: `${this.perPage}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    return options;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  async getImages() {
    const params = this.getOptions();

    const response = await axios.get(`?${params}`);

    return response.data;
  }
}
