import {
  html,
  css,
  LitElement,
} from 'lit-element';
import './style.css'

export class CheckoutPage extends LitElement {

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
    };
  }

  constructor() {
    super();
  }  

  render() {
    return html`
              <div class='container'>

                <div class='header'>
                  <div>Basket</div>
                </div>

                <div class='summary-container'>

                  <div class='line-items'>
                    <div class='item-count'>2</div>
                    <div class='item-name'>Hieneken</div>
                    <div class='item-price'>4,00</div>
                  </div>

                  <div class='line-items'>
                    <div class='item-count'>1</div>
                    <div class='item-name'>Bitter balls</div>
                    <div class='item-price'>8,00</div>
                  </div>

                  <div><hr></div>

                  <div class='sub-total'>
                    <div class='flex-div'>Subtotal</div>
                    <div class='price-on-right'>12,00</div>
                  </div>
                  
                  <div class='other-charges'>
                    <div class='flex-div'>Other charges</div>
                    <div class='price-on-right'>0,00</div>
                  </div>

                  <div class='total'>
                    <div class='font-bold flex-div'>Total</div>
                    <div class='font-bold price-on-right'>12,00</div>
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
}

customElements.define('checkout-page', CheckoutPage)