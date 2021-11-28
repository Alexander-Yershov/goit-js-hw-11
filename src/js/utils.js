import SimpleLightbox from 'simplelightbox';
import getRefs from './get-refs';

const refs = getRefs();
let gallery = null;

// function for create gallery images markup

function renderMarkup({ hits }) {
  const markup = hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
      <a class="gallery__link" href="${largeImageURL}">
        <div class="photo-card">
            <img src="${webformatURL}" width="305" height="205" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${downloads}
              </p>
            </div>
        </div>
        </a>
        `;
    })
    .join('');
  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}

// function for smmoth scrolling

function smoothScroll() {
  const { height: cardHeight } = refs.galleryRef.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 10,
    behavior: 'smooth',
  });
}

function createLightBox() {
  if (!gallery) {
    gallery = new SimpleLightbox('.gallery a', {
      close: false,
    });
  }

  gallery.refresh();
}

//default export

export default { renderMarkup, createLightBox, smoothScroll };
