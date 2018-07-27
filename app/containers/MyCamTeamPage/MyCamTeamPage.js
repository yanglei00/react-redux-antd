/*
 * FeaturePage
 *
 * List all the features
 */
import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import {Button, InputItem, Card, Grid} from 'antd-mobile';
import Header from '../../components/Header';
import ListViewComponent from '../../components/ListView';
import commonFn from '../../utils/commonFn';
import URL from '../../http/url';
// 图文详情模块
class RowTpl extends Component {
  state={
      data: this.props.data
  };
  render(){
    // console.log(this.props.data)
      const myNum = this.props.data;
      
      return (
        myNum?
        <ul>
          <li className="li-first">{myNum.memberName}</li>
          <li className="li-second">{myNum.shareNumber}</li>
          <li className="li-third">{myNum.developStoreMemberNumber}</li>
          <li className="li-all">{myNum.voteNumber}</li>
        </ul>
        :null
      )
  }
}
export default class MyCamTeamPage extends React.Component {
 
  componentDidMount(){

    this.props.initFetch();
    // this.props.initMyWorkNum();
    // this.props.initMyDetail();
  }
  render() {
    const {clan:clanInfo} = this.props.initData;
    // const num = this.props.workNumData;
    const myNum=this.props.myDetailData;
    // console.log(this.props.myDetailData)
    return (
      <div className="camTeam-page">
        <Helmet>
          <title>我的战队</title>
          <meta
            name="description"
            content="我的战队"
          />
        </Helmet>
        <Header title="我的战队"
        onLeftClick={()=>{
          this.props.history.push({
            pathname:'/race/'
          })
        }}
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
              shareSuccessCallback(clanInfo.clanId)
            }
          }}/>
        <div className="clanMien-content">
          <div className="clanMien-top">
            <img src={require('./images/bg_top.png')} />
          </div>
          <div className="clanMien-info">
            <div className="clanMien-info-wrapper">
            {clanInfo &&
              <div className="clanMien-info-content">
                <img className="clanMien-info-logo-bg" src={require('./images/info_logo_bg@2x.png')} />
                <img className="clanMien-info-logo" src={clanInfo.avatarImage} />
                <span className="clanMien-info-rank">NO.{clanInfo.rank}</span>
                <div className="clanMien-info-des">
                  <p className="clanMien-info-name">{clanInfo.name}</p>
                  <p className="cam-detail"
                  onClick={()=>{
                    this.props.history.push({
                      pathname:'clanMien',
                      state: {
                        clanId: clanInfo.clanId
                      }
                    })
                  }}
                  >查看战队主页详情</p>
                </div> 
                <ul className="clanMien-info-list">
                  <li>
                    <span>{clanInfo.taskNumber}</span>
                    <span>我完成的任务数</span>
                  </li>
                  <li className="clanMien-info-list-line"></li>
                  <li>
                    <span>{clanInfo.diamondNumber}</span>
                    <span>我获得的钻石</span>
                  </li>
                </ul>
              </div>
            }
            </div>
          </div>
          <div className="cam-list">
          <div className="cam-list-item">
            <img className="cam-list-img" src={require('./images/tb-1@2x.png')}
              onClick={()=>{
                this.props.history.push({
                  pathname:'clanMien',
                  state: {
                    clanId: clanInfo.clanId
                  }
                })
              }}
            />
            <img className="cam-list-img" src={require('./images/tb-2@2x.png')}
              onClick={()=>{
                this.props.history.push({
                  pathname:'camList'
                })
              }}
            />
            <img className="cam-list-img" src={require('./images/tb-3@2x.png')}
              onClick={()=>{
                this.props.history.push({
                  pathname:'camTask'
                })
              }}
            />
            <img className="cam-list-img" src={require('./images/tb-4@2x.png')}
              onClick={()=>{
                this.props.history.push({
                  pathname:'guessOrder'
                })
              }}
            />
            </div>
          </div>
          <div className="cam-team-list">
              <img className="cam-team-title" src={require('./images/wdzy-1@2x.png')}/>
              <div className="table-list">
                <div className="table-ll">
                  <ul>
                    <li className="liTop li-first">战友</li>
                    <li className="liTop li-second">转发次数</li>
                    <li className="liTop li-third">发展微店主个数</li>
                    <li className="liTop li-all">总票数</li>
                  </ul>
                  {clanInfo &&
                  <ul>
                    <li className="me li-first">我</li>
                    <li className="me li-second">{clanInfo.shareNumber}</li>
                    <li className="me li-third">{clanInfo.developStoreMemberNumber}</li>
                    <li className="me li-all">{clanInfo.memberVoteNumber}</li>
                  </ul>
                  }
                  <ListViewComponent
                    ajaxParams = {{
                        url: URL.MEMBERS,
                        data: {
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
              </div>
              {/* <img className="go-top" src={require('./images/hddb-1@2x.png')} onClick={() => this.props.gotoTop()}/> */}
          </div>
        </div>
      </div>
    );
  }
}
