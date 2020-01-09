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
        padding: 48px 16px 16px 16px;
        display: flex;
        flex-direction: column;
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
      }

      .flex-div {
        flex: auto;
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
           `;
  }
}

customElements.define('checkout-page', CheckoutPage)