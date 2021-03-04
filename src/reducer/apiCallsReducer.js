import * as ApiCallsActions from "../action/apiCallsStatus";
import initialState from "./initialState";

export const apiCallsReducer = (state = initialState.apiCallstatus, action) => {
	switch (action.type) {
		case ApiCallsActions.API_CALLS_STATUS:
			state = action.payload;
			return state;
		default:
			return state;
	}
};
