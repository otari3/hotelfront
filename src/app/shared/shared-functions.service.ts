import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedFunctionsService {
  loading = new Subject<boolean>();
  calucultedDifferencInDays(firstDate: any, secondDate: any) {
    const date1: any = new Date(firstDate);
    const date2: any = new Date(secondDate);
    const differenceInMillis = date2 - date1;
    const differenceInDays = Math.ceil(
      differenceInMillis / (1000 * 24 * 60 * 60)
    );
    return differenceInDays;
  }
  constructor() {}
}
