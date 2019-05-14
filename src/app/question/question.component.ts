import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { CrudService } from '../services/crud.service';
import { iQuestion } from '../interfaces/question.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  Question1 = {
    QText: 'If You Want To Adjust The Channel’s Demographic To Attract Primarily 13-17 Year Old Females, What Could You Do To Shift This Demographic?',
    QAnswers: [
      {
        AText: 'Produce more content that matches popular trends of teen girls and set a publishing schedule to align with after-school hours.',
        isCorrect: true,
        ID: '1'
      },
      {
        AText: 'Keep the content the same, but change the publishing schedule to be late at night.',
        isCorrect: false,
        ID: '2'
      },
      {
        AText: 'Change the content to be about travel, and try a monthly publishing schedule.',
        isCorrect: false,
        ID: '3'
      },
      {
        AText: 'Keep the content the same, but do more promotion on social media.',
        isCorrect: false,
        ID: '4'
      }
    ],
    ID: 'Q1234561',
    QNo: 'Question 1',
    isCorrect: false,
    answerIndex: null,
  }

  Question2 = {
    QText: 'What Is One Way That Channel Managers Help Grow A Channel?',
    QAnswers: [
      {
        AText: 'Set watch time and subscriber goals.',
        isCorrect: false,
        ID: '1'
      },
      {
        AText: 'Evaluate the channel’s role in the ecosystem and how it can leverage the other elements of the ecosystem.',
        isCorrect: true,
        ID: '2'
      },
      {
        AText: 'Assess competitors’ content and duplicate their content strategy.',
        isCorrect: false,
        ID: '3'
      },
      {
        AText: 'Encourage the channel to solely focus on viral content.',
        isCorrect: false,
        ID: '4'
      }
    ],
    ID: 'Q1234562',
    QNo: 'Question 2',
    isCorrect: false,
    answerIndex: null,
  };
  Question3 = {
    QText: 'When Do Fluctuations In CPMs Typically Happen?',
    QAnswers: [
      {
        AText: 'They dip at the end of the year and rise at the beginning of the year.',
        isCorrect: false,
        ID: '1'
      },
      {
        AText: 'CPMs don’t fluctuate, they are a fixed value across the year.',
        isCorrect: false,
        ID: '2'
      },
      {
        AText: 'CPMs rise at the end of a quarter and dip at the beginning of a quarter.',
        isCorrect: true,
        ID: '3'
      },
      {
        AText: 'They rise at the beginning of the quarter and dip at the end of the quarter.',
        isCorrect: false,
        ID: '4'
      }
    ],
    ID: 'Q1234563',
    QNo: 'Question 3',
    isCorrect: false,
    answerIndex: null,
  }

  Questions = [this.Question1, this.Question2, this.Question3]
  aIndex: number = 1;
  selectedQ: iQuestion;
  qIndex: number = 0;
  RESULTS = [];
  myAnswer = 2;
  QTOTAL: number = 0;
  RIGHTTOTAL: number = 0;
  isResultShown: boolean = false;
  QUESTIONS: iQuestion[] = [];
  constructor(
    private crudService: CrudService
  ) {
  }
  ngOnInit() {
    // this.selectedQ = this.Questions[this.qIndex];
    // console.log(this.selectedQ);
    // this.setSelectedQuestion(this.Questions[0]);
    this.RESULTS = Array(this.Questions.length);
    this.crudService.questionsGet().then((res: any) => {
      this.QUESTIONS = res.QUESTIONS;
      this.setSelectedQuestion(this.QUESTIONS[0]);
    })
  }

  checkFirebase() {

  }

  setSelectedQuestion(Q: iQuestion) {
    this.selectedQ = Q;
    console.log(this.selectedQ);
    this.aIndex = this.selectedQ.Q_answerIndex;
    // setTimeout(() => {
    //   this.aIndex = this.selectedQ.answerIndex;
    // }, 1000);
  }

  next() {
    // console.log(this.aIndex);
    // console.log(this.selectedQ.QAnswers[this.aIndex].isCorrect);
    // let RESULT = this.selectedQ;
    // RESULT.isCorrect = this.selectedQ.QAnswers[this.aIndex].isCorrect;
    // this.RESULTS[this.qIndex] = RESULT;
    this.qIndex++;
    this.selectedQ = this.QUESTIONS[this.qIndex];
    // this.aIndex = this.RESULTS[this.qIndex].answerIndex;
    // this.aIndex = null;
    // console.log(this.RESULTS);
  }

  back() {
    // console.log(this.aIndex);
    // console.log(this.selectedQ.QAnswers[this.aIndex].isCorrect);
    // let RESULT = this.selectedQ;
    // RESULT.isCorrect = this.selectedQ.QAnswers[this.aIndex].isCorrect;
    // this.RESULTS[this.qIndex] = RESULT;
    this.qIndex--;
    this.selectedQ = this.QUESTIONS[this.qIndex];
    // this.aIndex = null;
    // console.log(this.RESULTS);
  }

  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.selectedQ.Q_answerIndex = mrChange.value;
    console.log(this.QUESTIONS);
  }

  finish() {
    this.isResultShown = true;
    this.QUESTIONS.forEach(Q => {
      Q.Q_isCorrect = Q.Q_Answers[Q.Q_answerIndex - 1].A_isCorrect;
    })
    this.RIGHTTOTAL = this.QUESTIONS.filter(Q => Q.Q_isCorrect).length;
    console.log(this.QUESTIONS);
  }

}
