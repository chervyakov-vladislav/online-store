import './card-info.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';

export class CardInfo extends DOMElement {
  private title: DOMElement;
  private cardContainer: DOMElement;
  private numberContainer: DOMElement;
  private cardName: DOMElement;
  private number: InputElement;
  private cardDetails: DOMElement;
  private cardMounthYear: InputElement;
  private cvv: InputElement;
  private error: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['card-info'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      classList: ['card-info__title'],
      content: 'Card details',
    });

    this.cardContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['card-info__container'],
    });

    this.numberContainer = new DOMElement(this.cardContainer.node, {
      tagName: 'div',
      classList: ['card-info__number-container'],
    });

    this.cardName = new DOMElement(this.numberContainer.node, {
      tagName: 'p',
      classList: ['card-info__card-name'],
      content: 'Card type: VISA',
    });

    this.number = new InputElement(this.numberContainer.node, {
      tagName: 'input',
      type: 'number',
      classList: ['card-info__input'],
      placeholder: 'Card number',
    });

    this.cardDetails = new DOMElement(this.cardContainer.node, {
      tagName: 'div',
      classList: ['card-info__detils'],
    });

    this.cardMounthYear = new InputElement(this.cardDetails.node, {
      tagName: 'input',
      type: 'text',
      classList: ['card-info__input'],
      placeholder: 'Valid thru',
    });

    this.cvv = new InputElement(this.cardDetails.node, {
      tagName: 'input',
      type: 'number',
      classList: ['card-info__input'],
      placeholder: 'CVV',
    });

    this.error = new DOMElement(this.cardContainer.node, {
      tagName: 'p',
      classList: ['card-info__error'],
      content: 'Error message: invalid number, cvv, thru',
    });
  }
}