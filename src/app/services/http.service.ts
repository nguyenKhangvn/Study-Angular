import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Stock } from '../model/stock';

export interface IStock {
  id: string;
  name: string;
  code: string;
  price: number;
  previousPrice: number;
  exchange: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:3000/stocks';

  constructor(private http: HttpClient) {}

  // Lấy danh sách cổ phiếu
  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl).pipe(
      map(stocks => stocks.map(stock => new Stock(
        stock.id,
        stock.name,
        stock.code,
        stock.price,
        stock.previousPrice,
        stock.exchange
      )))
    );
  }

  // Thêm cổ phiếu mới
  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.apiUrl, stock).pipe(
      map(updatedStock => new Stock(
        updatedStock.id,
        updatedStock.name,
        updatedStock.code,
        updatedStock.price,
        updatedStock.previousPrice,
        updatedStock.exchange,
      ))
    );
  }

  // Cập nhật cổ phiếu
  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiUrl}/${stock.id}`, stock).pipe(
      map(updatedStock => new Stock(
        updatedStock.id,
        updatedStock.name,
        updatedStock.code,
        updatedStock.price,
        updatedStock.previousPrice,
        updatedStock.exchange,
      ))
    );
  }

  // Xóa cổ phiếu
  deleteStock(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchStocks(keyword: string): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}?q=${keyword}`);
  }
}

