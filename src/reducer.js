// https://github.com/svrcekmichal/redux-axios-middleware
// Every action which have payload.request defined will be handled by middleware. There are two possible type definitions.

// use action.type with string name
// action with type will be dispatched on start, and then followed by type suffixed with underscore and
// success suffix on success, or error suffix on error
// defaults: success suffix = "_SUCCESS" error suffix = "_FAIL"
export const GET_ACCOUNT = 'google/LOAD';
export const GET_ACCOUNT_SUCCESS = 'google/LOAD_SUCCESS';
export const GET_ACCOUNT_FAIL = 'google/LOAD_FAIL';

export default function reducer(state = { account: {} }, action) {
  switch (action.type) {
    case GET_ACCOUNT:
      return { ...state, loading: true };
    case GET_ACCOUNT_SUCCESS:
      console.log('reducer action.payload: ' + JSON.stringify(action.payload));
      return { ...state, loading: false, account: action.payload.data };
    case GET_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching account'
      };
    default:
      return state;
  }
}

// When we call the accountInfo function, the action GET_ACCOUNT is dispatched with a payload.request content.
// The redux-axios-middleware intercepts this action and eventually make an HTTP request to the GitHub API.
// After that, it will, automatically, dispatch either a GET_ACCOUNT_SUCCESS or a GET_ACCOUNT_FAIL action,
// depending on the status of the request. If you look at the reducer function, you see that we are returning
// a new state based on all the dispatched actions, being the most important the GET_ACCOUNT_SUCCCESS where we
// extract the account info from the action.payload (response from the API).
export function accountInfo(user) {
  return {
    type: GET_ACCOUNT,
    payload: {
      request: {
        url: `/users/${user}`
      }
    }
  };
}
