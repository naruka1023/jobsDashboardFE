import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBlockComponent } from './job-block.component';

describe('JobBlockComponent', () => {
  let component: JobBlockComponent;
  let fixture: ComponentFixture<JobBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
