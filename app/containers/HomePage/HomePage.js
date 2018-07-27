/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { GET } from '../../http/Http';
import URL from '../../http/url';
import { Link } from 'react-router-dom';
import Countdown from './Countdown';
import Header from '../../components/Header';
import { Toast } from 'antd-mobile/lib/index';
import commonFn from '../../utils/commonFn';
import './style.scss';
import './login.scss';

function Footer({ children }) {
    return (
      <Link to={{pathname: '/race/champion'}}>
        <div className="footerStyle">
          <img className="imgStyle" src={'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/champion.png'} />
        </div>
      </Link>
    );
}
class NewFooter extends Component {
  render(){
    return (
      <div className="footerStyle" onClick={(e)=>{
        console.log(e.target.className)
        if(e.target.className != 'footer-right'){
          this.props.history.push({
            pathname: '/race/champion'
          })
        }
      }}>
        <img className="imgStyle" src={'http://cdn09.ehaier.com/shunguang/H5/www/img/race/newvote.png'} />
        <div className="footer-right" onClick={()=>{
          this.props.voteFetch(this.props.data.clan.clanId, ()=>{
            this.props.voteCallback();
          });
        }}/>
      </div>
    )
  }
}

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
    constructor() {
        super();
        this.state = {
          data: {},
          content: [],
          totalNum: '',
          nums: 60,                                    // 倒计时时间（s）
          phone:'',                                                     // 手机号码
          code:'',   
          imgcode: '',                                                   // 验证码
          tips: '',                                                      // 提示信息
          class1:'',                                                    // 第一条提示信息样式
          class2:'',                                                    // 第二条提示信息样式
          iconClass:'input-group-addon glyphicon glyphicon-phone',      // 图标样式
          status:'disable',                                             // 倒计时按钮状态(disable:不可发送,able:可发送,sending:倒计时中)
          login:'disable',                                              // 登陆按钮样式(disable:不可登录,able:可登陆）
          popClass:'pop', 
          token: '',
          imgUrl: '',
          otherToken: '',
          latitude: null,
          longitude: null,
          error: null,
          showLogin: false,
          photos: [],
          submitted: false,
          loginTap: 'loginTap',
          isDisabled: 'disabled',
          voteNum: 0,
        };
        this.getCaptcha = this.getCaptcha.bind(this)
        this.sendCode = this.sendCode.bind(this)
        this.onChildChange = this.onChildChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    componentDidMount() {
        // 是否显示登录弹窗
        
        if(commonFn.isRnApp()) {
          // 当APP内打开时候直接不显示
          this.setState({ showLogin: false })
        }else {
          // 当H5内打开时候加判断
          if(localStorage.getItem('sg_login_token_secret') == null) {
              this.setState({ showLogin: true })
          }
        }


        this.getCaptcha();
        this.getLocation();
        GET(URL.CLANINFO).then(res => {
            console.log(res);
            if(res.message == "用户未登录"){
              this.setState({ showLogin: true })
            }else{
              this.setState({
                data: res.data,
                content: res.data.fieldInfoArray,
                totalNum: res.data.totalMembers,
                flag: res.data.isTwentyMember,
                photos: res.data.membersPhotos,
              });
              localStorage.setItem('race-clanId', res.data.clan.clanId);
            }
        });
    }

    getLocation () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
          localStorage.setItem('latitude', position.coords.latitude);
          localStorage.setItem('longitude', position.coords.longitude);
        },
        (error) => this.setState({
          latitude: '39.9769721109',
          longitude: '116.3187575340',
          error: error.message
        }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    };

  getCaptcha() {

    fetch(URL.DEVICE)
    .then(response => response.json())
    .then((res) => {
      let lastImg = URL.CAPTCHA + "?flag=" + res.data;
      this.setState({
        token: lastImg,
        otherToken: res.data,
      });
    })
    .catch((res)=>{
        console.log(res.status);
    });
  } 

  handlePhone=(event)=>{
      // 倒计时按钮处于倒计时未结束状态时手机号不能修改
      var phone = event.target.value;
      if(this.state.status==='sending')
        return false;
      // 同步input值
      this.setState({
        phone: phone
      });
      // 验证手机号
      // if(this.testPhone(phone) && this.testImg(this.state.imgcode)){ 
      //     this.setState({
      //       status:'able'    
      //     });
      // }
      // else{
      //     this.setState({
      //       status:'disable'     
      //     });
      // }     
  }
  // 手机号验证
  testPhone(phone){
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if(myreg.test(phone))
        return true;
      else
        return false;
  }

  // 图形验证码
  testImg(imgcode) {
    if(imgcode.length < 3)
      return false;
    else
      return true;
  }
  handleCode=(event)=>{
      this.setState({
        code:event.target.value
      });
      if(event.target.value.length == 4) {
        this.setState({
          isDisabled: ''
        });
      }
  }
  handleImgCode=(event)=>{
    if(this.state.status==='sending')
      return false;
      this.setState({
        imgcode:event.target.value,
        status:'able',
      });
      // if(this.state.imgcode.length > 0){ 
      //     this.setState({
      //       status:'able'    
      //     });
      // }else{
      //     this.setState({
      //       status:'disable'     
      //     });
      // } 
  }
  // 点击input框获得提示或取消提示
  handleHide=(event)=>{
      switch(event.target.name){
          case 'phone':
            this.setState({
              class1:'',
              class2:'',
              iconClass:'input-group-addon glyphicon glyphicon-phone',
            });
            break;
          case 'code':  
            if(this.state.status==='disable'){
                this.setState({
                  tips:this.state.testError,
                  class1:'show shake',
                  iconClass:'input-group-addon glyphicon glyphicon-exclamation-sign red'
                });
            }
            this.setState({
              class2:''
            });
            break;
          default:
            break;
      }
  }
  onChildChange(tips,status){
      if(tips){
          this.setState({
            tips:tips,
            class2:'show shake',
            class1:''
          });
      }


      if(status) this.setState({ status:status });
  }



  // 发送请求到后端
  sendCode() {
      let lastToken = 'Bearer' + this.state.otherToken;
      let newUrl = `${URL.VERTIFY}?imgCaptcha=${this.state.imgcode}&mobile=${this.state.phone}`
      fetch(newUrl, {
          method: 'GET',
          headers:{
            'Authorization': 'open the gate',
            'TokenAuthorization': lastToken,
          }
      })
      .then(response => response.json())
      .then((res) => {
        
        console.log(res);
        if(res.success) {
          Toast.info('已发送');
        } else{
          Toast.info(res.message);
          this.refs.countdown.resetButton();
        }
        
      })
      .catch((res)=>{
          Toast.info(res.message);
          this.refs.countdown.resetButton();
      });
  }
  // 点击登录按钮
  handleLogin=(event)=>{



      let lastToken = 'Bearer' + this.state.otherToken;
      let promotionCode = localStorage.getItem('race-promotionCode');
      let newUrl = `${URL.LOGIN}?imgCaptcha=${this.state.imgcode}&mobile=${this.state.phone}&latitude=${this.state.latitude}&longitude=${this.state.longitude}&captcha=${this.state.code}&promotionCode=${promotionCode}`;
      console.log('token的值是 ',lastToken);
      console.log('请求的url ',newUrl);

      if(!this.state.phone) {
        Toast.info('请输入手机验证码');
      } else {
        this.setState({
          loginTap: '',
          isDisabled: 'disabled',
        });
        fetch(newUrl, {
            method: 'POST',
            headers:{
              'Authorization': 'open the gate',
              'TokenAuthorization': lastToken,
            }
        })
        .then(response => response.json())
        .then((res) => {

          console.log(res);
          if(res.success){
            Toast.info('登陆成功');
            let raceToken = `Bearer${res.data.sessionValue}`;
            localStorage.setItem('race-token', raceToken);
            localStorage.setItem('loginMemberId', res.data.mid);
            localStorage.setItem('race-promotionCode', res.data.promotionCode);
            setTimeout(()=>{
              this.setState({ showLogin: false });
              // this.props.history.push("/race");
              // 登陆成功后再次请求接口 重新渲染页面
              GET(URL.CLANINFO).then(res => {
                  console.log(res);
                  if(res.success){
                    this.setState({
                      data: res.data,
                      content: res.data.fieldInfoArray,
                      totalNum: res.data.totalMembers,
                      flag: res.data.isTwentyMember,
                    });
                  }else{
                    window.location.reload();
                    // this.props.history.push("/race");
                  }
              });
            },4000);
          } else{
            Toast.info(res.message);
            this.refs.countdown.resetButton();
            this.setState({
              code:'',
              imgcode:'',
              isDisabled: '',
            });
          }
        })
        .catch((res)=>{
            Toast.info(res.message);
        });
      }
  }


  render() {
    const { loading, error, repos } = this.props;
    const { iconClass, class1, class2, code, tips, login, phone,nums,imgcode,loginTap,isDisabled } = this.state;
    const reposListProps = {
      loading,
      error,
      repos,
    };
    
    return (
      <section className="home-page">
          <Helmet>
            <title>头号社群</title>
            <meta
              name="description"
              content="头号社群"
            />
          </Helmet>
          <Header title="头号社群" onLeftClick={()=>{
            window.postMessage(JSON.stringify({
              type: 'close'
            }))
              }} onRightClick={(shareSuccessCallback)=>{
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
              }}/>
        <div className="wrapper">
          <div className="main">
            <div className="container">
                <div className="banner-container">
                    <img src={'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/banner.jpg'} />
                </div>
                {
                  this.state.data.isTwentyMember 
                  ? (
                    <div className="hero-container">
                        <div className="hero-wrapper">
                            <div className="rank">排名{this.state.data.clan.rank}</div>
                            <Link to={{pathname: '/race/myCamTeam'}}>
                            <div className="content">
                                <div className="avatar">
                                    { (this.state.data.clan.avatarImage === null) ? <img src={'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/default.png'} /> : <img src={`${this.state.data.clan.avatarImage}@160_160`} /> }
                                </div>
                                <p>{this.state.data.clan.name}战队</p>
                                <span>队长： {this.state.data.clan.leaderName}</span>
                                <div className="count">{this.state.data.clan.voteNumber + this.state.voteNum}票</div>
                            </div>
                            </Link>
                            <div className="leftPart">
                                <div className="photos">
                                  {this.state.photos.map((item, index) =>
                                    <img key={index} src={item} />
                                  )}
                                </div>
                                <div className="people">{this.state.totalNum}人参与</div>
                            </div>
                            <Link to={{pathname: '/race/rule'}}><div className="rules">活动规则</div></Link>
                        </div>
                        <div className="see-other" onClick={()=>{
                          this.props.history.push({
                            pathname: 'vote',
                            state: {
                              title: '头号社群'
                            }
                          })
                        }}>
                            <span className="see-other-left">查看大赛其他战队</span>
                            <span className="see-other-right"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAYRJREFUaAXtmDFOAlEQhgkFDRV0bAslegAt9QAewIYzEK4gHkG9gXoCvIAH0FpCIRobKzqT5ZtkSTaTpZpkMhtnkj/sTvLe+96/w3tvt9PJSAfSgXQgHUgH0oF0IB1wd6Asyyv0WenaHcA6IOA/qB4La5+u7SF/r9NX10tXCMtgAJ+g74ZJ3JPrWvp2awvoBK2RjicSPTcQy0CAFqipnFbk+5a+3doCOkSvSIfkBm4gloEA7SNxXccbiZGlb7e2gPaQ1L+ODxJjNxDLQIB2kaxEOr5InFr6dm0L7FLPgPtfdOYKYhkM2HnDJHbkLiz9urYFdob+1EQ2B4h27HgH2rb94vqxEroMPxfgb1TZyK38ic9DwwMoy+gd0hF/GYVYNrJHTc59/I0MyGNHCTnoFdHLZgCkHNx0SG4YHX4EpBzYdLyQiH2cBnCMpL51PJOI/UID4BTJyqLjgUT8DRbIprew29D1XodjAq3/rCIftraV2vdhq/408jodSAfSgXQgHfi3DuwBaf2Ru4OqRg4AAAAASUVORK5CYII=" alt=""/></span>
                        </div>
                    </div>
                  )
                  : (
                    <div className="sectionone">
                        <div className="bg-wrapper">
                          <div className="four-item">
                          {this.state.content.map((item, index) =>
                            <Link to={
                              {
                                pathname: '/race/clanList',
                                state: { fieldId: item.fieldId, fieldName: item.fieldName}
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
                            <div className="partLeft">
                              <div className="photos">
                                {this.state.photos.map((item, index) =>
                                  <img key={index} src={item} />
                                )}
                              </div>
                              <p>{this.state.totalNum}人参与</p>
                            </div>
                            
                            <Link to={{pathname: '/race/rule'}}><div className="rules">活动规则</div></Link>
                          </div>
                        </div>
                    </div>
                  )
                }
                <Link to={{pathname: '/race/ranking'}}>
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

        {
          this.state.data.isTwentyMember 
          ? (
            <NewFooter voteFetch={this.props.voteFetch} data={this.state.data}
              history= {this.props.history}
              voteCallback={()=>{
                this.setState({
                  voteNum: this.state.voteNum+1,
                })
              }}
            >
              <span>footer content</span>
            </NewFooter>
          ) : (
            <Footer>
              <span>footer content</span>
            </Footer>
          )
        }
        

        

        { this.state.showLogin 
          ? (<div className="login-wrapper">
                  <div className="inner-content"></div>
                  <div className="father">
                  <div className="box">
                    <h1 className="title">登录</h1>
                    <div className="input-group input-group-lg input-css">
                      <input type="text" id="phone" name="phone" className="form-control " placeholder="手机号" value={phone} onChange={this.handlePhone} onFocus={this.handleHide} />
                    </div>
                    <div className="input-group input-group-lg input-css">
                      <input type="text" name="imgcode" className="form-control" placeholder="图形验证码" value={imgcode}  onChange={this.handleImgCode} /> 
                      <img onClick={this.getCaptcha} className="newImg" src={this.state.token} />
                    </div>
                    <div className="input-group input-group-lg input-css">
                      <input type="text" name="code" className="form-control" placeholder="验证码" value={code} onFocus={this.handleHide} onChange={this.handleCode} />
                      <Countdown ref="countdown" status={this.state.status} nums={nums} sendCode={this.sendCode} callback={this.onChildChange} disableClick={this.disableClick} sendingClick={this.sendingClick} /> 
                    </div>
                    <div className={"form-btn submit " + loginTap} >
                        <input type="button" id="login" disabled={isDisabled} className="form-control btn-success" value="登录" onClick={this.handleLogin} />
                    </div>
                  </div>
                </div>
            </div>) 
          : null }

      </section>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};
