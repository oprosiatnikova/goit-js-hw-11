import { getImage } from './js/pixabay-api';
import errorIcon from './img/icon.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


export const iziOption = {
  messageColor: '#FAFAFB',
  messageSize: '16px',
  backgroundColor: '#EF4040',
  iconUrl: errorIcon,
  transitionIn: 'bounceInLeft',
  position: 'topRight',
  displayMode: 'replace',
  closeOnClick: true,
};

document.querySelector('.form').addEventListener('submit', event => {
  const input = document.querySelector('.user-input').value.trim();
  const box = document.querySelector('.gallery');
  event.preventDefault();

  if (!input) {
    iziToast.show({
      ...iziOption,
      message: 'Будь ласка, введіть пошуковий запит',
    });
    return;
  }
  box.innerHTML =
    '<p>Зачекайте, зображення завантажується</p><span class="loader"></span>';
  getImage(input);
});