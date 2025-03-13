import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})

export class StockItemComponent implements OnInit {
  public stock!: Stock;
  selectedForm: string = '';
  constructor() { }

  ngOnInit(): void {
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80, '')
  }

  toggleFavorite() {
    console.log('We are toggling the favorite state for this stock');
    this.stock.favorite = !this.stock.favorite;
  }
}
