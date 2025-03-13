import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-create-stock-reactive',
  templateUrl: './create-stock-reactive.component.html',
  styleUrls: ['./create-stock-reactive.component.css']
})
export class CreateStockReactiveComponent implements OnInit {
  userForm: FormGroup;
  public submitted: boolean = false;
  stockList: any[] = [];

  // FormGroup
  // public formStock = new FormGroup({
  // name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  // code: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  // price: new FormControl(null, [Validators.required])
  // })
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.loadStockServer();
  }

  ngOnInit(): void {
  }

  loadStockServer() {
    const stockData = {
      name: 'Điện thoại.',
      code: 'A001',
      price: 150000
    };
    this.patchStockForm(stockData);
  }

  patchStockForm(stockData: any) {
    this.userForm.patchValue({
      name: stockData.name,
      code: stockData.code,
      price: stockData.price
    });
  }
  submitForm() {
    if (this.userForm.valid) {
      this.submitted = true;
      const newStock = this.userForm.value;
      this.stockList.push(newStock);
      this.userForm.reset();
      console.log('Stock Created:', this.userForm.valid);
    }
     else {
      console.log('Form is invalid');
    }
  }
}
