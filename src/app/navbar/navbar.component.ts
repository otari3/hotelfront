import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private api: ApiServiceService) {}
  hotel: string = '';
  ngOnInit(): void {
    this.api.get_hotel().subscribe((data: any) => {
      this.hotel = data['hotel']['name'];
    });
  }
}
