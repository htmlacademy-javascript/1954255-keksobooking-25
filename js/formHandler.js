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

roomCount.addEventListener('change', () => {
  if(roomCount.value === 1) {
    guestCount.querySelector('#capacity:nth-child(1)').setAttribute('selected', true);
  } else if (roomCount.value === 2) {
    guestCount.querySelector('#capacity:nth-child(2)').setAttribute('selected', true);
  } else if (roomCount.value === 3) {
    guestCount.querySelector('#capacity:nth-child(3)').setAttribute('selected', true);
  } else if (roomCount.value === 100) {
    guestCount.querySelector('#capacity:nth-child(4)').setAttribute('selected', true);
  }
});

pageDeactivator();
pageActivator();
