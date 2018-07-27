/**
 * 冠军竞猜页面
 *
 * 后面看看怎么搞  先排版样式咯
 */

import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import ListViewComponent from '../../components/ListView';
import './style.scss';

// row模块
class RowTpl extends Component {
  state={

  };
  render(){
    console.log(this.props)
    const rowData = this.props.data;
      return (
          rowData ?
          <div className="list-row-container" key={'row'+this.props.rowID}>
            {rowData && rowData.length > 0 && rowData.map((o, i)=>{
              return(
                o?
                <div key={'col'+this.props.rowID+i} className="list-item" onClick={()=>{
                  this.props.showMask(o.clanId);
                }}>
                    <div className="list-item-circle">
                        <img src={o.avatarImage || 'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/default.png'} />
                    </div>
                    <p>{o.name}</p>
                </div>
                : <div className="list-item-empty"/>
              )
            })}
          </div>
        : null
      )
  }
}

export default class Champion extends Component {
  state={
    selectValue: 1,
  }
  selectFn = (value)=>{
    this.setState({
      selectValue: value
    })
  }
  render(){
    return (
      <section className="champion-page">
          <Helmet>
            <title>冠军竞猜</title>
            <meta
              name="description"
              content="冠军竞猜"
            />
          </Helmet>
          <Header title="冠军竞猜"
            notPosition={true}
            icon={
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAQdJREFUaAXtmF0KwjAQhKteTnwR/63o5a2eQiXOgoUlJH0Iac2GCQwkKUlnvg00tGnYSIAESIAESIAEDBNwzh2g508rU1Fg+gZ9oL49zASA4yukzUuIzkQAGPXJi/k3tC4+AEyGyIv5E82PSaBW8scxoWXZe4A8zWchHNskQv6FebPkaT5W7Wzz1o/NHgH8u42NYyMlhHm5EutmwvxcnT+n+tKdQQtvrtwh0O8guZTpJuO2XNeeM5i9QAzhcZl+WHslztMjTXzjQCUYIpFp2jJWIo1b/lWsRH6maTuiEi0U+mJv0nb8w6pICDv/RoVZIISNf6O64AixhTroDi31M/ZJgARIoH4CX7HBB0QdNtPzAAAAAElFTkSuQmCC" alt=""/>
            }
            rightContent={<span onClick={()=>{
              this.props.history.push({
                pathname: 'rule',
                state: {
                  title: '竞猜规则'
                }
              })
            }}>竞猜规则</span>} />
          <div className="champion-wapper">
              <div className="main">
                  <div className="list-container">
                    <ListViewComponent
                      ajaxParams = {{
                          url: URL.GETGUESSCLANS,
                          data: {
                            pageSize: 20
                          },
                          rsDatakey: 'data',
                      }}
                      isOnePage
                      threeLineRow
                      rowTpl={(rowData, rowID) => {
                          return (
                              <RowTpl data={rowData} rowID={rowID} key={this.props.rowID} {...this.props}/>
                          )
                    
                      }}
                      renderHeader={()=>{
                        return (
                          <h2 className="record" onClick={()=>{
                            this.props.history.push({
                              pathname: 'guessOrder'
                            })
                          }}>我的竞猜记录</h2>
                        )
                      }}
                    />
          
                  </div>
              </div>
          </div>
          {/* <div className="champion-footer" onClick={()=>{
            this.props.history.push({
              pathname: 'vote'
            })
          }}>
               投票
          </div> */}
          {this.props.isShowMask &&
            <div className="champion-mask">
              <div className="champion-mask-wrapper">
                <div className="champion-mask-container">
                  <div className="champion-mask-top">
                    <span className="champion-mask-title">金币竞猜</span>
                    <span className="champion-mask-close" onClick={()=>{
                      this.props.closeMask()
                    }}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAUFJREFUaAXtmA0OwiAMhcXbuTt6Do+HbeISUoH1j+j0kSwRaV+/PhaJXC4YcAAOwAE4AAfgABz4XweKtfVaK+fcXnmPUkq1avTiV+m+1aJCGz37uNMHswlSlDXoYa19bDImbU4V2ga4YKgJypfwrLm0gV5BVxMDeJeWaYcyCmdomKBlcAQgkis5QnMPiCcnBHmUbAGyxB7VTV3XgGliUqGsYjPA2Zq1ztL4CWh7SFFY7Oz4RBMMvY/1v/PRDom0d9hxA+nw1yjsz+VP3Ocd4JG+C2kmElzv1WFgftrxfU0Q3Qievx+upbkXEdIAamIiDO5cC5gl1g1kSfQAeXIsTOrYCEgkVw04C8wAyNCYMQ7XMgtnag2B5QIVPf2f+raBlAOpsxPqWwnznQ4Xo10578WWfKUwhwNwAA7AATgABwIOPAE2DjLBdk+GFQAAAABJRU5ErkJggg==" alt=""/></span>
                  </div>
                  <div className="champion-mask-line"></div>
                  <div className="champion-mask-content">
                    <div className="champion-mask-goldAccount">您的金币数：{this.props.myGoldAccount}</div>  
                    <ul>
                      <li className={this.state.selectValue == 1 ?'active' : ''} onClick={()=>{
                        this.selectFn(1)
                      }}>100</li>
                      <li className={this.state.selectValue == 2 ?'active' : ''} onClick={()=>{
                        this.selectFn(2)
                      }}>200</li>
                      <li className={this.state.selectValue == 3 ?'active' : ''} onClick={()=>{
                        this.selectFn(3)
                      }}>300</li>
                      <li className={this.state.selectValue == 4 ?'active' : ''} onClick={()=>{
                        this.selectFn(4)
                      }}>400</li>
                      <li className={this.state.selectValue == 5 ?'active' : ''} onClick={()=>{
                        this.selectFn(5)
                      }}>500</li>
                      <li className={this.state.selectValue == 6 ?'active' : ''} onClick={()=>{
                        this.selectFn(6)
                      }}>600</li>
                    </ul>
                  </div>
                  <div className="champion-mask-bottom">
                    <div className="champion-mask-btn" onClick={()=>{
                      this.props.doGuess('clanId='+this.props.clanId+'&goldAvailableFiles='+this.state.selectValue)
                    }}>确定</div>
                  </div>
                </div>
              </div>
            </div>
          }
      </section>
    );
  }
}
