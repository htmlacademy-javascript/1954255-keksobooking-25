import { addPinToMap } from './map-conf.js';
import { pageActivator } from './formHandler.js';


fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        addPinToMap(data);
        pageActivator();
      });
    } else {
      const mapHolder = document.querySelector('.map');
      mapHolder.innerHTML = '<div style="height: 500px; width: 100%; background-color: #666666;"><div style="text-align: center"><h2 style="color: white">Error 404</h2></div></div>';
    }
  });
