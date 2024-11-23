import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../shared/api-service.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private api_service: ApiServiceService,
    private auth_service: AuthService,
    private router: Router
  ) {}
  login_info = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });
  sending_login_info() {
    let email = this.login_info.value.email;
    let password = this.login_info.value.password;
    this.api_service
      .getting_user({ email: email, password: password })
      .subscribe({
        next: (data: any) => {
          this.auth_service.set_jwt_token(data['token']);
          this.router.navigate(['/home']);
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
}
