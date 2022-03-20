import { getLittleOffer } from './offer-util.js';
import { findEmptyField, getOfferTypeTranslate } from './markupGeneratorFunctions.js';
const offerData = getLittleOffer(10);

const cardTemplate = document.querySelector('#card').content;
const popupDomGenerator = (offerElement) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = offerElement.offer.title;
  card.querySelector('.popup__text--address').textContent = offerElement.offer.address;
  card.querySelector('.popup__text--price').textContent = `${offerElement.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = getOfferTypeTranslate(offerElement.offer.type);
  card.querySelector('.popup__text--capacity').textContent = `${offerElement.offer.rooms} комнаты для ${offerElement.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `${offerElement.offer.checkin}, выезд до ${offerElement.offer.checkout}`;
  card.querySelector('.popup__features').textContent = offerElement.offer.features.join(', ');
  card.querySelector('.popup__description').textContent = offerElement.offer.description;
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

export { offerData, popupDomGenerator};

