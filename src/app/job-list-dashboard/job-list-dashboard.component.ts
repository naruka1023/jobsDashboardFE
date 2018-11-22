import { Component, OnDestroy  } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { SAVE_ALL_JOBS, REVERT_JOB, SET_MODAL } from '../actions';
import { Job } from '../jobs';
declare var $: any;
import { IAppState } from '../store';
import { GetJobsService } from '../get-jobs.service';

@Component({
  selector: 'app-job-list-dashboard',
  templateUrl: './job-list-dashboard.component.html',
  styleUrls: ['./job-list-dashboard.component.css']
})
export class JobListDashboardComponent implements OnDestroy  {
  subscription;
  waitFlag:boolean;
  jobList: Job[];
  @select() updateState;

  constructor(private ngRedux: NgRedux<IAppState>,
              private getJobsService: GetJobsService)
    {}
    
  ngOnInit(){
    this.waitFlag = this.ngRedux.getState().updateState.waitFlag;
      this.subscription = this.updateState.subscribe(() =>{
        // console.log('service done');
        this.waitFlag = this.ngRedux.getState().updateState.waitFlag;
        if(this.waitFlag != false){
          var descriptions = Object.values(this.ngRedux.getState().updateState.jobListEditable.jobs.byId);
          // console.log(descriptions);
          setTimeout(() =>{
            descriptions.forEach((value) =>{
              $('#detail' + value['jID'] + '> .descriptionContainer').html(value['description']);
            })
            // console.log('popDescription Done');
          }, 500);
        }
        
     });
  }


  findAppDifference(arrayA, arrayB){
    let diffArray = [];
    arrayA.forEach(function (a, i) {  
      Object.keys(a).forEach(function (k) {
        if (a[k] !== arrayB[i][k]) {
          let temp = {};
          Object.keys(a).forEach(function (j) {
            temp[j] = arrayB[i][j]; 
          });      
          diffArray.push(temp);
        }
      });
    });
    return diffArray;
  }
  findJobDifference(arrayA, arrayB){
    let jobDifference = arrayA.filter((a, i) => { 
      let filterFlag = false;
      let aKeys = Object.keys(a); 
      for(let j = 0; j < aKeys.length; j++){
        if(a[aKeys[j]] !== arrayB[i][aKeys[j]]){
          filterFlag = true;
          break;
        }
      }
      if(filterFlag){
        return true;
      }else{
        return false;
      }
    });
    return jobDifference;
  }
  saveJobs(flag) {
    let originalJobsToSave = Object.values(this.ngRedux.getState().updateState.jobListCanon.jobs.byId);
    let originalApplicationsToSave = Object.values(this.ngRedux.getState().updateState.jobListCanon.applicants.byId);

    let jobsToSave = Object.values(this.ngRedux.getState().updateState.jobListEditable.jobs.byId);
    let applicationsToSave = Object.values(this.ngRedux.getState().updateState.jobListEditable.applicants.byId);

    let applicantKey = Object.keys(this.ngRedux.getState().updateState.jobListEditable.applicants.byId);
    
    for(let i = 0; i < applicationsToSave.length; i++){
      applicationsToSave[i]['apID'] = applicantKey[i];
      originalApplicationsToSave[i]['apID'] = applicantKey[i];
    }
    // originalJobsToSave.forEach((value, index)=>{
    //   delete jobsToSave[index]['apID'];
    //   delete value['apID'];
    //   delete value['updated_at'];
    //   delete value['created_at'];
    //   delete value['description'];
    //   delete value['how_to_apply'];
    // })
    
    let differenceApplicationsToSave = this.findAppDifference(originalApplicationsToSave, applicationsToSave);
    let differenceJobsToSave = this.findJobDifference(jobsToSave, originalJobsToSave);
    

    let payload = {
      jTS : differenceJobsToSave,
      aTS : differenceApplicationsToSave
    }
    this.getJobsService.saveAllJobs(payload)
        .subscribe((job) => {
          console.log(job);
          $('#myModal').modal('toggle');
          let currentApplicantState = Object.values(this.ngRedux.getState().updateState.jobListEditable.applicants.byId);
          currentApplicantState.forEach((value) =>{
            delete value['apID'];
          })
          this.ngRedux.dispatch({type: SAVE_ALL_JOBS, jobList: this.ngRedux.getState().updateState.jobListEditable});
          this.ngRedux.dispatch({type: SET_MODAL, modalFlag:{ value:flag }})
        });
  }
  revertJobs() {
    $('#cR').css('opacity', '100');
    setTimeout(() =>{
      $('#cR').animate({opacity: '0'}, 400, 'swing')
    }, 100);
    this.ngRedux.dispatch({ type: REVERT_JOB });
  }
  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }
  
  // jobList = jobList;
  

}
