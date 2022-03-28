import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanAddComponent } from './laporan-add.component';

describe('LaporanAddComponent', () => {
  let component: LaporanAddComponent;
  let fixture: ComponentFixture<LaporanAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
