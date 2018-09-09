import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';
import {SelectedrecipeService} from '../../shared/Selectedrecipe.Service';
import { ActivatedRoute, Params } from '@angular/Router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers: []
})
export class RecipeDetailComponent implements OnInit {

   id: number;

   constructor(private selservice: SelectedrecipeService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.selservice.setcurrentRecipieid(this.id);
      }
    );
  }

}
