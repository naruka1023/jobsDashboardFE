import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Application } from './applications';
import { Job } from './Jobs';
import { catchError, filter } from 'rxjs/operators';
// import { jobList } from './jobList';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class GetJobsService {
  
  private jobsUrl = 'http://localhost:8000/api'
  
  constructor(private http: HttpClient) {}

  getJobs(cID: string): Observable<Application[]>{
    const URL = `${this.jobsUrl}/dashboard?companyID=${cID}`;
    
    let response = this.http.get<Application[]>(URL, httpOptions).pipe(
      catchError(this.handleError<Application[]>(`getJobs cID=${cID}`))
    );

    return response;
  }
  saveAllJobs(payload: any): Observable<Object>{
    const URL = `${this.jobsUrl}/dashboard`;
 
    return this.http.put<Object>(URL, payload, httpOptions).pipe(
      catchError(this.handleError<Object>(`saveAllJobs`, payload))
    );
  }
  addJob(payload: any): Observable<Object>{
    
    const URL = `${this.jobsUrl}/jobs`;
    return this.http.post<Object>(URL, payload, httpOptions).pipe(
      catchError(this.handleError<Object>(`saveAllJobs`, payload))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
}
