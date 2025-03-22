import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stock } from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocks: Stock[] = [
    new Stock('1', 'Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
    new Stock('2', 'Test Stock Company2', 'MAC', 90, 85, 'NYSE'),
  ];

  private stocksSubject = new BehaviorSubject<Stock[]>(this.stocks);

  constructor() {}

  getStocks(): Observable<Stock[]> {
    return this.stocksSubject.asObservable();
  }

  getStockByCode(code: string): Observable<Stock | undefined> {
    return new Observable(observer => {
      const stock = this.stocks.find(s => s.code === code);
      observer.next(stock);
      observer.complete();
    });
  }

  addStock(stock: Stock): void {
    this.stocks.push(stock);
    this.stocksSubject.next([...this.stocks]);
  }

  updateStock(updatedStock: Stock): boolean {
    const index = this.stocks.findIndex(s => s.code === updatedStock.code);
    if (index !== -1) {
      this.stocks[index] = updatedStock;
      this.stocksSubject.next([...this.stocks]);
      return true;
    }
    return false;
  }

  deleteStock(code: string): boolean {
    const initialLength = this.stocks.length;
    this.stocks = this.stocks.filter(stock => stock.code !== code);
    if (this.stocks.length < initialLength) {
      this.stocksSubject.next([...this.stocks]);
      return true;
    }
    return false;
  }

  searchStocks(keyword: string): Observable<Stock[]> {
    return new Observable(observer => {
      const lowerKeyword = keyword.toLowerCase();
      const result = this.stocks.filter(stock =>
        stock.name.toLowerCase().includes(lowerKeyword) ||
        stock.code.toLowerCase().includes(lowerKeyword)
      );
      observer.next(result);
      observer.complete();
    });
  }
}
