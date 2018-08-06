/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

import commonFn from './utils/commonFn';
import {GET, POST_JSON} from './http/Http';
import URL from './http/url';

// Import root app
import App from 'containers/App';

// Load the favicon
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
/* eslint-enable import/no-webpack-loader-syntax */

// Import CSS reset and Global Styles
import 'styles/theme.scss';

import configureStore from './configureStore';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      {/* <LanguageProvider messages={messages}> */}
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
      {/* </LanguageProvider> */}
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}




// 全局缓存
const appRunFn = async()=>{
    if(commonFn.isRnApp()){ // rnAPP
        if(commonFn.getUrlAttribute('token')){
            localStorage.setItem('race-token', commonFn.getUrlAttribute('token'))
        }
        // if(commonFn.getUrlAttribute('encMid')){
        //   localStorage.setItem('race-encMid', commonFn.getUrlAttribute('encMid'))
        //   GET(URL.GETMEMBER,{
        //     token: commonFn.getUrlAttribute('encMid')
        //   }).then((rs)=>{
        //     localStorage.setItem('race-mid', rs.data.mid)
        //     localStorage.setItem('race-promotionCode', rs.data.promotionCode)
        //   })

        // }
      if(commonFn.getUrlAttribute('mid')){
          localStorage.setItem('race-mid', commonFn.getUrlAttribute('mid'))
          localStorage.setItem('race-promotionCode', commonFn.getUrlAttribute('mid'))
      }
      if(commonFn.getUrlAttribute('latitude')){
          localStorage.setItem('latitude', commonFn.getUrlAttribute('latitude'))
      }
      if(commonFn.getUrlAttribute('longitude')){
        localStorage.setItem('longitude', commonFn.getUrlAttribute('longitude'))
      }
    }else{
        if(commonFn.getUrlAttribute('shareClanId')){
            localStorage.setItem('race-shareClanId', commonFn.getUrlAttribute('shareClanId'))
        }
        if(commonFn.getUrlAttribute('shareMemberId')){
            localStorage.setItem('race-shareMemberId', commonFn.getUrlAttribute('shareMemberId'))
        }
        if(commonFn.getUrlAttribute('promotionCode')){
          localStorage.setItem('race-promotionCode', commonFn.getUrlAttribute('promotionCode'))
        }
        if(!localStorage.getItem('sg_login_token_secret')){
            const repos = await GET(URL.DEVICE)
            localStorage.setItem('sg_login_token_secret', 'Bearer'+repos.data)
        }
    }
    render();
}

appRunFn();
