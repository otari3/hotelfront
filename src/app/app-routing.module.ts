import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './shared/login.guard';
import { HomeComponent } from './home/home.component';
import { isNotAuthGuard } from './shared/is-not-auth.guard';

const routes: Routes = [
  { component: LoginComponent, path: 'login', canActivate: [loginGuard] },
  { component: HomeComponent, path: 'home', canActivate: [isNotAuthGuard] },
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
