import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { iQuestion } from '../interfaces/question.interface';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor() { }

  questionNewAdd(Question: iQuestion) {

    firebase.firestore().collection('QUESTIONS').add(Question)
      .then(res => {
        res.update({ Q_ID: res.id })
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  questionsGet() {
    return new Promise((resolve, reject) => {
      let QUESTIONS: iQuestion[] = [];
      firebase.firestore().collection('QUESTIONS').get()
        .then((qSnap) => {
          qSnap.forEach(doc => {
            let Q = <iQuestion>doc.data();
            QUESTIONS.push(Q);
          })
          resolve({ QUESTIONS: QUESTIONS })
        })
        .catch(err => {
          reject(err);
        })
    })
  }
}
