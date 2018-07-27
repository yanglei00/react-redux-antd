/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import { INIT_FETCH, INIT_FETCH_SUCCESS } from './constants';
import {GET} from '../../http/Http';
import URL from '../../http/url';
console.log(URL)
/**
 * Github repos request/response handler
 */
export function* getRepos() {
  try {
    const repos = yield call(GET, URL.CAMLIST, { clanId: 1 });
    console.log(repos);
    yield put(reposLoaded(INIT_FETCH_SUCCESS, repos.data));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(INIT_FETCH, getRepos);
}
