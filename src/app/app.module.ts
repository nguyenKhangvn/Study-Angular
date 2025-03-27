import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { CreateStockReactiveComponent } from './stock/create-stock-reactive/create-stock-reactive.component';
import { HttpClientModule } from '@angular/common/http';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { RegisterComponent } from './register/register.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockItemComponent,
    CreateStockComponent,
    StockListComponent,
    CreateStockReactiveComponent,
    EntertainmentComponent,
    RegisterComponent,
    StockDetailsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
