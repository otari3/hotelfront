import { Component, OnInit } from '@angular/core';
import { Room } from '../shared/types';
import { ApiServiceService } from '../shared/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private api: ApiServiceService) {}
  rooms: Room[] = [];
  ngOnInit(): void {
    this.api.getting_hotel_rooms().subscribe((data: any) => {
      this.rooms =data['rooms']
    });
  }
}
