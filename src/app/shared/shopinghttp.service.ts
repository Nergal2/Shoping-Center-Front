import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Recipe} from '../recipies/recipe.model';
import {SelectedrecipeService} from './Selectedrecipe.Service';
import { AuthService } from './auth.service';
import {Cart} from '../orders-list/cart.model';
import {CartRecipeService} from './Cartrecipe.service';

@ Injectable()
export class ShopingHttpService {
    currenthost= 'http://localhost:4201';
    // http://localhost:8080 http://192.168.99.100:58080 http://wildfly:8080

    constructor (private http: Http,
        private selservice: SelectedrecipeService,
        private authservice: AuthService,
        private cartservice: CartRecipeService) {}

    storerecipies () {
       const headers = new Headers({'Content-Type': 'application/json'});
       console.log(this.authservice.getToken());
       return this.http.put(this.currenthost + '/mavenweb1-1.0-SNAPSHOT/rest/recipies/all?auth='
        + this.authservice.getToken(), this.selservice.getrecipes(), {headers: headers});
    }

    getrecipies () {
      const headers = new Headers({'Accept': 'application/json' });
      this.http.get(this.currenthost + '/mavenweb1-1.0-SNAPSHOT/rest/recipies/all', {headers: headers})
        .subscribe((response: Response) => {
          const recipies: Recipe[] = response.json();
          this.selservice.setrecipes(recipies);
        });
    }

  public storeCart(cartrecipieam: {numb: number, rec: Recipe}[],
                   totalprice: number, name: string, email: string, sex: string) {
    const cart = new Cart(name, email, sex, cartrecipieam, totalprice, null);
    const headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.currenthost + '/mavenweb1-1.0-SNAPSHOT/rest/cart/new',
        cart, {headers: headers});
    }

  public getCarts () {
    const headers = new Headers({
      'Accept': 'application/json'
    });
    //  `${this.currenthost}/mavenweb1-1.0-SNAPSHOT/rest/cart/all?auth=${token}`
    const token = this.authservice.getToken();
    this.http.get(this.currenthost + '/mavenweb1-1.0-SNAPSHOT/rest/cart/all?auth='
      + token, {headers: headers})
      .subscribe((response: Response) => {
        const cartsmix: any[] = response.json();
        const carts: Cart[] = [];
        for (const index in cartsmix) {
          carts.push((cartsmix[index]));
        }
        this.cartservice.setCarts(carts.slice());
    });
  }

  public storeCarts() {
    /**return this.http.put('https://shoping-center-4dda1.firebaseio.com/carts.json?auth='
                 +this.authservice.getToken(), this.cartservice.getCarts());  */
    const headers = new Headers({'Content-Type': 'application/json'});
        console.log(this.authservice.getToken());
        return this.http.put(this.currenthost + '/mavenweb1-1.0-SNAPSHOT/rest/cart/all?auth='
        + this.authservice.getToken()
        , this.cartservice.getCarts(), {headers: headers});
    }
}
