import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailRequestComponent } from './verify-email-request.component';

describe('VerifyEmailRequestComponent', () => {
  let component: VerifyEmailRequestComponent;
  let fixture: ComponentFixture<VerifyEmailRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEmailRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
