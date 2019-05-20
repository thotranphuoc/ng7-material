import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  signUp(EMAIL: string, PASS: string){
    return firebase.auth().createUserWithEmailAndPassword(EMAIL, PASS);
  }

  signIn(EMAIL: string, PASS: string){
    return firebase.auth().signInWithEmailAndPassword(EMAIL, PASS);
  }
}
