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
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import * as env from '../environments/environment'
import * as firebase from 'firebase/app';
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
    HistoryComponent
  ],
  entryComponents: [LoginComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    PapaParseModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(env.environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
