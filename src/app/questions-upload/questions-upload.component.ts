import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { iQuestion } from '../interfaces/question.interface';
import { iAnswer } from '../interfaces/answer.interface';
import { CrudService } from '../services/crud.service';
import { iCollection } from '../interfaces/collection.interface';
import { LocalService } from '../services/local.service';
import { LogService } from '../services/log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions-upload',
  templateUrl: './questions-upload.component.html',
  styleUrls: ['./questions-upload.component.css']
})
export class QuestionsUploadComponent implements OnInit {
  QUESTIONS: iQuestion[] = [];
  COLLECTION: iCollection;
  isLoading: boolean = false;
  constructor(
    private router: Router,
    private papa: Papa,
    private crudService: CrudService,
    private localService: LocalService,
    private log: LogService
  ) {
    this.COLLECTION = this.localService.COLLECTION_DEFAULT;
  }

  ngOnInit() {
  }

  upload() {
    document.getElementById('inputFile').click();
  }

  parse(files: FileList) {
    this.parse1(files)
      .then((res: any) => {
        if(this.log.isON) console.log(res);
        return this.convertData(res);
      })
      .catch(err => { console.log(err) })
  }

  async parse1(files: FileList) {
    return new Promise((resolve, reject) => {
      const file: File = files.item(0);
      if(this.log.isON) console.log(files);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv = reader.result;
        if(this.log.isON) console.log(csv);
        this.papa.parse(String(csv), {
          header: true,
          complete: (results) => {
            resolve(results.data);
          },
          // complete: function (results) {
          //   // console.log(results);
          //   resolve(results.data);
          //   // this.INPUTS = results.data;
          //   // console.log(this.INPUTS);
          //   // this.convertData(this.INPUTS);
          // },
          error: (err) => {
            reject(err)
          }
        });
      }
    })

  }

  convertData(ARR: any[]) {
    if(this.log.isON) console.log(ARR)

    ARR.forEach((Item, index) => {
      if (index % 5 == 0) {
        if(this.log.isON) console.log(Item.Quest);
      }
    })

    let _arr = this.splitIntoSubArray(ARR, 5);
    if(this.log.isON) console.log(_arr);
    this.convertData1(_arr);
  }


  splitIntoSubArray(parentArr: any[], count: number) {
    var newArray = [];
    while (parentArr.length > 0) {
      newArray.push(parentArr.splice(0, count));
    }
    return newArray;
  }

  convertData1(ArrayofArray: any[]) {
    ArrayofArray.forEach((_Array: any[], _index) => {
      let indexAnswer: number;
      if(this.log.isON) console.log(_Array);
      let _Q_Answers: iAnswer[] = [];
      _Array.forEach((Item, index) => {
        if (index > 0) {
          let _Item = {
            A_ID: index.toString(),
            A_Text: _Array[index].QuestionsAnswers,
            A_isCorrect: _Array[index].Results != '' ? true : false
          };
          _Q_Answers.push(_Item);
        }
      })
      let Q: iQuestion = {
        Q_Title: 'Question ' + (_index + 1).toString(),
        Q_Text: _Array[0].QuestionsAnswers,
        Q_isCorrect: false,
        Q_answerIndex: this.getIndexOfCorrectAnswer(_Q_Answers),
        Q_CreatedDate: Date.now().toString(),
        Q_ID: '',
        Q_Level: '',
        Q_Type: '',
        Q_OwnerID: '',
        Q_Answers: _Q_Answers
      }
      if(this.log.isON) console.log(Q);
      this.QUESTIONS.push(Q);
      // this.crudService.questionNewAdd(Q);
    })
    if(this.log.isON) console.log(this.QUESTIONS);
  }

  getIndexOfCorrectAnswer(Arr: iAnswer[]) {
    let _index = Arr.findIndex(item => item.A_isCorrect);
    return _index + 1;
  }


  isReady2InsertDB() {
    if (this.QUESTIONS.length < 1) return false;
    return true;
  }

  insertDB() {
    this.isLoading = true;
    let _QUESTIONS = this.QUESTIONS.slice(0);
    _QUESTIONS.map(Q => Q.Q_answerIndex = null);
    this.crudService.questionsAdd(_QUESTIONS)
      .then((Arr: any[]) => {
        let NEW_QUESTIONS = Arr.map(A => A.QUESTION);
        this.COLLECTION.C_QUESTIONS = NEW_QUESTIONS;
        if(this.log.isON) console.log(this.COLLECTION);
        return this.crudService.collectionAdd(this.COLLECTION);
      })
      .then(res => {
        if(this.log.isON) console.log(res);
        this.isLoading = false;
        this.initValues();
      })
      .catch(err => {
        if(this.log.isON) console.log(err);
        this.isLoading = false;
      })
  }

  initValues(){
    this.COLLECTION = this.localService.COLLECTION_DEFAULT;
    this.QUESTIONS = [];
    this.isLoading = false;
  }
}
