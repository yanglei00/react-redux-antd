/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SUBMITCLANINFO_FETCH, SUBMITCLANINFO_FETCH_SUCCESS, UPLOADCLANAVATAR_FETCH, UPLOADCLANAVATAR_FETCH_SUCCESS} from './constants';

import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectPictureUrl, makeSelectSlogan, makeSelectIntroduce} from './selectors';
import { push } from 'react-router-redux';

import {GET, POST_APP_FORM} from '../../http/Http';
import URL from '../../http/url';


/**
 * 更新战队头像 图片上传
 */
export function* uploadClanAvatar(action) {
  try {
    let file = action.params.fileName; 

    const repos = yield call(POST_APP_FORM, URL.UPLOADPICTURE, {file});
      console.log(repos)
      if(repos.urls){
        yield put(reposLoaded(UPLOADCLANAVATAR_FETCH_SUCCESS, repos.urls[0]))
      }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
/**
 * 保存战队信息
 */
export function* submitClanInfo(action) {
  try {
    console.log(action)
    
    const avatarImage = yield select(makeSelectPictureUrl());
    const slogan = yield select(makeSelectSlogan());
    const introduce = yield select(makeSelectIntroduce());
    console.log(introduce)
    const repos = yield call(GET, URL.UPLOADCLANINFO, {
      avatarImage,
      slogan,
      introduce
    });
    console.log(repos)
    if(repos.success){
      // yield put(reposLoaded(UPLOADCLANINFO_FETCH_SUCCESS, true));
      yield put(push({
        pathname: 'clanMien',
      }))
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* fetchData() {
  yield takeLatest(UPLOADCLANAVATAR_FETCH, uploadClanAvatar);
  yield takeLatest(SUBMITCLANINFO_FETCH, submitClanInfo);
}
