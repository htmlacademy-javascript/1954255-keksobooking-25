const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements =  mapFiltersForm.querySelectorAll('fieldset, select');
const roomCount = adForm.querySelector('#room_number');
const guestCount = adForm.querySelector('#capacity');
const selectType = adForm.querySelector('select[name=type]');
const priceInput = adForm.querySelector('input[name=price]');
const departureTime = adForm.querySelector('#timein');
const checkInTime = adForm.querySelector('#timeout');

const modeOff = 0;
const modeOn = 1;

const roomCount1 = '1';
const roomCount2 = '2';
const roomCount3 = '3';
const roomCount100 = '100';

const guestCount1 = '1';
const guestCount2 = '2';
const guestCount3 = '3';
const guestCount0 = '0';

const bungalowMinPrice = 0;
const flatMinPrice = 1000;
const hotelMinPrice = 3000;
const houseMinPrice = 5000;
const palaceMinPrice = 10000;

const time12 = '12:00';
const time13 = '13:00';
const time14 = '14:00';

const errorNotification = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorItem = errorTemplate.querySelector('.error').cloneNode(true);
  const button = errorItem.querySelector('button');
  button.addEventListener('click', () => errorItem.remove() );
  document.body.appendChild(errorItem);
};

const successNotification = () => {
  const successTemplate = document.querySelector('#success').content;
  const successItem = successTemplate.querySelector('.success').cloneNode(true);
  successItem.addEventListener('click', () => successItem.remove() );
  document.body.appendChild(successItem);
};

const formActiveSwitch = (items, mode) => {
  if (mode === modeOff) {
    items.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
  } else if (mode === modeOn) {
    items.forEach((item) => {
      item.removeAttribute('disabled');
    });
  }
};

const pageDeactivator = () => {
  adForm.classList.add('ad-form--disabled');
  formActiveSwitch(adFormElements, modeOff);
  mapFiltersForm.classList.add('.map__filters--disabled');
  formActiveSwitch(mapFiltersFormElements, modeOff);
};

const pageActivator = () => {
  adForm.classList.remove('ad-form--disabled');
  formActiveSwitch(adFormElements, modeOn);
  mapFiltersForm.classList.remove('.map__filters--disabled');
  formActiveSwitch(mapFiltersFormElements, modeOn);
};

const pristine = new Pristine(adForm);
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.addValidator(roomCount, (value) => {
    if ((value === roomCount1 && (guestCount.value > guestCount1 || guestCount.value === guestCount0) ) ||
      (value === roomCount2 && (guestCount.value > guestCount2 || guestCount.value === guestCount0) ) ||
      (value === roomCount3 && (guestCount.value > guestCount3 || guestCount.value === guestCount0) ) ||
      (value === roomCount100 && guestCount.value !== guestCount0)) {
      return false;
    } else if ((selectType.value === 'bungalow' && priceInput.value < bungalowMinPrice) ||
      (selectType.value === 'flat' && priceInput.value < flatMinPrice) ||
      (selectType.value === 'hotel' && priceInput.value < hotelMinPrice) ||
      (selectType.value === 'house' && priceInput.value < houseMinPrice) ||
      (selectType.value === 'palace' && priceInput.value < palaceMinPrice)) {
      return false;
    } else if (departureTime.value !== checkInTime.value) {
      return false;
    } else {
      return true;
    }
  });
  const valid = pristine.validate();
  if (valid) {
    successNotification();
  } else {
    errorNotification();
  }
});

selectType.addEventListener('change', () => {
  if(selectType.value === 'bungalow') {
    priceInput.min = bungalowMinPrice;
    priceInput.placeholder = bungalowMinPrice;
  } else if (selectType.value === 'flat') {
    priceInput.placeholder = flatMinPrice;
    priceInput.min = flatMinPrice;
  } else if (selectType.value === 'hotel') {
    priceInput.placeholder = hotelMinPrice;
    priceInput.min = hotelMinPrice;
  } else if (selectType.value === 'house') {
    priceInput.placeholder = houseMinPrice;
    priceInput.min = houseMinPrice;
  } else if (selectType.value === 'palace') {
    priceInput.placeholder = palaceMinPrice;
    priceInput.min = palaceMinPrice;
  }
});

const oneMan = guestCount.querySelector(`option[value="${ guestCount1 }"]`);
const twoPeople = guestCount.querySelector(`option[value="${ guestCount2 }"]`);
const threePeople = guestCount.querySelector(`option[value="${ guestCount3 }"]`);
const manyPeople = guestCount.querySelector(`option[value="${ guestCount0 }"]`);

roomCount.addEventListener('change', () => {
  if(roomCount.value === roomCount1) {
    oneMan.setAttribute('selected', true);
    twoPeople.removeAttribute('selected');
    threePeople.removeAttribute('selected');
    manyPeople.removeAttribute('selected');
  } else if (roomCount.value === roomCount2) {
    oneMan.removeAttribute('selected');
    threePeople.removeAttribute('selected');
    manyPeople.removeAttribute('selected');
    twoPeople.setAttribute('selected', true);
  } else if (roomCount.value === roomCount3) {
    oneMan.removeAttribute('selected');
    twoPeople.removeAttribute('selected');
    manyPeople.removeAttribute('selected');
    threePeople.setAttribute('selected', true);
  } else if (roomCount.value === roomCount100) {
    oneMan.removeAttribute('selected');
    twoPeople.removeAttribute('selected');
    threePeople.removeAttribute('selected');
    manyPeople.setAttribute('selected', true);
  }
});

const checkInTime12 = checkInTime.querySelector(`option[value="${ time12 }"]`);
const checkInTime13 = checkInTime.querySelector(`option[value="${ time13 }"]`);
const checkInTime14 = checkInTime.querySelector(`option[value="${ time14 }"]`);

const departureTime12 = departureTime.querySelector(`option[value="${ time12 }"]`);
const departureTime13 = departureTime.querySelector(`option[value="${ time13 }"]`);
const departureTime14 = departureTime.querySelector(`option[value="${ time14 }"]`);

departureTime.addEventListener('change', () => {
  if (departureTime.value === time12) {
    checkInTime12.setAttribute('selected', true);
    checkInTime13.removeAttribute('selected');
    checkInTime14.removeAttribute('selected');
  } else if (departureTime.value === time13) {
    checkInTime13.setAttribute('selected', true);
    checkInTime12.removeAttribute('selected');
    checkInTime14.removeAttribute('selected');
  } else if (departureTime.value === time14) {
    checkInTime14.setAttribute('selected', true);
    checkInTime12.removeAttribute('selected');
    checkInTime13.removeAttribute('selected');
  }
});
checkInTime.addEventListener('change', () => {
  if (checkInTime.value === time12) {
    departureTime12.setAttribute('selected', true);
    departureTime13.removeAttribute('selected');
    departureTime14.removeAttribute('selected');
  } else if (checkInTime.value === time13) {
    departureTime13.setAttribute('selected', true);
    departureTime12.removeAttribute('selected');
    departureTime14.removeAttribute('selected');
  } else if (checkInTime.value === time14) {
    departureTime14.setAttribute('selected', true);
    departureTime12.removeAttribute('selected');
    departureTime13.removeAttribute('selected');
  }
});

pageDeactivator();

export { pageActivator };
