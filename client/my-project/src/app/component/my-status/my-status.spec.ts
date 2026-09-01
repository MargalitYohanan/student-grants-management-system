import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStatus } from './my-status';

describe('MyStatus', () => {
  let component: MyStatus;
  let fixture: ComponentFixture<MyStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(MyStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
