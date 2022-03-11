const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements =  mapFiltersForm.querySelectorAll('fieldset, select');

const formActiveSwitch = (items, mode) => {
  if(mode === 0) {
    items.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
  } else if (mode === 1){
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

pageDeactivator();
pageActivator();

