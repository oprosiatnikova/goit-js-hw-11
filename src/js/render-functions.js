
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const apiKey = 'YOUR_PIXABAY_API_KEY';

form.addEventListener('submit', async(e)) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value.trim();

    if (!query) {
        iziToast.error({
            title: 'Помилка',
            message: 'Будь ласка, введіть пошукове слово.',
        });
        return;
    }
}

  // Показуємо індикатор завантаження
  iziToast.info({
    title: 'Завантаження',
    message: 'Пошук зображень...',
    timeout: 1000,
  });

    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: apiKey,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            },
        });
    }

    const images = response.data.hits;

    // Очищуємо попередні результати
    gallery.innerHTML = '';

    if (images.length === 0) {
      iziToast.warning({
        title: 'Нічого не знайдено',
        message: 'Спробуйте ввести інше пошукове слово.',
      });
      return;
    }

    // Створюємо розмітку для зображень
    const markup = images
      .map(
        (image)) => `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p><b>Likes:</b> ${image.likes}</p>
          <p><b>Views:</b> ${image.views}</p>
          <p><b>Comments:</b> ${image.comments}</p>
          <p><b>Downloads:</b> ${image.download}