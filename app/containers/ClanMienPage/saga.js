/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import {Modal, Toast} from 'antd-mobile';

import { INIT_FETCH, INIT_FETCH_SUCCESS, SUBMITCOMMENTS_FETCH, SUBMITCOMMENTS_FETCH_SUCCESS, VOTE_FETCH, VOTE_FETCH_SUCCESS } from './constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername, makeSelectInitData } from 'containers/TestPage/selectors';


import { GET, POST_JSON } from '../../http/Http';
import URL from '../../http/url';

/**
 * Github repos request/response handler
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
 * 提交评论
 */
export function* submitCommentsFetch(action) {
  try {

    console.log(action.params)
    const repos = yield call(POST_JSON, URL.SUBMITCOMMENTS, {
      toClanId: action.params.clanId,
      commentTo: action.params.commentTo,
      commentToCode: action.params.commentToCode,
      commentToId: action.params.commentToId,
      comment: action.params.content,
      isReply: action.params.isReply,
    });
    console.log(repos)
    if (repos.success) {
      yield put(reposLoaded(SUBMITCOMMENTS_FETCH_SUCCESS, repos.data));
    }

  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
/*
* 投票
*/
export function* voteFetch(action) {
  try {
    const shareClanId = localStorage.getItem('race-shareClanId') || '';
    const shareMemberId = localStorage.getItem('race-shareMemberId') || '';
    const repos = yield call(POST_JSON, URL.CLANVOTE, ('clanId=' + action.params.clanId + '&shareClanId=' + shareClanId + '&shareMemberId=' + shareMemberId), '', { headers: { 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8" } });
    console.log(repos)
    if (repos.success) {
      Toast.success('投票成功')
      yield call(action.params.callback)
      yield put(reposLoaded(VOTE_FETCH_SUCCESS, repos.data));
    } else if (repos.errorCode == 520) {
      let modalAlert = Modal.alert('亲，需升级为微店主才能投票哦', '', [
        {
          text: '取消'
        },
        {
          text: '一键升级',
          onPress: () => {
            /**
           * 一键升级微店主
           */
            const latitude = localStorage.getItem('latitude') || 39.9769721109;
            const longitude = localStorage.getItem('longitude') || 116.3187575340;
            POST_JSON(URL.APPLYSTORE, {
              latitude,
              longitude,
              promotionCode: localStorage.getItem('race-promotionCode'),   //分享人推广码
            }).then((rs) => {
              modalAlert.close()
              Toast.success('升级微店主成功')
              console.log(rs)
            });
          }
        }
      ])
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {

  yield takeLatest(INIT_FETCH, initFetch);
  yield takeLatest(SUBMITCOMMENTS_FETCH, submitCommentsFetch);
  yield takeLatest(VOTE_FETCH, voteFetch);
}
