import './header.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Logo } from './header-logo/header-logo';
import { TotalPrice } from './header-total-price/header-total-price';
import { Cart } from './header-cart/header-cart';
import headerService from '../../services/header.service';

export class Header extends DOMElement {
  private container: DOMElement;
  private headerLogo: DOMElement;
  private headerTotalPrice: DOMElement;
  private headerCart: DOMElement;
  private logo: Logo;

  constructor(parentNode: HTMLElement) {
    super(parentNode, { tagName: 'header', classList: ['header'] });

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['container', 'header__container'],
    });

    this.headerLogo = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['header__logo'],
    });

    this.headerTotalPrice = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['header__total-price'],
    });

    this.headerCart = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['header__cart'],
    });

    this.logo = new Logo(this.headerLogo.node);
    headerService.price = new TotalPrice(this.headerTotalPrice.node);
    headerService.cart = new Cart(this.headerCart.node);
  }

  public render() {
    headerService.cart?.updateCount();
    headerService.price?.updatePrice();
  }
}
