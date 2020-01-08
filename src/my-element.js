import {
  html,
  css,
  LitElement,
} from 'lit-element';

export class MyElement extends LitElement {

  static get styles() {
    return css`
      div { color: red; }
    `;
  }

  static get properties() {
    return { 
      name: { type: String }
    };
  }

  constructor() {
    super();
    this.name = 'my element';
  }  

  render() {
    return html`
              <div>${this.name}</div>
           `;
  }
}

customElements.define('my-element', MyElement)