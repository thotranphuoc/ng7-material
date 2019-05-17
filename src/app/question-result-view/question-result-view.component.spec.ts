import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionResultViewComponent } from './question-result-view.component';

describe('QuestionResultViewComponent', () => {
  let component: QuestionResultViewComponent;
  let fixture: ComponentFixture<QuestionResultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionResultViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
