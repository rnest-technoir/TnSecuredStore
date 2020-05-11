import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEntryDialogComponent } from './update-entry-dialog.component';

describe('UpdateEntryDialogComponent', () => {
  let component: UpdateEntryDialogComponent;
  let fixture: ComponentFixture<UpdateEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
