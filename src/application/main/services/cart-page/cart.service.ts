import headerService from '../../../core/services/header.service';
import { ProductsData } from '../../../shared/models/response-data';
import LocalStorageSvc from '../../../shared/services/local-storage.service';
import stateService from '../../../shared/services/state.service';
import { CartItems } from '../../components/cart-page/items/items';
import { CartItem } from '../../components/cart-page/items/list/cart-item';
import { CartList } from '../../components/cart-page/items/list/cart-list';
import paginationService from './pagination.service';

export class CartService {
  public container: CartList | null;
  public cartItems: CartItems | null;
  public countsCart: number[] = [];
  public promoList: PromoList = { RS: 10, EPAM: 10 };
  public activePromo: Promo[] = ['RS', 'EPAM'];
  private totalCount = 0;
  private totalSum = 0;
  private curSum = 0;
  private localStorageSVC = new LocalStorageSvc();

  constructor() {
    this.container = null;
    this.cartItems = null;
  }

  public addToCart(product: ProductsData) {
    const idInCart = this.idInCart(product);
    if (idInCart < 0 || this.countsCart[idInCart] < product.stock) {
      if (idInCart >= 0) {
        this.countsCart[idInCart]++;
      } else {
        stateService.cart.push(product);
        this.countsCart.push(1);
      }
      this.totalCount++;
      this.totalSum += product.price;
      this.save();
    }
  }

  public removeFromCart(product: ProductsData) {
    const idInCart = this.idInCart(product);

    if (idInCart >= 0) {
      if (this.countsCart[idInCart] > 1) {
        this.countsCart[idInCart]--;
      } else {
        stateService.cart.splice(idInCart, 1);
        this.countsCart.splice(idInCart, 1);
      }
    }
    this.totalCount--;
    this.totalSum -= product.price;
    this.save();
  }

  public removePositionFromCart(product: ProductsData) {
    const idInCart = this.idInCart(product);
    if (idInCart >= 0) {
      stateService.cart.splice(idInCart, 1);
      this.countsCart.splice(idInCart, 1);
    }
    if (stateService.cart.length == 0) {
      this.totalCount = 0;
      this.totalSum = 0;
    } else {
      this.totalSum = stateService.cart
        .map((item, id) => item.price * this.countsCart[id])
        .reduce((acc, cur) => acc + cur);
      this.totalCount = this.countsCart.reduce((acc, cur) => acc + cur);
    }
    this.save();
  }

  public getTotalSum() {
    return this.totalSum;
  }

  public getTotalCount() {
    return this.totalCount;
  }

  public save() {
    this.localStorageSVC.setRecord('cart', {
      cart: stateService.cart,
      counts: this.countsCart,
      promo: this.activePromo,
      prodsPerPage: paginationService.productsPerPage,
      curPage: paginationService.curPage,
    });
  }

  public load() {
    const cartLoad = { cart: [], counts: [], promo: [], prodsPerPage: 3, curPage: 1 };
    if (this.localStorageSVC.getRecordObj('cart')) {
      Object.assign(cartLoad, this.localStorageSVC.getRecordObj('cart'));
      cartLoad.cart.forEach((product: ProductsData, id) => {
        stateService.cart.push(stateService.getProductByID(product.id));
        this.totalSum += product.price * cartLoad.counts[id];
      });
      this.countsCart = cartLoad.counts;
      if (this.countsCart.length > 0) this.totalCount = this.countsCart.reduce((acc, cur) => acc + cur);
      this.activePromo = cartLoad.promo;
      paginationService.productsPerPage = cartLoad.prodsPerPage;
      paginationService.curPage = cartLoad.curPage;
    }
  }

  public idInCart(product: ProductsData) {
    const idInCart = stateService.cart.indexOf(product);
    return idInCart;
  }

  public activatePromo(promo: string) {
    if (this.isPromo(promo) && !this.isActivePromo(promo)) this.activePromo.push(promo as Promo);
    this.save();
  }

  public deactivatePromo(promo: string) {
    const index = this.activePromo.indexOf(promo as Promo);
    if (index >= 0) this.activePromo.splice(index, 1);
    this.save();
  }

  public isPromo(promo: string) {
    return promo.toLocaleUpperCase() === 'RS' || promo.toLocaleUpperCase() === 'EPAM';
  }

  public isActivePromo(promo: string) {
    return this.activePromo.includes(promo.toLocaleUpperCase() as Promo);
  }

  public getCurSum() {
    return (this.totalSum * (100 - this.activePromo.length * 10)) / 100;
  }

  public clearCart() {
    stateService.cart = [];
    this.countsCart = [];
    this.totalCount = 0;
    this.totalSum = 0;
    this.save();
    headerService.update();
  }

  public render() {
    (this.container as CartList).node.innerHTML = '';
    if (paginationService.getCurPageProducts(stateService.cart).length == 0 && paginationService.curPage > 1)
      paginationService.curPage--;
    paginationService
      .getCurPageProducts(stateService.cart)
      .map(
        (product, index) =>
          new CartItem(
            (this.container as CartList).node,
            product,
            index + paginationService.productsPerPage * (paginationService.curPage - 1)
          )
      );
  }
}

type Promo = 'RS' | 'EPAM';
type PromoList = Record<Promo, number>;

const cartService = new CartService();
export default cartService;
