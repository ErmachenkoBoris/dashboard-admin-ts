import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsdAuthorizationComponent } from './tsd-authorization.component';

describe('TsdAuthorizationComponent', () => {
  let component: TsdAuthorizationComponent;
  let fixture: ComponentFixture<TsdAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TsdAuthorizationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsdAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
