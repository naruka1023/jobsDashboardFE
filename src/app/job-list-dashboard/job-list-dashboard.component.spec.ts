import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListDashboardComponent } from './job-list-dashboard.component';

describe('JobListDashboardComponent', () => {
  let component: JobListDashboardComponent;
  let fixture: ComponentFixture<JobListDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobListDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
