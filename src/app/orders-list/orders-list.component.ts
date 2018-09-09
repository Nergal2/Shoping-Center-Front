import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ShopingHttpService } from '../shared/shopinghttp.service';
import {CartRecipeService} from '../shared/Cartrecipe.service';
import {Cart} from './cart.model';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  public carts: Cart[]= [];
  subscr: Subscription;

  removeCart(i: number) {
    const ind = i;
    this.cartservice.removeCart(ind);
  }

  constructor(
    private  cartservice: CartRecipeService,
    private  shopingHttpService: ShopingHttpService) { }

  ngOnInit() {
      this.subscr = this.cartservice.cartsChanged.subscribe((carts: Cart[]) => {
      this.carts = carts;
    });
    this.shopingHttpService.getCarts();
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

}
