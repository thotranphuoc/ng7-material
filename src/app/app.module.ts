import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExampleCheckboxComponent } from './example-checkbox/example-checkbox.component';

// For Material Modules
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ExampleAutocompleteComponent } from './example-autocomplete/example-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QuestionComponent } from './question/question.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import * as env from '../environments/environment'
import * as firebase from 'firebase/app';
import { QuestionAddComponent } from './question-add/question-add.component';
import { QuestionsUploadComponent } from './questions-upload/questions-upload.component';
import { PapaParseModule } from 'ngx-papaparse';
import { ExamComponent } from './exam/exam.component';
import { ExamsComponent } from './exams/exams.component';
import { QuestionResultViewComponent } from './question-result-view/question-result-view.component';

firebase.initializeApp(env.environment.firebaseConfig)
@NgModule({
  declarations: [
    AppComponent,
    ExampleCheckboxComponent,
    ExampleAutocompleteComponent,
    QuestionComponent,
    QuestionAddComponent,
    QuestionsUploadComponent,
    ExamComponent,
    ExamsComponent,
    QuestionResultViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    PapaParseModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
