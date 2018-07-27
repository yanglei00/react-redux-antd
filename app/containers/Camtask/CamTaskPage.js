/*
 * FeaturePage
 *
 * List all the features
 */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import { Button } from 'antd-mobile';
import Header from '../../components/Header';
import commonFn from '../../utils/commonFn'
import ListViewComponent from '../../components/ListView';


export default class CamTaskPage extends React.Component {
  state = {
    isWX: commonFn.isWx(),
    isRnApp: commonFn.isRnApp(),
    userToken: localStorage.getItem('race-token') || localStorage.getItem('sg_login_token_secret'),
    ifgoto: false,
  }
  componentDidMount() {

    this.props.initFetch();

  }
  render() {
    console.log(this.state.userToken)
    const datalist = this.props.initData;
    // if(datalist){
    const toImgPage = datalist.circleId;
    const circleName = datalist.circleName;
    const toHImg='shunguang://|routerName=SuperSecondView&url=/html/topic/edit_topic.html&topicId='+datalist.circleId+'&topicName='+datalist.circleName+'&userToken='+this.state.userToken;
    const toHVideo='shunguang://|routerName=SuperSecondView&url=/html/topic/video_record.html&topicId='+datalist.circleId+'&topicName='+datalist.circleName+'&userToken='+this.state.userToken;

    // }
    console.log(datalist)
    return (
      <div className="camTask-Page">
        <Helmet>
          <title>战队任务</title>
          <meta
            name="description"
            content="战队任务"
          />
        </Helmet>
        <Header title="战队任务"
          notPosition={true}
          icon={
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAd5JREFUaAXtl0tOwzAYhJuUY3AsikRo2TUrJK4CYpVkw2MBRUKIDReCY7QJM0i2mofTOAnpb8mWLNfJb3u+sWO7s5lP3gHvgHfAO+Ad8A4cz4Fg6NBJkiyCILhlPyjXSF9D+7Rpf2ITXI1N03RVFMUDcsh3KFMUp9W4/6z/DdxngCzLlhSPtroPzEDRp68hbfTgNp3Q+TzPHyvidwC4tulnjFhrAIPzFH+J9f85hiibPqw+Yoo3OE/xG5uBx4rtDCBRPE3otAuZxKN9BOffxnKzTz8HZ6BNfBzHRxVP4FYA6eIJYNyFmsQjfoscSXCe4pkaZ8AknlulJPGNAC6JrwG4Jr4EAPFnOKR4GO1/F1uJy4bCVdJicTG7w0Ndx2/x4gmhBQOgdJOE80xzBklOGgBib5B3Six45sjPWFoX6pnEUgNge3yH4CvXIGrnAP4iRoB44gwoxwmFvMK950U9k1LWACjMJYhGgDYIvFtiub0yRkIyAlCcaSbwSgxEK4ALEAcBpEN0ApAM0RlAKoQVgEQIawBC8HrBa0b1sMOrBbbYD8ZMlfRVwmZAnsg8mXlCq3aEQb5X9anKXgAU1wQBoNKNdgqI3gB7EOcQ/oP6dxiG6ylE+zG8A94B74AcB34BlCIWMdGYFCMAAAAASUVORK5CYII=" alt="" />
          }
        />
        {datalist &&
          <div className="camTask-content">
            {!datalist.leaderTask &&
              <div className="alreadyUpload">
                <img src="http://cdn09.ehaier.com/shunguang/H5/www/img/race/jg-1@2x.png" />
                <p>队长还未上传战队最终作品！</p>
              </div>
            }
            {datalist.leaderTask &&
              <div className="alreadyUpload">
                <img src="http://cdn09.ehaier.com/shunguang/H5/www/img/race/qr-1@2x.png" />
                <p>队长已上传最终作品！</p>
              </div>
            }
            <div className="content">
              <h2>{datalist.title}</h2>
              <p>{datalist.content}</p>
            </div>
            <div className="content-but">
              {!datalist.buttonHide &&
              // {
                <div className="but1"
                  onClick={() => {
                    this.setState({
                      ifgoto: true
                    })
                  }}>提交作品</div>
              }

              {datalist.buttonHide &&
                <div className="but2"
                  onClick={() => {
                    this.props.history.push({
                      pathname: 'camList'
                    })
                  }}>查看作品</div>
              }
            </div>
          </div>
        }
        {!this.state.isWX && !this.state.isRnApp && toImgPage && this.state.ifgoto &&
          <div className="gotoapp"
          onClick={() => {
            this.setState({
              ifgoto: false
            })
          }}>
            <div>
              <div className="but1"
                onClick={() => {
                  this.setState({
                    ifgoto: false
                  })
                  console.log(toHImg)
                  window.location.href=encodeURIComponent(toHImg);
                  // let data = {
                  //   type: "postImg",
                  //   data: {
                  //     topicId: toImgPage, // 圈 id 
                  //     topicName: circleName // 圈 名称

                  //   }
                  // }
                  // let msg = JSON.stringify(data);
                  // window.postMessage(msg);
                }}
              >图文</div>
              <div className="but1"
                onClick={() => {
                  this.setState({
                    ifgoto: false
                  })
                  window.location.href=toHVideo;
                  // let data = {
                  //   type: "postVideo",
                  //   data: {
                  //     topicId: toImgPage, // 圈 id 
                  //     topicName: circleName // 圈 名称
                  //   }
                  // }
                  // let msg = JSON.stringify(data);
                  // window.postMessage(msg);
                }}
              >视频</div>
            </div>
          </div>
        }
        {this.state.isRnApp && toImgPage && this.state.ifgoto &&
          <div className="gotoapp">
            <div>
              <div className="but1"
                onClick={() => {
                  this.setState({
                    ifgoto: false
                  })
                  const data = {
                    type: "postImg",
                    data: {
                      topicId: toImgPage, // 圈 id 
                      topicName: circleName // 圈 名称
                    }
                  }
                  let msg = JSON.stringify(data);
                  window.postMessage(msg);
                }}
              >图文</div>
              <div className="but1"
                onClick={() => {
                  this.setState({
                    ifgoto: false
                  })
                  let data = {
                    type: "postVideo",
                    data: {
                      topicId: toImgPage, // 圈 id 
                      topicName: circleName // 圈 名称
                    }
                  }
                  let msg = JSON.stringify(data);
                  window.postMessage(msg);
                }}
              >视频</div>
            </div>
          </div>
        }
        {this.state.isWX && this.state.ifgoto &&
          <div className="gotoapp gotopage">
            <img src="http://cdn09.ehaier.com/shunguang/H5/www/img/race/ts-1@2x.png" />
            <div>
              {/* <img src={require('./images/ts-1@2x.png')}/> */}
              <p>请用手机自带浏览器打开</p>
            </div>
          </div>
        }
      </div>
    );
  }
}
