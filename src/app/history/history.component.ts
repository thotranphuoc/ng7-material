import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CrudService } from '../services/crud.service';
import { iQuestion } from '../interfaces/question.interface';
import { iExam } from '../interfaces/exam.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {
  UID: string;
  user: firebase.User;
  sub: Subscription;
  RESULTS = [];
  SelectedRESULT: iExam;
  QUESTIONS: iQuestion[] = [];
  constructor(
    private authService: AuthService,
    private crudService: CrudService
  ) { }

  ngOnInit() {
    console.log('init');
    this.sub = this.authService.authChange.subscribe((isAuth) => {
      console.log(isAuth);
      if (isAuth) {
        this.user = this.authService.getUser();
        console.log(this.user)
        this.getHistoryOfUser();
      } else {
        console.log('User out')
      }
    })

    if (this.authService.isAuth()) {
      this.user = this.authService.getUser();
      console.log(this.user)
      this.getHistoryOfUser();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    console.log('destroy')
  }

  getHistoryOfUser() {
    this.crudService.examsResultOfUserGet(this.user.uid)
      .then((res: any) => {
        console.log(res);
        this.RESULTS = res.RESULTS;
      })
      .catch(err => {
        console.log(err);
      })
  }

  getCorrectionFromQuestions(RESULT: iExam) {
    let E_RESULTS = RESULT.E_RESULTS;
    return E_RESULTS.filter(E => E.Q_isCorrect).length.toString() + '/' + E_RESULTS.length.toString();
  }

  getResult4Progress(RESULT: iExam) {
    let E_RESULTS = RESULT.E_RESULTS;
    return E_RESULTS.filter(E => E.Q_isCorrect).length * 100 / E_RESULTS.length.toString();

  }

  viewResult(RESULT: iExam) {
    console.log(RESULT);
    this.SelectedRESULT = RESULT;
    this.QUESTIONS = RESULT.E_RESULTS;
  }


}
