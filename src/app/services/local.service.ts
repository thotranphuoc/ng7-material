import { Injectable } from '@angular/core';
import { iQuestion } from '../interfaces/question.interface';
import { iCollection } from '../interfaces/collection.interface';

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

  COLLECTION_DEFAULT: iCollection = {
    C_CREATEDON: '',
    C_ID: '',
    C_OWNER: '',
    C_OWNER_ID: '',
    C_QUESTIONS: [],
    C_TITLE: '',
  }
}
