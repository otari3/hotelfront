import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private api: ApiServiceService, private router: Router) {}
  hotel: string = '';

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login/']);
  }

  ngOnInit(): void {
    this.api.get_hotel().subscribe((data: any) => {
      this.hotel = data['hotel']['name'];
    });
  }
}
