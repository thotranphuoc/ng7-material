import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { iCollection } from '../interfaces/collection.interface';
import { ActivatedRoute } from '@angular/router';
import { iQuestion } from '../interfaces/question.interface';
import { MatRadioChange } from '@angular/material/radio';
import { LogService } from '../services/log.service';
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
    private crudService: CrudService,
    private route: ActivatedRoute,
    private log: LogService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.crudService.collectionGet(id).then((res) => {
      this.COLLECTION = <iCollection>res.data();
      this.QUESTIONS = this.COLLECTION.C_QUESTIONS;
      this.selectedQ = this.QUESTIONS[0]
      if(this.log.isON) console.log(this.COLLECTION)
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
      Q.Q_isCorrect = Q.Q_answerIndex? Q.Q_Answers[Q.Q_answerIndex - 1].A_isCorrect : false;
    })
    this.RIGHTTOTAL = this.QUESTIONS.filter(Q => Q.Q_isCorrect).length;
    if(this.log.isON) console.log(this.QUESTIONS, this.RIGHTTOTAL);
  }


  updateQuestion(e: iQuestion) {
    if(this.log.isON) console.log(e);
  }



}
