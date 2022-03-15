const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements =  mapFiltersForm.querySelectorAll('fieldset, select');
const roomCount = adForm.querySelector('#room_number');
const guestCount = adForm.querySelector('#capacity');
const selectType = adForm.querySelector('select[name=type]');
const priceInput = adForm.querySelector('input[name=price]');

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
  if (mode === 0) {
    items.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
  } else if (mode === 1) {
    items.forEach((item) => {
      item.removeAttribute('disabled');
    });
  }
};

const pageDeactivator = () => {
  adForm.classList.add('ad-form--disabled');
  formActiveSwitch(adFormElements, 0);
  mapFiltersForm.classList.add('.map__filters--disabled');
  formActiveSwitch(mapFiltersFormElements, 0);
};

const pageActivator = () => {
  adForm.classList.remove('ad-form--disabled');
  formActiveSwitch(adFormElements, 1);
  mapFiltersForm.classList.remove('.map__filters--disabled');
  formActiveSwitch(mapFiltersFormElements, 1);
};

const pristine = new Pristine(adForm);
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.addValidator(roomCount, (value) => {
    if ((value === '1' && (guestCount.value > '1' || guestCount.value === '0') ) ||
      (value === '2' && (guestCount.value > '2' || guestCount.value === '0') ) ||
      (value === '3' && (guestCount.value > '3' || guestCount.value === '0') ) ||
      (value === '100' && guestCount.value !== '0')) {
      return false;
    } else if ((selectType.value === 'bungalow' && priceInput.value < 0) ||
      (selectType.value === 'flat' && priceInput.value < 1000) ||
      (selectType.value === 'hotel' && priceInput.value < 3000) ||
      (selectType.value === 'house' && priceInput.value < 5000) ||
      (selectType.value === 'palace' && priceInput.value < 10000)) {
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
    priceInput.placeholder = '0';
  } else if (selectType.value === 'flat') {
    priceInput.placeholder = '1000';
  } else if (selectType.value === 'hotel') {
    priceInput.placeholder = '3000';
  } else if (selectType.value === 'house') {
    priceInput.placeholder = '5000';
  } else if (selectType.value === 'palace') {
    priceInput.placeholder = '10000';
  }
});

const oneMan = guestCount.querySelector('option[value="1"]');
const twoPeople = guestCount.querySelector('option[value="2"]');
const threePeople = guestCount.querySelector('option[value="3"]');
const manyPeople = guestCount.querySelector('option[value="0"]');

roomCount.addEventListener('change', () => {
  if(roomCount.value === '1') {
    oneMan.setAttribute('selected', true);
    twoPeople.removeAttribute('selected');
    threePeople.removeAttribute('selected');
    manyPeople.removeAttribute('selected');
  } else if (roomCount.value === '2') {
    oneMan.removeAttribute('selected');
    threePeople.removeAttribute('selected');
    manyPeople.removeAttribute('selected');
    twoPeople.setAttribute('selected', true);
  } else if (roomCount.value === '3') {
    oneMan.removeAttribute('selected');
    twoPeople.removeAttribute('selected');
    manyPeople.removeAttribute('selected');
    threePeople.setAttribute('selected', true);
  } else if (roomCount.value === '100') {
    oneMan.removeAttribute('selected');
    twoPeople.removeAttribute('selected');
    threePeople.removeAttribute('selected');
    manyPeople.setAttribute('selected', true);
  }
});

pageDeactivator();
pageActivator();
