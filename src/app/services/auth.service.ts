import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Auth,
  AuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public googleProvider = new GoogleAuthProvider();
  public authState$: Observable<firebase.User | null>;
  constructor(private auth: AngularFireAuth, private auth2: Auth) {
    this.authState$ = this.auth.authState;
    this.authState$.subscribe((u) => {
      console.log(u?.metadata);
    });
  }

  createViaEmail(user: User, password: string) {
    createUserWithEmailAndPassword(this.auth2, user.email, password);
  }

  logout(): void {
    this.auth.signOut();
  }

  login(provider: AuthProvider) {
    signInWithPopup(this.auth2, provider)
      .then((result) => {
        console.log('result', result);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log('error', error);

        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
}
