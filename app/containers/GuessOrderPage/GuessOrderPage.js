/*
 * FeaturePage
 *
 * List all the features
 */
import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import {Button} from 'antd-mobile';
import Header from '../../components/Header';
import ListViewComponent from '../../components/ListView';

import URL from '../../http/url';

// 图文详情模块
/**
 * status 奖励状态（0：等待开奖 1：已中奖 2：未中奖）
 */
class RowTpl extends Component {
  state={
		voteNum: 0,
  };
  render(){
		console.log(this.props)
		const o = this.props.data;
      return (
				o ? 
        <div className="guessOrder-item-container">
						<div className="guessOrder-item-wrapper">
							<div className="guessOrder-item-order">
									<div className="guessOrder-item-order-num">订单编号: {o.orderSn}</div>
									<div className="guessOrder-item-order-time">下单时间: {o.orderTime?o.orderTime.split(' ')[0] : ''}</div>
							</div>
							<div className="line"></div>
							<div className="guessOrder-item-info">
									<div className="guessOrder-item-info-left">
											<img className="guessOrder-item-info-logo" src={o.toClanAvatarImage || 'http://cdn09.ehaier.com/shunguang/H5/www/img/competition/default.png'} alt=""/>
									</div>
									<div className="guessOrder-item-info-right">
											<p className="guessOrder-item-info-title">{o.toClanName}</p>
											<p className="guessOrder-item-info-des">
													<span>当前票数：{o.vote_number + this.state.voteNum}</span>
											</p>
											<div className="guessOrder-item-vote-btn" onClick={()=>{
												this.props.voteFn(o.toClanId, ()=>{
													this.setState({
														voteNum: this.state.voteNum + 1,
													})
												});
											}}>投 票</div>
									</div>   
							</div>
							<div className="line"></div>
							{(o.status == 0 || o.status == 2) &&
								<div className="guessOrder-item-pay-info">支付金币：{o.payGoldPoint}</div>
							}
							{(o.status == 1 || o.status ==3) &&
								<ul className="guessOrder-item-win-info">
									<li>
										支付金币：{o.payGoldPoint}
									</li>
									<li className="guessOrder-item-win-line"></li>
									<li>
										奖励倍数：{o.multiple}
									</li>
									<li className="guessOrder-item-win-line"></li>
									<li>
										获得金币：{o.winGoldPoint}
									</li>
								</ul>
							}
							<div className="line"></div>
							{o.status == 0 &&
								<div className="guessOrder-item-status-info">等待开奖</div>
							}
							{(o.status == 1 || o.status ==3)  &&
								<div className="guessOrder-item-status-info">已中奖—1000金币已发放到您的账户</div>
							}
							{o.status == 2 &&
								<div className="guessOrder-item-status-info">未中奖—感谢您的参与</div>
							}
						</div>
				</div>
				: null
      )
  }
}
export default class TestPage extends React.Component {
 
  componentDidMount(){

    // this.props.initFetch();
  }
  render() {
    console.log(this.props)
    return (
      <div className="guessOrder-page">
        <Helmet>
          <title>我的竞猜订单</title>
          <meta
            name="description"
            content="精彩订单"
          />
        </Helmet>
        <Header 
            title="我的竞猜订单" 
            notPosition 
            rightContent={<span></span>}
        />
        <div className="guessOrder-content">
          <ListViewComponent
            ajaxParams = {{
                url: URL.GUESSORDERLIST,
                data: {
                  
                },
                rsDatakey: 'data',
            }}
          
            rowTpl={(rowData) => {
                return (
                    <RowTpl data={rowData} voteFn={this.props.voteFn}/>
                )
          
            }}
					/>
        </div>
      </div>
    );
  }
}