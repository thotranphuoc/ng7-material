import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-example-checkbox',
  templateUrl: './example-checkbox.component.html',
  styleUrls: ['./example-checkbox.component.css']
})
export class ExampleCheckboxComponent implements OnInit {
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  constructor() { }

  ngOnInit() {
  }

}
