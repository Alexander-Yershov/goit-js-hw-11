import 'simplelightbox/dist/simple-lightbox.min.css';
import './sass/main.scss';

import Events from './js/event-functions';
import getRefs from './js/get-refs';

const refs = getRefs();

refs.formRef.addEventListener('submit', Events.onSubmit);
refs.loadMoreButRef.addEventListener('click', Events.onLoadMoreClick);
