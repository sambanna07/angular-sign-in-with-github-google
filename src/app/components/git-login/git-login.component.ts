import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-git-login',
  standalone: true,
  imports: [],
  templateUrl: './git-login.component.html',
  styleUrl: './git-login.component.css'
})
export class GitLoginComponent {

  constructor(private authService: AuthService) { }

  signInWithGitHub() {
    this.authService.signInWithGitHub();
  }

}
