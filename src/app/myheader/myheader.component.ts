import { Component, Output, EventEmitter } from '@angular/core';
import {CartRecipeService} from '../shared/Cartrecipe.service';
import { AuthService } from '../shared/auth.service';
import { ShopingHttpService } from '../shared/shopinghttp.service';
import {Router} from '@angular/Router';

@Component ({
  selector: 'app-header',
  templateUrl: './myheader.component.html',
  styleUrls: ['./myheader.component.css']
})
export class MyHeaderComponent {
 //   @Output () navigationselected= new EventEmitter <String> ();
 //   onselectcart () {
 //       this.navigationselected.emit('cart');
 //    }
 //    onselectcatalog() {
 //       this.navigationselected.emit('catalog');
 //    }

  getCartsData() {
    this.shopingHttpService.getCarts();
  }

  saveCartsData() {
    if (this.router.url === '/orderslist') {
      this.shopingHttpService.storeCarts().subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
    if (this.router.url.match('/catalogue/edit')) {
      this.shopingHttpService.storerecipies().subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  LogOut() {
    this.authservice.LogOut();
  }

  constructor(private cartservice: CartRecipeService,
              private authservice: AuthService,
              private shopingHttpService: ShopingHttpService,
              private router: Router) { }

}
