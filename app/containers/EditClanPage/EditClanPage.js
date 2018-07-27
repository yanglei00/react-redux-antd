/*
 * FeaturePage
 *
 * List all the features
 */
import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import {Button, InputItem, List} from 'antd-mobile';
import { createForm } from 'rc-form';
import commonFn from '../../utils/commonFn';
import Header from '../../components/Header';

const Item = List.Item;

class EditClanPage extends React.Component {

  componentDidMount(){

    this.props.initFetch({
          pictureUrl: this.props.location.state.pictureUrl,
          slogan: this.props.location.state.slogan,
          introduce: this.props.location.state.introduce
    });

  }
  render() {
    console.log(this.props)
    // const {clan: clanInfo} = this.props.initData;
   
    return (
      <div className="editClan-page">
        <Helmet>
          <title>编辑战队信息</title>
          <meta
            name="description"
            content="编辑战队信息"
          />
        </Helmet>
        <Header title="编辑战队信息"
          notPosition={true}
          icon={
            <img src={require('../../images/back_black@2x.png')} alt=""/>
          }
          rightContent={<span onClick={()=>{
            this.props.submitClanInfo();
          }}>保存</span>}
        />
        <div className="editClan-content">
        {true &&
          <List>
            <Item arrow="horizontal"
              className="editClan-content-logo"
              extra={
                <div className="editClan-content-logo-wrapper">
                  <img src={this.props.pictureUrl || 'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/default.png'} alt=""/>
                  {!commonFn.isRnApp() &&
                    <input type="file" accept="image/*" onChange={(e)=>{
                      this.props.uploadClanAvatar(e.target.files[0])
                    }}/>
                  }
                  {commonFn.isRnApp() &&
                    <div className="editClan-content-logo-empty" onClick={()=>{
                      let data = {
                        type: "appImage",
                      };
                      let msg = JSON.stringify(data);
                      window.postMessage(msg);

                      let messageFn =  (e)=> {
                        window.document.removeEventListener('message', messageFn,false)
                        let data = JSON.parse(e.data);
                        if(data.type == 'images'){
                          let url = data.data.urls;
                          if(url && url.length > 0){
                            if(this.props.androidUploadClanAvatar){
                              this.props.androidUploadClanAvatar(url[0]);
                            }
                          }
                        }
                      };
                      window.document.addEventListener('message', messageFn,false)
                    }}/>
                  }
                </div>
              }
              >头像</Item>
            <Item arrow="horizontal" 
              className="editClan-content-slogan"
              extra={this.props.slogan}
              onClick={() => {
                this.props.history.push({
                  pathname: 'editClanInfo',
                  state:{
                    title: "战队口号",
                    type: 0,
                    slogan: this.props.slogan,
                    introduce: this.props.introduce,
                    pictureUrl: this.props.location.state.pictureUrl,
                  }
                })
              }}
              >口号</Item>
            <Item arrow="horizontal" 
              className="editClan-content-introduce"
              multipleLine 
              extra={(this.props.location.state && this.props.location.state.introduce? this.props.location.state.introduce.split('<div class="introduce-title">')[1].split('</div>')[0] :'')}
              onClick={() => {
                this.props.history.push({
                  pathname: 'editClanInfo',
                  state:{
                    title: "战队介绍",
                    type: 1,
                    slogan: this.props.slogan,
                    introduce: this.props.introduce,
                    pictureUrl: this.props.location.state.pictureUrl,
                  }
                })
              }}
              >战队介绍</Item>
          
          </List>
        }
         
        </div>
      </div>
    );
  }
}
export default createForm()(EditClanPage)
