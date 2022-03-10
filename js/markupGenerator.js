import {getLittleOffer} from './offer-util.js';
const data = getLittleOffer(1);

const cardBlock = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content;
data.forEach((offer) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = offer.offer.title;
  card.querySelector('.popup__text--address').textContent = offer.offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.offer.price  } ₽/ночь`;
  if (offer.offer.type === 'palace') {
    card.querySelector('.popup__type').textContent = 'Дворец';
  } else if (offer.offer.type === 'flat') {
    card.querySelector('.popup__type').textContent = 'Квартира';
  } else if (offer.offer.type === 'house') {
    card.querySelector('.popup__type').textContent = 'Дом';
  } else if (offer.offer.type === 'bungalow') {
    card.querySelector('.popup__type').textContent = 'Бунгало';
  } else if (offer.offer.type === 'hotel') {
    card.querySelector('.popup__type').textContent = 'Отель';
  }
  card.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms  } комнаты для ${offer.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  card.querySelector('.popup__features').textContent = offer.offer.features.join(', ');
  card.querySelector('.popup__description').textContent = offer.offer.description;
  {
    const photoGallery = card.querySelector('.popup__photos');
    let element;
    for (element in offer.offer.photos) {
      const photo = photoGallery.children[0].cloneNode(true);
      photo.src = offer.offer.photos[element];
      photoGallery.appendChild(photo);
    }
    photoGallery.children[0].remove();
  }
  card.querySelector('.popup__avatar').src = offer.author.avatar;
  cardBlock.appendChild(card);
});


