import { Component, OnInit } from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-example-autocomplete',
  templateUrl: './example-autocomplete.component.html',
  styleUrls: ['./example-autocomplete.component.css']
})
export class ExampleAutocompleteComponent implements OnInit {
  options: string[] = ['One', 'Two', 'Three'];
  myControl = new FormControl();
  constructor() { }

  ngOnInit() {
  }

}
