import { Component, Input, OnInit } from '@angular/core';
import { Datum, ReservedRooms } from '../../shared/types';
import { ApiServiceService } from '../../shared/api-service.service';

@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.component.html',
  styleUrl: './booked-rooms.component.scss',
})
export class BookedRoomsComponent implements OnInit {
  constructor(private api: ApiServiceService) {}
  @Input() data!: Datum;
  reseredRooms!: ReservedRooms[];
  open = false;
  empty = true;
  gettingRooms() {
    if (!this.open) {
      this.api.get_reserved_rooms({ id: this.data.reservation_ids }).subscribe({
        next: (resData) => {
          this.reseredRooms = resData['data'];
        },
        error: (e) => {
          alert(e['error']['error']);
        },
      });
      this.open = true;
    } else {
      this.reseredRooms = [];
      this.open = false;
    }
  }
  move_to_hotel(item: ReservedRooms, index: number) {
    if (!item.in_hotel) {
      this.api.move_hotel(item.id).subscribe({
        next: () => {
          alert('we added in hotel');
          this.reseredRooms.splice(index, 1);
          if (!this.reseredRooms.length) {
            this.empty = false;
          }
        },
        error: (e) => {
          alert(`${e['error']['error']}`);
        },
      });
    } else {
      this.api.move_hotel_to_report(item.id).subscribe({
        next: () => {
          alert('we added to report');
          this.reseredRooms.splice(index, 1);
          if (!this.reseredRooms.length) {
            this.empty = false;
          }
        },
        error: (e) => {
          alert(`smth went wrong ${e['error']['error']}`);
        },
      });
    }
  }
  onDelete(index: number) {
    this.api.delete_from_reservation(this.reseredRooms[index].id).subscribe({
      next: () => {
        alert('room deleted');
        this.reseredRooms.splice(index, 1);
        if (!this.reseredRooms.length) {
          this.empty = false;
        }
      },
      error: () => {
        alert('there is some kind of error');
      },
    });
  }
  ngOnInit(): void {}
}
