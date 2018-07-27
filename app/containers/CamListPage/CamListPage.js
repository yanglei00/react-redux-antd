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

// 图文详情模块
class RowTpl extends Component {
  state={
      data: this.props.data,
  };
  render(){
    console.log(this.props)
    const o = this.props.data;
    const his=this.props.history;
      return (
          o ?
    // console.log(this.props.datas)
    // const listDatas=this.props.datas
    // const item=listDatas.map((detail)=>(
      <div className="camList-list"
      onClick={()=>{
        this.props.history.push({
          pathname:'topicDetail',
          state: {
            storyId: o.storyId
          }
        })
      }}
      >
        <div className="imgbofang">
            <img src={o.mainImg}/>
            {o.dataTypeNew==3 &&
            <img className="bofang" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAAXNSR0IArs4c6QAABZlJREFUaAXdml1II1cYhk20VlstWmxtS1Sqsmjb6EXoCmK6XalISUWrN6KL+EuKeiUUUfCy7IVQ9K5hrXujXql3axGhoAsKgjerW+1alFj7t1msVaJuq6bvm07GySbqZP6M/eAl55w55zvfk5k5c+acMcVoaD6fzwR3WZAVyoQs0BvQK1AiRDuEDiAPtA1tQcuQ22Qy+fCriTEQVSbAfAAnpdBN6DWFDvfQbhH6HlpRC6kYTACyI4g70NuQlvYbnI1AD5UCKgIDVAE6bYJyIT3tJzi/D7hHkXYSERiA3kIHX0C2SDtSWX8J7b8B4O9y/cgGAxQHhB4oWa5zjevtw99dwHGgudRkgQHqU3hyQrGXetS3wgncuwD33WXdXAgGIIK0QY7LHBl8/AH6uwdAgoY1c9jSs8JohGJ0/KMZ27l2Lphw+UXbmZKCOIQYpWViOiwYGnCg4D0V7eYUYg2JMwQMFTmkc/S76oEiJNgwBYyxR4g56HAIGI7yOXVVQ3pQcDIzjJUxB1kQGMg5ozD64RsUkMKMTYhdbC6C4QCH/ibxyPVLNAkM/sjjJPFzQqt47jc0NJQ7MzOTm5aW5q2qqlovKyuTPf2RxKAmydjJMEcn/ge0QOpCXvEsva6urvzo6OglOqVlZ2c/a2lpeZyfn8+pkFHGtwInHty+wKXI9ynFUIxaCsX8xsZGWl9f30f9/f3WnZ0dEZjHdDQykCUmAFaqR2enp6emhYWFrM7OztKxsbF3T05OLpzCaRSDn8UsXIZ889XNeDbHx8ffb29vvzU3N8elAj3tJpl4xrhGofR1PqIAPR5P0sDAQFFvb++HuFRfjaix/MpkySIYp0+G2traWnp3d/etwcHB9/b29qQjs1ZxWAnG1STDDfebeXZ2Nrujo+P2xMREJi4fLWPIJBiXyK7MvF7vy6OjowUAtC8uLr6uUSAWE/6pb+HsTbUOq6urP1Prg+2tVuuvbW1tqxaLheuPSu0pz1hgIVOpE03bLS8vv9PV1fWxy+W6gdGU8SmxxKgDI8Xx8XHs9PT0DafTeXtqakrJxMEPpuQfMaTN/v5+IuagtuHh4YjnsDxjaq5lQwDn5+czIuzo8FqAFRcX/xwh2AEfjk8h1aNihB3Lqp6UlPS8pqZmtbKycltWg7NKHoKxkX9GfFZ+tam4uLhTu92+2djYuJ6cnHysIJptgm0paKhbk7y8vD9aW1t/wPucV0UnWwSTtRauohNZTfHmvd/Q0PC4pKTkmawGF1daJpgb4qabITP8F+NJSEj42+FwPKmtrXXHxsZqMWEkizuOr9Ew7iR+8mKneubNZrOvqKjIjcvux9TU1H807GuRTDxjNG6PGgaWk5PjXw/B/aTHeghZYgJgK0hzIUTJ9IV+ZBnOjBeX3KqOK1hkIMt/YMLlOIL8lyzU2uLj44/Ly8vX6+vrN5E+1dq/xN8IWZgPnDGmH0KfQ7nMaGQ+m822jftoLT09/blGPs9zw/1qMvhNBBPO2n2UfiUci+gnJSXlYHd3l99z+C0jI+PP5ubmlcLCwr8CZTr/chNeHFVFMHaKA48wQi4hGfH6fUVFxZPJycl83EeHuIc2kf9FZxCp+yXGLi0IWecDGLeRvoauy44LR9YugAUtqXN2H2RChbsoPAk6EJ0ZxsgvCYKgGGoIGAtRkdMsF9NRbvyCgLGGWFgw1kIDfnLA3flotQdCjGHjOxdMqH0Pv9EIx5gY27kWMniEq4kB5f/1AYsUEnBcCu+Brmq05Oin7SdHAUDhUcCNbFugzKBfPlv1+UhMCgDAAuSbIC2nX9IuAmljPusL9MZfwPH+tEN3IK3fCjhLH4GM/RATHYomAHIxqBS6/p/OimSShACZhSIONNyeskBc2uP+QGCPgAu0B5AH2oa2ID5k3XguiZNY5FXZv4FCrAVFPyDpAAAAAElFTkSuQmCC"/>
            }
        </div>
        <h3>{o.storyName}</h3>
        <p>
            <span className="span1"><img className="autor" src={o.memberAvatarImage||require('./images/user.jpg')}/><i>{o.memberName}</i></span>
            <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABDBJREFUaAXtWE1sVFUU/s4bB5oAiakJSrXhpzjTSumGBIkbE90YYcGKQBTsjyUsXLLBEgQSifKjGxdqbKEQExNjAhvYEYyLVggklGgz5UclMDGKEgNq6cy847n3zU9p+947b3iDs5ibvNw7937nO+c7c+677z2gxo17U+9zT/qe6WvhyqkF6UOcLu0E80KYvgat9gLA87y4S328Kh6DgHgDnsn2xMwJzW/uTb8hZbEOTvI9GvzhT42NBsN9q5rh5vaBaJSGMl9qbCL/A9zd8TxcHgbjHXF2mplJ4ygMY3mEz+PlYesnzEjWIwtAU/IvsctZbsaLeDv9ZrAfmvLWS70P2vAYPq/lin58wJXpyALo07HfRPZHZQqXPuCdXQvKv2cOHD4sJXEfpvdp1l54ysvCb/2UJ/wHVf391uEfDyZkH7RYagcHaGhiwN9N8Io9I1y8a1FEWTw1P0WHx/4OtvJWqxJgTLkvtRUFHC86mURT01Jt1oo2tuMdXYvxYPKmlM98O5HANhqcODEdEzSuXoDZvL3pkWLdFoBEBx0bv1pyxj2dreCpgwC9DGJTqmeRoAH6IvNTCWN6b7MWxmWYkGsURzMvERGbNU2LvAdKpNaJk3wdhE/g0FsPBb+9s02CHxPsZglxiYh8Wq4tKPAI965eUeIwvbUTe8uTSK6PEry1n04W15i702ck8Nfm5qOv6Vhm09xr0WerLiE/V7x31Tz8nL8nAoqPELOQBSxrWUh7z03OWqliouoS8vWVzUmJ+AZvzBLI3nnW1z7iQvwC8ng1NIZc/rlQjBIQqwDub0+BaX+obyreMkOB4YDYBPD2jiXIufIsw82hbjlxKxSjBMQigPs6OjHljorPNpXfZNNtFU4BeuS7EPe0b5FN+5lkfpHCXxEiD3bElcOK5ZQAbstZcBLJRXvo84v/aLnUAmx9590jUuMrxVHRjhPieqXWmQpHdBZPNm+gj0f+1eD1LzR597gEK4+7kqxK7jQ+omGYX8Hdu3vEaJfGMMIeoDUawngwLI8guqYXwFIuj63xM1pXegFaxlhw9KuWpj4FEM7/fwL65RVg/ylgRVclBjPedxLo/7AyFzhic6aomv4uJI/uKsbWNNDaDgx8Bfzyo2ey9AX5fCBbiHQUIEctIP4SOtQNXP7WC3j5asBcJvgr3wGHehQ5kENuwfJLCqCFKFMit/7uVLS7f0ubBC+lY7J+Q17Ostd0MRFdoKOZtTowEKWEtJweLntdgpYramN9/Rvq+EsoasCz8Pr6r08BTlK9getPAOF3GrpyY9afEjBRbyX0fUCscy7VlwByvpkzyoBJvQCi8le3AL7qlwinMTg+HJVALwDUL2dxqT5Zxq44k0+K0y4z53d5bxHmLKlcRHnBX5OzYre8iW2M+lUuqtgGvpGBRgYaGWhkoJGBRgbizsB/vO4xoJkiV5AAAAAASUVORK5CYII="/><i>{o.praiseNumber||0}</i></span>

        </p>
      </div>
      :null)
    // ))
    // return <ul>{item}</ul>
  }
}

// function List(lists){
//   const listArr=lists.datas;
//   console.log(listArr)
//   const item=listArr.map((detail)=>(
//     <li className="camList-list">
//       <div>
//           <img src=''/>
//       </div>
//       <h3>{detail.title}</h3>
//       <p>
//           <span><img class="autor"/><i>{detail.memberName}</i></span>
//           <span><img src=""/><i>{detail.praiseNumber}</i></span>
//       </p>
//     </li>
//   ))
//   return <ul>{item}</ul>
// }

export default class CamListPage extends React.Component {
 
  componentDidMount(){

    // this.props.initFetch();
  }
  render() {
    // const datalist=this.props.initData;
    // console.log(datalist)
    return (
      <div className="camList-Page">
        <Helmet>
          <title>战队作品</title>
          <meta
            name="description"
            content="精彩订单"
          />
        </Helmet>
        <Header title="战队作品"
          onLeftClick={()=>{
            this.props.history.push({
              pathname:'myCamTeam'
            })
          }}
          notPosition={true}
          icon={
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAd5JREFUaAXtl0tOwzAYhJuUY3AsikRo2TUrJK4CYpVkw2MBRUKIDReCY7QJM0i2mofTOAnpb8mWLNfJb3u+sWO7s5lP3gHvgHfAO+Ad8A4cz4Fg6NBJkiyCILhlPyjXSF9D+7Rpf2ITXI1N03RVFMUDcsh3KFMUp9W4/6z/DdxngCzLlhSPtroPzEDRp68hbfTgNp3Q+TzPHyvidwC4tulnjFhrAIPzFH+J9f85hiibPqw+Yoo3OE/xG5uBx4rtDCBRPE3otAuZxKN9BOffxnKzTz8HZ6BNfBzHRxVP4FYA6eIJYNyFmsQjfoscSXCe4pkaZ8AknlulJPGNAC6JrwG4Jr4EAPFnOKR4GO1/F1uJy4bCVdJicTG7w0Ndx2/x4gmhBQOgdJOE80xzBklOGgBib5B3Six45sjPWFoX6pnEUgNge3yH4CvXIGrnAP4iRoB44gwoxwmFvMK950U9k1LWACjMJYhGgDYIvFtiub0yRkIyAlCcaSbwSgxEK4ALEAcBpEN0ApAM0RlAKoQVgEQIawBC8HrBa0b1sMOrBbbYD8ZMlfRVwmZAnsg8mXlCq3aEQb5X9anKXgAU1wQBoNKNdgqI3gB7EOcQ/oP6dxiG6ylE+zG8A94B74AcB34BlCIWMdGYFCMAAAAASUVORK5CYII=" alt=""/>
          }
        />
        {/* {datalist&&
        <div className="camList-content">
          <RowTpl datas={datalist}></RowTpl>
        </div>
        } */}
        <div className="camList-content">
          <ListViewComponent
            ajaxParams = {{
                url: URL.CAMLIST,
                data: {
                  // clanId: 1
                },
                rsDatakey: 'data',
            }}
          
            rowTpl={(rowData) => {
                return (
                    <RowTpl data={rowData} history={this.props.history}/>
                )
          
            }}
          />
        </div>
      </div>
    );
  }
}
