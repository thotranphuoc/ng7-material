import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleCheckboxComponent } from './example-checkbox/example-checkbox.component';
import { ExampleAutocompleteComponent } from './example-autocomplete/example-autocomplete.component';
import { QuestionComponent } from './question/question.component';
import { QuestionAddComponent } from './question-add/question-add.component';

const routes: Routes = [
  { path: '', component: QuestionComponent },
  { path: 'question-add', component: QuestionAddComponent },
  { path: 'checkbox', component: ExampleCheckboxComponent },
  { path: 'auto-complete', component: ExampleAutocompleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
