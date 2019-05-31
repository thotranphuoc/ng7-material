import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsOfUserComponent } from './exams-of-user.component';

describe('ExamsOfUserComponent', () => {
  let component: ExamsOfUserComponent;
  let fixture: ComponentFixture<ExamsOfUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamsOfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
