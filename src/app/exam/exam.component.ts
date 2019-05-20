import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { iCollection } from '../interfaces/collection.interface';
import { ActivatedRoute } from '@angular/router';
import { iQuestion } from '../interfaces/question.interface';
import { MatRadioChange } from '@angular/material/radio';
import { LogService } from '../services/log.service';
import { MatDialog } from '@angular/material';
import { LoginComponent, DialogData } from '../login/login.component';
import { AppService } from '../services/app.service';
import { iExam } from '../interfaces/exam.interface';
import { LocalService } from '../services/local.service';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  COLLECTION: iCollection;
  QUESTIONS: iQuestion[] = [];
  selectedQ: iQuestion;
  qIndex: number = 0;
  RIGHTTOTAL: number = 0;
  isResultShown: boolean = false;
  constructor(
    private localService: LocalService,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private log: LogService,
    private dialog: MatDialog,
    private appService: AppService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.crudService.collectionGet(id).then((res) => {
      this.COLLECTION = <iCollection>res.data();
      this.QUESTIONS = this.COLLECTION.C_QUESTIONS;
      this.selectedQ = this.QUESTIONS[0]
      if (this.log.isON) console.log(this.COLLECTION)
    })
  }

  next() {
    this.qIndex++;
    this.selectedQ = this.QUESTIONS[this.qIndex];
  }

  back() {
    this.qIndex--;
    this.selectedQ = this.QUESTIONS[this.qIndex];
  }
  finish() {
    this.isResultShown = true;
    this.QUESTIONS.forEach(Q => {
      Q.Q_isCorrect = Q.Q_answerIndex ? Q.Q_Answers[Q.Q_answerIndex - 1].A_isCorrect : false;
    })
    this.RIGHTTOTAL = this.QUESTIONS.filter(Q => Q.Q_isCorrect).length;
    if (this.log.isON) console.log(this.QUESTIONS, this.RIGHTTOTAL);
  }


  updateQuestion(e: iQuestion) {
    if (this.log.isON) console.log(e);
  }

  save() {
    let EXAM: iExam = this.localService.EXAM_DEFAULT;
    EXAM.E_EXAMINEE_ID = '6GK9eBKZpicdZ8g2DqJTknhW8LD3';
    EXAM.E_QUESTIONS = this.QUESTIONS;
    EXAM.E_RESULTS = this.QUESTIONS;
    EXAM.E_TAKEN_DATE = Date.now();

    console.log(EXAM)
    this.crudService.resultAdd(EXAM)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
    // this.openDialog();
  }

  openDialog(): void {
    let _data: DialogData = { name: 'Tran Phuoc Tho', email: 'tho@en', password: '' };
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: _data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      // this.appService.toastShow('Saved successfully', 3000, 'OK');
      this.appService.toastShowWithConfirmOK('Save successfully', 'OK');
    });
  }



}
