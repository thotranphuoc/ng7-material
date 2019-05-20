import { Injectable } from '@angular/core';
import { iQuestion } from '../interfaces/question.interface';
import { iCollection } from '../interfaces/collection.interface';
import { iExam } from '../interfaces/exam.interface';

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

  EXAM_DEFAULT: iExam = {
    E_ID: '',
    E_TITLE: '',
    // E_QUESTIONS: [],
    E_EXAMINEE: '',
    E_EXAMINEE_ID: '',
    E_RESULTS: [],
    E_EXAMINER: '',
    E_EXAMINER_ID: '',
    E_TAKEN_ID: '',
    E_TAKEN_DATE: null,
    E_DATE: null
  }
}
