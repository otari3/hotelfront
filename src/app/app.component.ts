import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Subscription, interval } from 'rxjs';
import { SharedFunctionsService } from './shared/shared-functions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'hotelfront';
  constructor(
    public auth_service: AuthService,
    private shared: SharedFunctionsService,
    private cd: ChangeDetectorRef
  ) {}
  currentlyLoad = false;
  currentLoadValue = 0;
  intervalSub!: Subscription;
  startload() {
    this.currentLoadValue = 0;
    this.currentlyLoad = true;
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
    }
    this.intervalSub = interval(100).subscribe({
      next: () => {
        if (this.currentLoadValue > 80) {
          this.intervalSub.unsubscribe();
        } else {
          this.currentLoadValue += 5;
        }
      },
    });
    this.cd.detectChanges();
  }
  stopload() {
    this.currentLoadValue = 0;
    this.currentlyLoad = false;
    this.intervalSub.unsubscribe();
    this.cd.detectChanges();
  }
  ngOnInit(): void {
    this.shared.loading.subscribe({
      next: (bool) => {
        if (bool) {
          this.startload();
        } else {
          this.stopload();
        }
      },
    });
  }
}
