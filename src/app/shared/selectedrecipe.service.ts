import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Recipe} from '../recipies/recipe.model';

@Injectable()
export class SelectedrecipeService {
  private recipies: Recipe[]= [];
  public selectedRecipieind: number;
  public selectedRecipie: Recipe;
  public recipesChanged= new Subject <Recipe[]>();

  public setrecipes(recipies: Recipe[]) {
    this.recipies = recipies;
    this.recipesChanged.next(this.recipies.slice());
  }

  public getrecipes() {
    return this.recipies.slice();
  }

  public pushrecipie(name: string, price: number, desc: string, imgparh: string) {
    this.recipies.push(
      new  Recipe ((Math.random() * 10000), name, price, desc, imgparh));
      this.recipesChanged.next(this.recipies.slice());
      this.selectedRecipieind = undefined;
  }

  public updaterecipie(name: string, price: number, desc: string, imgparh: string) {
    this.recipies[this.selectedRecipieind].name = name;
    this.recipies[this.selectedRecipieind].price = price;
    this.recipies[this.selectedRecipieind].description = desc;
    this.recipies[this.selectedRecipieind].imagepath = imgparh;
    this.recipesChanged.next(this.recipies.slice());
    this.selectedRecipieind = undefined;
  }

  public removecurrentrecipe() {
    this.recipies.splice(this.selectedRecipieind, 1);
    this.selectedRecipie = undefined;
    this.selectedRecipieind = undefined;
    this.recipesChanged.next(this.recipies.slice());
    this.selectedRecipieind = undefined;
  }

  public setcurrentRecipieid (ind: number) {
    if (ind !== undefined) {
      this.selectedRecipie = this.recipies[ind];
      this.selectedRecipieind = ind;
    }
    else {
      this.selectedRecipie = undefined;
      this.selectedRecipieind = undefined;
    }
  }

  public getcurrentRecipie() {
    return this.recipies[this.selectedRecipieind];
  }

  constructor( ) { }

}
