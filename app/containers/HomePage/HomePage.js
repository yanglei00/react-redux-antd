/*
 * FeaturePage
 *
 * List all the features
 */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import { Button, InputItem, } from 'antd-mobile';
import Header from '../../components/Header';
import commonFn from '../../utils/commonFn';
import ListViewComponent from '../../components/ListView';

import URL from '../../http/url';


export default class HomePage extends React.Component {
  state = {

  }
  componentDidMount() {

  }

  render() {
    console.log(this.props)

    return (
      <div className="home-page">
        <Helmet>
          <title>home</title>
          <meta
            name="description"
            content="home"
          />
        </Helmet>

        <div className="home-content">
          欢迎光临
        </div>


      </div>
    );
  }
}
