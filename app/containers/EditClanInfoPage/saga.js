/**
 * Gets the repositories of the user from Github
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { UPLOADCLANIMAGES_FETCH, UPLOADCLANIMAGES_FETCH_SUCCESS } from './constants';

import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import { makeSelectUsername,  makeSelectInitData} from 'containers/TestPage/selectors';
import { push } from 'react-router-redux';

import {GET, POST_APP_FORM} from '../../http/Http';
import URL from '../../http/url';

/**
 * 图片上传
 */
const convertBase64UrlToBlob = (urlData)=>{
  var bytes=window.atob(urlData.split(',')[1]); 
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
  ia[i] = bytes.charCodeAt(i);
  }
  
  return new Blob( [ab] , {type : 'image/png'});
  }
export function* uploadClanImages(action) {
  try {
    let files = action.params.files; 
 
    let imagesUrls = [];
    let filesJson = {};
    let indexArray = [];
    files.map((o, i)=>{
      if(o.file){ //不是图片服务器的地址
        filesJson = Object.assign({}, filesJson,{[i]: o.file,})
        indexArray.push(i)
      }else{
        imagesUrls[i] = o.url
      }
    })
    let filesJsonLength = 0;
    for(let key in filesJson){
      filesJsonLength++;
    }
    if(filesJsonLength > 0){ // 需上传图片服务器
      const repos = yield call(POST_APP_FORM, URL.UPLOADPICTURE, filesJson);
        if(repos.urls && repos.urls.length > 0){
          // yield put(reposLoaded(UPLOADCLANIMAGES_FETCH_SUCCESS, repos.urls))
          repos.urls.map((o, i)=>{
            imagesUrls[indexArray[i]] = o
          })
          yield call(action.params.callback, imagesUrls)
        }
    }else{
      yield call(action.params.callback, imagesUrls)
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
/**
 * 更新战队信息
 */
export function* uploadClanInfo(action) {
  try {
    console.log(action)
  
    yield put(push({
      pathname: 'editClan',
      state: {
        befrom: 'editClanInfo',
        slogan: (action.params.type == 0 ? action.params.value : ''),
        introduce: (action.params.type == 1 ? action.params.value : '')
      }
    }))
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* fetchData() {
 
  yield takeLatest(UPLOADCLANIMAGES_FETCH, uploadClanImages);
}
