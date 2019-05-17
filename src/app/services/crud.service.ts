import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { iQuestion } from '../interfaces/question.interface';
import { iCollection } from '../interfaces/collection.interface';
import { LogService } from './log.service';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private log: LogService
  ) { }

  questionNewAdd(Question: iQuestion) {
    let QUESTION = Question;
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('QUESTIONS').add(Question)
        .then(res => {
          QUESTION.Q_ID = res.id;
          res.update({ Q_ID: res.id })
          if(this.log.isON) console.log(res);
          resolve({ QUESTION: QUESTION })
        })
        .catch(err => {
          if(this.log.isON) console.log(err);
          reject(err);
        })
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

  questionsAdd(QUESTIONS: iQuestion[]) {
    let Pros = Array(QUESTIONS.length);
    QUESTIONS.forEach((Q, index) => {
      Pros[index] = this.questionNewAdd(Q)
    })
    return Promise.all(Pros)
  }

  collectionAdd(COLLECTION: iCollection) {
    let _COLLECTION = COLLECTION;
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('COLLECTIONS').add(_COLLECTION)
        .then(res => {
          _COLLECTION.C_ID = res.id;
          res.update({ C_ID: res.id })
          if(this.log.isON) console.log(res);
          resolve({ COLLECTION: _COLLECTION })
        })
        .catch(err => {
          if(this.log.isON) console.log(err);
          reject(err);
        })
    })
  }

  collectionGet(ID: string){
    return firebase.firestore().doc('COLLECTIONS/'+ID).get();
  }

  collectionsGet(){
    return firebase.firestore().collection('COLLECTIONS').get()
  }
}
