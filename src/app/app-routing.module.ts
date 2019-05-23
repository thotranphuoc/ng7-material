import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleCheckboxComponent } from './example-checkbox/example-checkbox.component';
import { ExampleAutocompleteComponent } from './example-autocomplete/example-autocomplete.component';
import { QuestionComponent } from './question/question.component';
import { QuestionAddComponent } from './question-add/question-add.component';
import { QuestionsUploadComponent } from './questions-upload/questions-upload.component';
import { ExamComponent } from './exam/exam.component';
import { ExamsComponent } from './exams/exams.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  // { path: '', component: QuestionComponent },

  { path: '', component: ExamsComponent },
  { path: 'exam/:id', component: ExamComponent },
  { path: 'question-add', component: QuestionAddComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'questions-upload', component: QuestionsUploadComponent },
  { path: 'checkbox', component: ExampleCheckboxComponent },
  { path: 'auto-complete', component: ExampleAutocompleteComponent },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', redirectTo: '', component: ExamsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
