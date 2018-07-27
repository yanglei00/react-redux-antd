import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import {
//   makeSelectRepos,
//   makeSelectLoading,
//   makeSelectError
// } from 'containers/App/selectors';
import { loadRepos } from '../App/actions';
import { changeCount, initFetch } from './actions';
import { makeSelectUsername, makeSelectCount , makeSelectInitData} from './selectors';
import reducer from './reducer';
import saga from './saga';

import TestPage from './TestPage';

const mapDispatchToProps = (dispatch) => ({
  initFetch: ()=>{
    console.log('init')
    dispatch(initFetch({}))
  },
  onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
  onChangeCount: (count) => {
      console.log(count)
    return dispatch(changeCount(count))
  },
  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadRepos());
  }
});

const mapStateToProps = createStructuredSelector({
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
  count: makeSelectCount(),
  initData: makeSelectInitData(),
  // home: makeSelectCount()
});
// const mapStateToProps = (state, props) =>{
//   return {
//     a: 11,
//     count: makeSelectCount(),
//     initData: makeSelectInitData(),
//   }
// }
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'test', reducer });
const withSaga = injectSaga({ key: 'test', saga });

export default compose(withReducer,withSaga, withConnect)(TestPage);
export { mapDispatchToProps };

// export { default } from './TestPage';
