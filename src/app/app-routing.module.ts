import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './shared/login.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { component: LoginComponent, path: 'login', canActivate: [loginGuard] },
  { component: HomeComponent, path: 'home' },
  {
    path: '',
    redirectTo: `login`,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
