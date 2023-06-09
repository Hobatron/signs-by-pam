import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './environments/env';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { GoogleComponent } from './svgs/google/google.component';
import { FacebookComponent } from './svgs/facebook/facebook.component';

const config = new environment();

@NgModule({
    declarations: [
        AppComponent,
        FormComponent,
        LoginComponent,
        GoogleComponent,
        FacebookComponent,
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(config.firebase),
        provideFirebaseApp(() => initializeApp(config.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        MatTabsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
