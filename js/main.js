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

const getTitle = () => {
  const titleArray = [
    'Лучшее место для отдыха!',
    'Самые красивые комнаты!',
    'У нас бесплатные завтраки!',
    'Самый длинный бассейн!'
  ];
  return titleArray[getRandom(0,4,0)];
};

const getType = () => {
  const typeMass = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
  return typeMass[getRandom(0,4,0)];
};

const getTime = () => {
  const timeMass = ['12:00', '13:00', '14:00'];
  return timeMass[getRandom(0,2,0)];
};

const getFeatures = () => {
  const featuresMass = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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
  const photoArray = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ];
  const photoCount = getRandom(0, 3);
  const selectedPhoto = [];
  for (let i = 0; i <= photoCount; i++) {
    selectedPhoto[i] = photoArray[i];
  }
  return selectedPhoto;
};

const getLocation = (type) => {
  if (type === 'lat') {
    return +`35.${getRandom(65000, 70000, 0)}`;
  } else if (type === 'lng') {
    return +`139.${getRandom(70000, 80000, 0)}`;
  }
};

////// ready first field in a mass
const getOneObject = () => {
  const likeObject = {
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
  };
  return likeObject;
};

const getLittleObjects = (count) => {
  const objectsArray = [];
  for (let i = 0; i < count; i++) {
    objectsArray[i] = getOneObject();
  }
  return objectsArray;
};

getLittleObjects(10);
