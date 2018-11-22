import { Component, OnInit } from '@angular/core';
import { IAppState } from '../store';
import * as $ from 'jquery';
import { NgRedux, select } from '@angular-redux/store';

@Component({
  selector: 'app-template-dashboard',
  templateUrl: './template-dashboard.component.html',
  styleUrls: ['./template-dashboard.component.css']
})
export class TemplateDashboardComponent implements OnInit {
  
  @select() updateState;
  selected : string;
  currentPage : string[];
  iconBarFlag :boolean;
  company: string;
  
  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.updateState
          .subscribe(jobs => {
            if(jobs.jobListEditable.jobs.allIds[0] != ''){
              this.company = this.ngRedux.getState().updateState.jobListEditable.jobs.byId[this.ngRedux.getState().updateState.jobListEditable.jobs.allIds[0]].company;
            }
          });
    this.iconBarFlag = true;
    this.currentPage = window.location.href.split('/');
    this.selected = this.currentPage[this.currentPage.length-1] + '';
  }
  onSelect( select:string): void {
    this.selected = select;
    $(".icon-bar").animate({
      left:'-100px'
    },200);
    this.iconBarFlag = true;
  }
  toggleMenu():void{
    $(document).ready(()=>{
      if(this.iconBarFlag){
        $(".icon-bar").animate({ left:'10px' }, 300).animate({ left: '0px'}, 200);

      }else{
        $(".icon-bar").animate({ left:'-100px' }, 300);
      }
      this.iconBarFlag = !this.iconBarFlag;
    })
  }
}
