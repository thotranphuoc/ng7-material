import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();
  constructor(
    private snackbar: MatSnackBar
  ) { }

  toastMessageShow(MESSAGE: string, ACTION: string, DURATION: number) {
    this.snackbar.open(MESSAGE, ACTION, {
      duration: DURATION

    })
  }
}
