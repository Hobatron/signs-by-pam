import { FirebaseOptions } from 'firebase/app';

//Public Firebase app config
export class environment {
  production = true;
  firebase: FirebaseOptions = {
    apiKey: 'AIzaSyDTtABzBHHr_954kJ74oLJT5bbDYNddVkk',
    authDomain: 'signs-by-pam.firebaseapp.com',
    databaseURL: 'https://signs-by-pam-default-rtdb.firebaseio.com',
    projectId: 'signs-by-pam',
    storageBucket: 'signs-by-pam.appspot.com',
    messagingSenderId: '1080170201790',
    appId: '1:1080170201790:web:b075e70ae9cd62bbcf54ef',
  };
}
