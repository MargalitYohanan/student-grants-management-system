import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestDetails } from './admin-request-details';

describe('AdminRequestDetails', () => {
  let component: AdminRequestDetails;
  let fixture: ComponentFixture<AdminRequestDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRequestDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRequestDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
