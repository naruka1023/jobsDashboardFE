import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { SAVE_ALL_JOBS, SET_MODAL } from '../actions';
import { GetJobsService } from '../get-jobs.service';
import { IAppState } from '../store';
declare var $: any;
import {Job} from '../jobs';
declare var $: any;

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent implements OnInit {

  constructor(private ngRedux: NgRedux<IAppState>,
    private getJobsService: GetJobsService) { }
  formModel: Job;
  waitFlag: boolean;
  selectValues: Object[];
  ngOnInit() {
    this.waitFlag = false;
    this.selectValues = [
      {id:'Full Time', name:'Full Time'},
      {id:'Part Time', name:'Part Time'},
      {id:'Contractual', name:'Contractual'}
    ];
    this.formModel = new Job();
    console.log(this.formModel);
  }
  onSubmit(){
    this.waitFlag = true;
    let j = this.ngRedux.getState().updateState.jobListCanon.jobs.byId[this.ngRedux.getState().updateState.jobListCanon.jobs.allIds[0]];
    this.formModel.company_logo = j.company_logo;
    this.formModel.company = j.company;
    this.formModel.company_url = j.company_url;
    this.formModel.jID = parseInt((Math.random()* 10000).toString()).toString();
    this.formModel.cID = j.cID;
    delete this.formModel.apID;
    this.formModel = JSON.parse(JSON.stringify(this.formModel));
    this.getJobsService.addJob(this.formModel)
        .subscribe(() => {
          this.waitFlag = false;
          $('#myModal').modal('toggle');
          this.ngRedux.dispatch({type: SET_MODAL, modalFlag:{ value:'ADD_SUCCESS_FLAG' }})
          window.location.href = window.location.origin + '/job-list';
        });
  }
}
