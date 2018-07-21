import React, { Component } from "react";
import axios from 'axios';
import { Notify } from 'zent';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: {
        "id": "py2zW",
        "姓名": "施心平",
        "动机": "吃药",
        "性别": "男",
        "爱好": ["11", "22", "33", "44"],
        "年龄": "20",
        "手机": "18846084097",
        "专业": "44"
      }
    };
    this.inputChange = this.inputChange.bind(this);
    this.submit = this.submit.bind(this);

  }

  inputChange(index,e) {
    const that = this;
    return function(event) {
      let newUserdata = that.state.userdata;
      newUserdata[e] = event.target.value;
      that.setState({
        userdata: newUserdata
      })
    }
  }
  async submit() {
    console.log(this.state.userdata);
    const res = await axios.post('/updateUserdata',this.state.userdata);
    console.log(res);
    if(res.data === 'ok') {
      alert('修改成功');
      window.location.reload();
    }else{
      Notify.error('修改失败，请重新修改');
    }
  }

  componentDidMount() {

  }
  render() {
    const userdata = this.state.userdata;
    const keys = Object.keys(userdata);
    const item = keys.map((e,index) => {
      const value = userdata[e];
      return<div key={index}>
        <span>{e}</span>
        <input defaultValue={value} onChange={this.inputChange(index,e)} type="text"/>
        <br/>
      </div>
    })
    return (
      <div>
        {item}
        <button onClick={this.submit}>保存</button>
      </div>


    )
  }
}