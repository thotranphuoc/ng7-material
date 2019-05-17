import { Component, OnInit, Input } from '@angular/core';
import { iQuestion } from '../interfaces/question.interface';

@Component({
  selector: 'app-question-result-view',
  templateUrl: './question-result-view.component.html',
  styleUrls: ['./question-result-view.component.css']
})
export class QuestionResultViewComponent implements OnInit {
  @Input('QUESTION') QUESTION: iQuestion;
  constructor() { }

  ngOnInit() {
  }

}
