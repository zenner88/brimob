import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanBigComponent } from './laporan-big.component';

describe('LaporanBigComponent', () => {
  let component: LaporanBigComponent;
  let fixture: ComponentFixture<LaporanBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
