/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import { VOTE_FETCH, VOTE_FETCH_SUCCESS } from './constants';
import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

import {Toast, Modal} from 'antd-mobile';

import {GET, POST_JSON} from '../../http/Http';
import URL from '../../http/url';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));

  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/*
* 投票
*/
export function* voteFetch(action) {
  try {
    console.log(action.params)
    const shareClanId = localStorage.getItem('race-shareClanId')||'';
    const shareMemberId = localStorage.getItem('race-shareMemberId')||'';
    const repos = yield call(POST_JSON, URL.CLANVOTE, ('clanId='+action.params.clanId+'&shareClanId='+shareClanId+'&shareMemberId='+shareMemberId), '', {headers: {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}});
    console.log(repos)
    if(repos.success){
      Toast.success('投票成功')
      yield call(action.params.callback)
      yield put(reposLoaded(VOTE_FETCH_SUCCESS, repos.data));
    }else if(repos.errorCode == 520){
     let modalAlert = Modal.alert('亲，需升级为微店主才能投票哦', '', [
       {
         text: '取消'
       },
       {
         text: '一键升级',
         onPress: ()=>{
           /**
          * 一键升级微店主
          */
           const latitude = localStorage.getItem('latitude') || 39.9769721109;
           const longitude = localStorage.getItem('longitude') || 116.3187575340;
           POST_JSON(URL.APPLYSTORE, {
             latitude,
             longitude,
             promotionCode: localStorage.getItem('race-promotionCode'),   //分享人推广码
           }).then((rs)=>{
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
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
  yield takeLatest(VOTE_FETCH, voteFetch);
}
