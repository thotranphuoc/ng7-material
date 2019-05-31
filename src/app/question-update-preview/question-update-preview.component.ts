import { Component, OnInit, Input } from '@angular/core';
import { iQuestion } from '../interfaces/question.interface';

@Component({
  selector: 'app-question-update-preview',
  templateUrl: './question-update-preview.component.html',
  styleUrls: ['./question-update-preview.component.css']
})
export class QuestionUpdatePreviewComponent implements OnInit {
  @Input('QUESTION') QUESTION: iQuestion;
  constructor() { }

  ngOnInit() {
  }

}
