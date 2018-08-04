import React, { Component } from 'react'
import "./Success.css";
import successImg from "../../static/img/success.png";

export default class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.goToList = this.goToList.bind(this);
    this.close = this.close.bind(this);
  }

  goToList() {
    this.props.history.push('/admin/list');
  }
  close() {
    window.close();
  }

  render() {
    return (
      <div className="container">
        <div className="successText">
          <img className="successImg" src={successImg} alt="404" />
          <div>恭喜您</div>
          <div>已填完表单</div>
        </div>
        <div className="btnStyle" onClick={this.close}>关闭窗口</div>
        <div className="btnStyle" onClick={this.goToList}>管理表单</div>
      </div>
    )
  }
}
