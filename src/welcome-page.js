import {
  html,
  css,
  LitElement,
} from 'lit-element';
import './style.css'

export class WelcomePage extends LitElement {

  static get styles() {
    return css`
      div { 
        color: orangered; 
      }
      .container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .app-name {
        font-size: 24px;
        font-weight: bold;
        font-family: Open Sans,Helvetica,sans-serif;
        margin-bottom: 16px;
      } 
      .italic {
        font-size: 16px;
        font-style: italic;
        font-family: CrimsonItalic, serif;
      }      
    `;
  }

  static get properties() {
    return { 
    };
  }

  constructor() {
    super();
  }  

  render() {
    return html`
              <div class='container'>
                <div class='inner-container'>
                  <div class='app-name'> Petoo </div>
                  <div class='italic'> Revolutionalizing Dining experience... </div>
                </div>
              </div>
           `;
  }
}

customElements.define('welcome-page', WelcomePage)