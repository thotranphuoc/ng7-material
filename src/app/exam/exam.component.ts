import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { iCollection } from '../interfaces/collection.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { iQuestion } from '../interfaces/question.interface';
import { MatRadioChange } from '@angular/material/radio';
import { LogService } from '../services/log.service';
import { MatDialog } from '@angular/material';
import { LoginComponent, DialogData } from '../login/login.component';
import { AppService } from '../services/app.service';
import { iExam } from '../interfaces/exam.interface';
import { LocalService } from '../services/local.service';
import { AuthService } from '../services/auth.service';
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
  EXAM: iExam;
  constructor(
    private localService: LocalService,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    private log: LogService,
    private dialog: MatDialog,
    private appService: AppService,
    private authService: AuthService
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
    this.EXAM = this.localService.EXAM_DEFAULT;
    // EXAM.E_EXAMINEE_ID = '6GK9eBKZpicdZ8g2DqJTknhW8LD3';
    // this.EXAM.E_QUESTIONS = this.QUESTIONS;
    this.EXAM.E_RESULTS = this.QUESTIONS;
    this.EXAM.E_TAKEN_DATE = Date.now();

    console.log(this.EXAM)
    if (this.authService.isAuth()) {
      this.EXAM.E_EXAMINEE_ID = this.authService.user.uid;
      this.doSaveResult();
    } else {
      this.openDialog();
    }
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
      if (this.authService.isAuth()) {
        this.EXAM.E_EXAMINEE_ID = this.authService.user.uid;
        this.doSaveResult();
      }
      // this.appService.toastShowWithConfirmOK('Save successfully', 'OK');
    });
  }


  doSaveResult() {
    this.crudService.resultAdd(this.EXAM)
      .then((res) => {
        console.log(res);
        this.appService.toastShow('Result saved!', 3000, 'OK');
        this.router.navigate(['/'])
      })
      .catch((err) => {
        console.log(err);
      })
  }



}
