import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatButtonToggleChange } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AppService } from '../services/app.service';
import { Subscription } from 'rxjs';
import { UiService } from '../services/ui.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide: boolean = true;
  isSignUp: boolean = false;
  ACTION: string = 'SIGNIN';
  // loadingSub = new Subscription();
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private appService: AppService,
    private uiService: UiService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    // this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading=>{
    //   console.log(isLoading);
    //   this.isLoading = isLoading;
    // })
  }

  ngOnDestroy() {
    // this.loadingSub.unsubscribe()
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onLogin() {
    console.log(this.email.value, this.password.value);
    this.isLoading = true;
    this.authService.signIn(this.email.value, this.password.value)
      .then((res) => {
        console.log(res);
        // save result
        this.onCancel();
        this.isLoading = false;
      })
      .catch((err: Error) => {
        console.log(err);
        // this.appService.alertShow(err.message)
        this.isLoading = false;
      })
  }

  onSignUp() {
    this.isLoading = true;
    this.authService.signUp(this.email.value, this.password.value)
      .then((res) => {
        console.log(res);
        // save result
        this.onCancel();
        this.isLoading = false;
      })
      .catch((err: Error) => {
        console.log(err);
        // this.appService.alertShow(err.message)
        this.isLoading = false;
      })
  }


  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }


  selectButton(e: MatButtonToggleChange) {
    console.log(e);
    this.ACTION = e.value;
  }
}


export interface DialogData {
  name: string,
  email: string;
  password: string;
}