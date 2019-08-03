import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-tracker-add',
  templateUrl: './tracker-add.component.html',
  styleUrls: ['./tracker-add.component.scss']
})
export class TrackerAddComponent implements OnInit {

  trackerForm: FormGroup;

  constructor(private fb: FormBuilder, private ts: TrackerService) { 
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

    console.log('trackerForm created', this.trackerForm);
  }

  addTracker() {
    if (this.trackerForm.dirty && this.trackerForm.valid) {
      const trackerVals = this.trackerForm.value;
      this.ts.addTracker(
        trackerVals.tracker_name, 
        trackerVals.root_url, 
        trackerVals.search_text, 
        trackerVals.min_price, 
        trackerVals.max_price
      );
    }
  }

  ngOnInit() {
  }

}
