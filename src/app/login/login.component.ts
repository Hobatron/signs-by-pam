import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login = false;
  optionSelected = false;
  constructor(private auth: Auth, private authService: AuthService) {}

  googleLogin() {
    this.authService.login(this.authService.googleProvider);
  }

  facebookLogin() {}

  emailLogin() {
    const user = {} as User;
    this.authService.createViaEmail(user, 'testPass');
  }

  optionPicked(isLogin: boolean) {
    this.optionSelected = true;
    this.login = isLogin;
  }
}
