import { pageActivator } from './formHandler.js';
import { popupDomGenerator } from './markupGenerator.js';

const maxPinCount = 10;
const tokyoCentreLat = 35.68963;
const tokyoCentreLng = 139.69234;
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

const pinArray = [];
const addPinToMap = (offerArray) => {
  const insertPinToMap = (similarArray) => {
    for (let i = 0; i < pinArray.length; i++) {
      map.removeLayer(pinArray[i]);
    }
    for (let i = 0; i < similarArray.length; i++) {
      const offerLocation = {
        lat: similarArray[i].location.lat,
        lng: similarArray[i].location.lng
      };
      const {lat, lng} = offerLocation;
      const html = popupDomGenerator(similarArray[i]);

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
      pinArray.push(points);
    }
  };

  if (offerArray.length > maxPinCount) {
    insertPinToMap(offerArray.slice(0, maxPinCount));
  } else { insertPinToMap(offerArray); }
};

export { addPinToMap };