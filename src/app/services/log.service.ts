import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  public isON: boolean = false;
  constructor() { }

  print(Obj: any, Ob){
    if(!this.isON) return;
    console.log(Obj)
  }
}
