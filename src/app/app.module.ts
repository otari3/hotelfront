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

@NgModule({
  declarations: [AppComponent, LoginComponent, NavbarComponent, HomeComponent, RoomsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([setJwtTokenHeaderInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
