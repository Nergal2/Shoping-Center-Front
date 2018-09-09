import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/Router';

import {Recipe} from '../recipe.model';
import {SelectedrecipeService} from '../../shared/Selectedrecipe.Service';
import {CartRecipeService} from '../../shared/Cartrecipe.service';
import { Subscription } from 'rxjs/Subscription';
import { ShopingHttpService } from '../../shared/shopinghttp.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: []
})
export class RecipeListComponent implements OnInit, OnDestroy  {
    recipies: Recipe[];
    subscrrec: Subscription;

  addtocart() {
    if (this.selservice.selectedRecipie) {
      this.cartservice.pushRecipie(this.selservice.selectedRecipie);
      this.selservice.setcurrentRecipieid(undefined);
    }
    this.router.navigate([''], {relativeTo: this.route});
  }

  constructor(private selservice: SelectedrecipeService,
              private cartservice: CartRecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private shopingHttpService: ShopingHttpService,
              private authservice: AuthService,
        ) { }

  ngOnInit() {
    this.subscrrec = this.selservice.recipesChanged
      .subscribe((recipies: Recipe[]) => {
        this.recipies = recipies;
      });
    this.shopingHttpService.getrecipies();
  }

  ngOnDestroy() {
    this.subscrrec.unsubscribe(); }

}

