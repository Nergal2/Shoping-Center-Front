import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/Router';

import { RecipiesComponent } from './recipies/recipies.component';
import { RecipeDetailComponent } from './recipies/recipe-detail/recipe-detail.component';
import { ShopingEditComponent } from './recipies/shoping-edit/shoping-edit.component';
import { ShopingListComponent } from './shoping-list/shoping-list.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuardService } from './shared/authguard.service';
import { OrdersListComponent } from './orders-list/orders-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/catalogue', pathMatch: 'full'},
    { path: 'catalogue', component: RecipiesComponent, children: [
      {path: '', component: RecipeDetailComponent},
      {path: 'edit', component: ShopingEditComponent, canActivate: [AuthGuardService]},
      {path: 'edit/:id', component: ShopingEditComponent, canActivate: [AuthGuardService]},
      {path: ':id', component: RecipeDetailComponent}
      ]},
    { path: 'cart', component: ShopingListComponent},
    { path: 'orderslist', component: OrdersListComponent, canActivate: [AuthGuardService]},
    {  path: 'not-found', component: PagenotfoundComponent},
    {  path: '**', redirectTo: '/not-found'}
    ];

@NgModule({  imports: [
    RouterModule.forRoot(appRoutes) ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
