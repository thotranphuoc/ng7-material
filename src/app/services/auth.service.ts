import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import 'firebase/auth';
import { Subject } from 'rxjs';
import { UiService } from './ui.service';
import { CrudService } from './crud.service';
import { LocalService } from './local.service';
import { iUser } from '../interfaces/user.interface';
import { MatDialog } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  // isAuthenticated = new Subject<boolean>();
  _user: firebase.User = null;
  USER: iUser;
  private isAuthenticated = false;
  constructor(
    private afa: AngularFireAuth,
    private uiService: UiService,
    private crudService: CrudService,
    private localService: LocalService,
    private dialog: MatDialog,
  ) { }


  initAuthListener() {
    this.afa.authState.subscribe((user) => {
      console.log(user);
      if (user) {
        this._user = user;
        console.log('user logged in');
        this.getUserInfo().then(res => {
          this.isAuthenticated = true;
          this.authChange.next(true);
        })
      } else {
        this._user = null;
        console.log('user not logged in');
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.USER = null;
      }
    })
  }

  getUser() {
    return this._user;
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.crudService.userGet(this._user.uid).then((res) => {
        this.USER = <iUser>res.data();
        console.log(this.USER);
        resolve({ USER: this.USER })
      }).catch(err => {
        reject(err);
      })
    })
  }

  signUp(EMAIL: string, PASS: string, NAME: string) {
    // return firebase.auth().createUserWithEmailAndPassword(EMAIL, PASS);
    return new Promise((resolve, reject) => {
      this.uiService.loadingStateChanged.next(true);
      this.afa.auth.createUserWithEmailAndPassword(EMAIL, PASS)
        .then((res) => {
          this._user = res.user;
          console.log(this._user);
          this.uiService.loadingStateChanged.next(false);
          let USER = this.localService.USER_DEFAULT;
          USER.U_NAME = NAME;
          USER.U_ID = res.user.uid;
          USER.U_EMAIL = EMAIL;
          return this.crudService.userAdd(USER)
        })
        .then((res) => {
          console.log(res);
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
        .then(res => {
          this._user = res.user;
          return this.getUserInfo();
        })
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

  openDialog(COMP: any, isModal: boolean) {
    let _data: DialogData = { name: 'Tran Phuoc Tho', email: 'tho@en', password: '', isFromModal: isModal };
    const dialogRef = this.dialog.open(COMP, {
      width: '500px',
      data: _data
    });

    return dialogRef.afterClosed()
    // .subscribe(result => {
    //   console.log('The dialog was closed');
    //   console.log(result);
    //   // if (this.authService.isAuth()) {
    //   //   this.fillInfoIfAuth();
    //   //   this.doSaveResult();
    //   // }
    //   // this.appService.toastShowWithConfirmOK('Save successfully', 'OK');
    // });
  }
}

export interface DialogData {
  name: string;
  email: string;
  password: string;
  isFromModal: boolean
}