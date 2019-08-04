import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackerAddComponent } from './tracker-add/tracker-add.component';
import { TrackerGetComponent } from './tracker-get/tracker-get.component';
import { TrackerEditComponent } from './tracker-edit/tracker-edit.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { TrackerService } from './tracker.service';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackerAddComponent,
    TrackerGetComponent,
    TrackerEditComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ TrackerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
