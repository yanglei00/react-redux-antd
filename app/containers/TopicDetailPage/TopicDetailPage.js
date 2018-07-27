/*
 * FeaturePage
 *
 * List all the features
 */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import { TextareaItem } from 'antd-mobile';
import Header from '../../components/Header';
import ListViewComponent from '../../components/ListView';

class RowTpl extends Component {
  state = {
    data: this.props.data,
  };
  render() {
    const o = this.props.data;
    // console.log(this.props.data)
    return (
      o ?
        <div className="clanMien-comment-item">
          <div className="clanMien-comment-item-left">
            <img src={o.userImg||require('./images/user.jpg')} alt="" />
          </div>
          <div className="clanMien-comment-item-right">
            <p className="clanMien-comment-item-name">{o.userName}</p>
            <p className="clanMien-comment-item-text">{o.comment}</p>
            <p className="clanMien-comment-item-time">{o.commentTimeStr}</p>
          </div>
        </div>
        : null
    )
  }
}


export default class TopicDetailPage extends React.Component {
  state = {
    storyId: this.props.location.state.storyId,
    content: '',
    isFocus: false, // 是否聚焦
    isCommentPraise: false, //是否点赞
  }
  componentDidMount() {

    this.props.initFetch(this.state.storyId);
    // this.props.setCommentPraise({storyId:this.state.storyId})
    // this.props.initMyWorkNum();
    // this.props.initMyDetail();
  }
  render() {
    if (this.props.initData) {
    }
    const clanInfo = this.props.initData;
    const imgarr=clanInfo.storyImgs?clanInfo.storyImgs.split(','):null;
    console.log(clanInfo.createDate)
    const date = 1;
    // if(clanInfo.isPraise){
    //   this.setState({
    //     isCommentPraise:true
    //   })
    // }
    const isparise=this.props.ispraise==0?false:true;
    // this.props.setCommentPraise({storyId:this.state.storyId,userCode:clanInfo.userCode})
    console.log(isparise)
    return (
      <div className="topic-page">
        <Helmet>
          <title>话题详情</title>
          <meta
            name="description"
            content="话题详情"
          />
        </Helmet>
        <Header title="话题详情"
        onLeftClick={()=>{
          this.props.history.push({
            pathname:'camList'
          })
        }}
          notPosition={true}
          icon={
            <img src={require('../../images/back_black@2x.png')} alt="" />
          }
        />
        <div className="topic-comment-wrapper">
          <div className="topic-comment">
            <div className="topic-comment-list">
              <ListViewComponent
                ajaxParams={{
                  url: URL.DETAILCOMMENT,
                  data: {
                    storyId: this.state.storyId
                  },
                  isPageIndex: true,
                  rsDatakey: 'data',
                  rsDataTwoKey: 'list',
                }}
                insetBefore={this.props.insetBefore}
                rowTpl={(rowData) => {
                  return (
                    <RowTpl data={rowData} />
                  )

                }}
                renderHeader={() => {
                  return (
                    <div className="topic-content-header">
                      {clanInfo &&
                        <div className="topic-content">
                          <h2 className="topic-title">{clanInfo.storyName}</h2>
                          <div className="topic-autor">
                            <img src={clanInfo.userImg||require('./images/user.jpg')} />
                            <p>
                              <span className="span1">{clanInfo.userName}</span>
                              <span className="span2">来自于 {clanInfo.userName}</span>
                            </p>
                          </div>
                          {(clanInfo.dataTypeNew == 1) &&
                            <div className="topic-img">
                            {imgarr.map((item,i) => (
                                <img key={i} src={item} />
                            ))}
                              
                            </div>
                          }
                          {(clanInfo.dataTypeNew == 3) &&
                            <div className="topic-img">
                              <video src={clanInfo.mediaInfo[0].url} poster={clanInfo.mainImg} controls="controls">
                                您的浏览器不支持 video 标签。
                              </video>
                            </div>
                          }
                          <p className="topic-arcticle">
                            {clanInfo.storyContent}
                          </p>
                        </div>}
                        {clanInfo && <p className="comment-title">评论 ({clanInfo.commentNumber})</p>}
                    </div>
                  )
                }}
              />
            </div>
          </div>
        </div>
        <div className="topic-footer" >
          <div className="clanMien-footer-left">
            <TextareaItem
              className={this.state.isFocus ? 'isFocus-textarea' : ''}
              title={!this.state.isFocus ? <img className="comment-icon" src={require('./images/comment_icon@2x.png')} alt="" /> : ''}
              placeholder={this.state.isFocus ? '来说点什么吧…' : '来说点什么吧…'}
              labelNumber={3}
              autoHeight
              onBlur={() => {
                // this.setState({
                //   isFocus: false
                // })
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
            >
            </TextareaItem>
          </div>
          {!this.state.isFocus &&
            <div className={"clanMien-footer-right"} onClick={()=>{
              let params = {
                storyId:	clanInfo.id,
                userCode:	localStorage.getItem('race-mid') || localStorage.getItem('loginMemberId'),
                visitorCode: ''
              }
              this.props.setCommentPraise(params);
              // isparise=isparise?false:true;
              // this.setState({
              //   isCommentPraise:isparise
              // })
            }}>
              {!isparise &&
                <img src={require('./images/zan@2x.png')} />
              }
              {isparise &&
                <img src={require('./images/zan_yd@2x.png')} />
              }
            </div>
          }
          {this.state.isFocus &&
            <div className={"clanMien-footer-publish-btn" + (this.state.content ? ' light' : '') + (this.state.isFocus ? ' isFocus-footer-publish-btn' : '')} onClick={() => {
              console.log(clanInfo)
              let params = {
                comment: this.state.content,
                commentToUserCode: clanInfo.userCode,
                storyId: this.state.storyId,
                topicId: clanInfo.topicId,
              }
              this.props.submitCommentsFetch(params);
            }}>发布</div>
          }
        </div>
      </div>
    );
  }
}
