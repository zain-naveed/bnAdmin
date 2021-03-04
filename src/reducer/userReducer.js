import * as UserActions from "../action/userLogin";
import initialState from "./initialState";

export const userProfileReducer = (state = initialState.profile, action) => {
	switch (action.type) {
		case UserActions.USER_CURRENT_PROFILE:
			state = action.payload;
			return state;
		default:
			return state;
	}
};
