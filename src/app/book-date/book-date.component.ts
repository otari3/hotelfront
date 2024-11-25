import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';

@Component({
  selector: 'app-book-date',
  templateUrl: './book-date.component.html',
  styleUrl: './book-date.component.scss',
})
export class BookDateComponent implements OnInit {
  constructor(private api: ApiServiceService) {}
  rooms!: { room_number: number; id: number; price: number }[];
  dateFilter = (date: Date | null) => {
    let dateTest = '2024-11-24';
    const dateString = date?.toISOString().split('T')[0];
    if (dateTest == dateString) {
      return false;
    }
    return true;
  };
  ngOnInit(): void {
    this.api.get_room_info().subscribe({
      next: (data: any) => {
        this.rooms = data['rooms'];
      },
      error: (e) => {
        alert(`error ${e}`);
      },
    });
  }
}
