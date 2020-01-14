import {
  html,
  css,
  LitElement,
} from 'lit-element';
import WelcomePage from './welcome-page.js';
import MenuPage from './menu-page.js';
import BasketPage from './basket-page.js'

export class MainApp extends LitElement {

  static get styles() {
    return css`
      .main-container {
        display: block;
        height: 100%;
        width: 100%;
        background-color: white;
      }      
    `;
  }

  static get properties() {
    return { 
      page: { type: String },
      basket: {type: Object}
    };
  }

  constructor() {
    super();
    this.page = 'welcome';
    setTimeout(() => {
        this.page = 'menu';
    }, 2000);

    this.basket = {
      total: 0,
      items: []
    };
  }

  render() {
    return html`
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <div class='main-container'>
              ${this.page === 'welcome'?html`<welcome-page></welcome-page>`:html``}
              ${this.page === 'menu'?html`<menu-page @changepage=${this.changePage} .basket="${this.basket}"></menu-page>`:html``}
              ${this.page === 'basket'?html`<basket-page @changepage=${this.changePage} .basket="${this.basket}"></basket-page>`:html``}
              </div>
           `;
  }

  changePage(event) {
    if (event.detail.page === 'menu') {
      this.page = 'menu';
    } else if (event.detail.page === 'basket') {
      this.page = 'basket';
      //this.basket = event.detail.basket;
    }
  }
}

customElements.define('main-app', MainApp)