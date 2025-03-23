// import { Component, OnInit } from '@angular/core';
// import { Stock } from 'src/app/model/stock';
// import { StockService } from 'src/app/services/stock.service';

// @Component({
//   selector: 'app-stock-list',
//   templateUrl: './stock-list.component.html',
//   styleUrls: ['./stock-list.component.css']
// })
// export class StockListComponent implements OnInit {
//   public stocks: Stock[] = [];
//   public filteredStocks: Stock[] = [];
//   public searchKeyword: string = '';

//   constructor(private service: StockService) {}

//   ngOnInit(): void {
//     // Đăng ký lắng nghe danh sách cổ phiếu
//     this.service.getStocks().subscribe(data => {
//       this.stocks = data;
//       this.filteredStocks = data; // Mặc định hiển thị toàn bộ danh sách
//     });
//   }

//   createStock(newStock: Stock): void {
//     this.service.addStock(newStock);
//   }

//   editStock(stock: Stock): boolean {
//     const success = this.service.updateStock(stock);
//     if (!success) {
//       console.error('Không tìm thấy cổ phiếu để cập nhật');
//     }
//     return success;
//   }

//   deleteStock(code: string): boolean {
//     const success = this.service.deleteStock(code);
//     if (!success) {
//       console.error(`Không tìm thấy cổ phiếu có mã ${code} để xóa`);
//     }
//     return success;
//   }

//   toggleFavorite(stock: Stock): void {
//     stock.favorite = !stock.favorite;
//   }

//   search(): void {
//     debugger
//     if (this.searchKeyword.trim() === '') {
//       this.filteredStocks = [];
//     } else {
//       this.service.searchStocks(this.searchKeyword).subscribe(data => {
//         this.filteredStocks = data;
//       });
//     }
//   }
// }
import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/model/stock';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  @Input() stock!: Stock;
  public stocks: Stock[] = [];
  public searchKeyword: string = '';
  public filteredStocks: Stock[] = [];
  public editingStockId: string | null = null;
  showFavoritesOnly: boolean = false;
  public favoriteStocks: Stock[] = [];

  constructor(private stockService: HttpService) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe({
      next: (data) => {
        this.stocks = data.map(stock => new Stock(stock.id, stock.name, stock.code, stock.price, stock.previousPrice, stock.exchange));
        this.filteredStocks = [...this.stocks];
      },
      error: (error) => {
        console.error('Error loading stocks:', error);
      }
    });
  }
  

  deleteStock(id: string): void {
    this.stockService.deleteStock(id).subscribe(() => {
      this.stocks = this.stocks.filter(stock => stock.id !== id);
      this.filteredStocks = this.filteredStocks.filter(stock => stock.id !== id);
    });
  }

  editStock(stock: Stock): void {
    this.stockService.updateStock(stock).subscribe(updatedStock => {
      const index = this.stocks.findIndex(s => s.id === stock.id);
      if (index !== -1) {
        const updatedStocks = [...this.stocks];
        updatedStocks[index] = { ...updatedStock, isPositiveChange: () => updatedStock.price >= updatedStock.previousPrice }; // Cập nhật phần tử
        this.stocks = updatedStocks; 
      }
      this.editingStockId = null;
    });
  }
  
  

  

  onEditStock(stock: Stock) {
    console.log('Editing stock:', this.stock);
    this.editingStockId = stock.id;
  }

  createStock(newStock: Stock): void {
    this.stockService.addStock(newStock).subscribe(addedStock => {
      this.stocks.push(addedStock);
      this.filteredStocks.push(newStock);
    });
    this.loadStocks();
  }

  search(): void {
    if (this.searchKeyword.trim() === '') {
      this.filteredStocks = this.stocks;
    } else {
      this.filteredStocks = this.stocks.filter(stock =>
        stock.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        stock.code.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }

  cancelEdit() {
    this.editingStockId = null;
  }

  onToggleFavorite(stock: Stock): void {
    console.log('Toggling favorite for:', stock);
    stock.favorite = !stock.favorite;
  }

  toggleFavoriteFilter(): void {
    this.showFavoritesOnly = !this.showFavoritesOnly;
    if (this.showFavoritesOnly) {
      this.filteredStocks = this.stocks.filter(stock => stock.favorite);
    } else {
      this.filteredStocks = this.stocks;
    }
  }
}