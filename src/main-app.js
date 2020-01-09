import {
  html,
  css,
  LitElement,
} from 'lit-element';
import WelcomePage from './welcome-page.js';
import MenuPage from './menu-page.js';
import checkout from './checkout-page.js'

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
      page: { type: String }
    };
  }

  constructor() {
    super();
    this.page = 'welcome';
    setTimeout(() => {
        this.page = 'menu';
    }, 2000);
  }  

  render() {
    return html`
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <div class='main-container'>
              ${this.page === 'welcome'?html`<welcome-page></welcome-page>`:html``}
              ${this.page === 'menu'?html`<menu-page @checkout=${() => this.page = 'checkout'}></menu-page>`:html``}
              ${this.page === 'checkout'?html`<checkout-page></checkout-page>`:html``}
              </div>
           `;
  }
}

customElements.define('main-app', MainApp)