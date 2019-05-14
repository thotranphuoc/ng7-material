import { Injectable } from '@angular/core';
import { iQuestion } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  QUESTION_DEFAULT: iQuestion = {
    Q_Text: '',
    Q_Answers: [],
    Q_ID: '',
    Q_Title: '',
    Q_isCorrect: false,
    Q_answerIndex: null,
    Q_OwnerID: '',
    Q_CreatedDate: '',
    Q_Level: '',
    Q_Type: ''
  }

  QUESTION: iQuestion = {
    Q_Text: '',
    Q_Answers: [],
    Q_ID: '',
    Q_Title: '',
    Q_isCorrect: false,
    Q_answerIndex: null,
    Q_OwnerID: '',
    Q_CreatedDate: '',
    Q_Level: '',
    Q_Type: ''
  }
}
