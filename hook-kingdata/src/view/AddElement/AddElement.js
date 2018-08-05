import React, { Component } from 'react';
import { Select } from 'zent';
import ShowOption from '../../components/ShowOption/ShowOption';
import "./AddElement.css"

const data = [
  { text: "单行文本", value: "single_line_text", hidden: false },
  { text: "多行文本", value: "paragraph_text", hidden: false },
  { text: "单项选择", value: "single_choice", hidden: false },
  { text: "多项选择", value: "multiple_choice", hidden: false },
  { text: "数字", value: "number", hidden: false },
  { text: "手机", value: "phone", hidden: false },
  { text: "日期", value: "date", hidden: false },
  { text: "下拉框", value: "drop_down", hidden: false },
  { text: "二级下拉框", value: "double_drop_down", hidden: false },
  { text: "地理位置", value: "position", hidden: false },
  { text: "评分", value: "score", hidden: false },
  { text: "上传文件", value: "upload", hidden: false },
];

// function ShowOption(props) {
//   {props.value == "single_choice" || props.value == "multiple_choice" || props.value == "drop_down" ? (<div>1</div>) : (<div>0</div>)}
// }

export default class AddElement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      show: false,
      change: false,
    };
    this.addName = this.addName.bind(this);
    this.addOption = this.addOption.bind(this);
  }

  addName(event) {
    this.setState({
      name: event.target.value
    })
    // console.log(this.state.name);
  }
  addOption(data) {
    // console.log(data.target.value);
    this.setState({
      type: data.target.value,
      change: true
    });
  }

  render() {
    const changeProps = this.state.change ? true : null;
    return (

      <div className="container">
        <div className="title">添加字段</div>
        <div className="boxContainer">
          <div className="inputBox2">
            <span className="inputText">字段名称</span>
            <input type="text" onChange={this.addName} />
          </div>
          <div className="inputBox2">
            <span className="inputText">字段类型</span>
            <Select data={data} onChange={this.addOption} />
          </div>
        </div>
        <div className="showOptionContainer">
          <ShowOption history={this.props.history} name={this.state.name} type={this.state.type} changeProps={changeProps} />
        </div>

      </div>
    )
  }

}

