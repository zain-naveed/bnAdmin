import * as addStudent from '../action/addStudentAction';
import initialState from './initialState';
export function addStudentReducer(state=initialState.addStudent,action){
    switch(action.type){
        case addStudent.ADD_STUDENT:
            state = action.payload
            return state;
        default:
            return state;
    }
}