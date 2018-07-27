/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { INIT_FETCH_SUCCESS, VOTE_FETCH_SUCCESS } from './constants';

// The initial state of the App
const initialState = fromJS({
  initData: {},
});

function guessOrderReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case INIT_FETCH_SUCCESS:
      return state.set('initData', action.repos);
    case VOTE_FETCH_SUCCESS:
      return state.set('listData', action.repos);
    default:
      return state;
  }
}

export default guessOrderReducer;
