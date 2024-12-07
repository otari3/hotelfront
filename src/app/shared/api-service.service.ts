import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservedRooms, Room, filteredBooked } from './types';

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
    return this.api.get('http://127.0.0.1:8000/get-hotel/', {
      withCredentials: true,
    });
  }
  update_rooms(body: Room) {
    return this.api.put('http://127.0.0.1:8000/updaterooms/', body);
  }
  add_room(body: any) {
    return this.api.post('http://127.0.0.1:8000/insertrooms/', body);
  }
  get_room_info() {
    return this.api.get('http://127.0.0.1:8000/get-room-info/');
  }
  insert_user(body: any) {
    return this.api.post('http://127.0.0.1:8000/insert_user/', body);
  }
  get_filtered_rooms(queryurl: string) {
    return this.api.get<filteredBooked>(
      `http://127.0.0.1:8000/filter_rooms/${queryurl}`
    );
  }
  get_reserved_rooms(body: { id: number[] }) {
    return this.api.post<{ data: ReservedRooms[] }>(
      'http://127.0.0.1:8000/get_rooms/',
      body
    );
  }
  move_hotel(id: number) {
    return this.api.get(`http://127.0.0.1:8000/move_to_hotel/${id}`);
  }
}
