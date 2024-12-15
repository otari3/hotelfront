import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../shared/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private api: ApiServiceService, private router: Router) {}
  registerForm = new FormGroup({
    name: new FormControl(''),
    adress: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmite() {
    let form = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name,
      address: this.registerForm.value.adress,
    };
    this.api.register(form).subscribe({
      next: () => {
        alert('we registered');
        this.router.navigate(['/login']);
      },
      error: (e) => {
        alert(`error ${e['error']['error']}`);
      },
    });
  }
}
