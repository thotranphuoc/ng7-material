import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { iQuestion } from '../interfaces/question.interface';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-question-update',
  templateUrl: './question-update.component.html',
  styleUrls: ['./question-update.component.css']
})
export class QuestionUpdateComponent implements OnInit {
  QUESTION: iQuestion;
  constructor(
    private crudService: CrudService,
    private localService: LocalService,
    private route: ActivatedRoute,
  ) { 
    // this.QUESTION = this.localService.QUESTION_DEFAULT;
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.crudService.questionGet(id).then((res) => {
      this.QUESTION = <iQuestion>res.data();
      console.log(this.QUESTION);
    })
  }

}
