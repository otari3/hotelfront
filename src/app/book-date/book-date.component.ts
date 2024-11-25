import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-date',
  templateUrl: './book-date.component.html',
  styleUrl: './book-date.component.scss',
})
export class BookDateComponent implements OnInit {
  constructor(private api: ApiServiceService) {}
  rooms!: { room_number: number; id: number; price: number }[];

  hottelBookingForm = new FormGroup({
    userid: new FormControl(''),
    username: new FormControl(''),
    checkIn: new FormControl(''),
    checkOut: new FormControl(''),
    roomNumber: new FormControl(''),
    totalNight: new FormControl(0),
    totalPrice: new FormControl(0),
  });

  dateFilter = (date: Date | null) => {
    let dateTest = '2024-11-24';
    const dateString = date?.toISOString().split('T')[0];
    if (dateTest == dateString) {
      return false;
    }
    return true;
  };

  numberOfRoomsOnChange() {
    this.hottelBookingForm.controls.roomNumber.valueChanges.subscribe((s) => {
      let room = this.rooms.find((item) => {
        return item.room_number == Number(s);
      });
      if (room) {
        this.hottelBookingForm.patchValue({
          totalPrice: room.price,
        });
      }
    });
  }

  sendingDate() {
    console.log(this.hottelBookingForm);
  }

  ngOnInit(): void {
    this.api.get_room_info().subscribe({
      next: (data: any) => {
        this.rooms = data['rooms'];
        console.log(data);
      },
      error: (e) => {
        alert(`error ${e}`);
      },
    });
    this.numberOfRoomsOnChange();
  }
}
