import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  @Input() stockList: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
