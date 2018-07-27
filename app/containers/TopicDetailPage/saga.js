/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { INIT_FETCH, INIT_FETCH_SUCCESS,WORKNUM_FETCH, WORKNUM_FETCH_SUCCESS, SUBMITCOMMENTS_FETCH, SUBMITCOMMENTS_FETCH_SUCCESS , SETCOMMENTPRAISE_FETCH, SETCOMMENTPRAISE_FETCH_SUCCESS} from './constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';


import {GET} from '../../http/Http';
import URL from '../../http/url';
import { Toast } from 'antd-mobile/lib/index';

/**
 * Github repos request/response handler
 */
export function* initFetch(action) {
  try {
    const repos = yield call(GET, URL.DETAILCONTENT, {id: action.params.storyId});
    console.log(repos)
    if(repos.ok){
      yield put(reposLoaded(INIT_FETCH_SUCCESS, repos.data));
    }

  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
// 获取提交评论成功的那一条信息
export function* initMyWorkNum(storyId) {
  try {
    const repos = yield call(GET, URL.DETAILCOMMENT, {storyId: storyId, pageIndex: 1, pageSize: 1});
    console.log(repos)
    if(repos.ok && repos.data.list && repos.data.list.length > 0){
      yield put(reposLoaded(WORKNUM_FETCH_SUCCESS, repos.data.list[0]));
    }

  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
//  提交帖子评论接口
export function* insertStoryComment(action) {
  try {
    console.log(action)
    const repos = yield call(GET, URL.INSERTSTORYCOMMENT, action.params);
    console.log(repos)
    if(repos.ok){
      // yield put(reposLoaded(SUBMITCOMMENTS_FETCH_SUCCESS, repos.data));
      yield call(initMyWorkNum, action.params.storyId);
    }else{
      Toast.info(repos.data.content)
    }
  }catch(err){
    yield put(repoLoadingError(err))
  }
}
// 点赞
export function* setCommentPraise(action) {
  try {
    console.log(action)
    const repos = yield call(GET, URL.SETCOMMEMTPRAISE, action.params);
    console.log(repos)
    if(repos.ok){
      yield put(reposLoaded(SUBMITCOMMENTS_FETCH_SUCCESS, repos.ok));
      // yield call(initMyWorkNum, action.params.storyId);

    }else{
      Toast.info(repos.data.content)
    }
  }catch(err){
    yield put(repoLoadingError(err))
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(INIT_FETCH, initFetch);
  yield takeLatest(WORKNUM_FETCH, initMyWorkNum);
  yield takeLatest(SUBMITCOMMENTS_FETCH, insertStoryComment);
  yield takeLatest(SETCOMMENTPRAISE_FETCH, setCommentPraise);
}
