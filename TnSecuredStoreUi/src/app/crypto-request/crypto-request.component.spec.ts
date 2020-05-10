import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoRequestComponent } from './crypto-request.component';

describe('CryptoRequestComponent', () => {
  let component: CryptoRequestComponent;
  let fixture: ComponentFixture<CryptoRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
