import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report, ReservedRooms, Room, filteredBooked } from './types';

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
  get_filtered_rooms(queryurl: string, paginationurl: string) {
    return this.api.get<filteredBooked>(
      `http://127.0.0.1:8000/filter_rooms/${queryurl}${paginationurl}`
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
  move_hotel_to_report(id: number) {
    return this.api.get(`http://127.0.0.1:8000/move_to_report/${id}`);
  }
  delete_from_reservation(id: number) {
    return this.api.delete(
      `http://127.0.0.1:8000/delete_from_reservation/${id}`
    );
  }
  dowloand_report(url: string) {
    return this.api.get<Blob>(url, {
      responseType: 'blob' as 'json',
    });
  }
  get_report(date?: string | null) {
    return this.api.get<{ data: Report[] }>(
      `http://127.0.0.1:8000/get_report/${date}/`
    );
  }
  register(data: any) {
    return this.api.post('http://127.0.0.1:8000/inserthotel/', data);
  }
  delete_room(id: number | null | undefined) {
    return this.api.delete(`http://127.0.0.1:8000/deleteroom/${id}`);
  }
}
