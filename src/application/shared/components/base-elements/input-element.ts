import { DOMElement } from './dom-element';
import { InputOptions } from '../../models/base-elements';

export class InputElement extends DOMElement {
  private _value = 0;

  constructor(parentNode: HTMLElement | null, options: InputOptions) {
    super(parentNode, {
      tagName: options.tagName,
      classList: options.classList,
      content: options.content,
    });

    if (options.type) {
      this.node.setAttribute('type', options.type);
    }

    if (options.name) {
      this.node.setAttribute('name', options.name);
    }

    if (options.placeholder) {
      this.node.setAttribute('placeholder', options.placeholder);
    }

    if (options.required) {
      (this.node as HTMLInputElement).required = true;
    }

    if (options.selected) {
      (this.node as HTMLOptionElement).selected = true;
    }

    if (options.min) {
      this.node.setAttribute('min', options.min);
    }

    if (options.max) {
      this.node.setAttribute('max', options.max);
    }

    if (options.value) {
      this.node.setAttribute('value', options.value);
      this.value = parseInt(options.value);
    }

    if (options.checked) {
      (this.node as HTMLInputElement).checked = options.checked;
    }

    if (options.readonly) {
      (this.node as HTMLInputElement).readOnly = options.readonly;
    }
  }

  public set value(val: number) {
    this._value = val;
    if (!isNaN(val)) this.node.setAttribute('value', val.toString());
  }

  public get value() {
    return this._value;
  }
}
