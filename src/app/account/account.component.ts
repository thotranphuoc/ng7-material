import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatButtonToggleChange, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  hide: boolean = true;
  isSignUp: boolean = false;
  ACTION: string = 'SIGNIN';
  // loadingSub = new Subscription();
  isLoading: boolean = false;
  isModal: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<AccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(data);
    this.isModal = data.isFromModal;
  }

  ngOnInit() {
  }

  onLogin() {
    console.log(this.email.value, this.password.value);
    this.isLoading = true;
    this.authService.signIn(this.email.value, this.password.value)
      .then((res) => {
        console.log(res);
        if (this.isModal) {
          this.dialogRef.close();
          this.isLoading = false;
        } else {
          this.router.navigate(['/'])
          this.isLoading = false;
        }
      })
      .catch((err: Error) => {
        console.log(err);
        // this.appService.alertShow(err.message)
        this.isLoading = false;
      })
  }

  onSignUp() {
    this.isLoading = true;
    this.authService.signUp(this.email.value, this.password.value, this.name.value)
      .then((res) => {
        console.log(res);
        // save result
        // this.onCancel();
        if (this.isModal) {
          this.dialogRef.close();
          this.isLoading = false;
        } else {
          this.router.navigate(['/'])
          this.isLoading = false;
        }
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
  name: string;
  email: string;
  password: string;
  isFromModal: boolean
}