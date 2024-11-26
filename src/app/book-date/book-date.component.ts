import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedFunctionsService } from '../shared/shared-functions.service';

@Component({
  selector: 'app-book-date',
  templateUrl: './book-date.component.html',
  styleUrl: './book-date.component.scss',
})
export class BookDateComponent implements OnInit {
  constructor(
    private api: ApiServiceService,
    private sharedFunctions: SharedFunctionsService
  ) {}
  rooms!: {
    room_number: number;
    id: number;
    price: number;
    booked_dates: string[];
  }[];
  blockedDates: any = new Set();

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
    const dateString: any = date?.toISOString().split('T')[0];
    return !this.blockedDates.has(dateString);
  };

  calculatedPrice(day: number, price: number) {
    this.hottelBookingForm.patchValue({
      totalPrice: day * price,
    });
  }

  countingDate() {
    this.hottelBookingForm.controls.checkOut.valueChanges.subscribe((v) => {
      let checkIn = this.hottelBookingForm.value.checkIn;
      let checkOut = v;
      if (checkIn) {
        let roomNumber = this.hottelBookingForm.value.roomNumber;
        let price = this.rooms.find((items) => {
          return items.room_number === Number(roomNumber);
        });
        const days = this.sharedFunctions.calucultedDifferencInDays(
          checkIn,
          checkOut
        );
        this.hottelBookingForm.patchValue({
          totalNight: days,
        });
        this.calculatedPrice(days, price!['price']);
      }
    });
  }

  numberOfRoomsOnChange() {
    this.hottelBookingForm.controls.roomNumber.valueChanges.subscribe((s) => {
      let room = this.rooms.find((item) => {
        return item.room_number === Number(s);
      });
      if (room) {
        let days = this.hottelBookingForm.value.totalNight;
        this.hottelBookingForm.patchValue({
          totalPrice: room.price,
        });
        if (days! > 0) {
          this.calculatedPrice(days!, room['price']);
        }
        this.blockedDates = new Set(room['booked_dates']);
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
        this.hottelBookingForm.patchValue({
          totalPrice: data['rooms'][0]['price'],
          roomNumber: data['rooms'][0]['room_number'],
        });
        this.blockedDates = new Set(data['rooms'][0]['booked_dates']);
      },
      error: (e) => {
        alert(`error ${e}`);
      },
    });
    this.numberOfRoomsOnChange();
    this.countingDate();
  }
}
