import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import 'firebase/auth';
import { Subject } from 'rxjs';
import { UiService } from './ui.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  user = null;
  private isAuthenticated = false;
  constructor(
    private afa: AngularFireAuth,
    private uiService: UiService
  ) { }


  initAuthListener() {
    this.afa.authState.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
        console.log('user logged in');
        this.isAuthenticated = true;
        this.authChange.next(true);
      } else {
        this.user = null;
        console.log('user not logged in');
        this.isAuthenticated = false;
        this.authChange.next(false);
      }
    })
  }
  signUp(EMAIL: string, PASS: string) {
    // return firebase.auth().createUserWithEmailAndPassword(EMAIL, PASS);
    return new Promise((resolve, reject) => {
      this.uiService.loadingStateChanged.next(true);
      this.afa.auth.createUserWithEmailAndPassword(EMAIL, PASS)
        .then((res) => {
          this.user = res.user;
          this.uiService.loadingStateChanged.next(false);
          resolve();
        })
        .catch(err => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.toastMessageShow(err.message, null, 5000);
          reject(err);
        })
    })
  }

  signIn(EMAIL: string, PASS: string) {
    // return firebase.auth().signInWithEmailAndPassword(EMAIL, PASS);
    return new Promise((resolve, reject) => {
      this.uiService.loadingStateChanged.next(true);
      this.afa.auth.signInWithEmailAndPassword(EMAIL, PASS)
        .then((res) => {
          this.uiService.loadingStateChanged.next(false);
          resolve();
        })
        .catch(err => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.toastMessageShow(err.message, null, 5000);
          reject(err);
        })
    })
  }

  isAuth() {
    return this.isAuthenticated;
  }

  logout() {
    // this.user = null;
    this.afa.auth.signOut();
    // this.authUnsuccessful();

  }
}
