import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import './Share.css';
import { Notify } from 'zent';
import successImg from "../../static/img/successPost.png";
import downloadImg from "../../static/img/download.png";
import wechatImg from "../../static/img/wechat.png";
import linkImg from "../../static/img/link.png";
import * as QrCode from 'qrcode.react';
import copy from 'copy-to-clipboard';


export default class Preview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      qrCodeStr: "",
      id: ""
    }
    this.copyLink = this.copyLink.bind(this);

  }
  async componentWillMount() {
    document.title = "分享表单";
    //获取url中的id参数
    const id = this.props.location.search.split('=')[1];
    const qrCodeStr = "http://hook.feit.me/formStyle?id=" + id;
    this.setState({
      id: id,
      qrCodeStr: qrCodeStr
    })
  }
  copyLink() {
    const id = this.state.id;
    const formUrl = 'http://hook.feit.me/formStyle?id=' + id;
    copy(formUrl);
    Notify.success('成功复制到剪切板');
  }
  render() {

    return (
      <div className="shareContainer">
        <div className="shareTitleContent">
          <img className="successShareImg" src={successImg} alt="404" />
          <span className="titleText">表单创建成功,快将表单分享出去吧</span>
        </div>
        <div className="dividerContent">
          <div className="dividerLine"></div>
          <span className="dividerText">选择分享方式</span>
          <div className="dividerLine"></div>
        </div>
        <div className="qrCodeContent">
          <div className="qrCode">
            <QrCode value={this.state.qrCodeStr} size={180} />
          </div>
          <div className="dividerText">填写者识别二维码即可填写</div>
        </div>
        <div className="shareModes">
          <div className="shareMode">
            <img className="downloadShareImg" src={downloadImg} alt="404" />
            <div className="shareModeText">保存二维码</div>
          </div>
          <div className="shareMode">
            <img className="downloadShareImg" src={wechatImg} alt="404" />
            <div className="shareModeText">分享给好友</div>
          </div>
          <div className="shareMode" onClick={this.copyLink}>
            <img className="downloadShareImg" src={linkImg} alt="404" />
            <div className="shareModeText">复制链接</div>
          </div>
        </div>

      </div>
    )
  }

}

