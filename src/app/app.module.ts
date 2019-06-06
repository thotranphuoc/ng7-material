import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// angularfire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExampleCheckboxComponent } from './example-checkbox/example-checkbox.component';
import { QuestionComponent } from './question/question.component';
import { ExampleAutocompleteComponent } from './example-autocomplete/example-autocomplete.component';
import { QuestionAddComponent } from './question-add/question-add.component';
import { QuestionsUploadComponent } from './questions-upload/questions-upload.component';
import { PapaParseModule } from 'ngx-papaparse';
import { ExamComponent } from './exam/exam.component';
import { ExamsComponent } from './exams/exams.component';
import { QuestionResultViewComponent } from './question-result-view/question-result-view.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { ToastComponent } from './toast/toast.component';
import { TestComponent } from './test/test.component';
import { LoadingComponent } from './loading/loading.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { QuestionUpdateComponent } from './question-update/question-update.component';
import { QuestionUpdatePreviewComponent } from './question-update-preview/question-update-preview.component';
import { ExamsOfUserComponent } from './exams-of-user/exams-of-user.component';
import { HistoryComponent } from './history/history.component';
import { TimerComponent } from './timer/timer.component';
import { MaterialModule } from './material.module';
import * as env from '../environments/environment'
import * as firebase from 'firebase/app';

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
    QuestionResultViewComponent,
    LoginComponent,
    AlertComponent,
    ToastComponent,
    TestComponent,
    LoadingComponent,
    SidenavListComponent,
    HeaderComponent,
    AccountComponent,
    QuestionUpdateComponent,
    QuestionUpdatePreviewComponent,
    ExamsOfUserComponent,
    HistoryComponent,
    TimerComponent
  ],
  entryComponents: [LoginComponent, AlertComponent, AccountComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PapaParseModule,
    MaterialModule,
    AngularFireModule.initializeApp(env.environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
