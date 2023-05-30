import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './environments/env';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const config = new environment();

@NgModule({
  declarations: [AppComponent, FormComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config.firebase),
    provideFirebaseApp(() => initializeApp(config.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
