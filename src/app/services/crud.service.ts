import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { iQuestion } from '../interfaces/question.interface';
import { iCollection } from '../interfaces/collection.interface';
import { LogService } from './log.service';
import { iExam } from '../interfaces/exam.interface';
import { iUser } from '../interfaces/user.interface';

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
          if (this.log.isON) console.log(res);
          resolve({ QUESTION: QUESTION })
        })
        .catch(err => {
          if (this.log.isON) console.log(err);
          reject(err);
        })
    })
  }

  questionGet(QUESTION_ID: string) {
    return firebase.firestore().doc('QUESTIONS/' + QUESTION_ID).get();
  }

  async questionUpdate(QUESTION: iQuestion) {
    const res = await firebase.firestore().doc('QUESTIONS/' + QUESTION.Q_ID).update(QUESTION);
    return this.questionUpdate4Collections(QUESTION);
  }

  async questionUpdate4Collections(QUESTION: iQuestion) {
    const res = await this.collectionsOfQuestionGet(QUESTION.Q_ID);
    let PROS = [];
    res.forEach((doc) => {
      let COL = (<iCollection>doc.data());
      let index = COL.C_QUESTIONS.map(Q => Q.Q_ID).indexOf(QUESTION.Q_ID);
      COL.C_QUESTIONS[index] = QUESTION;
      console.log(COL);
      let P = doc.ref.update(COL);
      PROS.push(P);
    });
    return Promise.all(PROS);
  }

  questionDelete(QID: string) {
    return firebase.firestore().doc('QUESTIONS/' + QID).delete();
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
    let PROS = [];
    return new Promise((resolve, reject) => {
      _COLLECTION.C_QUESTIONS.forEach(Q => {
        let p = this.questionNewAdd(Q)
        // .then((res: any)=>{
        //   Q = res.QUESTION;
        //   _COLLECTION[Q.Q_ID] = true;
        // })
        PROS.push(p);
      })
      Promise.all(PROS)
        .then((res: any[]) => {
          let QUESTIONS_ = [];
          res.forEach(item => {
            let QUESTION: iQuestion = item.QUESTION;
            QUESTIONS_.push(QUESTION);
            _COLLECTION[QUESTION.Q_ID] = true;
          });
          _COLLECTION.C_QUESTIONS = QUESTIONS_;
          return firebase.firestore().collection('COLLECTIONS').add(_COLLECTION)
        })
        .then(res => {
          _COLLECTION.C_ID = res.id;
          if (this.log.isON) console.log(res);
          return res.update({ C_ID: res.id })
        })
        .then((res)=>{
          if (this.log.isON) console.log(res);
          resolve({ COLLECTION: _COLLECTION })
        })
        .catch(err => {
          if (this.log.isON) console.log(err);
          reject(err);
        })
    })
  }

  collectionGet(ID: string) {
    return firebase.firestore().doc('COLLECTIONS/' + ID).get();
  }

  collectionDelete(ID: string) {
    let PROS = [];
    return new Promise((resolve, reject) => {
      this.collectionGet(ID)
        .then(res => {
          let COL = <iCollection>res.data();
          console.log(COL);
          COL.C_QUESTIONS.forEach(Q => {
            let p = this.questionDelete(Q.Q_ID);
            PROS.push(p);
          })
          return Promise.all(PROS);
        })
        .then((res) => {
          console.log(res);
          // return this.collectionDelete(ID);
          return firebase.firestore().doc('COLLECTIONS/' + ID).delete()
        })
        .then((res) => {
          console.log(res);
          resolve();
        })
        .catch(err => {
          reject(err);
        })
    })
    // return firebase.firestore().doc('COLLECTIONS/' + ID).delete();
  }

  collectionsGet() {
    return firebase.firestore().collection('COLLECTIONS').get()
  }

  collectionsOfQuestionGet(QUESTION_ID: string) {
    return firebase.firestore().collection('COLLECTIONS')
      .where(QUESTION_ID, "==", true).get();
  }

  resultAdd(EXAM: iExam) {
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('RESULTS').add(EXAM)
        .then((res) => {
          let ID = res.id;
          EXAM.E_TAKEN_ID = ID;
          EXAM.E_TAKEN_DATE = Date.now()
          return res.update(EXAM)
        })
        .then(() => {
          resolve({ EXAM: EXAM })
        })
        .catch((err) => {
          reject(err);
        })
    })
  }

  examsResultOfUserGet(USERID: string) {
    let RESULTS: iExam[] = [];
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('RESULTS').where('E_EXAMINEE_ID', '==', USERID).get()
        .then((qSnap) => {
          qSnap.forEach((docSnap) => {
            let EXAM = <iExam>docSnap.data();
            RESULTS.push(EXAM);
          })
          resolve({ RESULTS: RESULTS })
        })
        .catch((err) => {
          reject(err);
        })
    })
  }

  // async userAdd(USER: iUser){
  //   const res = await firebase.firestore().collection('USERS').add(USER);
  //   return res.update({ U_ID: res.id });
  // }

  userAdd(USER: iUser) {
    return firebase.firestore().doc('USERS/' + USER.U_ID).set(USER);
  }

  userGet(UID: string) {
    return firebase.firestore().doc('USERS/' + UID).get();
  }
}
