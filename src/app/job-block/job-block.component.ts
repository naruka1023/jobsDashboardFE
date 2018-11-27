import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { REMOVE_JOB, SET_MODAL } from '../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
@Component({
  selector: 'app-job-block',
  templateUrl: './job-block.component.html',
  styleUrls: ['./job-block.component.css']
})
export class JobBlockComponent implements OnInit {

  constructor(private ngRedux: NgRedux<IAppState>) { 
    
  }
  
  @Input() job;
  @Input() forDashboard:boolean;

  // popper: Popper;
  jobBlock:string;
  activatedFlag: boolean;
  totalApplications:number;

  
  ngOnInit() {
    // var button = $('#button');
    // var popup = $('#popup');
    // popup.show();
    //   var popper = new Popper(button, popup,{
    //   placement: 'bottom'
    // })
    this.activatedFlag = false;
    this.jobBlock = '#jobBlock' + this.job.jID;
    this.totalApplications =  this.job.apID.length;
  }

  removeTodo(job) {
    this.ngRedux.dispatch({type: REMOVE_JOB, job:job });
  }
  setModal(flag){
    this.ngRedux.dispatch({type: SET_MODAL, modalFlag:{jID:this.job.jID, value:flag }})
  }

  
  mouseHover(e){
    if(this.activatedFlag == false){
      if(e.type == 'mouseenter'){
        $(this.jobBlock).animate({ left:'30px'}, 200);
      }
      if(e.type == 'mouseleave'){
         $(this.jobBlock).animate({ left:'0px'}, 200);
      }
    }
  }

  toggleDetail(jobOpen : boolean): void{
    if(jobOpen){
      let CB = '#close' + this.job.jID;
      let AF = this.activatedFlag;

      if(!this.activatedFlag){
        $(this.jobBlock).animate({left:'0px'}, 200)
      }
      $('#detail' + this.job.jID).slideToggle( "slow", function() {
        setTimeout(()=>{(!AF)? $(CB).css({display:'block'}): $(CB).css({display:'none'})}, 50);
      });
      this.activatedFlag = !this.activatedFlag;
    } 
  }
}
