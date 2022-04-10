const filterForm = document.querySelector('.map__filters');
const houseTypeSelector = filterForm.querySelector('#housing-type');
const maxPriceSelector = filterForm.querySelector('#housing-price');
const roomCountSelector = filterForm.querySelector('#housing-rooms');
const guestCountSelector = filterForm.querySelector('#housing-guests');

const wifiCheckBox = filterForm.querySelector('#filter-wifi');
const dishwasherCheckBox = filterForm.querySelector('#filter-dishwasher');
const parkingCheckBox = filterForm.querySelector('#filter-parking');
const washerCheckBox = filterForm.querySelector('#filter-washer');
const elevatorCheckBox = filterForm.querySelector('#filter-elevator');
const conditionerCheckBox = filterForm.querySelector('#filter-conditioner');

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const megaMapFilter = (arrayFromFetch, pinToMapFunction) => {
  let filteredArray = arrayFromFetch.slice();
  //type filter
  if (houseTypeSelector.value === 'any') {
    filteredArray = filteredArray.slice();
  } else  {
    filteredArray = filteredArray.filter((item) => item.offer.type === houseTypeSelector.value);
  }
  //max price filter
  if (maxPriceSelector.value === 'any') {
    filteredArray = filteredArray.slice();
  } else if (maxPriceSelector.value === 'low') {
    filteredArray = filteredArray.filter((item) => item.offer.price < 10000);
  } else if (maxPriceSelector.value === 'middle') {
    filteredArray = filteredArray.filter((item) => item.offer.price >= 10000 && item.offer.price < 50000);
  } else if (maxPriceSelector.value === 'high') {
    filteredArray = filteredArray.filter((item) => item.offer.price > 50000);
  }
  //room count filter
  if (roomCountSelector.value === 'any') {
    filteredArray = filteredArray.slice();
  } else {
    filteredArray = filteredArray.filter((elem) => elem.offer.rooms == roomCountSelector.value);
  }
  //guest count filter
  if (guestCountSelector.value === 'any') {
    filteredArray = filteredArray.slice();
  } else {
    filteredArray = filteredArray.filter((elem) => elem.offer.guests == guestCountSelector.value);
  }
  //checkbox filter
  if (wifiCheckBox.checked === true) {
    filteredArray = filteredArray.filter((item) =>  Object.hasOwn(item.offer, 'features') && item.offer.features.includes('wifi') === true);
  }
  if (dishwasherCheckBox.checked === true) {
    filteredArray = filteredArray.filter((item) =>  Object.hasOwn(item.offer, 'features') &&  item.offer.features.includes('dishwasher') === true);
  }
  if (parkingCheckBox.checked === true) {
    filteredArray = filteredArray.filter((item) =>  Object.hasOwn(item.offer, 'features') &&  item.offer.features.includes('parking') === true);
  }
  if (washerCheckBox.checked === true) {
    filteredArray = filteredArray.filter((item) =>  Object.hasOwn(item.offer, 'features') &&  item.offer.features.includes('washer') === true);
  }
  if (elevatorCheckBox.checked === true) {
    filteredArray = filteredArray.filter((item) =>  Object.hasOwn(item.offer, 'features') &&  item.offer.features.includes('elevator') === true);
  }
  if (conditionerCheckBox.checked === true) {
    filteredArray = filteredArray.filter((item) =>  Object.hasOwn(item.offer, 'features') &&  item.offer.features.includes('conditioner') === true);
  }
  pinToMapFunction(filteredArray);
};


const filterSettingsArray = [
  houseTypeSelector,
  maxPriceSelector,
  roomCountSelector,
  guestCountSelector,
  wifiCheckBox,
  dishwasherCheckBox,
  parkingCheckBox,
  washerCheckBox,
  elevatorCheckBox,
  conditionerCheckBox
];

const mainMapFilterFunction = (array, pinToMapFunction) => {
  const arrayFromFetch = array.slice();
  for (let i = 0; i < filterSettingsArray.length; i++) {
    filterSettingsArray[i].addEventListener('change', () => {
      const debouncedFunction = debounce(megaMapFilter, 500);
      debouncedFunction(arrayFromFetch, pinToMapFunction);
    });
  }
};

export { mainMapFilterFunction };
