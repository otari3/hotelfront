import { Component, Input } from '@angular/core';
import { Room } from '../shared/types';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent {
  @Input() room!: Room;
}
