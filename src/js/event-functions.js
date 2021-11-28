import { Notify } from 'notiflix';
import ApiGetImages from './api-get-gallery';
import Utils from './utils';
import getRefs from './get-refs';

const apiGetImages = new ApiGetImages();
const refs = getRefs();

//event on click search button

function onSubmit(e) {
  e.preventDefault();
  apiGetImages.resetPage();
  refs.loadMoreButRef.setAttribute('hidden', 'true');
  refs.galleryRef.innerHTML = '';
  apiGetImages.query = refs.formRef.elements.searchQuery.value.trim();
  refs.formRef.elements.searchQuery.value = apiGetImages.query;

  if (apiGetImages.apiQuery === '') {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  apiGetImages.getImages().then(images => {
    Utils.renderMarkup(images);
    apiGetImages.incrementPage();

    if (images.hits.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      refs.loadMoreButRef.setAttribute('hidden', 'true');
      return;
    }

    Notify.success(`Hooray! We found ${images.totalHits} images.`);

    Utils.createLightBox();

    if (apiGetImages.page > Math.ceil(images.totalHits / apiGetImages.perPage)) {
      refs.loadMoreButRef.setAttribute('hidden', 'true');
      Notify.info(`We're sorry, but you've reached the end of search results.`);
    } else {
      refs.loadMoreButRef.removeAttribute('hidden');
    }

    Utils.smoothScroll();
  });
}

//event on click Load-more button

function onLoadMoreClick() {
  apiGetImages.getImages().then(images => {
    Utils.renderMarkup(images);
    Utils.createLightBox();
    apiGetImages.incrementPage();

    if (apiGetImages.page > Math.ceil(images.totalHits / apiGetImages.perPage)) {
      refs.loadMoreButRef.setAttribute('hidden', 'true');
      Notify.info(`We're sorry, but you've reached the end of search results.`);
    }

    Utils.smoothScroll();
  });
}

//default export

export default { onSubmit, onLoadMoreClick };
