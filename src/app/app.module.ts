import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { setJwtTokenHeaderInterceptor } from './shared/set-jwt-token-header.interceptor';
import { RoomsComponent } from './rooms/rooms.component';
import { AddRoomFormComponent } from './add-room-form/add-room-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BookDateComponent } from './book-date/book-date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BookInfoComponent } from './book-info/book-info.component';
import { BookedRoomsComponent } from './book-info/booked-rooms/booked-rooms.component';
import { ReservedRoomsComponent } from './book-info/booked-rooms/reserved-rooms/reserved-rooms.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RoomsComponent,
    AddRoomFormComponent,
    BookDateComponent,
    BookInfoComponent,
    BookedRoomsComponent,
    ReservedRoomsComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InfiniteScrollDirective,
  ],
  providers: [
    provideHttpClient(withInterceptors([setJwtTokenHeaderInterceptor])),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
