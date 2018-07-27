/**
 * Gets the repositories of the user from Github
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GETMYGOLD_FETCH, GETMYGOLD_FETCH_SUCCESS, DOGUESS_FETCH, DOGUESS_FETCH_SUCCESS } from './constants';

import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { } from './selectors';
import { push } from 'react-router-redux';

import {GET, POST_JSON} from '../../http/Http';
import URL from '../../http/url';
import { Toast } from 'antd-mobile/lib/index';

/**
 * 获得金币
 */
export function* getMyGuess() {
  try {
    const repos = yield call(GET, URL.GETMYGOLD);
    console.log(repos)
    if(repos.success){
      yield put(reposLoaded(GETMYGOLD_FETCH_SUCCESS, repos.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
/**
 * 金币竞猜
 */
export function* doGuess(action) {
  try {
    console.log(action)
    
    const repos = yield call(POST_JSON, URL.DOGUESS, action.params, '', {headers: {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}});
    console.log(repos)
    if(repos.success){
      // yield put(reposLoaded(DOGUESS_FETCH_SUCCESS));
      yield call(getMyGuess);
      Toast.success('竞猜成功')
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* fetchData() {
  yield takeLatest(GETMYGOLD_FETCH, getMyGuess);
  yield takeLatest(DOGUESS_FETCH, doGuess);
}
