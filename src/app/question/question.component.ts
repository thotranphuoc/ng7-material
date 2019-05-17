import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { CrudService } from '../services/crud.service';
import { iQuestion } from '../interfaces/question.interface';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input('QUESTION') QUESTION: iQuestion;
  @Output('onUpdateQuestion') QuestionUpdated = new EventEmitter<iQuestion>();
  constructor(
    private crudService: CrudService,
    private log: LogService
  ) {
  }
  ngOnInit() {
  }


  onChange(mrChange: MatRadioChange) {
    if(this.log.isON) console.log(mrChange.value);
    this.QUESTION.Q_answerIndex = mrChange.value;
    this.QuestionUpdated.emit(this.QUESTION)
  }


}
