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
        width: calc(100% - 32px);
        height: 48px;
        box-sizing: border-box;
        border-radius: 4px;
        margin: 8px 16px 8px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #44464a;
      }

      .basket.hide {
        display: none;
      }

      .basket.show .total {
        flex: auto;
        color: white;
        font-size: 16px;
        text-align: center;
      }

      .basket.show .next-step {
        width: 32px;
        margin-top: -6px;
        color: white;
        font-size: 32px;
        font-weight: light;
        text-align: left;
      }

    `;
  }

  static get properties() {
    return { 
      name: { type: String },
      basket: {type: Object},
      total: { type: Number},
      menu: {type: Object}
    };
  }

  constructor() {
    super();
    this.name = 'menu';
    this.total = 0; 
    this.basket = {
      total: 0,
      items: []
    };
    this.fetchMenu();
  }  

  scrollToCategory(id) {
    //this.shadowRoot.getElementById(id).scrollIntoView();
    const elementId = 'category_' + id;
    window.scrollTo(0, (this.shadowRoot.getElementById(elementId).offsetTop - 64));
  };

  addToBasket(menuItem) {
    this.basket.total += menuItem.price;
    this.total = this.basket.total;
    const filteredItems = this.basket.items.filter(item => item.id === menuItem.id);
    if (filteredItems.length > 0) {
      filteredItems[0].count += 1 ;
    } else {
      const menuItemCopy = JSON.parse(JSON.stringify(menuItem));
      menuItemCopy.count = 1;
      this.basket.items.push(menuItemCopy);
    }
  }

  goToBasket() {
    const event = new CustomEvent('changepage', {
      composed: true,
      bubbles: true,
      detail: {page: 'basket', basket: this.basket}
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
              ${this.renderCategoriesTopBar()}
              ${this.renderCategories()}
              ${this.renderBasket()}
            </div>
           `;
  }

  renderCategoriesTopBar() {
    return html`
    <div class='categories-scroll-container'>
      <div class='categories font-regular'>
        <div class='search'>&#128269;</div>
        ${this.menu.map((categoryMenu) => this.renderCategoriesTopBarItem(categoryMenu))}
        <!--
        <div class='category'>Extras</div>
        <div class='category'>Popular</div>
        <div class='category'>Popular</div>
        <div class='category'>Popular</div>
        -->
      </div>
    </div>
    `;
  }

  renderCategoriesTopBarItem(categoryMenu) {
    return html`
    <div class='category' @click=${() => this.scrollToCategory(categoryMenu.id)}>${categoryMenu.name}</div>
    `;
  }

  renderCategories() {
    return html`
    <div class='menu-items'>
      ${this.menu.map((categoryMenu) => this.renderCategory(categoryMenu))}
    </div>
    `;
  }

  renderCategory(categoryMenu) {
    return html `
      <div class='category-header-container' id='category_${categoryMenu.id}'>
        <div class='category-header'>${categoryMenu.name}</div>
      </div>
      ${categoryMenu.items.map((menuItem) => this.renderMenuItem(menuItem))}
    `;
  }

  renderMenuItem(menuItem) {
    return html`
      <div class='menu-item-container'>
        <div>
          <span class='menu-item-name'>${menuItem.name} &#9432;</span>
          <div class='add-button' @click=${() => this.addToBasket(menuItem)}>+</div>
        </div>
        <span class='menu-item-description'>${menuItem.description}</span>
        <span class='menu-item-description2'>${menuItem.description2}</span>
        <span class='menu-item-price'>${this.formatCurrency(menuItem.price)}</span>
      </div>      
    `;
  }

  renderBasket() {
    return html`
      <div class="basket ${this.total > 0 ? 'show' : 'hide'}" @click=${this.goToBasket}>
        <div class='total'>
          Basket: ${this.formatCurrency(this.basket.total)}
        </div>
        <div class='next-step'>&#8250;</div>
      </div>
    `;
  }

  fetchMenu() {
    console.log('fetching menu..');
    const menu = 
      [
        {
          id: 1,
          name: 'drinks', 
          items: [
            {
              id: 1,
              name: 'heineken',
              description: 'best bier in the world',
              description2: 'made in europe',
              price: 2.0,
              category: 'drinks'
            },
            {
              id: 2,
              name: 'Kobra',
              description: 'best bier in the world',
              description2: 'made in europe',
              price: 2.0,
              category: 'drinks'
            },
            {
              id: 3,
              name: 'Amstel',
              description: 'best bier in the world',
              description2: 'made in europe',
              price: 2.0,
              category: 'drinks'
            },
            {
              id: 4,
              name: 'kingfisher',
              description: 'best bier in the world',
              description2: 'made in europe',
              price: 2.0,
              category: 'drinks'
            }
          ]
        },

        {
          id: 2,
          name: 'non vegetarian dishes', 
          items : [
          {
              id: 21,
              name: 'bitter balls',
              description: '12 stucks',
              description2: 'contains beef',
              price: 5.0,
              category: 'non-vegetarian dishes'
            },
            {
              id: 22,
              name: 'chicken nudgets',
              description: '6 stucks',
              description2: 'additional description goes here',
              price: 4.0,
              category: 'non-vegetarian dishes'
            },
            {
              id: 23,
              name: 'chicken wings',
              description: '6 stucks',
              description2: 'additional description goes here',
              price: 3.0,
              category: 'non-vegetarian dishes'
            },
            {
              id: 24,
              name: 'spare ribs',
              description: '4 stucks',
              price: 4.0,
              category: 'non-vegetarian dishes'
            },
          ]
        },

        {
          id: 3, 
          name : 'vegetarian dishes', 
          items : [
            {
              id: 31,
              name: 'nachos',
              description: 'delicious stuff',
              description2: 'additional description goes here',
              price: 4.0,
              category: 'vegetarian dishes'
            },
            {
              id: 32,
              name: 'chips',
              description: 'description  goes here',
              description2: 'contains fish',
              price: 3.0,
              category: 'vegetarian dishes'
            },
            {
              id: 33,
              name: 'fies',
              description: 'pure veg',
              description2: 'additional description goes here',
              price: 3.0,
              category: 'vegetarian dishes'
            },
            {
              id: 34,
              name: 'peanuts',
              description: 'always a great companion with drinks',
              price: 2.5,
              category: 'vegetarian dishes'
            }
          ]
        }
      ];
    this.menu = menu;
    return menu;
  }
}

customElements.define('menu-page', MenuPage)