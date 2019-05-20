import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AppService } from '../services/app.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide: boolean = true;
  isSignUp: boolean = false;
  constructor(
    private authService: AuthService,
    private appService: AppService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onLogin() {
    console.log(this.email.value, this.password.value);
    this.authService.signIn(this.email.value, this.password.value)
      .then((res) => {
        console.log(res);
        // save result
        this.onCancel();
      })
      .catch((err: Error) => {
        console.log(err);
        this.appService.alertShow(err.message)
      })
  }

  onSignUp() {
    this.authService.signUp(this.email.value, this.password.value)
      .then((res) => {
        console.log(res);
        // save result
        this.onCancel();
      })
      .catch((err: Error) => {
        console.log(err);
        this.appService.alertShow(err.message)
      })
  }


  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

}


export interface DialogData {
  name: string,
  email: string;
  password: string;
}