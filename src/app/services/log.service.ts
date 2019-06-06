import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  public isON: boolean = true;
  constructor() { }

  print(Obj: any) {
    if (!this.isON) return;
    console.log(Obj)
  }
}
