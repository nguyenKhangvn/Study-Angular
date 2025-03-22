import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent {
  @Input() stock!: Stock;
  @Output() edit = new EventEmitter<Stock>();
  @Output() delete = new EventEmitter<any>();

  public isEditFormVisible: boolean = false;

  toggleFavorite() {
    console.log('Toggling favorite for:', this.stock);
    this.stock.favorite = !this.stock.favorite;
  }

  editStock() {
    console.log('Editing stock:', this.stock);
    this.isEditFormVisible = true;
  }

  onEditStock(stock: Stock): void {
    console.log('Saving edited stock:', stock);
    this.isEditFormVisible = false;
    this.edit.emit(stock); 
  }

  deleteStock() {
    console.log('Deleting stock:', this.stock.id);
    this.delete.emit(this.stock.id);
  }

  cancelEdit() {
    this.isEditFormVisible = false;
  }
}
