import {
  html,
  css,
  LitElement,
} from 'lit-element';
import './style.css'

export class BasketPage extends LitElement {

  static get styles() {
    return css`
      .font-bold {
        font-size: 16px;
        font-weight: bold;
        font-family: Open Sans,Helvetica,sans-serif;
        color: #0a3848;
      }

      .font-regular {
        font-size: 14px;
        font-weight: normal;
        font-family: Open Sans,Helvetica,sans-serif;
        color: #655;
      }    
      
      .container {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 16px 16px 16px 16px;
        display: flex;
        flex-direction: column;
      }

      .header {
        width: 100%;
        height: 48px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F3EEED;
      }

      .cross {
        position: absolute;
        top: 24px;
        right: 24px;
        float: right;
      }

      .summary-container {
        flex: auto;
        width: 100%;
      }
      
      .line-items {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-bottom: 8px;
      }

      .item-count {
        width: 32px;
      }

      .item-name {
        flex: auto;
      }
    
      .item-price {
        width: 48px;
        text-align: right;
      }

      .sub-total,.other-charges {
        width: 100%;
        display: flex;
        margin-bottom: 8px;
      }

      .total {
        width: 100%;
        display: flex;
        margin: 8px 0px 8px 0px;
      }
      
      .price-on-right {
        width: 48px;
        text-align: right;
      }

      .flex-div {
        flex: auto;
      }
      
      .pay-button-apple {
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: calc(100% - 32px);
        height: 48px;
        margin: 8px 16px 8px 16px;
        border-radius: 4px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #44464a;
      }

      .pay-button-google {
        position: fixed;
        bottom: 56px;
        left: 0px;
        width: calc(100% - 32px);
        height: 48px;
        margin: 8px 16px 8px 16px;
        border-radius: 4px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #44464a;
      }

      .font-white {
        color: white;
      }
    `;
  }

  static get properties() {
    return { 
      basket: {type: Object}
    };
  }

  constructor() {
    super();
  }

  formatCurrency(input) {
    const formatter = new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
    return formatter.format(input);
  }

  render() {
    return html`
              <div class='container'>
                <div class='cross' @click=${this.backToMenu}>X</div>
                <div class='header'>
                  <div>Basket</div>
                </div>

                <div class='summary-container'>

                  ${this.renderLineItems()}

                  <div><hr></div>

                  <div class='sub-total'>
                    <div class='flex-div'>Subtotal</div>
                    <div class='price-on-right'>${this.formatCurrency(this.basket.total)}</div>
                  </div>
                  
                  <div class='other-charges'>
                    <div class='flex-div'>Other charges</div>
                    <div class='price-on-right'>${this.formatCurrency(0)}</div>
                  </div>

                  <div class='total'>
                    <div class='font-bold flex-div'>Total</div>
                    <div class='font-bold price-on-right'>${this.formatCurrency(this.basket.total)}</div>
                  </div>

                </div>

                <div class='pay-button-apple'>
                  <div class='font-bold font-white'>Apple checkout</div>
                </div>

                <div class='pay-button-google'>
                  <div class='font-bold font-white'>Google Pay</div>
                </div>                 

              </div>
           `;
  }

  renderLineItems() {
    return html`
      ${this.basket.items.map((item) => this.renderLineItem(item))}
    `;
  }

  renderLineItem(lineItem) {
    return html`
      <div class='line-items'>
        <div class='item-count'>${lineItem.count}</div>
        <div class='item-name'>${lineItem.name}</div>
        <div class='item-price'>${this.formatCurrency(lineItem.price * lineItem.count)}</div>
      </div>
    `;
  }

  backToMenu() {
    const event = new CustomEvent('changepage', {
      composed: true,
      bubbles: true,
      detail: {page: 'menu', basket: this.basket}
    });
    this.dispatchEvent(event);
  }
}

customElements.define('basket-page', BasketPage)