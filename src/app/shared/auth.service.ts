import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getting_item_localstorage(key: string) {
    return localStorage.getItem(key);
  }
  constructor() {}
}
