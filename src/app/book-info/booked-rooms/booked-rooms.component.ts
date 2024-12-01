import { Component, Input } from '@angular/core';
import { Datum } from '../../shared/types';

@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.component.html',
  styleUrl: './booked-rooms.component.scss',
})
export class BookedRoomsComponent {
  @Input() data!: Datum;
}
