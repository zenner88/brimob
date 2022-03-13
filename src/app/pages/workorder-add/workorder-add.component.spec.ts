import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderAddComponent } from './workorder-add.component';

describe('WorkorderAddComponent', () => {
  let component: WorkorderAddComponent;
  let fixture: ComponentFixture<WorkorderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkorderAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
