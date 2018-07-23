import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Radio, Checkbox, Select } from 'zent';
import './FormStyle.css';
import axios from 'axios';

const CheckboxGroup = Checkbox.Group;

const RadioGroup = Radio.Group;
const data = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' }
];
export default class FormStyle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      radioValue: {},
      fields: [],
      checkedList: [],
      next: "",
      userData: {},
      nextUrl:''
    }
    this.checkboxChange = this.checkboxChange.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.submit = this.submit.bind(this);
    this.textChange = this.textChange.bind(this);
    this.numChange = this.numChange.bind(this);
    this.nparagraphTextChange = this.nparagraphTextChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }

  textChange(field) {
    const that = this;
    return function (event) {
      const newUserData = Object.assign(that.state.userData, { [field.name]: event.target.value });
      that.setState({
        userData: newUserData
      })
    }
  }
  nparagraphTextChange(field) {
    const that = this;
    return function (event) {
      const newUserData = Object.assign(that.state.userData, { [field.name]: event.target.value });
      that.setState({
        userData: newUserData
      })
    }
  }
  numChange(field) {
    const that = this;
    return function (event) {
      const newUserData = Object.assign(that.state.userData, { [field.name]: event.target.value });
      that.setState({
        userData: newUserData
      })
    }
  }
  phoneChange(field) {
    const that = this;
    return function (event) {
      const newUserData = Object.assign(that.state.userData, { [field.name]: event.target.value });
      that.setState({
        userData: newUserData
      })
    }
  }

  checkboxChange(index, field) {
    const that = this;
    return function (checkedList) {
      const newUserData = Object.assign(that.state.userData, { [field.name]: checkedList });
      that.setState({
        ['checkedList' + index]: checkedList,
        userData: newUserData
      })
      // console.log(field.name);
    }
    // console.log(this.state.checkedList);
  }
  radioChange(index, field) {
    // console.log(event.target.value);
    const that = this;
    return function (event) {
      const newUserData = Object.assign(that.state.userData, { [field.name]: event.target.value });
      that.setState({
        ['radioValue' + index]: event.target.value,
        userData: newUserData
      })
    }
  }
  selectChange(index, field) {
    const that = this;
    return function (event) {
      const newUserData = Object.assign(that.state.userData, { [field.name]: event.target.value });
      that.setState({
        userData: newUserData
      })
    }
  }
  async submit() {
    const openid = localStorage.getItem('openid');
    const userData = this.state.userData;
    userData.openid = openid;
    const nextUrl = this.state.nextUrl;
    const res = await axios.post('/postUserData', userData);
    console.log(res);
    if (res.data === "ok") {
      if (this.state.next) {
        window.location.href = "/formStyle?id=" + this.state.next + nextUrl;
      } else {
        window.location.href = "/";
      }
    } else {
      alert('服务器故障，请重新填写表单，谢谢');
    }
  }
  async componentDidMount() {
    //获取url中的参数
    let url = window.location.href;
    let str = this.props.location.search;
    str = str.substring(1);
    const nextUrl = str.substring(8);
    this.setState({
      nextUrl: nextUrl
    });
    let param = str.split('&');
    //参数id和code
    let id = param[0].split('=')[1];
    let code = '';
    //用切割字符串的方式拼接出redirect_uri
    const newUrl = url.split('/');
    url = 'http://hook.feit.me/' + newUrl[newUrl.length - 1];
    // console.log(url);
    //判断是否url带参数code，如果没带跳转授权页面使url带参数code
    if (param[1]) {
      code = param[1].split('=')[1];;
    } else {
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx21174deccc6b6c4b&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
    }

    //判断localStorage中是否有openid，如果没有将code发送到后端的/oauth路由上获取openid，并存入localStorage
    if (!localStorage.getItem('openid')) {
      const openid = await axios.post('/oauth', {
        code: code
      });
      // console.log(openid.data);
      localStorage.openid = openid.data;
    } else {

      console.log('localStorage中已存入openid');
    }

    // console.log(code,id);
    const getFormRes = await axios.post('/getForm', {
      id: id,
    });
    //将form的fields传入state中
    this.setState({
      fields: getFormRes.data[0].fields,
      next: getFormRes.data[0].next,
      userData: {
        id: id
      }
    });


    // 这里出现了跨域的问题
    // const openid = axios.get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx21174deccc6b6c4b&redirect_uri=http%3a%2f%2fhook.feit.me%2foauth&response_type=code&scope=snsapi_base&state=123#wechat_redirect');
    // console.log(openid);
  }

  render() {
    const fields = this.state.fields;
    const list = fields.map((field, index) => {
      // <div key={index}>
      //   <span>{field.name}</span>
      // </div>
      if (field.type === "number") {
        return <div key={index}>
          <div className="inputQuestion">{field.name}</div>
          <input onChange={this.numChange(field)} className="inputBox" />
        </div>
      }
      if (field.type === "single_line_text") {
        return <div key={index}>
          <div className="inputQuestion">{field.name}</div>
          <input onChange={this.textChange(field)} className="inputBox" />
        </div>
      }
      if (field.type === "paragraph_text") {
        return <div key={index}>
          <div className="inputQuestion">{field.name}</div>
          <textarea onChange={this.nparagraphTextChange(field)} className="textareaStyle" auto-focus="true" maxLength="400" cols="30" rows="10"></textarea>
        </div>
      }
      if (field.type === "phone") {
        return <div key={index}>
          <div className="inputQuestion">{field.name}</div>
          <input onChange={this.phoneChange(field)} className="inputBox" />
        </div>
      }
      if (field.type === "multiple_choice") {
        return <div key={index}>
          <div className="inputQuestion">{field.name}</div>
          <CheckboxGroup value={this.state['checkedList' + index]} onChange={this.checkboxChange(index, field)} >
            {field.choice.map((item, index) =>
              <div key={index}>
                <Checkbox value={item.value}>{item.value}</Checkbox>
              </div>
            )}
          </CheckboxGroup>
        </div>
      }
      if (field.type === "single_choice") {
        return <div key={index}>
          <div className="inputQuestion">{field.name}</div>
          <RadioGroup value={this.state['radioValue' + index]} onChange={this.radioChange(index, field)}>
            {field.choice.map((item, index) =>
              <div key={index}>
                <Radio value={item.value}>{item.value}</Radio>
              </div>
            )}
          </RadioGroup>
        </div>
      }
      if (field.type === "drop_down") {
        return <div key={index}>
          <div className="inputQuestion">{field.name}</div>
          <Select data={field.choice} onChange={this.selectChange(index, field)} optionText="value" optionValue="value"></Select>
        </div>
      }
    }
    )

    return (
      <div>
        <div>
          {list}
          <button onClick={this.submit} className="submitBtn">提交</button>
        </div>
      </div>
    )
  }

}