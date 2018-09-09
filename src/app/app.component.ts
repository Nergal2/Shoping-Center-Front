import { Component, OnInit } from '@angular/core';
import {SelectedrecipeService} from './shared/Selectedrecipe.Service';
import {Recipe} from './recipies/recipe.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {

  selectedpart: String= 'catalog';
  navigationRun(option: string) {
    this.selectedpart = option;
  }


  constructor(private selservice: SelectedrecipeService) { }
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDFJPAuXaCEA5vbb5WqItMoM50SeoAGhDY',
      authDomain: 'shoping-center-4dda1.firebaseapp.com'});
  }

}
