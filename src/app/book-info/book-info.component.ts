import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { Datum } from '../shared/types';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss',
})
export class BookInfoComponent implements OnInit {
  constructor(
    private api: ApiServiceService,
    private router: Router,
    private activetRouter: ActivatedRoute
  ) {}
  bookedRooms!: Datum[];
  filterInfo = new FormGroup({
    checkin: new FormControl<string>(''),
    checkout: new FormControl<string>(''),
    search: new FormControl(''),
    fromPrice: new FormControl<number>(0),
    toPrice: new FormControl<number>(0),
    inhotel: new FormControl<boolean>(false),
  });
  onScroll() {
    let params = this.activetRouter.snapshot.queryParams;
    const newQueryParam = new URLSearchParams(params).toString();
    let paginationQuery = `pagination=${
      this.bookedRooms[this.bookedRooms.length - 1].pagination_ids
    }`;
    if (newQueryParam) {
      paginationQuery = '&' + paginationQuery;
    }
    this.api
      .get_filtered_rooms(`?${newQueryParam}`, paginationQuery)
      .subscribe((data) => {
        this.bookedRooms = [...this.bookedRooms, ...data['data']];
      });
  }
  onFilter() {
    let checkin = this.filterInfo.value.checkin;
    let checkout = this.filterInfo.value.checkout;
    let search = this.filterInfo.value.search;
    let fromPrice = this.filterInfo.value.fromPrice;
    let toPrice = this.filterInfo.value.toPrice;
    let inhotel = this.filterInfo.value.inhotel;
    let queryParams: any = {};
    if (checkin) {
      queryParams['check_in'] = checkin;
    }
    if (checkout) {
      queryParams['check_out'] = checkout;
    }
    if (search) {
      queryParams['search'] = search;
    }
    if (fromPrice) {
      queryParams['from'] = fromPrice;
    }
    if (toPrice) {
      queryParams['to'] = toPrice;
    }
    if (inhotel) {
      queryParams['in_hotel'] = inhotel;
    }
    this.router.navigate(['/bookinfo'], { queryParams });
  }
  ngOnInit(): void {
    this.api.get_filtered_rooms('', '').subscribe((data) => {
      this.bookedRooms = data['data'];
    });
    this.activetRouter.queryParams.subscribe((params) => {
      const newQueryParam = new URLSearchParams(params).toString();
      this.filterInfo.patchValue({
        checkin: params['check_in'],
        checkout: params['check_out'],
        search: params['search'],
        fromPrice: params['from'],
        toPrice: params['to'],
        inhotel: params['in_hotel'],
      });
      this.api.get_filtered_rooms(`?${newQueryParam}`, '').subscribe((data) => {
        this.bookedRooms = data['data'];
      });
    });
  }
}
