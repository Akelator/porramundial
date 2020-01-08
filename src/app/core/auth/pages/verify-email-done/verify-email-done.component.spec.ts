import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailDoneComponent } from './verify-email-done.component';

describe('VerifyEmailDoneComponent', () => {
  let component: VerifyEmailDoneComponent;
  let fixture: ComponentFixture<VerifyEmailDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEmailDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
