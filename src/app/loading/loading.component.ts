import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  color = 'warn';
  mode = 'indeterminate';
  value = 50;
  constructor() { }

  ngOnInit() {
  }

}
