import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    Auth,
    AuthProvider,
    GoogleAuthProvider,
    UserCredential,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from '@angular/fire/auth';
import { User } from '../models/user';
import { ToastService, ToastrMethod } from '../toast.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public googleProvider = new GoogleAuthProvider();
    public authState$: Observable<firebase.User | null>;
    constructor(
        private afAuth: AngularFireAuth,
        private auth: Auth,
        private toast: ToastService
    ) {
        this.authState$ = this.afAuth.authState;
        this.authState$.subscribe((u) => {
            console.log(u?.metadata);
        });
    }

    createViaEmail(user: User, password: string) {
        createUserWithEmailAndPassword(this.auth, user.email, password)
            .then((creds: UserCredential) => {
                updateProfile(creds.user, {
                    displayName: `${user.firstName} ${user.lastName}`,
                })
                    .then(() => {
                        sendEmailVerification(creds.user);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    logout(): void {
        this.auth.signOut();
    }

    loginWithEmail(email: string, password: string) {
        signInWithEmailAndPassword(this.auth, email, password)
            .then((creds: UserCredential) => {
                console.log('logged in!');
            })
            .catch((reason) => {
                this.toast.showNotification(
                    'Issue logging in: Either an invalid password, or email was provided. Please try agian.',
                    undefined,
                    ToastrMethod.Error
                );
            });
    }

    login(provider: AuthProvider) {
        signInWithPopup(this.auth, provider)
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
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
}
