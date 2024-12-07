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
  ngOnInit(): void {}
}
