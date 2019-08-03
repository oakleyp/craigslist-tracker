import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerEditComponent } from './tracker-edit.component';

describe('TrackerEditComponent', () => {
  let component: TrackerEditComponent;
  let fixture: ComponentFixture<TrackerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
