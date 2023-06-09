import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from './login.validators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    login = false;
    optionSelected = false;
    loginForm: FormGroup;
    signUpForm: FormGroup;

    constructor(private authService: AuthService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });

        this.signUpForm = new FormGroup(
            {
                firstName: new FormControl('', Validators.required),
                lastName: new FormControl('', Validators.required),
                email: new FormControl('', Validators.required),
                password: new FormControl('', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(25),
                ]),
                confirmPassword: new FormControl('', Validators.required),
            },
            { validators: passwordValidator() }
        );
    }

    googleLogin() {
        this.authService.login(this.authService.googleProvider);
    }

    facebookLogin() {}

    loginSubmit() {
        if (this.loginForm.valid) {
            this.authService.loginWithEmail(
                this.loginForm.get('email')?.value,
                this.loginForm.get('password')?.value
            );
        }
    }

    createSubmit() {
        if (this.signUpForm.valid) {
            const user = {
                firstName: this.signUpForm.get('firstName')?.value,
                lastName: this.signUpForm.get('lastName')?.value,
                email: this.signUpForm.get('email')?.value,
            } as User;
            this.authService.createViaEmail(
                user,
                this.signUpForm.get('password')?.value
            );
        }
    }

    optionPicked(isLogin: boolean) {
        this.optionSelected = true;
        this.login = isLogin;
    }
}
