import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackerAddComponent } from './tracker-add/tracker-add.component';
import { TrackerGetComponent } from './tracker-get/tracker-get.component';
import { TrackerEditComponent } from './tracker-edit/tracker-edit.component';

const routes: Routes = [{
  path: 'tracker/create',
  component: TrackerAddComponent,
}, {
  path: 'tracker/edit/:id',
  component: TrackerEditComponent,
}, {
  path: 'tracker',
  component: TrackerGetComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
