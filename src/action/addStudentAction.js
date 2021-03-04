export const ADD_STUDENT = "ADD_STUDENT";
export const addStudentAction = (data)=>{
    return {
        type:ADD_STUDENT,
        payload:data
    }
} 