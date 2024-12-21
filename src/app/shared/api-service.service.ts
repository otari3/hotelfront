import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report, ReservedRooms, Room, filteredBooked } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private api: HttpClient) {}
  getting_user(user: { email?: string | null; password?: string | null }) {
    return this.api.post(
      'https://hotelreservationbackend.onrender.com/login/',
      user
    );
  }
  getting_hotel_rooms() {
    return this.api.get(
      'https://hotelreservationbackend.onrender.com/selectallrooms/'
    );
  }
  get_hotel() {
    return this.api.get(
      'https://hotelreservationbackend.onrender.com/get-hotel/',
      {
        withCredentials: true,
      }
    );
  }
  update_rooms(body: Room) {
    return this.api.put(
      'https://hotelreservationbackend.onrender.com/updaterooms/',
      body
    );
  }
  add_room(body: any) {
    return this.api.post(
      'https://hotelreservationbackend.onrender.com/insertrooms/',
      body
    );
  }
  get_room_info() {
    return this.api.get(
      'https://hotelreservationbackend.onrender.com/get-room-info/'
    );
  }
  insert_user(body: any) {
    return this.api.post(
      'https://hotelreservationbackend.onrender.com/insert_user/',
      body
    );
  }
  get_filtered_rooms(queryurl: string, paginationurl: string) {
    return this.api.get<filteredBooked>(
      `https://hotelreservationbackend.onrender.com/filter_rooms/${queryurl}${paginationurl}`
    );
  }
  get_reserved_rooms(body: { id: number[] }) {
    return this.api.post<{ data: ReservedRooms[] }>(
      'https://hotelreservationbackend.onrender.com/get_rooms/',
      body
    );
  }
  move_hotel(id: number) {
    return this.api.get(
      `https://hotelreservationbackend.onrender.com/move_to_hotel/${id}`
    );
  }
  move_hotel_to_report(id: number) {
    return this.api.get(
      `https://hotelreservationbackend.onrender.com/move_to_report/${id}`
    );
  }
  delete_from_reservation(id: number) {
    return this.api.delete(
      `https://hotelreservationbackend.onrender.com/delete_from_reservation/${id}`
    );
  }
  dowloand_report(url: string) {
    return this.api.get<Blob>(url, {
      responseType: 'blob' as 'json',
    });
  }
  get_report(date?: string | null) {
    return this.api.get<{ data: Report[] }>(
      `https://hotelreservationbackend.onrender.com/get_report/${date}/`
    );
  }
  register(data: any) {
    return this.api.post(
      'https://hotelreservationbackend.onrender.com/inserthotel/',
      data
    );
  }
  delete_room(id: number | null | undefined) {
    return this.api.delete(
      `https://hotelreservationbackend.onrender.com/deleteroom/${id}`
    );
  }
}
