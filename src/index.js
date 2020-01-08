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

    
    //btn.innerHTML = 'Click me and check the console!';
    //btn.onclick = printMe;

    //element.appendChild(btn);

    // const myCat = new Image();
    // myCat.src = cat;
    // myCat.height = 100;
    // myCat.width = 100;
    // element.appendChild(myCat);
    
    // innerDiv.innerHTML = 'Hola!!!!<br><my-element></my-element>';
    element.appendChild(main);

    return element;
}
  
document.body.appendChild(component());
