/**
 * RuleDetailPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { GET } from '../../http/Http';
import URL from '../../http/url';
import Header from '../../components/Header';
import './style.scss';


export default class RuleDetail extends React.PureComponent{



    constructor() {
        super();
        this.state = {
          data: {},
          content: [],
          totalNum: '',
        };
    }
    componentDidMount() {
        //测试环境 868  正式1134
        const params = {
            id: 868
        }
      GET(this.props.location.state && this.props.location.state.title ? URL.GUESSRULE : URL.RULEURL,params).then(res => {
          console.log(res);
          this.setState({ content: res.data });
      });
    }


    render() {
        return (
          <section className="rule-page">
              <Header title="活动规则" rightContent={<span></span>}/>
              <Helmet>
                <title>{this.props.location.state && this.props.location.state.title? this.props.location.state.title : '活动规则'}</title>
                <meta
                  name="description"
                  content="活动规则"
                />
              </Helmet>
              <div className="wapper">
                  <div className="main">
                      <h3>规则</h3>
                      <div className="text-wrapper" dangerouslySetInnerHTML={{ __html: this.state.content}}/>
                  </div>
              </div>
          </section>
        );
    }
}
