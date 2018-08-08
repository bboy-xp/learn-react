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
    // window.location.href = "about:blank";
    // window.close();


    // window.open('', '_self', '');
    // window.close();

    // window.opener = null;
    // window.open("", "_self");
    // window.close();


    // if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
    //   window.location.href = "about:blank";
    //   window.close();
    // } else {
    //   window.opener = null;
    //   window.open("", "_self");
    //   window.close();
    // }
  }
  componentWillMount() {
    // 清除localStorage中的链表的数组的缓存 
    localStorage.clear('existFormStep');
    localStorage.clear('formStep');
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
