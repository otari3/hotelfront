import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getting_item_localstorage(key: string) {
    return localStorage.getItem(key);
  }
  set_jwt_token(jwt_token: string) {
    localStorage.setItem('token', jwt_token);
  }
  constructor() {}
}
