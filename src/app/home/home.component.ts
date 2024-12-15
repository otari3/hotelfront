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
      this.rooms = data['rooms'];
    });
  }
  onDelete(index: number) {
    this.api.delete_room(this.rooms[index].id).subscribe({
      next: () => {
        alert('room deleted');
        this.rooms.splice(index, 1);
      },
      error: (e) => {
        alert(`there is error ${e['error']['error']}`);
      },
    });
  }
}
