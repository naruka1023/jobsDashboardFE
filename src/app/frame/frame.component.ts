import { Component, OnInit } from '@angular/core';
import { POPULATE_JOBS } from '../actions';
import { IAppState } from '../store';
import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { NgRedux } from '@angular-redux/store';
import { GetJobsService } from '../get-jobs.service';
@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
 
  constructor(private ngRedux: NgRedux<IAppState>,
              private getJobsService: GetJobsService,
            private router: Router, 
            @Inject(SESSION_STORAGE) private storage:StorageService)  { }
  
  ngOnInit() {
    const STORAGE_KEY = 'companyID';
    var companyID = this.storage.get(STORAGE_KEY) || []
    if(companyID.length == 0){
      companyID = window.location.href;
      if(companyID.indexOf('cID=') != -1){
        companyID = companyID.substr(companyID.indexOf('cID='));
        companyID = companyID.split('=')[1];
        this.storage.set(STORAGE_KEY, companyID);
    }else{
      let url = 'https://jobdashboardbe.herokuapp.com/';
      window.location.href = url;
    }
    this.router.navigate(['/main'])
  }
  this.getJobsService.getJobs(companyID)
      .subscribe(jobs => {
        this.ngRedux.dispatch({type: POPULATE_JOBS, jobList: jobs});
  });
  }
}
