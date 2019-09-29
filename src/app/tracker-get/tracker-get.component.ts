import { Component, OnInit } from '@angular/core';
import Tracker from '../models/Tracker';
import { TrackerService } from '../tracker.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-tracker-get',
  templateUrl: './tracker-get.component.html',
  styleUrls: ['./tracker-get.component.scss']
})
export class TrackerGetComponent implements OnInit {

  trackers: Tracker[];

  constructor(
    private ts: TrackerService,
    private ms: MessageService,
  ) { }

  deleteTracker(id) {
    this.ts.deleteTracker(id).subscribe(() => {
      this.trackers = this.trackers.filter(t => t._id !== id)
    }, (err) => {
      this.ms.add({
        text: `Error creating tracker: ${err.error.message}`,
        severity: 'danger',
      })
    });
  }

  ngOnInit() {
    this.ts
      .listTrackers()
      .subscribe(({trackers}: {trackers: Tracker[]}) => {
        this.trackers = trackers;
      });
  }

}
