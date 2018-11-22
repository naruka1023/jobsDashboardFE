
import {JobTree} from './jobs'

export class updateState{

    jobListCanon: JobTree
    jobListEditable: JobTree
    modalFlag: Object
    waitFlag: boolean;
    constructor(){
        this.waitFlag = false;
        this.jobListCanon = new JobTree;
        this.jobListEditable = new JobTree;
        this.modalFlag = {
            value:'',
            jID:0
        }
    }
}
