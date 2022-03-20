import {
  titleArray,
  typeMass,
  timeMass,
  featuresMass,
  photoArray,
  maxLongitude,
  minLongitude,
  maxLatitude,
  minLatitude
} from './offer-data.js';

const getRandom = (min ,max, numsAfterDot) => {
  if (min < max) {
    const int = Math.floor(Math.random() * (max - min)) + min;
    if (numsAfterDot > 0) {
      let float = String(Math.random()).substr(1, numsAfterDot + 1);
      while (float.length < numsAfterDot) {
        float += '0';
      }
      return int + float;
    } else {
      return int;
    }
  } else {
    return 'incorrect data';
  }
};

const getAvatar = () => {
  let randomInt = getRandom(1, 10, 0);
  if (String(randomInt).length === 1) {
    randomInt = String(0) + randomInt;
  }
  return `img/avatars/user${randomInt}.png`;
};

const getTitle = () => titleArray[getRandom(0,4,0)];
const getType = () => typeMass[getRandom(0,4,0)];
const getTime = () => timeMass[getRandom(0,2,0)];

const getFeatures = () => {
  const featuresCount = getRandom(0, 6, 0);
  const selectedFeatures = [];

  while (selectedFeatures.length <= featuresCount) {
    const addFeature = featuresMass[getRandom(0,6)];
    if (selectedFeatures.indexOf(addFeature) === -1){
      selectedFeatures.push(addFeature);
    }
  }
  return selectedFeatures;
};

const getPhotos = () => {
  const photoCount = getRandom(0, 3);
  const selectedPhoto = [];
  for (let i = 0; i <= photoCount; i++) {
    selectedPhoto[i] = photoArray[i];
  }
  return selectedPhoto;
};

const getLocation = (type) => {
  if (type === 'lat') {
    return +`35.${getRandom(minLatitude, maxLatitude, 0)}`;
  } else if (type === 'lng') {
    return +`139.${getRandom(minLongitude, maxLongitude, 0)}`;
  }
};


const getOneOffer = () => ({
  author: {avatar: getAvatar()},
  offer: {
    title: getTitle(),
    address: [getLocation('lat'), getLocation('lng')],
    price: getRandom(1, 130000, 0),
    type: getType(),
    rooms: getRandom(1, 15, 0),
    guests: getRandom(1, 120, 0),
    checkin: getTime(),
    checkout: getTime(),
    features: getFeatures(),
    description: 'Красивые стены, очень много места!',
    photos: getPhotos(),
  },
  location: {
    lat: getLocation('lat'),
    lng: getLocation('lng')
  }
});

const getLittleOffer = (length) => Array.from({length: length}, getOneOffer);

export {getLittleOffer};


