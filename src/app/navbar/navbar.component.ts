import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { SharedFunctionsService } from '../shared/shared-functions.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(
    private api: ApiServiceService,
    private router: Router,
    private shared: SharedFunctionsService,
    private cd: ChangeDetectorRef
  ) {}
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
