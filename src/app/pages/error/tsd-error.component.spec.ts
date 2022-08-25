import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsdErrorComponent } from './tsd-error.component';

describe('TsdErrorComponent', () => {
  let component: TsdErrorComponent;
  let fixture: ComponentFixture<TsdErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TsdErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsdErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
