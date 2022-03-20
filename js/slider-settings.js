const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
const selector = document.querySelector('#type');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: valueElement.placeholder,
  step: 1,
  connect: 'lower',
});

selector.addEventListener('change',() => {
  sliderElement.noUiSlider.set(valueElement.placeholder);
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});
