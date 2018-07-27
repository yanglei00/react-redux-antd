import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { GET } from '../../http/Http';

import { ListView } from 'antd-mobile';
import { Toast } from 'antd-mobile/lib/index';



function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class ListViewComponent extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => {
        if (row1 !== row2) {
          // console.log(row1, row2   )
        }
        return row1 !== row2;
      }
    });

    this.initData = [];

    this.state = {
      dataSource: dataSource.cloneWithRows(this.initData),
      refreshing: false,
      isLoading: false,
      hasMore: true,

      pageIndex: 1,
      goodsCrads: [],
      listKey: 1
    };
  }
  ajaxGoodsFun = async (type) => {
    this.setState({ isLoading: true });

    let params = {
      page: this.state.pageIndex,
      pageSize: this.props.ajaxParams.pageSize || 10,
    }
    if (this.props.ajaxParams.isPageIndex) {
      params = {
        pageIndex: this.state.pageIndex,
        pageSize: this.props.ajaxParams.pageSize || 10,
      }
    }
    if (this.props.ajaxParams && this.props.ajaxParams.data) {
      params = Object.assign({}, params, this.props.ajaxParams.data);
    }

    const response = await GET(this.props.ajaxParams.url, params);
    console.log(response)
    if (response.success || response.ok) {
      let rsDataArray = [];
      if (this.props.ajaxParams.rsDataTwoKey) { //data数组里有二级json 数组
        rsDataArray = response[this.props.ajaxParams.rsDatakey][this.props.ajaxParams.rsDataTwoKey]
      } else {
        rsDataArray = response[this.props.ajaxParams.rsDatakey];
      }
      console.log(rsDataArray)
      if (rsDataArray && rsDataArray.length > 0) { // 有数据

        let goods_list_json = typeof rsDataArray == 'string' ? JSON.parse(rsDataArray) : rsDataArray;
        if (this.props.twoLineRow) {  // 转化数据为二维数据

          if (goods_list_json.length > 0) {
            // 一维数组 转化成二维数组
            function formatData(arr) {
              var tempArr = [];
              for (var i = 0; i < Math.ceil(arr.length / 2); i++) {
                tempArr[i] = [];
                tempArr[i].push(arr[2 * i]);
                tempArr[i].push(arr[2 * i + 1]);
              }
              return tempArr;
            }
            goods_list_json = formatData(goods_list_json);
          }
        }
        if (this.props.threeLineRow) {  // 转化数据为三维数据

          if (goods_list_json.length > 0) {
            // 一维数组 转化成三维数组
            function formatData(arr) {
              var tempArr = [];
              for (var i = 0; i < Math.ceil(arr.length / 3); i++) {
                tempArr[i] = [];
                tempArr[i].push(arr[3 * i]);
                tempArr[i].push(arr[3 * i + 1]);
                tempArr[i].push(arr[3 * i + 2]);
              }
              return tempArr;
            }
            goods_list_json = formatData(goods_list_json);
          }
        }
        if (type == 'refresh') { //下拉刷新
          this.initData = [...goods_list_json, ...this.initData];
          listKey = new Date().getTime();
        } else { //上来加载更多

          this.initData = [...this.initData, ...goods_list_json];

        };
        this.setState({
          // listKey:listKey,
          dataSource: this.state.dataSource.cloneWithRows(this.initData),
          isLoading: false,
          refreshing: false,
          hasMore: true,
          pageIndex: this.state.pageIndex + 1
        });
      } else { // 无数据
        this.setState({
          isLoading: false,
          hasMore: false,
          refreshing: false
        });
      }

      if (this.props.loadedFun) {
        this.props.loadedFun(this.props.initKey);
      }


    } else {
      Toast.info(response.message)
    }

  }
  componentDidMount() {

    this.ajaxGoodsFun();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.insetBefore && nextProps.insetBefore.length > 0) {
      if (nextProps.insetBefore !== this.props.insetBefore) {
        this.initData = [...nextProps.insetBefore, ...this.initData];
        console.log(nextProps.insetBefore)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.initData),
        });
      }
    }
  }

  onEndReached = (event) => {
    console.log(this.state.hasMore)
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    if (!this.props.isOnePage) {
      this.ajaxGoodsFun();
    }

  }
  //渲染一行方法
  renderRowFunc = (rowData, sectionID, rowID) => {
    return (
      <div key={rowID} className="row-container" >

        {this.props.rowTpl(rowData, rowID)}
      </div>
    );
  }
  render() {

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        style={{
          height: this.props.listViewWrapHeight ? this.props.listViewWrapHeight : document.body.clientHeight - 45,
        }}
        contentContainerStyle={{ position: 'relative' }}
        renderHeader={() => this.props.renderHeader ? this.props.renderHeader() : <div></div>}
        renderFooter={() => (<div style={{
          padding: 15,
          textAlign: 'center',
          // display: this.state.hasMore &&  this.state.isLoading ? 'block': 'none'
        }}>
          {this.state.isLoading ? '加载中...' : ''}
        </div>)}
        renderRow={this.renderRowFunc}
        // renderSeparator={separator}
        className="am-list-listView"
        pageSize={4}
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default ListViewComponent;
