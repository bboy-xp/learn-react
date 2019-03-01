import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import "./Backstage.css";

import shareImg from "../../static/img/backstageShare.png";

export default class Backstage extends Component {

  constructor(props) {
    super(props);

    // this.titleInputFocus = this.titleInputFocus.bind(this);
    this.state = {

    }

  }
  componentWillMount() {
    document.title = "后台管理";
    //获取url中的id参数
    const id = this.props.location.search.split('=')[1];
    // console.log(id);
  }


  render() {
    return (
      <div className="BackstageContainer">
        <div className="header">
          <div className="headItem selectHead">概述</div>
          <div className="headItem">数据</div>
        </div>
        <div className="dataShow">
          <div className="dataShowItem">
            <div className="dataNum">1</div>
            <div className="dataNumDescription">今日提交</div>
          </div>
          <div className="dataShowItem bothsidesBorder">
            <div className="dataNum">3</div>
            <div className="dataNumDescription">总浏览</div>
          </div>
          <div className="dataShowItem">
            <div className="dataNum">1</div>
            <div className="dataNumDescription">总数居</div>
          </div>
        </div>
        <div className="BackstageFooter">
          <div className="btnContent shareBtn">
            <img className="backstageShareImg" src={shareImg} alt="404" />
            <span>分享表单</span>
          </div>
          <div className="btnContent">
            编辑表单
          </div>
          <div className="btnContent deleteBtn">
            删除表单
          </div>
        </div>
      </div>
    )
  }

}
