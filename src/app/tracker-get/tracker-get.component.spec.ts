import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerGetComponent } from './tracker-get.component';

describe('TrackerGetComponent', () => {
  let component: TrackerGetComponent;
  let fixture: ComponentFixture<TrackerGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
