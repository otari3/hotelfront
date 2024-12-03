import { Component, Input, OnInit } from '@angular/core';
import { Datum } from '../../shared/types';

@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.component.html',
  styleUrl: './booked-rooms.component.scss',
})
export class BookedRoomsComponent implements OnInit {
  @Input() data!: Datum;

  ngOnInit(): void {}
}
