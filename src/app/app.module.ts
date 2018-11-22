import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { FormsModule }   from '@angular/forms';
import { IAppState, rootReducer, INITIAL_STATE } from './store';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { BrowserModule } from '@angular/platform-browser';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { JobBlockComponent } from './job-block/job-block.component';
import { JobListDashboardComponent } from './job-list-dashboard/job-list-dashboard.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { TemplateDashboardComponent } from './template-dashboard/template-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { FrameComponent } from './frame/frame.component';
import { FormRepositoryComponent } from './form-repository/form-repository.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { ObjectToArrayPipe } from './object-to-array.pipe';
import { ChoosecompanyComponent } from './choosecompany/choosecompany.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    JobBlockComponent,
    JobListDashboardComponent,
    MainDashboardComponent,
    TemplateDashboardComponent,
    FrameComponent,
    FormRepositoryComponent,
    AddJobsComponent,
    ObjectToArrayPipe,
    ChoosecompanyComponent,
    DashboardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgReduxModule,
    AppRoutingModule,
    StorageServiceModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
   store;
  constructor (ngRedux: NgRedux<IAppState>) {
    
    this.store = ngRedux.configureStore(rootReducer, INITIAL_STATE, []);
  }

}

