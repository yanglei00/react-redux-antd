/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import {Button} from 'antd-mobile';


export default class TestPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  // shouldComponentUpdate() {
  //   return false;
  // }
  componentDidMount(){

    this.props.initFetch();
  }
  render() {
    console.log(this.props)
    return (
      <div className="test-page">
        <Helmet>
          <title>测试</title>
          <meta
            name="description"
            content="test"
          />
        </Helmet>
        <div className="red">你是我的眼</div>
        <img src="http://via.placeholder.com/100x100.png"/>
        <Button onClick={()=>{
          this.props.onChangeCount(this.props.count)
        }}>+1</Button>
        <div>数量：{this.props.count}</div>
        {this.props.initData && this.props.initData.good &&

          <img src={this.props.initData.good.pic}/>
        }
      </div>
    );
  }
}
