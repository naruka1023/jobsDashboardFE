import {Job} from './jobs'
import {updateState} from './states';
import { SAVE_ALL_JOBS, REVERT_JOB, REMOVE_JOB, UPDATE_APPLICATIONS, UPDATE_JOB, SET_MODAL, POPULATE_JOBS } from './actions';

export interface IAppState {
    addState: Job;
    updateState: any;
    
}
export const INITIAL_STATE: IAppState = {
     addState: new Job,
    updateState: new updateState
}

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case POPULATE_JOBS:
            // action.jobList.forEach((values, index) =>{
            //     // let count = values.names.split(', ').length;
            //     // action.jobList[index]['count'] = count;
            // });
            return { ...state, updateState:{
                ...state.updateState, jobListCanon: action.jobList, jobListEditable: action.jobList, waitFlag:true
            }}
        case SAVE_ALL_JOBS:
            return { ...state, updateState:{
                ...state.updateState,  jobListCanon: action.jobList
            }}
        case SET_MODAL:
            return { ...state, updateState:{
                ...state.updateState,  modalFlag:action.modalFlag
            }}
        case REVERT_JOB:
            return { ...state, updateState:{
                ...state.updateState,  jobListEditable: state.updateState.jobListCanon
            }}
        // case REMOVE_JOB:
        //     return { ...state, updateState:{
        //         ...state.updateState,  jobListEditable: state.updateState.jobListEditable.filter(t => t.seq !== action.seq),
        //     }}
        case UPDATE_APPLICATIONS:
        var newState = {...state};
        Object.keys(action.applications).forEach((value) => {
            newState = { ...newState, updateState:{
                ...newState.updateState,  jobListEditable: {
                    ...newState.updateState.jobListEditable, applicants:{
                        ...newState.updateState.jobListEditable.applicants, byId:{
                            ...newState.updateState.jobListEditable.applicants.byId, [value]:action.applications[value]} 
                    }
                }
            }}
        })
        return newState;
        case UPDATE_JOB:

        
        var newState = { ...state, updateState:{
            ...state.updateState,  jobListEditable: {
                ...state.updateState.jobListEditable, jobs:{
                    ...state.updateState.jobListEditable.jobs, byId:{
                        ...state.updateState.jobListEditable.jobs.byId, [action.job.jID]:action.job
                    } 
                }
            }
        }}
        return newState;
    }
    return state;
}