import { Component, OnInit } from '@angular/core';
import { IAppState } from '../store';
import { NgRedux, select } from '@angular-redux/store';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
  @select() updateState;
  company:string;
  waitFlag:boolean;
  logoImg:string;
  totalJobPost:number;
  totalApplicants:number;
  totalAccepted:number;
  totalRejected:number;
  constructor(private ngRedux: NgRedux<IAppState>) { 
    this.company = '';
  }

  ngOnInit() {
    this.updateState
          .subscribe(jobs => {
            this.waitFlag = this.ngRedux.getState().updateState.waitFlag;
            if(this.waitFlag != false){
              let allJobs = jobs.jobListCanon.jobs;
              let allApplications = jobs.jobListCanon.applicants;
              let company = allJobs.byId[allJobs.allIds[0]].company;
              this.totalApplicants = 0;
              if(allJobs.allIds.length != 0){
                this.logoImg = allJobs.byId[allJobs.allIds[0]].company_logo;
                this.totalAccepted = 0;
                this.totalRejected = 0;
                this.company = company;
                this.totalJobPost = allJobs.allIds.length;
                if(Array.isArray(this.totalApplicants)){
                  this.totalApplicants = allApplications.allIds.length;
                }else{
                  this.totalApplicants = Object.values(allApplications.allIds).length;
                }
                Object.values(allApplications.byId).forEach((value)=>{
                  switch(value['status']){
                    case '1':
                      this.totalAccepted++;
                    break;
                    case '2':
                      this.totalRejected++;
                    break;
                  }
                })
              }
            }
                // jobs.jobListCanon.forEach((value)=>{
                //   this.totalApplicants += value.totalApplications;
                //   for (var key in value.applications){
                //     if(value.applications.hasOwnProperty(key)){
                //       switch(value.applications[key].status){
                //         case 1:
                //         this.totalAccepted++;
                //       break;
                //       case 2:
                //         this.totalRejected++;
                //       break;
                //       default:
                //       break;
                //       }
                //     }
                //   }
                // })
          });
  }

}
