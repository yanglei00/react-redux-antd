/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { GET } from '../../http/Http';
import URL from '../../http/url';
import { Link } from 'react-router-dom';
import commonFn from '../../utils/commonFn';
import Header from '../../components/Header';
import './style.scss';




function Footer({ children }) {
  return (
    <Link to={{ pathname: '/race/champion' }}>
      <div className="footerStyle">
        <img className="imgStyle" src={'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/champion.png'} />
      </div>
    </Link>
  );
}



export default class Vote extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor() {
    super();
    this.state = {
      data: {},
      content: [],
      totalNum: '',
    };
  }
  componentDidMount() {
    GET(URL.VOTE).then(res => {
      console.log(res);
      this.setState({
        data: res.data,
        content: res.data,
        totalNum: res.data.totalMembers,
        flag: res.data.isTwentyMember,
      });
    });
  }



  render() {
    return (
      <section className="vote-page">

        <Helmet>
          <title>{this.props.location.state && this.props.location.state.title? this.props.location.state.title: '投票'}</title>
          <meta
            name="description"
            content={this.props.location.state && this.props.location.state.title? this.props.location.state.title: '投票'}
          />
        </Helmet>
        <Header title={this.props.location.state && this.props.location.state.title? this.props.location.state.title: '投票'} 
          onRightClick={(shareSuccessCallback) => {
          if (commonFn.isRnApp()) {
            let data = {
              type: "share",
              data: {
                title: "参与冠军竞猜，赢取20万大奖",
                content: "快为你支持的战队投票，去助力战队赢取顺逛社群争霸赛总冠军",
                pic: "http://cdn09.ehaier.com/shunguang/H5/www/img/race/share.png",
                url: (URL.COMPETITION_HOST+"/race/?shareClanId=" + localStorage.getItem('race-clanId') + '&shareMemberId=' + localStorage.getItem('race-mid') + '&promotionCode=' + localStorage.getItem('race-promotionCode'))
              }
            };
            let msg = JSON.stringify(data);
            window.postMessage(msg);
            shareSuccessCallback()
          }
        }} />
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="banner-container">
                <img src={'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/banner.jpg'} />
              </div>
              <div className="sectionone">
                <div className="bg-wrapper">
                  <div className="four-item">
                    {this.state.content.map((item, index) =>
                      <Link to={
                        {
                          pathname: '/race/clanList',
                          state: { fieldId: item.fieldId, fieldName: item.fieldName }
                        }
                      } key={index}>
                        <div className="item-one">
                          <span>{item.fieldName}</span>
                          <div className="avatar">
                            <img src={item.fieldIconUrl} />
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                  <div className="bottom-wrapper">
                    <p>{this.state.totalNum}人参与</p>
                    <Link to={{ pathname: '/race/rule' }}><div className="rules">活动规则</div></Link>
                  </div>
                </div>
              </div>
              <Link to={{ pathname: '/race/ranking' }}>
                <div className="banner-container">
                  <img src={'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/ranking.jpg'} />
                </div>
              </Link>
              <div className="d0">
                <div className="d1">
                  <div className="d2">
                    <h2 className="h2">大赛介绍</h2>
                    <div className="d3">
                      <div className="d4">《头号社群》是由海尔顺逛打造的全球首届大型社群互动竞技类赛事，通过社群交互征集用户在衣、食、住、娱方面的痛点、需求，生成竞技任务，由全民组建的多个战队共同完成。活动采用全新的社群互动玩法，颠覆传统比拼形式，万千战队同场竞技，合力迎接花样挑战，展现社群不可思议的力量，首次定义社群标准。活动于2018年5月17日正式启动，通过顺逛微店APP平台全程呈现。</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d0">
                <div className="d1 d1-long">
                  <div className="d2">
                    <h2 className="h2">赛程安排</h2>
                    <div className="d3">
                      <div className="d4 d-saicheng">
                        <ul>
                          <li>
                            第一阶段 需求征集<br/>
                            时间：2018年5月17日-7月25日<br/>
                            <span>#我给大赛出个题#</span>
                          </li>
                          <li>
                            第二阶段 初赛<br/>
                            时间：2018年6月6日-7月25日<br/>
                            <span>#全民争霸赛#</span>
                          </li>
                          <li>
                            第三阶段 半决赛<br/>
                            时间：2018年7月26日-8月31日<br/>
                            <span>#20强晋级赛#</span>
                          </li>
                          <li>
                            第四阶段 社群盛典<br/>
                            时间：2018年9月6日<br/>
                            <span>#百万冠军争夺战#</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d0">
                <div className="d1">
                  <div className="d2">
                    <h2 className="h2">投票规则</h2>
                    <div className="d3">
                      <div className="d4">
                        <ul>
                          <li>社群争霸赛活动投票仅限微店主可以参与</li>
                          <li>每个微店主每天有1次投票机会</li>
                          <li>分享成功大赛页面可增加1次投票机会</li>
                          <li>发展一个微店主可增加1次投票机会，最多增加3次投票机会</li>
                          <li>每个微店主每天最多有5次投票机会</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d0">
                <div className="d1">
                  <div className="d2">
                    <h2 className="h2">大赛奖励</h2>
                    <div className="d3">
                      <div className="d4">
                        <ul>
                          <li style={{marginBottom: 16}}>
                            <span>注册奖励</span><br/>
                            新注册顺逛的用户,可获得顺逛平台360元代金券
                          </li>
                          <li>
                            <span>晋级奖励</span><br/>
                            晋级20强战队瓜分100万大奖<br/>
                            晋级4强战队再次瓜分100万大奖
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d0">
                <div className="d1">
                  <div className="d2">
                    <h2 className="h2">举办单位</h2>
                    <div className="d3">
                      <div className="d4">
                          主办单位：海尔顺逛<br/>
                          指导单位：中国信息协会信息化工作促进委员会<br/>　　　　　
                          中央财经大学中国互联网经济研究院<br/>
                          特别支持：社群思维学院、亿邦动力研究院<br/>
                          战略合作媒体：今日头条、一点资讯、抖音、<br/>　　　　　　　
                          新浪微博、微信、一直播
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer>
          <span>footer content</span>
        </Footer>

      </section>
    );
  }
}
