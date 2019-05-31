import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exams-of-user',
  templateUrl: './exams-of-user.component.html',
  styleUrls: ['./exams-of-user.component.css']
})
export class ExamsOfUserComponent implements OnInit {

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.crudService.examsResultOfUserGet(id)
    .then((res: any)=>{
      console.log(res.RESULTS);
    })
  }

}
