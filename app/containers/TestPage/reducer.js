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

// import { CHANGE_USERNAME } from './constants';

// The initial state of the App
const initialState = fromJS({
  count: 0,
  initData: {},
});

function testReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case 'CLICK':
      // Delete prefixed '@' from the github username
      return state.set('count', action.count + 1);
    case 'INITFETCH_SUCCESS':
      // Delete prefixed '@' from the github username
      return state.set('initData', action.initData);
    default:
      return state;
  }
}

export default testReducer;
