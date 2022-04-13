import { findEmptyField, getOfferTypeTranslate } from './markupGeneratorFunctions.js';

const cardTemplate = document.querySelector('#card').content;
const popupDomGenerator = (offerElement) => {
  const card = cardTemplate.cloneNode(true);
  if (offerElement.offer.title) {
    card.querySelector('.popup__title').textContent = offerElement.offer.title;
  }
  if (offerElement.offer.address) {
    card.querySelector('.popup__text--address').textContent = offerElement.offer.address;
  }
  if (offerElement.offer.price) {
    card.querySelector('.popup__text--price').textContent = `${offerElement.offer.price} ₽/ночь`;
  }
  if (offerElement.offer.type) {
    card.querySelector('.popup__type').textContent = getOfferTypeTranslate(offerElement.offer.type);
  }
  if (offerElement.offer.rooms && offerElement.offer.guests) {
    card.querySelector('.popup__text--capacity').textContent = `${offerElement.offer.rooms} комнаты для ${offerElement.offer.guests} гостей`;
  }
  if (offerElement.offer.checkin && offerElement.offer.checkout) {
    card.querySelector('.popup__text--time').textContent = `${offerElement.offer.checkin}, выезд до ${offerElement.offer.checkout}`;
  }
  if (offerElement.offer.features) {
    card.querySelector('.popup__features').textContent = offerElement.offer.features.join(', ');
  }
  {
    const photoGallery = card.querySelector('.popup__photos');
    let element;
    for (element in offerElement.offer.photos) {
      const photo = photoGallery.children[0].cloneNode(true);
      photo.src = offerElement.offer.photos[element];
      photoGallery.appendChild(photo);
    }
  }
  card.querySelector('.popup__avatar').src = offerElement.author.avatar;
  findEmptyField(card.querySelector('.popup'));
  return card;
};

export { popupDomGenerator};

