import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPrintComponent } from './laporan-print.component';

describe('LaporanBigComponent', () => {
  let component: LaporanPrintComponent;
  let fixture: ComponentFixture<LaporanPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
