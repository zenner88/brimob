import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanGiatComponent } from './laporan-giat.component';

describe('LaporanBigComponent', () => {
  let component: LaporanGiatComponent;
  let fixture: ComponentFixture<LaporanGiatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanGiatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanGiatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
