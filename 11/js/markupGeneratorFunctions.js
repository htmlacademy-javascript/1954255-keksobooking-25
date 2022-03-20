
const getOfferTypeTranslate = function (offerTypeEng) {
  if (offerTypeEng === 'palace') {
    return 'Дворец';
  } else if (offerTypeEng === 'flat') {
    return 'Квартира';
  } else if (offerTypeEng === 'house') {
    return 'Дом';
  } else if (offerTypeEng === 'bungalow') {
    return 'Бунгало';
  } else if (offerTypeEng === 'hotel') {
    return 'Отель';
  }
};

const fieldFilter = (field) => {
  if(field.tagName === 'img') {
    if(field.src === '') {
      field.remove();
    }
  } else {
    if(field.textContent === '') {
      field.remove();
    }
  }
};

const findEmptyField = (fieldsParent) => {
  const fields = fieldsParent.children;
  for(let i = 0; i < fields.length; i++) {
    fieldFilter(fields[i]);
    if(fields[i].children.length > 0) {
      const grandchildrens = fields[i].children;
      for (let j = 0; j < grandchildrens.length; j++) {
        fieldFilter(grandchildrens[j]);
      }
    }
  }
};

export {findEmptyField, getOfferTypeTranslate};
