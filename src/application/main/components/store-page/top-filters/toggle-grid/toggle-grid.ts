import './toggle-grid.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { SVG } from '../../../../../shared/components/svg-icons';
import viewService from '../../../../services/store-page/change-view.service';
import querryService from '../../../../../shared/services/querry.service';

export class ToggleGrid extends DOMElement {
  public toggleGridItemGrid: ButtonElement;
  public toggleGridItemList: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['toggle-grid'],
    });

    this.toggleGridItemGrid = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['toggle-grid__item'],
    });
    this.toggleGridItemGrid.node.innerHTML = SVG.gridView;

    this.toggleGridItemList = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['toggle-grid__item'],
    });
    this.toggleGridItemList.node.innerHTML = SVG.listView;
    this.listen();
  }

  private listen() {
    this.toggleGridItemGrid.node.addEventListener('click', () => {
      viewService.setViewState('grid');
      querryService.updateQuerry();
    });

    this.toggleGridItemList.node.addEventListener('click', () => {
      viewService.setViewState('list');
      querryService.updateQuerry();
    });
  }
}
