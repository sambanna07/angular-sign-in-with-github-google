import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private githubClientId = 'Iv23lisZqM9AZT4vzsC6';
  private githubClientSecret = '0e428165bfe9dbafe7414c2a17bd26a025b6b3c2';
  private githubRedirectUri = 'http://localhost:4200/auth/callback';
  private accessToken = '';
  private githubScope = 'user';

  constructor(private http: HttpClient, private router: Router) {}


  signInWithGitHub() {
    // Redirect the user to GitHub's authentication endpoint
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.githubClientId}&redirect_uri=${this.githubRedirectUri}&scope=${this.githubScope}`;
  }

  handleGitHubCallback(code: string) {
    // Exchange the code for an access token
    this.http.post<any>('https://github.com/login/oauth/access_token', {
      client_id: this.githubClientId,
      client_secret: this.githubClientSecret,
      code: code,
      redirect_uri: this.githubRedirectUri
    }).subscribe(response => {
      const accessToken = response.access_token;
      console.log(accessToken);
      
      // Use the access token to fetch user information
      this.getUserInfo(accessToken);
    });
  }

  getUserInfo(accessToken: string) {
    // Use the access token to make a request to GitHub's API to fetch user information
    this.http.get<any>('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`
      }
    }).subscribe(user => {
      // Do something with the user information (e.g., store it in local storage)
      localStorage.setItem('github-user', JSON.stringify(user));
      // Redirect the user to the desired page
      this.router.navigate(['/home']);
    });
  }

  signOutGoogle() {
    google.accounts.id.disableAutoSelect();
    localStorage.removeItem('google-user');
    this.router.navigate(['/login']);
  }
}
