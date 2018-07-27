/*
 * FeaturePage
 *
 * List all the features
 */
import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import {Button} from 'antd-mobile';
import Header from '../../components/Header';
import commonFn from '../../utils/commonFn';
import ListViewComponent from '../../components/ListView';
import URL from '../../http/url';

// 图文详情模块
class RowTpl extends Component {
  state={
    voteNum: 0,
  };
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }
  componentDidMount(){
    this.setState({
      voteNum: 0,
    })
  }
  render(){
    console.log(this.state.voteNum)
    const o = this.props.data;
      return (
          o ?
          <div className="clanList-item-container">
            <div className="clanList-item-wrapper" onClick={(e)=>{
                if(e.target.className != 'clanList-item-vote-btn'){
                    this.props.history.push({
                        pathname: 'clanMien',
                        state:{
                            clanId: o.clanId
                        }
                    })
                }
            }}>
                <div className="clanList-item-info">
                    <div className="clanList-item-info-left">
                        <img className="clanList-item-info-logo" src={o.avatarImage || 'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/default.png'} alt=""/>
                    </div>
                    <div className="clanList-item-info-right">
                        <p className="clanList-item-info-title">{o.name}</p>
                        <p className="clanList-item-info-des">
                            <span>队长：{o.leaderName}</span>
                            <span>&nbsp; &nbsp; 排名：{o.rank}</span>
                        </p>
                        <div className="clanList-item-vote-btn" onClick={()=>{
                            this.props.voteFetch(o.clanId, ()=>{
                              this.setState({
                                voteNum: this.state.voteNum +1,
                              })
                            });
                        }}>投 票</div>
                    </div>   
                </div>
                <ul className="clanList-item-table">
                  <li>
                    <span>{o.voteNumber + this.state.voteNum}</span>
                    <span>得票数</span>
                  </li>
                  <li className="clanList-item-table-line"></li>
                  <li>
                    <span>{o.teamMemberNum}</span>
                    <span>战队人数</span>
                  </li>
                  <li className="clanList-item-table-line"></li>
                  <li>
                    <span>{o.reward}</span>
                    <span>获得奖励</span>
                  </li>
                </ul>
            </div>
          </div>
        : null
      )
  }
}
export default class ClanListPage extends React.Component {
 
  componentDidMount(){

    // this.props.initFetch();
  }
  render() {
    console.log(this.props)
    return (
      <div className="clanList-page">
        <Helmet>
          <title>{this.props.location.state.fieldName}</title>
          <meta
            name="description"
            content={this.props.location.state.fieldName}
          />
        </Helmet>
        <Header 
            title={this.props.location.state.fieldName}
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
        <div className="clanList-content">
          <ListViewComponent
            ajaxParams = {{
                url: URL.CLANLIST,
                data: {
                  fieldId: this.props.location.state.fieldId
                },
                rsDatakey: 'data',
            }}
            isOnePage
            rowTpl={(rowData) => {
                return (
                    <RowTpl data={rowData} voteFetch={this.props.voteFetch} history={this.props.history}/>
                )
          
            }}
            />
        </div>
        <div className="clanList-footer" onClick={()=>{
            this.props.history.push({
                pathname: '/race/champion'
            })
        }}>
          <img src="data:image/png;base64,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" alt=""/>冠军竞猜
        </div>
      </div>
    );
  }
}
