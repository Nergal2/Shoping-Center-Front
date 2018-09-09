import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Recipe} from '../recipies/recipe.model';
import {Cart} from '../orders-list/cart.model';

@Injectable()
export class CartRecipeService {

  public cartrecipieam: {numb: number, rec: Recipe} []= [];
  public amountinthecart= 0;
  public totalprice= 0;
  public carts: Cart[]= [];
  public cartsChanged= new Subject <Cart[]>();

  public pushRecipie(rec: Recipe) {
    let i = 0;
    let wasntpushed = true;
    while (wasntpushed) {
      if (this.cartrecipieam[i]) {
        if (this.cartrecipieam[i].rec.id === rec.id) {
          this.cartrecipieam[i].numb++;
          this.amountinthecart++;
          this.totalprice = this.totalprice + rec.price;
          wasntpushed = false;
        } else {
            i++; }
      } else {
          this.cartrecipieam.push({numb: 1, rec: rec});
          wasntpushed = false;
          this.amountinthecart++;
          this.totalprice = this.totalprice + rec.price;
      }
    }
  }

  public clearCart() {
    this.cartrecipieam.splice(0);
    this.amountinthecart = 0;
    this.totalprice = 0;
  }

  public setCarts(carts: Cart[]) {
    this.carts = carts;
    this.cartsChanged.next(this.carts.slice());
  }

  public getCarts() {
    return this.carts.slice();
  }

  public removeCart(i: number ) {
    this.carts.splice(i, 1);
    this.cartsChanged.next(this.carts.slice());
  }

  constructor() {}

}
