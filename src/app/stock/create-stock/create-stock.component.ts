// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { Stock } from 'src/app/model/stock';
// import { StockService } from 'src/app/services/stock.service';

// @Component({
//   selector: 'app-create-stock',
//   templateUrl: './create-stock.component.html',
//   styleUrls: ['./create-stock.component.css']
// })
// export class CreateStockComponent implements OnInit {
  
//   public stock: Stock = new Stock('', '', 0, 0, 'NASDAQ');
//   public submitted: boolean = false;
//   public exchange_types = ['NYSE', 'NASDAQ', 'OTHER'];
//   public isConfirmed: boolean = false;
//   @Output() stockCreated = new EventEmitter<Stock>();

//   constructor(private stockService: StockService) {}

//   ngOnInit(): void {
//     this.resetStock();
//   }

//   createStock(): void {
//     if (!this.isConfirmed) return;
//     this.stockCreated.emit(this.stock);
//     this.submitted = true;

//     console.log('Stock Created:', this.stock);

//     this.resetStock(); 
//   }

//   resetStock(): void {
//     this.stock = new Stock('', '', 0, 0, 'NASDAQ');
//     this.isConfirmed = false;
//   }

//   setStockPrice(price: number): void {
//     this.stock.price = price;
//   }
// }


import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Stock } from 'src/app/model/stock';
import * as CryptoJS from 'crypto-js';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent implements OnInit {
  
  public stock: Stock = new Stock('', '', '', 0, 0, 'NASDAQ');  
  public submitted: boolean = false;
  public exchange_types = ['NYSE', 'NASDAQ', 'OTHER'];
  public isConfirmed: boolean = false;
  public errorMessage: string = '';
  public isShowCreateForm: boolean = true;
  
  // @Output() stockCreated = new EventEmitter<Stock>();
  // @Output() closeForm = new EventEmitter<void>();

  constructor(private stockService : HttpService, private router: Router) {}

  ngOnInit(): void {
    this.resetStock();
  }

  createStock(): void {
    const rawId = (Math.floor(Math.random() * 10000) + 1).toString();
    const encodedId = CryptoJS.SHA256(rawId).toString(CryptoJS.enc.Hex);
    if (!this.isConfirmed) return;
    const newStock = new Stock(
      encodedId,
      this.stock.name,
      this.stock.code,
      this.stock.price,
      this.stock.previousPrice,
      this.stock.exchange
    );

    this.submitted = true;

    this.stockService.addStock(newStock).subscribe({
        next: () => {
          this.resetStock();
        },
        error: (err) => {
          console.error('Error creating stock:', err);
          this.errorMessage = 'Lỗi khi tạo cổ phiếu';
        }
    });
  }
  resetStock(): void {
    this.stock = new Stock('', '', '', 0, 0, 'NASDAQ');
    this.isConfirmed = false;
    this.errorMessage = '';
  }

  setStockPrice(price: number): void {
    this.stock.price = price;
  }

  closeCreateForm() {
    // this.closeForm.emit();
    this.isShowCreateForm = false;
    this.router.navigate(['/stock/stock-list']);
  }
}
