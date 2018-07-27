import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Countdown from './Countdown';

class Login extends React.PureComponent {
  constructor(props) {
      super(props)
      this.state = {
          nums:this.props.init.nums,                                    // 倒计时时间（s）
          phone:'',                                                     // 手机号码
          code:'',                                                      // 验证码
          tips:'',                                                      // 提示信息
          class1:'',                                                    // 第一条提示信息样式
          class2:'',                                                    // 第二条提示信息样式
          iconClass:'input-group-addon glyphicon glyphicon-phone',      // 图标样式
          status:'disable',                                             // 倒计时按钮状态(disable:不可发送,able:可发送,sending:倒计时中)
          login:'disable',                                              // 登陆按钮样式(disable:不可登录,able:可登陆）
          popClass:'pop',                                               // 弹出框样式
      }
      this.sendCode = this.sendCode.bind(this)
      this.onChildChange = this.onChildChange.bind(this)
  }
  // 传递color属性给子孙组件
  getChildContext() {
        return {color: "red"};
  }
  handlePhone=(event)=>{
      // 倒计时按钮处于倒计时未结束状态时手机号不能修改
      var phone = event.target.value;
      if(this.state.status==='sending')
        return false;
      // 同步input值
      this.setState({
        phone:phone
      });
      // 验证手机号
      if(this.testPhone(phone)){ 
          this.setState({
            status:'able'    
          });
      }
      else{
          this.setState({
            status:'disable'     
          });
      }     
  }
  // 手机号验证
  testPhone(phone){
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if(myreg.test(phone))
        return true;
      else
        return false;
  }
  handleCode=(event)=>{
      this.setState({
        code:event.target.value
      });
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
                  tips:this.props.init.testError,
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
      if(status)
          this.setState({
            status:status
          });
  }
  // 发送请求到后端
  sendCode() {
      var phone = this.state.phone;
      // ajax发送验证码
      /*
      var url = "http://localhost:3000";
      fetch(url,{
                    method:'POST',
                    mode:'cors',
                    credentials:'include',
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:"phone="+phone
            })
            .then((res) => { console.log(res.status); return res.json() })
            .then((data) => {
              if(res===0){
                  this.setState({
                    class2:'show shake',
                    tips:this.props.init.codeError
                  });
                  this.resetButton();
              }
              else
                  this.setState({
                    class2:'show boost',
                    tips:this.props.init.codeSuccess,
                    login:'able'
                  });
            })
            .catch((e) => { console.log(e.message) })
      */
      // 模拟发送请求到后端
      setTimeout(
          ()=>{
              var res = this.response(phone);
              // 发送失败,倒计时按钮重置
              if(res===0){
                  this.setState({
                    class2:'show shake',
                    tips:this.props.init.codeError,
                    isReset:true
                  });
                  this.refs.countdown.resetButton();
              }
              // 发送成功，登录按钮可点击，并提示用户输入验证码
              else{
                  this.setState({
                    class2:'show boost',
                    tips:this.props.init.codeSuccess,
                    login:'able'
                  });
              }
          },
          3000
      );
  }
  // 模拟后端返回数据,返回0：发送失败，返回1：发送成功
  response(num){
      if(num==='15805173350')
        return 1;
      else if(num==='18776623153')
        return 0;
      // 随机返回0,1
      else
        return Math.round(Math.random()*1);
  }
  // 点击登录按钮
  handleLogin=(event)=>{
      if(!this.state.phone)
        this.setState({
          class1:'show shake',
          class2:'',
          iconClass:'input-group-addon glyphicon glyphicon-exclamation-sign red',
          tips:this.props.init.phoneNullError
        });
      else if(this.state.login!=='able'){
        this.setState({
          tips:this.props.init.loginError,
          class1:'',
          class2:'',
          popClass:'pop appear red'
        });
        setTimeout(()=>{this.setState({popClass:'pop'});},1000);
      }
      else if(!this.state.code)
        this.setState({
          class2:'show shake',
          class1:'',
          tips:this.props.init.codeNullError
        });
      else if(!this.codeTest())
        this.setState({
          class2:'show shake',
          class1:'',
          tips:this.props.init.codeTestError
        });
      else{
        this.setState({
          tips:this.props.init.loginSuccess,
          class1:'',
          class2:'',
          popClass:'pop appear success'
        });
        setTimeout(()=>{this.setState({popClass:'pop'});},1000); 
        this.refs.countdown.resetButton();
      }
  }
  // 测试验证码
  codeTest(){
      var myreg = /^\d{6}$/;
      return myreg.test(this.state.code);
  }
  render() {
    const { iconClass, class1, class2, code, tips, login, phone } = this.state;
    return (
        <div className="father">
            <div className={this.state.popClass} >
              <p>{tips}</p>
            </div>
            <div className="box">
              <h1 className="title">验证码登录</h1>
              <div className="input-group input-group-lg input-css">
                <span className={iconClass}></span>
                <input type="text" id="phone" name="phone" className="form-control " placeholder="手机号" value={phone} onChange={this.handlePhone} onFocus={this.handleHide} />
              </div>
              <div className={"tips shake clearfix " +  class1}>
                <span className="triangle"></span>
                <div className="article">{tips}</div>
              </div>
              <div className="input-group input-group-lg input-css">
                <input type="text" name="code" className="form-control" placeholder="验证码" value={code} onFocus={this.handleHide} onChange={this.handleCode} />
                <Countdown ref="countdown" status={this.state.status} nums={this.props.init.nums} sendCode={this.sendCode} callback={this.onChildChange} disableClick={this.props.init.disableClick} sendingClick={this.props.init.sendingClick} /> 
              </div>
              <div className={"tips second clearfix " + class2}>
                <span className="triangle"></span>
                <div className="article">{tips}</div>
              </div>
              <div className="form-btn input-group-lg">
                  <input type="button" id="login" className={"form-control btn-success " + login} value="登录" onClick={this.handleLogin} />
              </div>
            </div>
        </div>
    );
  }
}
Login.childContextTypes = {
  color: PropTypes.string
};

export default Login;