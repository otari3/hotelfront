import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../shared/types';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../shared/api-service.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent implements OnInit {
  constructor(private api: ApiServiceService) {}
  @Input() room!: Room;
  room_from = new FormGroup({
    price: new FormControl<number>(0),
    room_number: new FormControl<number>(0),
    imgs: new FormControl(''),
  });
  updating_room() {
    let updatedRoom: Room = {
      id: this.room['id'],
      type: this.room['type'],
      price: this.room_from.value['price'],
      room_number: this.room_from.value['room_number'],
      imgs: this.room_from.value['imgs'],
    };
    this.api.update_rooms(updatedRoom).subscribe({
      next: (data) => {
        console.log(data);
        this.room = updatedRoom;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  ngOnInit(): void {
    this.room_from.patchValue({
      price: this.room['price'],
      room_number: this.room['room_number'],
      imgs: this.room['imgs'],
    });
  }
}
