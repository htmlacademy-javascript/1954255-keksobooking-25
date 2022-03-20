import { pageActivator } from './formHandler.js';
import { offerData, popupDomGenerator } from './markupGenerator.js';
const tokyoCentreLat = 35.6895;
const tokyoCentreLng = 139.692;
const addresLine = document.querySelector('#address');
addresLine.value = `${tokyoCentreLat  }, ${  tokyoCentreLng}`;

const map = L.map('map-canvas')
  .on('load', () => {
    pageActivator();
  })
  .setView({
    lat: tokyoCentreLat,
    lng: tokyoCentreLng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const secondaryPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// const contenter = '<article class="popup">\n' +
//   '      \n' +
//   '      <h3 class="popup__title">У нас бесплатные завтраки!</h3>\n' +
//   '      <p class="popup__text popup__text--address">35.67003,139.75772</p>\n' +
//   '      <p class="popup__text popup__text--price">80231 ₽/ночь</p>\n' +
//   '      <h4 class="popup__type">Бунгало</h4>\n' +
//   '      <p class="popup__text popup__text--capacity">10 комнаты для 82 гостей</p>\n' +
//   '      <p class="popup__text popup__text--time">12:00, выезд до 12:00</p>\n' +
//   '      <ul class="popup__features">conditioner, parking, wifi, elevator, washer, dishwasher</ul>\n' +
//   '      <p class="popup__description">Красивые стены, очень много места!</p>\n' +
//   '      <div class="popup__photos">\n' +
//   '        \n' +
//   '      <img src="https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg" class="popup__photo" width="45" height="40" alt="Фотография жилья"><img src="https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg" class="popup__photo" width="45" height="40" alt="Фотография жилья"></div>\n' +
//   '    </article>';

const marker = L.marker(
  {
    lat: tokyoCentreLat,
    lng: tokyoCentreLng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);
marker.addTo(map);

marker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  const latInt = String(latLng.lat).indexOf('.');
  const lngInt = String(latLng.lng).indexOf('.');
  const lat = String(latLng.lat).substring(0, latInt + 6);
  const lng = String(latLng.lng).substring(0, lngInt + 6);
  addresLine.value = `${lat  }, ${  lng}`;
});

for (let i = 0; i < offerData.length; i++) {
  const offerLocation = {
    lat: offerData[i].location.lat,
    lng: offerData[i].location.lng
  };
  const {lat, lng} = offerLocation;
  const html = popupDomGenerator(offerData[i]);
  const points = L.marker(
    {
      lat,
      lng,
    },
    {
      secondaryPinIcon,
    },
  );
  {
    points
      .bindPopup(html)
      .addTo(map);
  }
}
