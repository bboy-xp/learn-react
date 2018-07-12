import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Radio, Checkbox, Select } from 'zent';
import('./FormStyle.css');
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
      checkedList: [],
    }
    this.onChange = this.onChange.bind(this);
    this.showOption = this.showOption.bind(this);
  }

  onChange(checkedList) {
    this.setState({ checkedList });
  }
  showOption() {
    console.log(111);
  }


  render() {
    const { checkedList } = this.state;
    return (
      <div>
        <div>
          <div className="inputQuestion">· 单行文本</div>
          <input className="inputBox" />
        </div>
        <div>
          <div className="inputQuestion">· 数字</div>
          <input className="inputBox" />
        </div>
        <div>
          <div className="inputQuestion">· 电话</div>
          <input className="inputBox" />
        </div>
        <div>
          <div className="inputQuestion">· 邮箱</div>
          <input className="inputBox" />
        </div>
        <div>
          <div className="inputQuestion">单项选择</div>
          <RadioGroup value="male">
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </RadioGroup>
        </div>
        <div>
          <div className="inputQuestion">多项选择</div>
          <CheckboxGroup value={checkedList} onChange={this.onChange}>
            <Checkbox value="Apple">苹果</Checkbox>
            <Checkbox value="Pear">梨子</Checkbox>
            <Checkbox value="Orange">橘子</Checkbox>
          </CheckboxGroup>
        </div>
        <div>
          <div className="inputQuestion">下拉框</div>
          <Select
            data={data}
            optionValue="id"
            optionText="name"
            onChange={this.showOption}
          />
          
        </div>

      </div>
    )
  }

}