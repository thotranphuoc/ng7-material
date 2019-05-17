import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  arraySortA2ZByProperty(ARR: any[], PROP: string){
    let newARR = ARR.sort((A, B)=>{
      if(A[PROP] > B[PROP]) return 1;
      if(A[PROP] < B[PROP]) return -1;
      return 0
    })
    return newARR;
  }
}
