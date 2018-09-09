import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/Router';

import { AppComponent } from './app.component';
import { MyHeaderComponent } from './myheader/myheader.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { RecipeListComponent } from './recipies/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipies/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipies/recipe-list/recipe-item/recipe-item.component';
import { ShopingListComponent } from './shoping-list/shoping-list.component';
import { ShopingEditComponent } from './recipies/shoping-edit/shoping-edit.component';
import { DropListDirective } from './shared/droplist.directive';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppRoutingModule } from './app-routing.module';
import { ShopingHttpService } from './shared/shopinghttp.service';
import {SelectedrecipeService} from './shared/Selectedrecipe.Service';
import {AuthService} from './shared/auth.service';
import { AuthGuardService } from './shared/authguard.service';
import { OrdersListComponent } from './orders-list/orders-list.component';
import {CartRecipeService} from './shared/Cartrecipe.service';

@NgModule({
  declarations: [
    AppComponent,
    MyHeaderComponent,
    RecipiesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShopingListComponent,
    ShopingEditComponent,
    DropListDirective,
    PagenotfoundComponent,
    OrdersListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ShopingHttpService, SelectedrecipeService, AuthService,
    CartRecipeService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
