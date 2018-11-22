export class JobTree {
    jobs = {
      byId:Object,
      allIds:[]
    }
    applicants = {
      byId:Object,
      allIds: []
    }
    constructor(job:JobTree = null){
      console.log(job);
      if(job == null){
        this.jobs = {
          byId : null,
          allIds : ['']
        }
        this.applicants = {
          byId : null,
          allIds : ['']
        }
      }else{
        this.jobs = {
          byId : job.jobs.byId,
          allIds : job.jobs.allIds
        }
        this.applicants = {
          byId : job.applicants.byId,
          allIds : job.applicants.allIds
        }
      }
    }
  }
  
export class Job {
    available: number
    title: string
    location: string
    type: string
    url: string
    company: string
    company_url: string
    company_logo: string
    description: string
    jID: string
    cID: number
    apID: string[]
    constructor(job:Job = null){
      if(job == null){
        this.apID = [];
        this.available = 0;
        this.company = '';
        this.url = '';
        this.cID = 0;
        this.company_url = '';
        this.company_logo = '';
        this.description = '';
        this.jID = '0';
        this.type = 'Full Time';
        this.location = '';
        this.title = '';
        
      }else{
        this.apID = job.apID;
        this.available = job.available;
        this.company = job.company;
        this.url = job.url;
        this.company_url = job.company_url;
        this.company_logo = job.company_logo;
        this.description = job.description;
        this.jID = job.jID;
        this.cID = job.cID;
        this.type = job.type;
        this.location = job.location;
        this.title = job.title;
      }
    }
  }
