import { Component, OnInit, ViewChild } from '@angular/core';
import {CartRecipeService} from '../shared/Cartrecipe.service';

import {Recipe} from '../recipies/recipe.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/Router';
import { SelectedrecipeService } from '../shared/Selectedrecipe.Service';
import { ShopingHttpService } from '../shared/shopinghttp.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit {

  genders= ['male', 'female', 'Androgyne — гермафродит',
           'FTM', 'MTF', 'Transgender Female', 'Transgender Male',
           'Transmasculine — «за пределами мужского»',
           'Two-spirit (Бердаче) — имеющий две души'];

  @ViewChild('f') signupForm: NgForm;

  constructor(private cartservice: CartRecipeService,
              private authservice: AuthService,
              private router: Router,
              private shopingHttpService: ShopingHttpService ) { }

  onSubmit() {
    if (this.cartservice.amountinthecart === 0) {
      this.authservice.signInServer(this.signupForm.value.email,
        this.signupForm.value.username + ' ' + this.signupForm.value.secret);
      //  this.authservice.signInUser(this.signupForm.value.email,
      //                              this.signupForm.value.username+' '+this.signupForm.value.secret);
      //  this.signupForm.reset();
      //  this.router.navigate(['/catalogue/edit']);
    }
    else {
      this.shopingHttpService.storeCart(
        this.cartservice.cartrecipieam,
        this.cartservice.totalprice,
        this.signupForm.value.username,
        this.signupForm.value.email,
        this.signupForm.value.secret
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.signupForm.reset();
          this.cartservice.clearCart();
        },
        (error) => {
          console.log(error);
          this.signupForm.reset();
          this.cartservice.clearCart();
        }
      );
    }
  //  this.cartservice.clearCart();
  //  console.log(this.authservice.token);
  //  this.router.navigate(['/catalogue/edit']);
  }

  ngOnInit() {}

}
