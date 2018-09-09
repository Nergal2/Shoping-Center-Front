import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/Router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { SelectedrecipeService} from '../../shared/Selectedrecipe.Service';
import { Recipe} from '../recipe.model';
import { ShopingHttpService } from '../../shared/shopinghttp.service';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit {
  recipeForm: FormGroup;

  onCancel() {
    this.recipeForm.reset();
      if (this.selservice.selectedRecipieind !== undefined) {
        this.router.navigate(['../'], {relativeTo: this.route});
      }
    this.selservice.setcurrentRecipieid(undefined);
  }

  onRemove() {
    this.selservice.removecurrentrecipe();
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    if (this.selservice.selectedRecipieind === undefined) {
      this.selservice.pushrecipie (
        this.recipeForm.value.name,
        this.recipeForm.value.price,
        this.recipeForm.value.description,
        this.recipeForm.value.imagepath
      );
    }
    else {
      this.selservice.updaterecipie(
        this.recipeForm.value.name,
        this.recipeForm.value.price,
        this.recipeForm.value.description,
        this.recipeForm.value.imagepath);
        this.router.navigate(['../'], {relativeTo: this.route}
      );
    }
    this.recipeForm.reset();
    // console.log(this.recipeForm)
  }

  constructor(private selservice: SelectedrecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private shopingHttpService: ShopingHttpService) { }

  ngOnInit() {
    this.recipeForm = new FormGroup ({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'imagepath': new FormControl(null, Validators.required)
    });
    this.route.params.subscribe((params: Params) => {
      // this.id=+params['id'];
      if (params['id']) {
        this.selservice.setcurrentRecipieid(+params['id']);
        this.recipeForm.setValue({
          'name': this.selservice.selectedRecipie.name,
          'price': this.selservice.selectedRecipie.price,
          'description': this.selservice.selectedRecipie.description,
          'imagepath': this.selservice.selectedRecipie.imagepath
        });
      }
    });
  }

}
