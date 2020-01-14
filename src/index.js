import _ from 'lodash';
import MainApp from './main-app.js';
import './style.css'
import printMe from './print.js';

function component() {
    const element = document.createElement('div');
    element.classList.add('app-container');
    const main = document.createElement('main-app');
    main.classList.add('full-height');
    main.classList.add('full-width');
    element.appendChild(main);
    return element;
}
  
document.body.appendChild(component());
