export const USER_CURRENT_PROFILE = "USER_CURRENT_PROFILE";

export function currentUserProfile(data) {
	return {
		type: USER_CURRENT_PROFILE,
		payload: data,
	};
}
