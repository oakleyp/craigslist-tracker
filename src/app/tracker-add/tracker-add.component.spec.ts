import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerAddComponent } from './tracker-add.component';

describe('TrackerAddComponent', () => {
  let component: TrackerAddComponent;
  let fixture: ComponentFixture<TrackerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
