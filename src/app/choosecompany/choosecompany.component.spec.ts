import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosecompanyComponent } from './choosecompany.component';

describe('ChoosecompanyComponent', () => {
  let component: ChoosecompanyComponent;
  let fixture: ComponentFixture<ChoosecompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosecompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosecompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
