export const API_CALLS_STATUS = "API_CALLS_STATUS";

export function setApiCallsStatus(data) {
	return {
		type: API_CALLS_STATUS,
		payload: data,
	};
}
