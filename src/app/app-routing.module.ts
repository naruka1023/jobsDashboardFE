import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobListDashboardComponent }   from './job-list-dashboard/job-list-dashboard.component';
import { MainDashboardComponent }      from './main-dashboard/main-dashboard.component';
import {AddJobsComponent} from './add-jobs/add-jobs.component';


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  // { path: 'dashboard', redirectTo: '/dashboard/main', pathMatch: 'full' },
  { path: 'job-list', component: JobListDashboardComponent},
  { path: 'main', component: MainDashboardComponent},
  { path: 'add-jobs', component: AddJobsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/