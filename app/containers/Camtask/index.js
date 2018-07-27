import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from '../App/actions';
import { INIT_FETCH } from './constants';
import { makeSelectInitData } from './selectors';
import reducer from './reducer';
import saga from './saga';

import CamTaskPage from './CamTaskPage';

const mapDispatchToProps = (dispatch) => ({
  initFetch: ()=>{
    dispatch(loadRepos(INIT_FETCH))
  },
});

const mapStateToProps = createStructuredSelector({
  initData: makeSelectInitData(),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'camTask', reducer });
const withSaga = injectSaga({ key: 'camTask', saga });

export default compose(withReducer,withSaga, withConnect)(CamTaskPage);
export { mapDispatchToProps };

