import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject, Subscription } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AuthService } from './auth.service';
import {
  collection,
  Firestore,
  doc,
  docData,
  setDoc,
  DocumentReference,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = new Subject<User | null>();
  private _user: User | null = null;
  public currentUser: firebase.User | null = null;
  userDataSub: Subscription | null = null;
  docRef = {} as DocumentReference;

  get userLoggedIn(): boolean {
    return this.currentUser != null;
  }

  constructor(private auth: AuthService, private db: Firestore) {
    this.auth.authState$.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        //Signed in
        this.docRef = doc(collection(this.db, 'Users'), user?.uid);
        this.subscribeToUserData(user);
      } else {
        //Signing out
        this.user$.next(null);
      }
    });

    this.user$.subscribe((user) => {
      console.log(user);

      this._user = user;
    });
  }

  public updateUser(pUser: Partial<User>) {
    setDoc(this.docRef, {
      ...this._user,
      ...pUser,
    } as User);
  }

  private subscribeToUserData(user: firebase.User) {
    //this is a sub to a user profile
    //documentation: https://github.com/angular/angularfire/blob/master/docs/firestore.md
    this.userDataSub = docData(this.docRef).subscribe((data) => {
      if (data) {
        this.user$.next(data as User); //User account found
      } else {
        this.createUser(user); //New user
      }
    });
  }

  private createUser(user: firebase.User) {
    setDoc(this.docRef, {
      displayName: user.displayName,
      email: user.email,
    } as User);
  }
}
