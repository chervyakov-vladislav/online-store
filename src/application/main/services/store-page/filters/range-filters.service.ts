import { ProductsData } from '../../../../shared/models/response-data';
import { RangeSliderInterFace } from '../../../../shared/models/store-page';
import stateService from '../../../../shared/services/state.service';

export class RangeFilterService {
  public priceState: RangeSliderInterFace | null;
  public stockState: RangeSliderInterFace | null;

  constructor() {
    this.priceState = null;
    this.stockState = null;
  }

  public pickPrice(data: ProductsData[]) {
    this.priceState = {
      max: data.reduce((x, y) => Math.max(x, y.price), 0),
      min: data.reduce(
        (x, y) => Math.min(x, y.price),
        data.reduce((x, y) => Math.max(x, y.price), 0)
      ),
    };
    return this.priceState;
  }

  public pickStock(data: ProductsData[]) {
    this.stockState = {
      max: data.reduce((x, y) => Math.max(x, y.stock), 0),
      min: data.reduce(
        (x, y) => Math.min(x, y.stock),
        data.reduce((x, y) => Math.max(x, y.stock), 0)
      ),
    };
    return this.stockState;
  }

  public pickData(e: Event, state: string) {
    this.priceState = this.pickPrice(stateService.current);
    this.stockState = this.pickStock(stateService.current);

    let { max: maxPrice, min: minPrice } = this.priceState;
    let { max: maxStock, min: minStock } = this.stockState;

    if ((e.target as HTMLElement).closest('.range-filter__range-input-min') && state === 'price') {
      minPrice = Number((e.target as HTMLInputElement).value);
      maxPrice = Number(((e.target as HTMLInputElement).nextSibling as HTMLInputElement).value);
    }
    if ((e.target as HTMLElement).closest('.range-filter__range-input-max') && state === 'price') {
      maxPrice = Number((e.target as HTMLInputElement).value);
      minPrice = Number(((e.target as HTMLInputElement).previousSibling as HTMLInputElement).value);
    }

    if ((e.target as HTMLElement).closest('.range-filter__range-input-min') && state === 'stock') {
      minStock = Number((e.target as HTMLInputElement).value);
      maxStock = Number(((e.target as HTMLInputElement).nextSibling as HTMLInputElement).value);
    }

    if ((e.target as HTMLElement).closest('.range-filter__range-input-max') && state === 'stock') {
      maxStock = Number((e.target as HTMLInputElement).value);
      minStock = Number(((e.target as HTMLInputElement).previousSibling as HTMLInputElement).value);
    }

    this.priceState = {
      max: maxPrice,
      min: minPrice,
    };

    this.stockState = {
      max: maxStock,
      min: minStock,
    };
  }
}

const rangeFilterService = new RangeFilterService();
export default rangeFilterService;
