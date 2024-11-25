import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../shared/api-service.service';

@Component({
  selector: 'app-add-room-form',
  templateUrl: './add-room-form.component.html',
  styleUrl: './add-room-form.component.scss',
})
export class AddRoomFormComponent {
  constructor(private api: ApiServiceService) {}
  addRoomForm = new FormGroup({
    roomNumber: new FormControl<number>(0),
    roomType: new FormControl(''),
    roomPrice: new FormControl<number>(0),
    imgs: new FormControl(''),
  });
  addRoom() {
    const room = {
      type: this.addRoomForm.value.roomType,
      price: this.addRoomForm.value.roomPrice,
      room_number: this.addRoomForm.value.roomNumber,
      imgs: this.addRoomForm.value.imgs,
    };
    this.api.add_room(room).subscribe({
      next: () => {
        alert('room added');
      },
      error: (e) => {
        alert(`error ${e['error']['error']}`);
      },
    });
  }
}
