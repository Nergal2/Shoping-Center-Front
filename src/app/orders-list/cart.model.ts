import {Recipe} from '../recipies/recipe.model';

export class Cart {
    public name: string;
    public email: string;
    public sex: string;
    public cart: {numb: number, rec: Recipe}[];
    public price: number;
    public orderId: string;

  constructor(name: string, email: string, sex: string, cart: {numb: number, rec: Recipe}[], price: number, orderId: string) {
    this.name = name;
    this.email = email;
    this.sex = sex;
    this.cart = cart;
    this.price = price;
    this.orderId = orderId;
  }
}
