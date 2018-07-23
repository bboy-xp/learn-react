import React, { Component } from "react";
import axios from 'axios';
import { Notify } from 'zent';

export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: {},
      id: '',
      openid: '',
      formName:'',
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
    const userdata = this.state.userdata;
    const id = this.state.id;
    const openid = this.state.openid;
    const formName = this.state.formName;
    const res = await axios.post('/updateUserdata',{
      userdata: userdata,
      id: id,
      openid: openid,
      formName: formName
    });
    console.log(res);
    if(res.data.ok === 1) {
      alert('修改成功');
      window.location.reload();
    }else{
      Notify.error('修改失败，请重新修改');
    }
  }

  async componentDidMount() {
    const idStr = window.location.search;
    const id = idStr.split('=')[1];
    const openid = localStorage.getItem('openid');
    this.setState({
      id: id,
      openid: openid
    })
    const res = await axios.post('/getUserdataByOpenIdAndId',{
      id: id,
      openid: openid
    })
    console.log(res.data);
    this.setState({
      userdata: res.data[0].userdata,
      formName: res.data[0].formName
    });
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