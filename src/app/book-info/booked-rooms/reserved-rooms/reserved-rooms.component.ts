import { Component, Input, input } from '@angular/core';
import { ReservedRooms } from '../../../shared/types';
import { ApiServiceService } from '../../../shared/api-service.service';

@Component({
  selector: 'app-reserved-rooms',
  templateUrl: './reserved-rooms.component.html',
  styleUrl: './reserved-rooms.component.scss',
})
export class ReservedRoomsComponent {
  constructor(private api: ApiServiceService) {}
  @Input() reservedRoom!: ReservedRooms;
  move_to_hotel() {
    if (!this.reservedRoom.in_hotel) {
      this.api.move_hotel(this.reservedRoom.id).subscribe({
        next: () => {
          alert('sucsefull');
        },
        error: (e) => {
          alert(`${e['error']['error']}`);
        },
      });
    } else {
      alert('run moveing to reserved query');
    }
  }
}
