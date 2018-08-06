/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import {Modal, Toast} from 'antd-mobile';

import { INIT_FETCH, INIT_FETCH_SUCCESS,} from './constants';
import { reposLoaded, repoLoadingError,} from 'containers/App/actions';

import request from 'utils/request';
import {makeSelectInitData } from 'containers/TestPage/selectors';


import { GET, POST_JSON } from '../../http/Http';
import URL from '../../http/url';

/**
 * init
 */
export function* initFetch(action) {

  try {
    const repos = yield call(GET, URL.CLANINFO, { clanId: action.params.clanId });
    console.log(repos)
    yield put(reposLoaded(INIT_FETCH_SUCCESS, repos.data));

  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {

  yield takeLatest(INIT_FETCH, initFetch);
}
