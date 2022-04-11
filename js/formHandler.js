const adFormElement = document.querySelector('.ad-form');
const adFormElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersFormElements =  mapFiltersFormElement.querySelectorAll('fieldset, select');
const roomCountElement = adFormElement.querySelector('#room_number');
const guestCountElement = adFormElement.querySelector('#capacity');
const selectTypeElement = adFormElement.querySelector('select[name=type]');
const priceInputElement = adFormElement.querySelector('input[name=price]');
const departureTimeElement = adFormElement.querySelector('#timein');
const checkInTimeElement = adFormElement.querySelector('#timeout');

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

const escButtonKeyCode = 27;

const addOfferServerURL = 'https://25.javascript.pages.academy/keksobooking';

const errorNotification = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorItem = errorTemplate.querySelector('.error').cloneNode(true);
  const button = errorItem.querySelector('button');
  button.addEventListener('click', () => errorItem.remove() );
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === escButtonKeyCode) {
      errorItem.remove();
    }
  });
  errorItem.addEventListener('click', () => errorItem.remove() );
  document.body.appendChild(errorItem);
};

const successNotification = () => {
  const successTemplate = document.querySelector('#success').content;
  const successItem = successTemplate.querySelector('.success').cloneNode(true);
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === escButtonKeyCode) {
      successItem.remove();
    }
  });
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
  adFormElement.classList.add('ad-form--disabled');
  formActiveSwitch(adFormElements, modeOff);
  mapFiltersFormElement.classList.add('.map__filters--disabled');
  formActiveSwitch(mapFiltersFormElements, modeOff);
};

const pageActivator = () => {
  adFormElement.classList.remove('ad-form--disabled');
  formActiveSwitch(adFormElements, modeOn);
  mapFiltersFormElement.classList.remove('.map__filters--disabled');
  formActiveSwitch(mapFiltersFormElements, modeOn);
};

const pristine = new Pristine(adFormElement);
adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.addValidator(roomCountElement, (value) => {
    if ((value === roomCount1 && (guestCountElement.value > guestCount1 || guestCountElement.value === guestCount0)) ||
      (value === roomCount2 && (guestCountElement.value > guestCount2 || guestCountElement.value === guestCount0)) ||
      (value === roomCount3 && (guestCountElement.value > guestCount3 || guestCountElement.value === guestCount0)) ||
      (value === roomCount100 && guestCountElement.value !== guestCount0)) {
      return false;
    } else if ((selectTypeElement.value === 'bungalow' && priceInputElement.value < bungalowMinPrice) ||
      (selectTypeElement.value === 'flat' && priceInputElement.value < flatMinPrice) ||
      (selectTypeElement.value === 'hotel' && priceInputElement.value < hotelMinPrice) ||
      (selectTypeElement.value === 'house' && priceInputElement.value < houseMinPrice) ||
      (selectTypeElement.value === 'palace' && priceInputElement.value < palaceMinPrice)) {
      return false;
    } else {
      return departureTimeElement.value === checkInTimeElement.value;
    }
    // eslint-disable-next-line no-unreachable
    const valid = pristine.validate();
    if (valid) {
      fetch(addOfferServerURL, {
        method: 'POST',
        body: new FormData(adFormElement)
      }).then((response) => {
        if (response.ok) {
          successNotification();
          adFormElement.reset();
        } else {
          errorNotification();
        }
      });
      // eslint-disable-next-line no-unreachable
    } else {
      errorNotification();
    }
  });
});

selectTypeElement.addEventListener('change', () => {
  if(selectTypeElement.value === 'bungalow') {
    priceInputElement.min = bungalowMinPrice;
    priceInputElement.placeholder = bungalowMinPrice;
  } else if (selectTypeElement.value === 'flat') {
    priceInputElement.placeholder = flatMinPrice;
    priceInputElement.min = flatMinPrice;
  } else if (selectTypeElement.value === 'hotel') {
    priceInputElement.placeholder = hotelMinPrice;
    priceInputElement.min = hotelMinPrice;
  } else if (selectTypeElement.value === 'house') {
    priceInputElement.placeholder = houseMinPrice;
    priceInputElement.min = houseMinPrice;
  } else if (selectTypeElement.value === 'palace') {
    priceInputElement.placeholder = palaceMinPrice;
    priceInputElement.min = palaceMinPrice;
  }
});

const oneMan = guestCountElement.querySelector(`option[value="${ guestCount1 }"]`);
const twoPeople = guestCountElement.querySelector(`option[value="${ guestCount2 }"]`);
const threePeople = guestCountElement.querySelector(`option[value="${ guestCount3 }"]`);
const manyPeople = guestCountElement.querySelector(`option[value="${ guestCount0 }"]`);

roomCountElement.addEventListener('change', () => {
  if(roomCountElement.value === roomCount1) {
    oneMan.setAttribute('selected', 'selected');
    twoPeople.removeAttribute('selected');
    threePeople.removeAttribute('selected');
    manyPeople.removeAttribute('selected');
  } else if (roomCountElement.value === roomCount2) {
    oneMan.removeAttribute('selected');
    threePeople.removeAttribute('selected');
    manyPeople.removeAttribute('selected');
    twoPeople.setAttribute('selected', 'selected');
  } else if (roomCountElement.value === roomCount3) {
    oneMan.removeAttribute('selected');
    twoPeople.removeAttribute('selected');
    manyPeople.removeAttribute('selected');
    threePeople.setAttribute('selected', 'selected');
  } else if (roomCountElement.value === roomCount100) {
    oneMan.removeAttribute('selected');
    twoPeople.removeAttribute('selected');
    threePeople.removeAttribute('selected');
    manyPeople.setAttribute('selected', 'selected');
  }
});

const checkInTime12 = checkInTimeElement.querySelector(`option[value="${ time12 }"]`);
const checkInTime13 = checkInTimeElement.querySelector(`option[value="${ time13 }"]`);
const checkInTime14 = checkInTimeElement.querySelector(`option[value="${ time14 }"]`);

const departureTime12 = departureTimeElement.querySelector(`option[value="${ time12 }"]`);
const departureTime13 = departureTimeElement.querySelector(`option[value="${ time13 }"]`);
const departureTime14 = departureTimeElement.querySelector(`option[value="${ time14 }"]`);

departureTimeElement.addEventListener('change', () => {
  if (departureTimeElement.value === time12) {
    checkInTime12.setAttribute('selected', 'selected');
    checkInTime13.removeAttribute('selected');
    checkInTime14.removeAttribute('selected');
  } else if (departureTimeElement.value === time13) {
    checkInTime13.setAttribute('selected', 'selected');
    checkInTime12.removeAttribute('selected');
    checkInTime14.removeAttribute('selected');
  } else if (departureTimeElement.value === time14) {
    checkInTime14.setAttribute('selected', 'selected');
    checkInTime12.removeAttribute('selected');
    checkInTime13.removeAttribute('selected');
  }
});
checkInTimeElement.addEventListener('change', () => {
  if (checkInTimeElement.value === time12) {
    departureTime12.setAttribute('selected', 'selected');
    departureTime13.removeAttribute('selected');
    departureTime14.removeAttribute('selected');
  } else if (checkInTimeElement.value === time13) {
    departureTime13.setAttribute('selected', 'selected');
    departureTime12.removeAttribute('selected');
    departureTime14.removeAttribute('selected');
  } else if (checkInTimeElement.value === time14) {
    departureTime14.setAttribute('selected', 'selected');
    departureTime12.removeAttribute('selected');
    departureTime13.removeAttribute('selected');
  }
});

pageDeactivator();
export { pageActivator };
