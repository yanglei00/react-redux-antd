/**
 * 排行榜
 *
 */

import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { GET } from '../../http/Http';
import URL from '../../http/url';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import commonFn from '../../utils/commonFn';
import ListViewComponent from '../../components/ListView';

import './style.scss';

import Tabs from './Tabs';

function Footer({ children }) {
    return (
      <Link to={{pathname: '/race/vote'}}>
        <div className="footerStyle">
          <img className="imgStyle" src={'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/vote.png'} />
        </div>
      </Link>
    );
}

function itemone () {
    return (
        <div className="item-wrapper">
            <div className="itemone">
                <span className="num">1</span>
                <div className="avatar">
                    <img src={'https://img09.zhaopin.cn/2012/other/mobile/darcy/beauty.jpg'} />
                </div>
                <div className="detail">
                    <div className="teamname">贾铁良战队</div>
                    <p>队长：贾铁良</p>
                    <p>票数：456   作品评分：300</p>
                </div>
            </div>
        </div>
    )
}


export default class Ranking extends React.PureComponent{

    constructor() {
        super();
        this.state = {
          data: {},
          contentone: [],
          contenttwo: [],
          totalNum: '',
        };
    }
    componentDidMount() {
        const params = {
            type: 0,
            page: 1,
            pageSize: 10,
        };
        const newparams = {
            type: 1,
            page: 1,
            pageSize: 20,
        };
      GET(URL.RANKING,params).then(res => {
          console.log('Tab1',res);
          console.log('第一名数据',res.data[0]);
          console.log('第二名数据',res.data[1]);
          console.log('第三名数据',res.data[2]);
          this.setState({ contentone: res.data });
          console.log(res.data.slice(3))
      });

      GET(URL.RANKING,newparams).then(res => {
          console.log('Tab2',res);
          this.setState({ contenttwo: res.data });
      });
    }

    render() {

        return (
            <section className="ranking-page">
            <Header 
                title="排行榜" 
                notPosition
                onRightClick={(shareSuccessCallback)=>{
                    if(commonFn.isRnApp()){
                        let data = {
                        type: "share",
                        data: {
                        title: "参与冠军竞猜，赢取20万大奖",
                        content: "快为你支持的战队投票，去助力战队赢取顺逛社群争霸赛总冠军",
                        pic: "http://cdn09.ehaier.com/shunguang/H5/www/img/race/share.png", 
                        url: (URL.COMPETITION_HOST+"/race/?shareClanId="+localStorage.getItem('race-clanId')+'&shareMemberId='+localStorage.getItem('race-mid')+'&promotionCode='+localStorage.getItem('race-promotionCode'))
                        }
                        };
                        let msg = JSON.stringify(data);
                        window.postMessage(msg);
                        shareSuccessCallback()
                    }
                }}
            />
            <Helmet>
              <title>排行榜</title>
              <meta
                name="description"
                content="排行榜"
              />
            </Helmet>
            <div className="wapper">
                <div className="main">
                    <div className="container">
                        <Tabs>
                            <div label="全民PK">

                                <ListViewComponent
                                    listViewWrapHeight={document.body.clientHeight-109}
                                    ajaxParams = {{
                                        url: URL.RANKING,
                                        data: {
                                            type: 0
                                        },
                                        rsDatakey: 'data',
                                    }}
                                    rowTpl={(rowData) => {
                                        return (
                                            <RowTpl data={rowData}/>
                                        )
                                
                                    }}
                                    />
                            </div>
                            <div label="20强赛">
                                <div className="list-wrapper" style={{height: document.body.clientHeight-109}}>
                                    {this.state.contenttwo.map((item, index) =>
                                        <div className="item-wrapper">
                                            <Link to={
                                            {
                                                pathname: '/race/clanMien',
                                                state: { clanId: item.clanId}
                                            }
                                            } key={index}>
                                            <div className={"itemone " + (item.rank == 1 ? 'first' : '') + (item.rank == 2 ? 'second' : '') + (item.rank == 3 ? 'third' : '')}>
                                                <span className="num">{item.rank}</span>
                                                <div className="avatar">
                                                    <img src={item.avatarImage || 'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/default.png'} />
                                                </div>
                                                <div className="detail">
                                                    <div className="teamname">{item.name}战队</div>
                                                    <p>队长：{item.leaderName}</p>
                                                    <p>票数：{item.voteNumberStr}   作品评分：{item.opusTotalScore}</p>
                                                </div>
                                            </div>
                                            </Link>
                                        </div>
                                    
                                    )}
                                </div>
                            </div>
                            <div label="终极盛典">
                                <div className="item-wrapper">
                                    <div className="itemone">
                                        <span className="num">1</span>
                                        <div className="avatar">
                                            <img src={'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/dvatar.png'} />
                                        </div>
                                        <div className="detail">
                                            <div className="teamname">神秘战队</div>
                                            <p>队长：***</p>
                                            <p>票数：***   作品评分：**</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
            {/* <Footer>
              <span>footer content</span>
            </Footer> */}
            </section>
        )
    };
}
// 图文详情模块
class RowTpl extends Component {
    state={
  
    };
    componentDidMount(){
      
    }
    render(){
      console.log(this.props)
      const o = this.props.data;



        return (
            o ? (
                <div className="item-wrapper">
                    <div className={"itemone " + (o.rank == 1 ? 'first' : '') + (o.rank == 2 ? 'second' : '') + (o.rank == 3 ? 'third' : '')}>
                        <span className="num">{o.rank}</span>
                        <div className="avatar">
                            <img src={o.avatarImage || 'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/default.png'} />
                        </div>
                        <div className="detail">
                            <div className="teamname">{o.name}战队</div>
                            <p>队长：{o.leaderName}</p>
                            <p>战力值：{o.clanPowerNumberStr}</p>
                        </div>
                    </div>
                </div>
            ) : null
        )
    }
  }