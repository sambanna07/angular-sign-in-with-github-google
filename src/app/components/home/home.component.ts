import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private auth = inject(AuthService);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef

  name: string = 'Unknown';
  email: string = 'Unknown';
  emailVerified: boolean = false;
  picture: string = '';
  user: any;
  userProfile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' | undefined;

  ngOnInit(): void {
    this.userDetails();
  }

  userDetails() {
    try {
      const user = JSON.parse(localStorage.getItem('google-user')!);
      if (user) {
        this.name = user.name ?? 'Unknown';
        this.email = user.email ?? 'Unknown';
        this.emailVerified = user.email_verified ?? false;
        this.picture = user.picture ?? '';
        this.cdr.detectChanges(); // Manually trigger change detection
      } else {
        console.error('User data not found in localStorage');
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage', error);
    }
  }

  signOut() {
    this.auth.signOutGoogle();
  }
}
