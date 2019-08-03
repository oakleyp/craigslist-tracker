import { Component, OnInit } from '@angular/core';
import Tracker from '../models/Tracker';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-tracker-get',
  templateUrl: './tracker-get.component.html',
  styleUrls: ['./tracker-get.component.scss']
})
export class TrackerGetComponent implements OnInit {

  trackers: Tracker[];

  constructor(private ts: TrackerService) { }

  deleteTracker(id) {
    this.ts.deleteTracker(id).subscribe();
  }

  ngOnInit() {
    this.ts
      .listTrackers()
      .subscribe((trackers: Tracker[]) => {
        this.trackers = trackers;
      });
  }

}
