import './card-info.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';
import validation from '../../../services/validation.service';

export class CardInfo extends DOMElement {
  private title: DOMElement;
  public cardContainer: DOMElement;
  private numberContainer: DOMElement;
  public cardName: DOMElement;
  public number: InputElement;
  private cardDetails: DOMElement;
  public cardMounthYear: InputElement;
  public cvv: InputElement;

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
      content: 'Card type:',
    });

    this.number = new InputElement(this.numberContainer.node, {
      tagName: 'input',
      type: 'text',
      classList: ['card-info__input'],
      placeholder: 'Card number',
    });

    this.number.node.addEventListener('change', (e: Event) => {
      validation.validateCardNumber(e, this.cardContainer.node);
    });
    this.number.node.addEventListener('input', (e: Event) => {
      validation.formatCardNumber(e, this.cardName.node);
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

    this.cardMounthYear.node.addEventListener('change', (e: Event) => {
      validation.validateMounthYear(e, this.cardContainer.node);
    });
    this.cardMounthYear.node.addEventListener('input', (e: Event) => {
      validation.formatMounthYear(e);
    });

    this.cvv = new InputElement(this.cardDetails.node, {
      tagName: 'input',
      type: 'number',
      classList: ['card-info__input'],
      placeholder: 'CVV',
    });

    this.cvv.node.addEventListener('change', (e: Event) => {
      validation.validateCvv(e, this.cardContainer.node);
    });
    this.cvv.node.addEventListener('input', (e: Event) => {
      validation.formatCvv(e);
    });
  }
}
