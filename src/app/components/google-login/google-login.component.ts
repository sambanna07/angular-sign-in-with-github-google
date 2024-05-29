import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

declare var google: any;

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [],
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '842949696777-b3duehfjqha22vsqefbp2ql8lnisgeaa.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleCredentialResponse(response);
      }
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: '350'
      }
    );
  }

  signInWithGithub() {
    // this.authService.loginWithGitHub();
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleCredentialResponse(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      localStorage.setItem('google-user', JSON.stringify(payload));
      this.router.navigate(['home']).then( () =>
        window.location.reload()
      )
    }
  }
}
