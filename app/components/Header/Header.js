import React from 'react';
import { Link } from 'react-router-dom';
import {NavBar, Icon} from 'antd-mobile';
import './style.scss';
import commonFn from '../../utils/commonFn';
import {POST_JSON, POST_APP_FORM} from '../../http/Http';
import URL from '../../http/url';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount(){

  }
  shareSuccessCallback = async (clanId)=>{
    let messageFn = function (e) {
      window.document.removeEventListener('message', messageFn,false)
      let data = JSON.parse(e.data);
      if(data.type == 'shareSuccess'){
        POST_JSON(URL.SHARESUCCESSCALLBACK,('clanId='+(clanId||'')), '', {headers: {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}})
          .then((rs)=>{
          })
      }
    };
    window.document.addEventListener('message', messageFn,false)
  }
  render() {
    return (
      <div className={'header'+ (this.props.notPosition ? ' notPosition' : '')}>
        <div className="nav-bar">
          <NavBar
              icon={this.props.icon? this.props.icon: <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAQdJREFUaAXtmF0KwjAQhKteTnwR/63o5a2eQiXOgoUlJH0Iac2GCQwkKUlnvg00tGnYSIAESIAESIAEDBNwzh2g508rU1Fg+gZ9oL49zASA4yukzUuIzkQAGPXJi/k3tC4+AEyGyIv5E82PSaBW8scxoWXZe4A8zWchHNskQv6FebPkaT5W7Wzz1o/NHgH8u42NYyMlhHm5EutmwvxcnT+n+tKdQQtvrtwh0O8guZTpJuO2XNeeM5i9QAzhcZl+WHslztMjTXzjQCUYIpFp2jJWIo1b/lWsRH6maTuiEi0U+mJv0nb8w6pICDv/RoVZIISNf6O64AixhTroDi31M/ZJgARIoH4CX7HBB0QdNtPzAAAAAElFTkSuQmCC" />}
              onLeftClick={() => {
                this.props.onLeftClick ?this.props.onLeftClick(): window.history.back();
              }}
              rightContent={this.props.rightContent? this.props.rightContent: (
                commonFn.isRnApp()?
                <img onClick={()=>{
                  if(this.props.onRightClick){this.props.onRightClick(this.shareSuccessCallback)}
                }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAspJREFUaAXtmD1rFFEUhrNB0KCIUVBQEEEtVBARSROErFgINiJWVkJ+QFp/gI2tTXr9BVZWxsZgIRZiERE/UFERPxIlZk1iMj6vuXdyZ8zM3rs76w54D7x7zp17zns+5rI7OwMDUeIE4gTiBOIE/ucJNKpoPkmSJjzXwEmwGSRg1WjZ7nqJ9c1GozGBTgWOERa3wI70YrmxyPb1chePXRKPgVUQKsMuPcE3Qgnwnxt0STq0NfnQO3mPmLlcvtus53PX2i23hCb+i5ApLHBxyGyMol8B8VpoSNaWXgFvOUI6VhmBS/ubMhfXF+OYk+vLP5aOUXeSu+2+5zcoKTkug5VcLi1/BhFt5JwjrbwB+C+CX06eO9jfzbreDVDkebBkipWaAkNgVgukvg1Q3FnQUpVGptFbdQrQ9W6AAk+DH8DKQ4zt9ghj17cBihsB9oxjJo/BTlt8re8AhZ4AX4GVGYzdbvG1bYBCj4JPtnL0c7A3X3wtG6DQw+ADsPIaY/9GxZsG3hvH2SIf7+s2o9HBvwPEHQBvHJ532AfLCmBfP2x3wZUyP689SFwJaoDAfeClQ/AR+4hX4qqcnOQyvRvAdw94qiAjX9DHq6rLm8dmN9qrAXx3gSdO7DfsU95Jq3R0ipDZtgH5gEdyNjKP1lNsf8RWYXRpA/hsAw+cGD0qNPtTucnqFCOzsAH2BoG+OawsYpzrpHjijoGr4FAn8ZkYSFwpa0Bfl1aWMS5kiDwXxGkQ+raSPPMMK3Zb40k/CxsQA16T4DO4VMxYvkPsMEil3NtjN2VaM0ob8KBr60KaTANV/Klvm7SXDrGBXk7XhzveAZ8p9dKn6CVSSM4WzvbFlv6UvAgJ7sDXfdRu6U1YV0LB9yHo17PMdBUNjNHAFOiaC44Q0avJMyEBhb7chSbQexs9nPValEO5+vsQWDiNuBEnECcQJxAn8C8n8BsmtFYyVEh7VgAAAABJRU5ErkJggg==" />
                : ''
              )}
            >{this.props.title}</NavBar>
        </div>
      </div>
    );
  }
}

export default Header;
