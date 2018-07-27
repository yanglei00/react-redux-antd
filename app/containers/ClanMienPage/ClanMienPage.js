/*
 * FeaturePage
 *
 * List all the features
 */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import { Button, InputItem, Card, Grid, TextareaItem } from 'antd-mobile';
import Header from '../../components/Header';
import commonFn from '../../utils/commonFn';
import ListViewComponent from '../../components/ListView';

import URL from '../../http/url';

// 评论列表
class RowTpl extends Component {
  state = {
    data: this.props.data,
  };
  render() {
    const o = this.props.data;
    // console.log(o)
    return (
      o ?
        <div className="clanMien-comment-item" onClick={() => {
          this.props.onFocus(o);
        }}>
          <div className="clanMien-comment-item-left">
            <img src={o.memberAvatarimage || 'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/dvatar.png'} alt="" />
          </div>
          <div className="clanMien-comment-item-right">
            {o.commentToCode ?
              <p className="clanMien-comment-item-name">{o.commentToCode}<span className="blue"> 回复 </span>{o.memberName}</p>
              :
              <p className="clanMien-comment-item-name">{o.memberName}</p>
            }

            <p className="clanMien-comment-item-text">{o.comment}</p>
            <p className="clanMien-comment-item-time">{o.commentTime}</p>
          </div>
        </div>
        : null
    )
  }
}
export default class ClanMienPage extends React.Component {
  state = {
    clanId: (this.props.location.state ? this.props.location.state.clanId : ''),
    content: '',
    isFocus: false, // 是否聚焦
    isReply: 0,     //0:评论,1回复   
    commentTo: '',
    commentToCode: '',
    commentToId: '',
    isShowMore: true,
    voteNum: 0,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitComment) { //评论成功
      this.setState({
        isFocus: false,
        content: '',
        isReply: 0,
        commentTo: '',
        commentToCode: '',
        commentToId: '',
      })
    }
  }
  componentDidMount() {

    this.props.initFetch(this.state.clanId);
  }
  onFocus = (o) => {
    this.refs['textarea-input'].focus();
    this.setState({
      isReply: 1,
      commentTo: o.memberId,
      commentToCode: o.memberName,
      commentToId: o.id,
    })
  }
  render() {
    console.log(this.props)
    const { clan: clanInfo } = this.props.initData;
    return (
      <div className="clanMien-page">
        <Helmet>
          <title>战队风采</title>
          <meta
            name="description"
            content="战队风采"
          />
        </Helmet>
        <Header title="战队风采"
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
              shareSuccessCallback(clanInfo.clanId)
            }
          }}
        />
        <div className="clanMien-content">
          <div className="clanMien-comment">
            <div className="clanMien-comment-list">
              <ListViewComponent
                ajaxParams={{
                  url: URL.GETCOMMENTS,
                  data: {
                    clanId: this.state.clanId || localStorage.getItem('race-clanId'),
                    floor: '',
                  },
                  rsDatakey: 'data',
                }}
                insetBefore={this.props.insetBefore}
                rowTpl={(rowData) => {
                  return (
                    <RowTpl data={rowData} onFocus={this.onFocus} />
                  )

                }}
                renderHeader={() => {
               
                  return (
                    <div className="clanMien-list-header">
                      <div className="clanMien-top">
                        <img src={require('./images/bg_top.png')} />
                      </div>
                      {clanInfo &&
                        <div className="clanMien-info">
                          <div className="clanMien-info-wrapper">
                            <div className="clanMien-info-content">
                              <img className="clanMien-info-logo-bg" src={require('./images/info_logo_bg@2x.png')} />
                              <img className="clanMien-info-logo" src={clanInfo.avatarImage || 'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/default.png'} />
                              <span className="clanMien-info-rank">NO.{clanInfo.rank}</span>
                              <div className="clanMien-info-des">
                                <p className="clanMien-info-name">{clanInfo.name}
                                  {(clanInfo.leaderId == localStorage.getItem('race-mid') || clanInfo.leaderId == localStorage.getItem('loginMemberId')) &&
                                    <img className="clanMien-edit-icon" src={require('./images/edit@2x.png')} alt="" onClick={() => {
                                      this.props.history.push({
                                        pathname: 'editClan',
                                        state: {
                                          pictureUrl: clanInfo.avatarImage || 'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/default.png',
                                          slogan: clanInfo.slogan,
                                          introduce: clanInfo.introduce,
                                        }
                                      })
                                    }} />
                                  }
                                </p>
                                <p className="clanMien-info-header">队长：{clanInfo.leaderName}</p>
                                {clanInfo.slogan &&
                                  <p className="clanMien-info-slogan">口号：{clanInfo.slogan}</p>
                                }
                              </div>
                              <ul className="clanMien-info-list">
                                <li>
                                  <span>{clanInfo.voteNumber+ this.state.voteNum}</span>
                                  <span>得票数</span>
                                </li>
                                <li className="clanMien-info-list-line"></li>
                                <li>
                                  <span>{clanInfo.teamMemberNum}</span>
                                  <span>战队人数</span>
                                </li>
                                <li className="clanMien-info-list-line"></li>
                                <li>
                                  <span>{clanInfo.reward}</span>
                                  <span>获得奖励</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      }
                      <div className="h10"></div>
                      {clanInfo && clanInfo.introduce &&
                        <div className="clanMien-indroduce">
                          <div className="clanMien-indroduce-title">
                            战队介绍
                          </div>
                          <div className={"clanMien-indroduce-content" + (!this.state.isShowMore ? ' autoHeight' : '')} dangerouslySetInnerHTML={{
                            __html: (clanInfo ? clanInfo.introduce : '')
                          }}>
                          </div>
                          {this.state.isShowMore &&
                            <div className="clanMien-indroduce-more-btn" onClick={() => {
                              this.setState({
                                isShowMore: false,
                              })
                            }}>展开<img className="more-btn" src={require('../../images/more_bottom@2x.png')} alt="" /></div>
                          }
                        </div>
                      }
                    </div>
                  )
                }}
              />
            </div>
          </div>
        </div>
        <div className="clanMien-footer" >
          <div className="clanMien-footer-left">
            <TextareaItem
              ref="textarea-input"
              className={this.state.isFocus ? 'isFocus-textarea' : ''}
              title={!this.state.isFocus ? <img className="comment-icon" src={require('./images/comment_icon@2x.png')} alt="" /> : ''}
              placeholder={this.state.isFocus ? '来说点什么吧…' : '为他加油…'}
              labelNumber={3}
              autoHeight
              onBlur={() => {
                // setTimeout(()=>{
                //   this.setState({
                //     isFocus: false,
                //     content: '',
                //   })     
                // },500)
              }}
              onFocus={() => {
                this.setState({
                  isFocus: true
                })
              }}
              onChange={(val) => {
                this.setState({
                  content: val
                })
              }}
              value={this.state.content}
            >
            </TextareaItem>
          </div>
          {!this.state.isFocus &&
            <div className={"clanMien-footer-right"}>
              <div className="clanMien-footer-btn">
                <span className="clanMien-footer-vote-btn" onClick={() => {
                  this.props.voteFetch(this.state.clanId, ()=>{
                    this.setState({
                      voteNum: this.state.voteNum + 1,
                    })
                  });
                }}>投票支持</span>
                <em className="clanMien-footer-btn-line"></em>
                <span className="clanMien-footer-guess-btn" onClick={() => {
                  this.props.history.push({
                    pathname: '/race/champion'
                  })
                }}>冠军竞猜</span>
              </div>
            </div>
          }
          {this.state.isFocus &&
            <div className={"clanMien-footer-publish-btn" + (this.state.content ? ' light' : '') + (this.state.isFocus ? ' isFocus-footer-publish-btn' : '')} onClick={() => {
              if(this.state.content){
                this.props.submitCommentsFetch(this.state.clanId, this.state.content, this.state.isReply, this.state.commentTo, this.state.commentToCode, this.state.commentToId);
              }else{
                 this.setState({
                  isFocus: false
                })   
              }
            }}>发布</div>
          }
        </div>
      </div>
    );
  }
}
