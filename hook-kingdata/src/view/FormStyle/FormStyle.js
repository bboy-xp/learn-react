import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Radio, Checkbox, Select, Collapse } from 'zent';
import { Steps } from 'element-react';
import './FormStyle.css';
import axios from 'axios';
// import Resubmit from '../../components/Resubmit/Resubmit';


const CheckboxGroup = Checkbox.Group;

const RadioGroup = Radio.Group;

export default class FormStyle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      radioValue: {},
      fields: [],
      checkedList: [],
      next: "",
      userData: [],
      nextUrl: '',
      id: '',
      formName: '',
      repeated: false,
      title: '',
      timeStepArr: [],
      repeatedFormArr: [],
      activeKey: '0'
    }
    this.checkboxChange = this.checkboxChange.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.submit = this.submit.bind(this);
    this.textChange = this.textChange.bind(this);
    this.numChange = this.numChange.bind(this);
    this.nparagraphTextChange = this.nparagraphTextChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    // this.resubmit = this.resubmit.bind(this);
    this.addRepeatedFormArr = this.addRepeatedFormArr.bind(this);
    // this.collapseChange = this.collapseChange.bind(this);
  }

  textChange(field, index1) {
    const that = this;
    const isRepeated = this.state.repeated;
    return function (event) {
      if(isRepeated) {
        let userDataArr = that.state.userData;
        const userData = userDataArr[index1];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[index1] = newUserData;
        that.setState({
          userData: userDataArr
        })
      }else {
        let userDataArr = that.state.userData;
        const userData = userDataArr[0];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[0] = newUserData;
        that.setState({
          userData: userDataArr
        })
      }
    }
  }
  nparagraphTextChange(field, index1) {
    const that = this;
    const isRepeated = this.state.repeated;
    return function (event) {
      if(isRepeated) {
        let userDataArr = that.state.userData;
        const userData = userDataArr[index1];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[index1] = newUserData;
        that.setState({
          userData: userDataArr
        })
      }else {
        let userDataArr = that.state.userData;
        const userData = userDataArr[0];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[0] = newUserData;
        that.setState({
          userData: userDataArr
        })
      }
    }
  }
  numChange(field, index1) {
    const that = this;
    const isRepeated = this.state.repeated;
    return function (event) {
      if(isRepeated) {
        let userDataArr = that.state.userData;
        const userData = userDataArr[index1];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[index1] = newUserData;
        that.setState({
          userData: userDataArr
        })
      }else {
        let userDataArr = that.state.userData;
        const userData = userDataArr[0];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[0] = newUserData;
        that.setState({
          userData: userDataArr
        })
      }
    }
  }
  phoneChange(field, index1) {
    const that = this;
    const isRepeated = this.state.repeated;
    return function (event) {
      if(isRepeated) {
        let userDataArr = that.state.userData;
        const userData = userDataArr[index1];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[index1] = newUserData;
        that.setState({
          userData: userDataArr
        })
      }else {
        let userDataArr = that.state.userData;
        const userData = userDataArr[0];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[0] = newUserData;
        that.setState({
          userData: userDataArr
        })
      }
    }
  }

  checkboxChange(index, field, index1) {
    const that = this;
    const isRepeated = this.state.repeated;
    return function (checkedList) {
      if (isRepeated) {
        let userDataArr = that.state.userData;
        const userData = userDataArr[index1];
        const newUserData = Object.assign(userData, { [field.name]: checkedList });
        userDataArr[index1] = newUserData;
        that.setState({
          ['checkedList' + index]: checkedList,
          userData: userDataArr
        })
      } else {
        let userDataArr = that.state.userData;
        console.log(userDataArr);
        const userData = userDataArr[0];
        const newUserData = Object.assign(userData, { [field.name]: checkedList });
        userDataArr[0] = newUserData;
        that.setState({
          ['checkedList' + index]: checkedList,
          userData: userDataArr
        })
      }

    }
    // return function (checkedList) {
    //   const newUserData = Object.assign(that.state.userData, { [field.name]: checkedList });
    //   that.setState({
    //     ['checkedList' + index]: checkedList,
    //     userData: newUserData
    //   })
    //   // console.log(field.name);
    // }
    // console.log(this.state.checkedList);
  }
  radioChange(index, field, index1) {
    // console.log(event.target.value);
    const that = this;
    const isRepeated = this.state.repeated;
    return function (event) {
      if (isRepeated) {
        let userDataArr = that.state.userData;
        const userData = userDataArr[index1];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[index1] = newUserData;
        that.setState({
          ['radioValue' + index]: event.target.value,
          userData: userDataArr
        })
      } else {
        let userDataArr = that.state.userData;
        console.log(userDataArr);
        const userData = userDataArr[0];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[0] = newUserData;
        that.setState({
          ['radioValue' + index]: event.target.value,
          userData: userDataArr
        })
      }

    }
    // return function (event) {
    //   const newUserData = Object.assign(that.state.userData, { [field.name]: event.target.value });
    //   that.setState({
    //     ['radioValue' + index]: event.target.value,
    //     userData: newUserData
    //   })
    // }
  }
  selectChange(index, field, index1) {
    const that = this;
    const isRepeated = this.state.repeated;
    return function (event) {
      if (isRepeated) {
        let userDataArr = that.state.userData;
        const userData = userDataArr[index1];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[index1] = newUserData;
        that.setState({
          userData: userDataArr
        })
      } else {
        let userDataArr = that.state.userData;
        console.log(userDataArr);
        const userData = userDataArr[0];
        const newUserData = Object.assign(userData, { [field.name]: event.target.value });
        userDataArr[0] = newUserData;
        that.setState({
          userData: userDataArr
        })
      }

    }
  }
  async submit() {
    const openid = localStorage.getItem('openid');
    const id = this.state.id;
    const formName = this.state.formName;
    const userData = this.state.userData;
    const nextUrl = this.state.nextUrl;
    const isRepeated = this.state.repeated;
    console.log(userData);
    const res = await axios.post('/postUserData', {
      userData: userData,
      openid: openid,
      id: id,
      formName: formName,
      isRepeated: isRepeated
    });
    console.log(res);
    if (res.data === "ok") {
      if (this.state.next) {
        window.location.href = "/formStyle?id=" + this.state.next + nextUrl;
      } else {
        window.location.href = "/success";
      }
    } else {
      alert('服务器故障，请重新填写表单，谢谢');
    }
  }
  // async resubmit() {
  //   const openid = localStorage.getItem('openid');
  //   const id = this.state.id;
  //   const formName = this.state.formName;
  //   const userData = this.state.userData;
  //   const res = await axios.post('/postUserData', {
  //     userData: userData,
  //     openid: openid,
  //     id: id,
  //     formName: formName
  //   });
  //   console.log(res);
  //   if (res.data === "ok") {
  //     window.location.reload();
  //   } else {
  //     alert('服务器故障，请重新填写表单，谢谢');
  //   }
  // }
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
    this.setState({
      id: id
    });
    let code = '';
    //用切割字符串的方式拼接出redirect_uri
    const newUrl = url.split('/');
    url = 'http://hook.feit.me/' + newUrl[newUrl.length - 1];
    // console.log(url);
    //判断是否url带参数code，如果没带跳转授权页面使url带参数code

    //临时注释（frp不好使本地测试）
    // if (param[1]) {
    //   code = param[1].split('=')[1];;
    // } else {
    //   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx21174deccc6b6c4b&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
    // }

    // //判断localStorage中是否有openid，如果没有将code发送到后端的/oauth路由上获取openid，并存入localStorage
    // if (!localStorage.getItem('openid')) {
    //   const openid = await axios.post('/oauth', {
    //     code: code
    //   });
    //   // console.log(openid.data);
    //   localStorage.openid = openid.data;
    // } else {

    //   console.log('localStorage中已存入openid');
    // }

    // console.log(code,id);
    const getFormRes = await axios.post('/getForm', {
      id: id,
    });
    console.log(getFormRes.data[0]);

    let repeatedFormArr = [];
    repeatedFormArr.push(getFormRes.data[0].fields)

    //通过id获取到步骤条
    const timestepsRes = await axios.post('/getTimeSteps', {
      id: id
    });
    console.log(timestepsRes.data);

    //将form的fields传入state中
    this.setState({
      fields: getFormRes.data[0].fields,
      title: getFormRes.data[0].title,
      next: getFormRes.data[0].next,
      //临时注释  

      userData: [{id: id}],
      formName: getFormRes.data[0].title,
      //防止repeated不存在出现bug
      repeated: !!getFormRes.data[0].repeated,
      timeStepArr: timestepsRes.data,
      //将重复表单的第一项填入数组
      repeatedFormArr: repeatedFormArr
    });


    // 这里出现了跨域的问题
    // const openid = axios.get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx21174deccc6b6c4b&redirect_uri=http%3a%2f%2fhook.feit.me%2foauth&response_type=code&scope=snsapi_base&state=123#wechat_redirect');
    // console.log(openid);
  }
  addRepeatedFormArr() {
    let userDataArr = this.state.userData;
    const id = this.state.id;
    userDataArr.push({id: id})
    const field = this.state.fields;
    const repeatedFormArr = this.state.repeatedFormArr;
    repeatedFormArr.push(field);
    console.log(repeatedFormArr);
    this.setState({
      repeatedFormArr: repeatedFormArr,
      userData: userDataArr
    })
  }

  collapseChange(activeKey) {
    this.setState({
      activeKey: activeKey
    });
  }


  render() {
    const fields = this.state.fields;
    //表单主体 list
    const item = fields.map((field, index) => {
      // <div key={index}>
      //   <span>{field.name}</span>
      // </div>
      if (field.type === "number") {
        return <div className="elementContainer" key={index}>
          <div className="inputQuestion">{index + 1} · {field.name}</div>
          <input onChange={this.numChange(field)} className="inputBox" />
        </div>
      }
      if (field.type === "single_line_text") {
        return <div className="elementContainer" key={index}>
          <div className="inputQuestion">{index + 1} · {field.name}</div>
          <input onChange={this.textChange(field)} className="inputBox" />
        </div>
      }
      if (field.type === "paragraph_text") {
        return <div className="elementContainer" key={index}>
          <div className="inputQuestion">{index + 1} · {field.name}</div>
          <textarea onChange={this.nparagraphTextChange(field)} className="textareaStyle" auto-focus="true" maxLength="400" cols="30" rows="10"></textarea>
        </div>
      }
      if (field.type === "phone") {
        return <div className="elementContainer" key={index}>
          <div className="inputQuestion">{index + 1} · {field.name}</div>
          <input onChange={this.phoneChange(field)} className="inputBox" />
        </div>
      }
      if (field.type === "multiple_choice") {
        return <div className="elementContainer" key={index}>
          <div className="inputQuestion">{index + 1} · {field.name}</div>
          <CheckboxGroup value={this.state['checkedList' + index]} onChange={this.checkboxChange(index, field)} >
            {field.choice.map((item, index) =>
              <div className="choiceStyle" key={index}>
                <Checkbox value={item.value}>{item.value}</Checkbox>
              </div>
            )}
          </CheckboxGroup>
        </div>
      }
      if (field.type === "single_choice") {
        return <div className="elementContainer" key={index}>
          <div className="inputQuestion">{index + 1} · {field.name}</div>
          <RadioGroup value={this.state['radioValue' + index]} onChange={this.radioChange(index, field)}>
            {field.choice.map((item, index) =>
              <div className="choiceStyle" key={index}>
                <Radio value={item.value}>{item.value}</Radio>
              </div>
            )}
          </RadioGroup>
        </div>
      }
      if (field.type === "drop_down") {
        return <div className="elementContainer" key={index}>
          <div className="inputQuestion">{index + 1} · {field.name}</div>
          <Select data={field.choice} onChange={this.selectChange(index, field)} optionText="value" optionValue="value"></Select>
        </div>
      }
    }
    )

    const repeated = this.state.repeated;

    const steps = this.state.timeStepArr.map((step, index) =>
      <Steps.Step key={index} title={step.title} icon="document"></Steps.Step>
    )

    const repeatedItem = this.state.repeatedFormArr.map((form, index1) =>
      <Collapse.Panel key={index1} title={"表单" + (index1 + 1)}>
        {
          fields.map((field, index) => {
            if (field.type === "number") {
              return <div className="elementContainer" key={index}>
                <div className="inputQuestion">{index + 1} · {field.name}</div>
                <input onChange={this.numChange(field, index1)} className="inputBox" />
              </div>
            }
            if (field.type === "single_line_text") {
              return <div className="elementContainer" key={index}>
                <div className="inputQuestion">{index + 1} · {field.name}</div>
                <input onChange={this.textChange(field, index1)} className="inputBox" />
              </div>
            }
            if (field.type === "paragraph_text") {
              return <div className="elementContainer" key={index}>
                <div className="inputQuestion">{index + 1} · {field.name}</div>
                <textarea onChange={this.nparagraphTextChange(field, index1)} className="textareaStyle" auto-focus="true" maxLength="400" cols="30" rows="10"></textarea>
              </div>
            }
            if (field.type === "phone") {
              return <div className="elementContainer" key={index}>
                <div className="inputQuestion">{index + 1} · {field.name}</div>
                <input onChange={this.phoneChange(field, index1)} className="inputBox" />
              </div>
            }
            if (field.type === "multiple_choice") {
              return <div className="elementContainer" key={index}>
                <div className="inputQuestion">{index + 1} · {field.name}</div>
                <CheckboxGroup value={this.state['checkedList' + index]} onChange={this.checkboxChange(index, field, index1)} >
                  {field.choice.map((item, index) =>
                    <div className="choiceStyle" key={index}>
                      <Checkbox value={item.value}>{item.value}</Checkbox>
                    </div>
                  )}
                </CheckboxGroup>
              </div>
            }
            if (field.type === "single_choice") {
              return <div className="elementContainer" key={index}>
                <div className="inputQuestion">{index + 1} · {field.name}</div>
                <RadioGroup value={this.state['radioValue' + index]} onChange={this.radioChange(index, field, index1)}>
                  {field.choice.map((item, index) =>
                    <div className="choiceStyle" key={index}>
                      <Radio value={item.value}>{item.value}</Radio>
                    </div>
                  )}
                </RadioGroup>
              </div>
            }
            if (field.type === "drop_down") {
              return <div className="elementContainer" key={index}>
                <div className="inputQuestion">{index + 1} · {field.name}</div>
                <Select data={field.choice} onChange={this.selectChange(index, field, index1)} optionText="value" optionValue="value"></Select>
              </div>
            }
          }
          )
        }
      </Collapse.Panel>
    )


    return (
      <div className="container">
        <div className="title">{this.state.title}</div>
        <div className="listContainer">
          {/* 在这里判断是否为重复表单，渲染折叠面板 */}
          {
            !!repeated
              ? <div>
                <Collapse activeKey={this.state.activeKey} onChange={this.collapseChange.bind(this)} accordion>
                  {repeatedItem}
                </Collapse>
              </div>
              :
              <div>{item}</div>

          }
          {
            !!repeated
              ? <div>
                <button onClick={this.addRepeatedFormArr} className="submitBtn">添加一项</button>
              </div>
              :
              null
          }


          <Steps space={100} active={1}>
            {steps}
          </Steps>
        </div>
        <button onClick={this.submit} className="submitBtn">提交</button>
        {/* <Resubmit resubmit={this.resubmit} repeated={repeated} /> */}
      </div>
    )
  }

}