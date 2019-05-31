import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionUpdatePreviewComponent } from './question-update-preview.component';

describe('QuestionUpdatePreviewComponent', () => {
  let component: QuestionUpdatePreviewComponent;
  let fixture: ComponentFixture<QuestionUpdatePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionUpdatePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionUpdatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
