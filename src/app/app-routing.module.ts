import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import * as path from 'path';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { RegisterComponent } from './register/register.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent 
  },
  {
    path: 'stock/stock-list',
    component: StockListComponent
  },
  {
    path: 'stock/stock-details/:id',
    component: StockDetailsComponent
  },
  {
    path: 'entertainment',
    component: EntertainmentComponent
  },
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'register',
    component: RegisterComponent 
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
