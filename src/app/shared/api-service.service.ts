import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private api: HttpClient) {}
  getting_user(user: { email?: string | null; password?: string | null }) {
    return this.api.post('http://127.0.0.1:8000/login/', user);
  }
  getting_hotel_rooms() {
    return this.api.get('http://127.0.0.1:8000/selectallrooms/');
  }
  get_hotel() {
    return this.api.get('http://127.0.0.1:8000/get-hotel/');
  }
}
