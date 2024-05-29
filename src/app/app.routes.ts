import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { LoginComponent } from './components/login/login.component';
import { GitLoginComponent } from './components/git-login/git-login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'google-login', component: GoogleLoginComponent },
  { path: 'git-login', component: GitLoginComponent },
  { path: '**', redirectTo: 'login' }
];
