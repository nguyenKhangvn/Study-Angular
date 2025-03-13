import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent implements OnInit {
  public stock!: Stock;
  public submitted: boolean = false;
  public exchange_types = ['NYSE', 'NASDAQ', 'OTHER'];
  public isConfirmed: boolean = false;

  constructor() {
    this.stock = new Stock('', '', null as any, 0, 'NASDAQ');
   }

  ngOnInit(): void {

  }

  createStock(): void {
    if (this.isConfirmed) {
      this.submitted = true;
      console.log('Stock Created:', this.stock);
    }
  }

  setStockPrice(price : number): void {
    this.stock.price = price;
    this.stock.previousPrice
  }
}
