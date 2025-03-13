import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernames: string = '';
  passwords: string = '';
  errorMessage: string = '';
  
  constructor(
    private router: Router
  ) { }


  onSubmit() {
    if (this.usernames == 'khang' && this.passwords == '123') {
      this.router.navigate(['/stock/stock-item']);
    } else {
      this.errorMessage = 'Tên người dùng hoặc mật khẩu không đúng. Vui lòng thử lại.';
    }

  }
  ngOnInit(): void {
  }

}
