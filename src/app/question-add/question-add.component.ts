import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { iQuestion } from '../interfaces/question.interface';
import { LocalService } from '../services/local.service';
import { iAnswer } from '../interfaces/answer.interface';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements OnInit {
  Q: iQuestion;
  ANSWER1: string = '';
  ANSWER2: string = '';
  ANSWER3: string = '';
  ANSWER4: string = '';
  correctedAnswer: string;
  isUpdate: boolean = false;
  ACTION: string = null;
  isLoading: boolean = false;
  @Input('QUESTION') QUESTION: iQuestion;
  constructor(
    private crudService: CrudService,
    private localService: LocalService,
    private log: LogService
  ) {
    this.Q = this.localService.QUESTION_DEFAULT;
  }

  ngOnInit() {
    console.log(this.QUESTION);
    if(this.QUESTION){
      this.Q = this.QUESTION;
      this.ANSWER1 = this.QUESTION.Q_Answers[0].A_Text
      this.ANSWER2 = this.QUESTION.Q_Answers[1].A_Text
      this.ANSWER3 = this.QUESTION.Q_Answers[2].A_Text
      this.ANSWER4 = this.QUESTION.Q_Answers[3].A_Text
      this.correctedAnswer = this.QUESTION.Q_Answers.filter(A=> A.A_isCorrect)[0].A_ID;
      this.isUpdate = true;
    }
  }

  createQuestion() {
    if(this.log.isON) console.log(this.Q, this.ANSWER1, this.ANSWER2, this.ANSWER3, this.ANSWER4, this.correctedAnswer);
    this.updateAnswers();
    this.crudService.questionNewAdd(this.Q)
  }

  updateAnswers(){
    let ANSWER1: iAnswer = {
      A_ID: '1',
      A_Text: this.ANSWER1,
      A_isCorrect: this.correctedAnswer == '1' ? true : false
    }
    let ANSWER2: iAnswer = {
      A_ID: '2',
      A_Text: this.ANSWER2,
      A_isCorrect: this.correctedAnswer == '2' ? true : false
    }
    let ANSWER3: iAnswer = {
      A_ID: '3',
      A_Text: this.ANSWER3,
      A_isCorrect: this.correctedAnswer == '3' ? true : false
    }
    let ANSWER4: iAnswer = {
      A_ID: '4',
      A_Text: this.ANSWER4,
      A_isCorrect: this.correctedAnswer == '4' ? true : false
    }
    this.Q.Q_Answers = [ANSWER1, ANSWER2, ANSWER3, ANSWER4];
  }

  updateQuestion(){
    this.isLoading = true;
    this.updateAnswers();
    console.log(this.Q);
    
    this.crudService.questionUpdate(this.Q).then((res)=>{
      console.log(res);
      this.ACTION = 'PREVIEW';
      this.isLoading = false;
    }).catch(err=> {
      console.log(err);
      this.isLoading = false;
    })
  }

}
