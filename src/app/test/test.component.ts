import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { iCollection } from '../interfaces/collection.interface';
import { iQuestion } from '../interfaces/question.interface';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit() {
    // this.deleteSinh();
    // this.searchCollection();
    // this.updateCollectionWithQIDTrue();
    // this.deleteCollection('zwkaIndrprFnmwHQ21OR');
    // this.updateCollectionWithNotes();
  }

  deleteSinh() {
    // let QUESTIONS: iQuestion[] = [];
    // let QUESTIONSKEYS: string[] = [];
    // this.crudService.collectionsGet().then(qSnap=>{
    //   qSnap.forEach(doc=>{
    //     let COL = <iCollection>doc.data();
    //     console.log(COL);
    //     QUESTIONS = QUESTIONS.concat(COL.C_QUESTIONS);
    //   })
    //   QUESTIONSKEYS = QUESTIONS.map(Q=> Q.Q_ID);
    //   console.log(QUESTIONSKEYS);
    //   this.crudService.questionsGet().then((res: any)=>{
    //     let QUESTIONS: iQuestion[] = res.QUESTIONS;
    //     QUESTIONS.forEach(Q=>{
    //       if(QUESTIONSKEYS.indexOf(Q.Q_ID)<0){
    //         console.log(Q);
    //       }
    //     })
    //   })
    // })
    // // this.crudService.collectionGet('2GFsDZmUFCjw2T78lpnw').then((res) => {
    // //   let COL = <iCollection>res.data();
    // //   let PROS = Array(COL.C_QUESTIONS.length);
    // //   COL.C_QUESTIONS.forEach((Q, index) => {
    // //     PROS[index] = this.crudService.questionDelete(Q.Q_ID)
    // //   })
    // //   Promise.all(PROS).then(res => console.log(res)).catch(err => { console.log(err) })
    // // })

    this.crudService.questionDelete('YhQaSpZ5DgE1ezmtTzZn');

  }

  searchCollection() {
    this.crudService.collectionsOfQuestionGet('mGcmLgwnxo7xT594FvJu').then((res) => {
      res.forEach(doc => {
        let COL = <iCollection>doc.data();
        console.log(COL);
      })
    })
  }

  updateCollectionWithQIDTrue() {
    let COLLECTIONS = [];
    this.crudService.collectionsGet().then((q) => {
      q.forEach(doc => {
        let COL = <iCollection>doc.data();
        let QUESTIONS = COL.C_QUESTIONS;
        QUESTIONS.forEach(Q => {
          COL[Q.Q_ID] = true;
        });
        console.log(COL);
        doc.ref.update(COL);
      })
    })
  }


  deleteCollection(ID: string) {
    this.crudService.collectionDelete(ID)
      .then((res) => {
        console.log(console.log(res, 'collection deleted successfully'));
      })
      .catch(err => {
        console.log(err);
      })
  }

  updateCollectionWithNotes() {
    let COLLECTIONS = [];
    this.crudService.collectionsGet().then((q) => {
      q.forEach(doc => {
        let COL = <iCollection>doc.data();
        COL['C_NOTE'] = 'Some notes here';
        console.log(COL);
        doc.ref.update(COL);
      })
    })
  }

}
