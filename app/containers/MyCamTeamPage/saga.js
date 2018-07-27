/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { INIT_FETCH, INIT_FETCH_SUCCESS,WORKNUM_FETCH, WORKNUM_FETCH_SUCCESS } from './constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';


import {GET} from '../../http/Http';
import URL from '../../http/url';

/**
 * Github repos request/response handler
 */
export function* initFetch() {
  // Select username from store
  // const initData = yield select(makeSelectInitData());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  // console.log(username)
//  alert(1)
  try {
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, '/sg/cms/indexTop.json', {
    //   method: 'get'
    // });
    const repos = yield call(GET, URL.CLANINFO, {});
    console.log(repos)
    yield put(reposLoaded(INIT_FETCH_SUCCESS, repos.data));

  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// export function* initMyWorkNum() {
//   try {
//     const repos = yield call(GET, URL.WORKNUM, {clanId: 1});
//     console.log(repos)
//     yield put(reposLoaded(WORKNUM_FETCH_SUCCESS, repos.data));

//   } catch (err) {
//     yield put(repoLoadingError(err));
//   }
// }

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {

  yield takeLatest(INIT_FETCH, initFetch);
  // yield takeLatest(WORKNUM_FETCH, initMyWorkNum);
}
