import { fetchImages } from './pixabay-api';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
let lightbox;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.target.query.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Помилка',
      message: 'Введіть ключове слово для пошуку.',
    });
    return;
  }

  try {
    const data = await fetchImages(query);

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Нічого не знайдено',
        message: 'Спробуйте інше ключове слово.',
      });
      gallery.innerHTML = '';
      return;
    }

    renderGallery(data.hits);
    iziToast.success({
      title: 'Успіх',
      message: `Знайдено ${data.totalHits} зображень.`,
    });

    if (lightbox) {
      lightbox.destroy();
    }
    lightbox = new SimpleLightbox('.gallery a');
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Сталася помилка під час завантаження зображень.',
    });
  }
});

function renderGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags }) => `
      <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
    `
    )
    .join('');
  gallery.innerHTML = markup;
}