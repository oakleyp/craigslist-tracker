import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackerService } from '../tracker.service';
import Tracker from '../models/Tracker';


@Component({
  selector: 'app-tracker-edit',
  templateUrl: './tracker-edit.component.html',
  styleUrls: ['./tracker-edit.component.scss']
})
export class TrackerEditComponent implements OnInit {

  trackerForm: FormGroup;
  tracker: Tracker = new Tracker();

  constructor(
    private ts: TrackerService, 
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { 
    this.createForm();
  }

  createForm() {
    this.trackerForm = this.fb.group({
      tracker_name: ['', Validators.required],
      root_url: ['', Validators.required],
      search_text: ['', Validators.required],
      min_price: ['', Validators.required],
      max_price: ['', Validators.required],
    });
  }

  saveTracker() {
    if (this.trackerForm.dirty && this.trackerForm.valid) {
      const trackerVals = this.trackerForm.value;     
      this.route.params.subscribe(params => {
        this.ts.updateTracker(
          params.id,
          trackerVals.tracker_name,
          trackerVals.root_url,
          trackerVals.search_text,
          trackerVals.min_price,
          trackerVals.max_price,
        );
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ts.getTracker(params.id).subscribe((tracker: Tracker) => {
        this.tracker = tracker;
      })
    })
  }

}
