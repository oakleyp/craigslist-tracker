import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackerService } from '../tracker.service';
import { MessageService } from '../message.service';
import Tracker from '../models/Tracker';

@Component({
  selector: 'app-tracker-add',
  templateUrl: './tracker-add.component.html',
  styleUrls: ['./tracker-add.component.scss']
})
export class TrackerAddComponent implements OnInit {

  trackerForm: FormGroup;
  notify_units: string[] = ['days', 'hours', 'minutes'];

  constructor(
    private fb: FormBuilder, 
    private ts: TrackerService, 
    private ms: MessageService,
    private router: Router,
  ) { 
    this.createForm();
  }

  createForm() {
    this.trackerForm = this.fb.group({
      tracker_name: ['', Validators.required],
      root_url: ['', Validators.required],
      search_text: ['', Validators.required],
      min_price: [''],
      max_price: [''],
      notify_every: ['', Validators.required],
      notify_unit: ['', Validators.required],
      notify_email: ['', Validators.required],
    });
  }

  addTracker() {
    if (this.trackerForm.dirty && this.trackerForm.valid) {
      this.ts.addTracker(this.trackerForm.value).subscribe(
        ({ tracker }: {tracker: Tracker} ) => { 
          this.ms.add({
            text: `Tracker ${this.trackerForm.value.tracker_name} created successfully`,
            severity: 'success',
          });
          
          this.router.navigate(['/tracker']);
        },
        err => {
         this.ms.add({
           text: `Error creating tracker: ${err.error.message}`,
           severity: 'danger',
         })
       }
      )
    }
  }

  ngOnInit() {
  }

}
