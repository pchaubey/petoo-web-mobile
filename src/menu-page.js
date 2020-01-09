import {
  html,
  css,
  LitElement,
} from 'lit-element';

export class MenuPage extends LitElement {

  static get styles() {
    return css`
      div { 
        font-size: 14px;
        font-weight: normal;
        font-family: Open Sans,Helvetica,sans-serif;
        color: #0a3848;
      }

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
      }

      .categories-scroll-container {
        width: 100%;
        position: fixed;
        top: 0px
      }
      
      .categories {
        background-color: #F3EEED;
        display: flex;
        flex-direction: row;
        overflow: scroll;
      }

      .search {
        margin: auto 16px auto 8px; 
      }      

      .category {
        white-space: nowrap;
        margin: 16px 16px 16px 0px;
      }   
/*
      .menu-items-outer-wrapper {
        display:block;
        flex: auto;
        overflow-y: scroll;
      }
*/
      .menu-items {
        width: 100%;
        box-sizing: border-box;
        padding: 64px 16px 16px 16px; 
        display: flex;
        flex-direction: column;
      }

      .category-header-container {
        height: 44px;
        background-color: #F3EEED;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        margin-bottom: 8px;
      }

      .category-header {
        font-size: 16px;
        font-weight: bold;
        font-family: Open Sans,Helvetica,sans-serif;
        color: #0a3848;
        margin: auto 16px auto 16px;
      }

      .menu-item-container {
        font-size: 14px;
        font-weight: normal;
        font-family: Open Sans,Helvetica,sans-serif;
        color: #655;
        border: 1px solid #F3EEED;
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
      }

      .menu-item-name {
        font-size: 16px;
        font-weight: bold;
        font-family: Open Sans,Helvetica,sans-serif;
        color: #0a3848;
        margin-left: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
      }

      .menu-item-description {
        font-size: 12px;
        margin-left: 8px;
        padding-bottom: 8px;
      }

      .menu-item-description2 {
        font-size: 12px;
        font-style: italic;
        margin-left: 8px;
        padding-bottom: 8px;
      }

      .menu-item-price {
        color: orangered;
        font-size: 16px;
        font-weight: bold;
        margin-left: 8px;
      }

      .add-button {
        font-size: 20px;
        font-weight: bold;
        float: right;
        margin: 4px 8px;
        padding: 0px 8px 0px 8px;
        border: 1px solid #666666;
      }

      .basket.show {
        position: fixed;
        bottom: 0px;
        width: calc(100% - 16px);
        height: 48px;
        box-sizing: border-box;
        margin: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #44464a;
      }

      .basket.hide {
        display: none;
      }

      .basket.show .total {
        font-size: 16px;
        color: white;
      }

      .basket.show .next-step {
        float: right;
        color: white;
        width: 64px;
        margin-top: -6px;
        font-size: 32px;
        font-weight: light;
      }

    `;
  }

  static get properties() {
    return { 
      name: { type: String },
      total: { type: Number}
    };
  }

  constructor() {
    super();
    this.name = 'menu';
    this.total = 0;
  }  

  scrollToCategory(id) {
    //this.shadowRoot.getElementById(id).scrollIntoView();
    window.scrollTo(0, (this.shadowRoot.getElementById(id).offsetTop - 64));
    console.log(this.shadowRoot.getElementById(id).offsetTop);
    console.log(this.shadowRoot.getElementById(id).offsetLeft);
  };

  addToBasket(amount) {
    this.total += amount;
  }

  emitCheckoutEvent() {
    const event = new CustomEvent('checkout', {
      composed: true,
      bubbles: true,
      detail: {total: this.total}
    });
    this.dispatchEvent(event);
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
              <div class='categories-scroll-container'>
                <div class='categories font-regular'>
                  <div class='search'>&#128269;</div>
                  <div class='category' @click=${() => this.scrollToCategory('drinks')}>Drinks</div>
                  <div class='category' @click=${() => this.scrollToCategory('vegetarian_dishes')}>Vegetarian dishes</div>
                  <div class='category' @click=${() => this.scrollToCategory('non_vegetarian_dishes')}>Non-vegetarian dishes</div>
                  <!--
                  <div class='category'>Extras</div>
                  <div class='category'>Popular</div>
                  <div class='category'>Popular</div>
                  <div class='category'>Popular</div>
                  -->
                </div>
              </div>
              <!--<div class='menu-items-outer-wrapper'>-->
              <div class='menu-items'>
                <div class='category-header-container' id='drinks'>
                  <div class='category-header'>Drinks</div>
                </div>
                <div class='menu-item-container'>
                  <div>
                    <span class='menu-item-name'>Heineken &#9432;</span>
                    <div class='add-button' @click=${() => this.addToBasket(2)}>+</div>
                  </div>
                  <span class='menu-item-description'>description goes here...</span>
                  <span class='menu-item-description2'>more description contiues...</span>
                  <span class='menu-item-price'>€2,00</span>
                </div>

                <div class='menu-item-container'>
                  <div>
                    <span class='menu-item-name'>Kobra &#9432;</span>
                    <div class='add-button' @click=${() => this.addToBasket(2)}>+</div>
                  </div>
                  <span class='menu-item-description'>description goes here...</span>
                  <span class='menu-item-description2'>more description contiues...</span>
                  <span class='menu-item-price'>€2,00</span>
                </div>

                <div class='menu-item-container'>
                  <div>
                    <span class='menu-item-name'>Pilsener &#9432;</span>
                    <div class='add-button' @click=${() => this.addToBasket(2)}>+</div>
                  </div>
                  <span class='menu-item-description'>description goes here...</span>
                  <span class='menu-item-description2'>more description contiues...</span>
                  <span class='menu-item-price'>€2,00</span>
                </div>

                <div class='menu-item-container'>
                  <div>
                    <span class='menu-item-name'>Affligem blond &#9432;</span>
                    <div class='add-button' @click=${() => this.addToBasket(2)}>+</div>
                  </div>
                  <span class='menu-item-description'>description goes here...</span>
                  <span class='menu-item-description2'>more description contiues...</span>
                  <span class='menu-item-price'>€2,00</span>
                </div>

                <div class='category-header-container' id='vegetarian_dishes'>
                  <div class='category-header'>Vegetarian dishes</div>
                </div>
                <div class='menu-item-container'>
                  <div>
                    <span class='menu-item-name'>Nachos</span>
                    <div class='add-button' @click=${() => this.addToBasket(2)}>+</div>
                  </div>
                  <span class='menu-item-description'>description goes here...</span>
                  <span class='menu-item-description2'>more description contiues...</span>
                  <span class='menu-item-price'>€2,00</span>
                </div>

                <div class='menu-item-container'>
                  <div>
                    <span class='menu-item-name'>chips &#9432;</span>
                    <div class='add-button' @click=${() => this.addToBasket(2)}>+</div>
                  </div>
                  <span class='menu-item-description'>description goes here...</span>
                  <span class='menu-item-description2'>more description contiues...</span>
                  <span class='menu-item-price'>€2,00</span>
                </div>

                <div class='menu-item-container'>
                  <div>
                    <span class='menu-item-name'>Fries</span>
                    <div class='add-button' @click=${() => this.addToBasket(2)}>+</div>
                  </div>
                  <span class='menu-item-description'>description goes here...</span>
                  <span class='menu-item-description2'>more description contiues...</span>
                  <span class='menu-item-price'>€2,00</span>
                </div>

                <div class='menu-item-container'>
                  <div>
                    <span class='menu-item-name'>Salad &#9432;</span>
                    <div class='add-button' @click=${() => this.addToBasket(2)}>+</div>
                  </div>
                  <span class='menu-item-description'>description goes here...</span>
                  <span class='menu-item-description2'>more description contiues...</span>
                  <span class='menu-item-price'>€2,00</span>
                </div>

                <div class='category-header-container' id='non_vegetarian_dishes'>
                  <div class='category-header'>Non-vegetarian dishes</div>
                </div>
                <div class='menu-item-container'>
                  <div>
                    <span class='menu-item-name'>Bitter balls &#9432;</span>
                    <div class='add-button' @click=${() => this.addToBasket(2)}>+</div>
                  </div>
                  <span class='menu-item-description'>description goes here...</span>
                  <span class='menu-item-description2'>more description contiues...</span>
                  <span class='menu-item-price'>€2,00</span>
                </div>

                <div class='menu-item-container'>
                  <div>
                    <span class='menu-item-name'>Chicken wings &#9432;</span>
                    <div class='add-button' @click=${() => this.addToBasket(2)}>+</div>
                  </div>
                  <span class='menu-item-description'>description goes here...</span>
                  <span class='menu-item-description2'>more description contiues...</span>
                  <span class='menu-item-price'>€2,00</span>
                </div>

                <div class='menu-item-container'>
                  <div>
                    <span class='menu-item-name'>Chicken lollypops &#9432;</span>
                    <div class='add-button' @click=${() => this.addToBasket(2)}>+</div>
                  </div>
                  <span class='menu-item-description'>description goes here...</span>
                  <span class='menu-item-description2'>more description contiues...</span>
                  <span class='menu-item-price'>€2,00</span>
                </div>

              </div>
              <!--</div>-->

              <div class="basket ${this.total > 0 ? 'show' : 'hide'}" @click=${this.emitCheckoutEvent}>
                <div class='total'>
                  Basket: ${this.formatCurrency(this.total)}
                </div>
                <!--<div class='next-step'>&#8250;</div>-->
              </div>

            </div>
           `;
  }
}

customElements.define('menu-page', MenuPage)