import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  arraySortA2ZByProperty(ARR: any[], PROP: string){
    let newARR = ARR.sort((A, B)=>{
      if(A[PROP] > B[PROP]) return 1;
      if(A[PROP] < B[PROP]) return -1;
      return 0
    })
    return newARR;
  }

  alertShow(MESSAGE: string){
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      data: MESSAGE
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  toastShow(MESSAGE: string, DURATION: number, BUTTON_CLOSE? : string){
    this.snackBar.open(MESSAGE, BUTTON_CLOSE, {
      duration: DURATION,
    });
  }

  toastShowWithConfirmOK(MESSAGE: string, BUTTON_CLOSE : string){
    this.snackBar.open(MESSAGE, BUTTON_CLOSE, {});
  }
}
