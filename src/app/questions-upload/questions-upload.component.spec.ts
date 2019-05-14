import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsUploadComponent } from './questions-upload.component';

describe('QuestionsUploadComponent', () => {
  let component: QuestionsUploadComponent;
  let fixture: ComponentFixture<QuestionsUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
