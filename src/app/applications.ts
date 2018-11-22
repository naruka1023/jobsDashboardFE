export class Application {
    name:string;
    nameID:string;
    status:any;
    apID:string;
    constructor(applicant:Application){
        this.name = applicant.name;
        this.nameID = applicant.nameID;
        this.status = applicant.status;
        this.apID = applicant.apID;
    }
}
