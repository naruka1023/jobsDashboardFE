import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
declare var $: any;
import {Job} from '../jobs';
import {Application} from '../applications';
import { UPDATE_JOB, UPDATE_APPLICATIONS } from '../actions';

@Component({
  selector: 'app-form-repository',
  templateUrl: './form-repository.component.html',
  styleUrls: ['./form-repository.component.css']
})
export class FormRepositoryComponent implements OnDestroy, OnInit {

  @select() updateState;

  subscription;
  modalFlag;
  formModel: Job;
  previousJID: string;
  applicantIDs: string [];
  applicantsArray: Application [];
  constructor(private ngRedux: NgRedux<IAppState>) {
  }
  
  onSubmit() {
    switch(this.modalFlag.value){
      case 'EDIT_FLAG':
        console.log(this.formModel);
        let formattedFormModel = JSON.parse(JSON.stringify(this.formModel));
        console.log(formattedFormModel);
        this.ngRedux.dispatch({type: UPDATE_JOB, job: formattedFormModel});
        $('#myModal').modal('toggle'); //or  $('#IDModal').modal('hide');
        $('#myModal').modal('hide');
      break;
      case 'APPLICANTS_FLAG':
        let applicantsFormatted = {};
        this.applicantsArray.forEach((value) => {
          value.status = parseInt(value.status);
          value.status = $('#sel' + value.nameID).val();
          applicantsFormatted[value.apID] = value;
          delete applicantsFormatted[value.apID].apID;
        })
        applicantsFormatted = JSON.parse(JSON.stringify(applicantsFormatted));
        this.ngRedux.dispatch({type: UPDATE_APPLICATIONS, applications: applicantsFormatted});
        console.log(this.applicantsArray);
        $('#myModal').modal('toggle'); //or  $('#IDModal').modal('hide');
        $('#myModal').modal('hide');
      break;
    }
  }
  
  onChange(i:number, nameID:string){
    console.log(i + ' : ' + nameID);
  }
    
  ngOnInit() {
    this.previousJID = '0';
    $('#myModal').on('shown.bs.modal', function (e) {
      let modal = document.getElementById('myModal').getAttribute('data-modal');
      if(modal != null){
        switch(modal){
          case "APPLICANTS_FLAG":
            let applicantsArray = [];
            let raw = document.getElementById('myModal').getAttribute('data-apps');
            document.getElementById('myModal').setAttribute('data-apps', '');
            document.getElementById('myModal').setAttribute('data-modal', '');
            applicantsArray = JSON.parse(raw);
            applicantsArray.forEach((value) =>{
              $('#sel' + value.nameID).val(value.status);
            })
          break;
        } 
      }
    })
    this.subscription = this.updateState.subscribe(() => {
      this.modalFlag = this.ngRedux.getState().updateState.modalFlag;
      if(this.modalFlag.jID != 0){
        this.processForm();
      }
    });
  }
  
  processForm(){
    let newJob = this.ngRedux.getState().updateState.jobListEditable.jobs.byId[this.modalFlag.jID];
    
    switch(this.modalFlag.value){

      case 'EDIT_FLAG':

      if(newJob != undefined){
          this.formModel = new Job(newJob);  
        }
        // $('#myModal').attr('data-modal', this.modalFlag.value);
      break;

      case 'APPLICANTS_FLAG':

      this.applicantsArray = [];
      let applicantKeys = newJob.apID;
      let rawApplicants = this.ngRedux.getState().updateState.jobListEditable.applicants.byId;
      applicantKeys.forEach((value) =>{
        let temp = new Application(rawApplicants[value]);
        temp.apID = value;
        temp.status = temp.status;
        this.applicantsArray.push(JSON.parse(JSON.stringify(temp)));
      })
      let arrayString = JSON.stringify(this.applicantsArray);
      document.getElementById('myModal').setAttribute('data-apps', arrayString);
      document.getElementById('myModal').setAttribute('data-modal', this.modalFlag.value);
      console.log(this.applicantsArray);
      break;

      default:
      
    }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
