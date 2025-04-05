import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'src/app/model/stock';
import { HttpService } from 'src/app/services/http.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  public stock: Stock | null = null;

  constructor(
    private route: ActivatedRoute,
    private stockService: HttpService
  ) {}

  ngOnInit() {
    const stockId = this.route.snapshot.paramMap.get('id');
  
    if (stockId) {
      this.stockService.getStockById(stockId).subscribe(stock => {
        this.stock = stock;
      });
    } else {
      console.error('No stock ID found in route');
    }
  }
  

  loadStockDetails(id: string): void {
    this.stockService.getStockById(id).subscribe({
      next: (data) => {
        this.stock = data;
      },
      error: (err) => {
        console.error('Error loading stock details:', err);
      }
    });
  }

  goBack(): void {
    window.history.back();
  }
}
