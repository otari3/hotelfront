import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { filteredBooked } from '../shared/types';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss',
})
export class BookInfoComponent implements OnInit {
  constructor(private api: ApiServiceService) {}
  bookedRooms!: filteredBooked;
  ngOnInit(): void {
    this.api.get_filtered_rooms('').subscribe((data) => {
      this.bookedRooms = data;
    });
  }
}