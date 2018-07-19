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
      userData:{},
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
    return function(event) {
      const newUserData = Object.assign(that.state.userData, {[field.name]: event.target.value});
      that.setState({
        userData: newUserData
      })
    }
  }
  nparagraphTextChange(field) {
    const that = this;
    return function(event) {
      const newUserData = Object.assign(that.state.userData, {[field.name]: event.target.value});
      that.setState({
        userData: newUserData
      })
    }
  }
  numChange(field) {
    const that = this;
    return function(event) {
      const newUserData = Object.assign(that.state.userData, {[field.name]: event.target.value});
      that.setState({
        userData: newUserData
      })
    }
  }
  phoneChange(field) {
    const that = this;
    return function(event) {
      const newUserData = Object.assign(that.state.userData, {[field.name]: event.target.value});
      that.setState({
        userData: newUserData
      })
    }
  }

  checkboxChange(index, field) {
    const that = this;
    return function(checkedList){
      const newUserData = Object.assign(that.state.userData, {[field.name]: checkedList});
      that.setState({
        ['checkedList'+index]: checkedList,
        userData: newUserData
      })
      // console.log(field.name);
    }
    // console.log(this.state.checkedList);
  }
  radioChange(index, field) {
    // console.log(event.target.value);
    const that = this;
    return function(event){
      const newUserData = Object.assign(that.state.userData, {[field.name]: event.target.value});
      that.setState({
        ['radioValue'+index]: event.target.value,
        userData: newUserData
      })
    }
  }
  selectChange(index, field) {
    const that = this;
    return function(event) {
      const newUserData = Object.assign(that.state.userData, {[field.name]: event.target.value});
      that.setState({
        userData: newUserData
      })
    }
  }
  async submit() {
    const res = await axios.post('/postUserData',this.state.userData);
    console.log(res);
    // if (this.state.next) {
    //   // console.log(this.state.next);
    //   // this.props.history.push("/formStyle?id="+this.state.next);
    //   window.location.href = "/formStyle?id=" + this.state.next;
    // } else {
    //   window.location.href = "/";
    // }
    // console.log(this.state.userData);
  }
  async componentDidMount() {
    //获取url中的参数
    let id = this.props.location.search;
    id = id.split('=')[1];
    const res = await axios.post('/getForm', {
      id: id
    });
    //将form的fields传入state中
    this.setState({
      fields: res.data[0].fields,
      next: res.data[0].next,
      userData: {
        id: id
      }
    })
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
          <CheckboxGroup value={this.state['checkedList'+index]} onChange={this.checkboxChange(index,field)} >
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
          <RadioGroup value={this.state['radioValue'+index]} onChange={this.radioChange(index,field)}>
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
          <Select data={field.choice} onChange={this.selectChange(index,field)} optionText="value" optionValue="value"></Select>
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