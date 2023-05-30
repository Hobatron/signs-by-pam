import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authState$: Observable<firebase.User | null>;
  constructor(
    private auth: AngularFireAuth
  ) {
    this.authState$ = this.auth.authState;
  }

  logout(): void {
    this.auth.signOut();
  }
}
