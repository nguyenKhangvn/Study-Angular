import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.token) {
            this.authService.saveToken(res.token);
            this.message = 'Đăng nhập thành công!';
            setTimeout(() => this.router.navigate(['/stock/stock-list']), 1000);
          } else {
            this.message = 'Sai email hoặc mật khẩu!';
          }
        },
        error: () => {
          this.message = 'Lỗi server! Vui lòng thử lại.';
        }
      });
    }
  }
  ngOnInit(): void {}
}
