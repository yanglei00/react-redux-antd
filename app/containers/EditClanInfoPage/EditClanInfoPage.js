/*
 * FeaturePage
 *
 * List all the features
 */
import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import {InputItem,  TextareaItem, ImagePicker, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import commonFn from '../../utils/commonFn';
import Header from '../../components/Header';


/**
 * type 0 口号     1 战队介绍
 */
class EditClanInfoPage extends React.Component {
  state={
    value: (this.props.location.state.type == 0 ? this.props.location.state.slogan : this.props.location.state.introduce),
    introduce: this.props.location.state.introduce,
    title: (this.props.location.state && this.props.location.state.introduce? this.props.location.state.introduce.split('<div class="introduce-title">')[1].split('</div>')[0] :''), //标题
    content: (this.props.location.state && this.props.location.state.introduce? this.props.location.state.introduce.split('<div class="introduce-content">')[1].split('</div>')[0] :''),  //正文
    files: (()=>{
      let initArray = [];
      let initData = this.props.location.state.introduce && this.props.location.state.introduce.indexOf('<div class="introduce-images">') > -1 ? this.props.location.state.introduce.split('<div class="introduce-images">')[1].split('</div>')[0].split('<img src=').slice(1) : [];
      initData.map((o,i )=>{
        initArray.push({
          url: o.replace('/>', '').replace(/'/g,''),
          id: i
        })
      })
      return initArray;
    })(), //图片文件
  }
  componentDidMount(){

    console.log(this.props.location.state.introduce)
    
  }
  render() {
    const { getFieldProps } = this.props.form;
    console.log(this.props)
    return (
      <div className="editClanInfo-page">
        <Helmet>
          <title>{this.props.location.state.title}</title>
          <meta
            name="description"
            content={this.props.location.state.title}
          />
        </Helmet>
        <Header title={this.props.location.state.title}
          notPosition={true}
          icon={
            <img src={require('../../images/back_black@2x.png')} alt=""/>
          }
          rightContent={<span onClick={()=>{
            if(this.props.location.state.type == 0 ){ //口号
              if(this.state.value.length <= 0){
                Toast.info('请输入战队口号')
                return
              }
              this.props.history.push({
                pathname: 'editClan',
                state: {
                  clanId: this.props.location.state.clanId,
                  befrom: 'editClanInfo',
                  pictureUrl: this.props.location.state.pictureUrl,
                  slogan: (this.props.location.state.type == 0 ? this.state.value : this.props.location.state.slogan),
                  introduce: this.props.location.state.introduce
                }
              })
              return
            }else{ // 战队介绍
              if(this.state.title.length <= 0){
                Toast.info('请输入战队标题')
                return
              }
              if(this.state.title.length < 5){
                Toast.info('战队标题不能小于5个字')
                return
              }
              if(this.state.content && this.state.content.length < 5){
                Toast.info('战队正文不能小于5个字')
                return
              }
              if(this.state.files.length>0){
                this.props.uploadClanImages(this.state.files, (imagesUrls)=>{
                  console.log(imagesUrls)
                  let introduceTpl = '';
                  let imagesTpl = '';
                  if(imagesUrls && imagesUrls.length > 0){
                    imagesUrls.map((o, i)=>{
                      imagesTpl += `<img src='${o}'/>`
                    })
                  }
                  introduceTpl = `<div class="introduce-wrapper">`+
                    `<div class="introduce-title">${this.state.title}</div>`+
                    `<div class="introduce-content">${this.state.content}</div>`+
                    `<div class="introduce-images">${imagesTpl}</div>`+
                  `</div>`;
                  this.props.history.push({
                    pathname: 'editClan',
                    state: {
                      clanId: this.props.location.state.clanId,
                      befrom: 'editClanInfo',
                      pictureUrl: this.props.location.state.pictureUrl,
                      slogan: (this.props.location.state.type == 0 ? this.state.value : this.props.location.state.slogan),
                      introduce: (this.props.location.state.type == 1 ? introduceTpl : this.props.location.state.introduce)
                    }
                  })
                });
              }else{
                let introduceTpl = '';
                  introduceTpl = `<div class="introduce-wrapper">`+
                    `<div class="introduce-title">${this.state.title}</div>`+
                    `<div class="introduce-content">${this.state.content}</div>`+
                  `</div>`;
                this.props.history.push({
                  pathname: 'editClan',
                  state: {
                    clanId: this.props.location.state.clanId,
                    befrom: 'editClanInfo',
                    pictureUrl: this.props.location.state.pictureUrl,
                    slogan: (this.props.location.state.type == 0 ? this.state.value : this.props.location.state.slogan),
                    introduce: (this.props.location.state.type == 1 ? introduceTpl : this.props.location.state.introduce)
                  }
                })
              }
            }
          }}>保存</span>}

        />
        <div className="editClanInfo-content">
          {this.props.location.state && this.props.location.state.type == 0 &&
            <div className="editClanSlogan-content-wrapper">
              <TextareaItem
                placeholder="请输入标题（最多20字）"
                value={this.state.value}
                labelNumber={5}
                autoHeight
                onChange={(value)=>{
                  if(value.length > 20){
                    value = value.substring(0,20)
                  }
                  this.setState({
                    value: value
                  })
                }}
              />
            </div>
          }
          {this.props.location.state && this.props.location.state.type == 1 &&
            <div className="editClanIntroduce-content">
              <InputItem
                clear
                placeholder="请输入标题（5～30字）"
                value={this.state.title}
                onChange={(value)=>{
                  if(value.length > 30){
                    value = value.substring(0,30)
                  }
                  this.setState({
                    title: value
                  })
                }}
              ></InputItem>
              <div className="editClanIntroduce-content-wrapper">
                <TextareaItem
                  placeholder="请输入正文（5-500字 让和你一样的人都看到）"
                  value={this.state.content}
                  labelNumber={5}
                  autoHeight
                  onChange={(value)=>{
                    if(value.length > 500){
                      value = value.substring(0,500)
                    }
                    this.setState({
                      content: value
                    })
                  }}
                />
              </div>
              <div className="editClanIntroduce-image-picker">
                <ImagePickerExample 
                  initFiles={this.state.files}
                  onChange={(files)=>{
                  console.log(files)
                  this.setState({
                    files
                  })
                }}/>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
export default createForm()(EditClanInfoPage)


class ImagePickerExample extends React.Component {
  state = {
    files: this.props.initFiles
  };
  onChange = (files, type, index) => {
    console.log(files, type, index);  
    if(files.length > 9){
      Toast.info('最多可以上传9张哦')
      return
    }
    this.setState({
      files,
    },()=>{
      this.props.onChange(files)
    });
    
  };
  onAddImageClick = (e) => {
    if(commonFn.isRnApp()){
      e.preventDefault();
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
            this.setState({
              files: this.state.files.concat({
                url: url[0],
                id: this.state.files.length,
              }),
            },()=>{
              if(this.state.files.length > 9){
                Toast.info('最多可以上传9张哦')
                return
              }
              this.props.onChange(this.state.files)
            });
          }
        }
      };
      window.document.addEventListener('message', messageFn,false)
    }
    // console.log(e.target.files)
    // this.setState({
    //   files: this.state.files.concat({
    //     url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    //     id: '3',
    //   }),
    // });
  };
  onTabChange = (key) => {
    console.log(key);
  };
  render() {
    console.log(this.props)
    const { files } = this.state;
    return (
      <div>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 9}
          onAddImageClick={this.onAddImageClick}
        />
      </div>
    );
  }
}