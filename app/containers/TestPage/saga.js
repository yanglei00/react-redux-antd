/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { INIT_FETCH } from 'containers/TestPage/constants';

import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername,  makeSelectInitData} from 'containers/TestPage/selectors';

// import axios from 'axios';
import {GET} from '../../http/Http';
import URL from '../../http/url';
console.log(URL)
/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  // const initData = yield select(makeSelectInitData());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  // console.log(username)
 
  try {
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, '/sg/cms/indexTop.json', {
    //   method: 'get'
    // });
    const repos = yield call(GET, '/sg/cms/indexTop.json');
    console.log(repos)
    yield put({
      type: 'INITFETCH_SUCCESS',
      initData: repos.data
  });

  //   fetch('/sg/cms/indexTop.json', {
  //     mode: "no-cors",
  //     method: 'GET',
  //     headers:{
  //       accept: 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json' ,
  //     }
  // }).then(response => {
  //       return response.json();
  //   }).then(function(data) {
  //       console.log(data);
  //   }).catch(function(e) {
  //       console.log("Oops, error");
  //   });
    //通过给定的ID来发送请求
    // axios.get('/proxy/sg/cms/indexTop.json',{
    //   headers: {
    //     TokenAuthorization: 'Bearer0835ddd3-44e0-45d8-a482-8c70bdadb3f7317#aAEjYDXGvcrBI6XojYrqP44tgYlAwvzttaB9gf+KmtTYpcWR3rkdx0fG3hHvbmFF'
    //   }
    // })
    // .then(function(response){
    //   console.log(response);
    // })
    // .catch(function(err){
    //   console.log(err);
    // });
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
  yield takeLatest('INITFETCH', getRepos);
}
