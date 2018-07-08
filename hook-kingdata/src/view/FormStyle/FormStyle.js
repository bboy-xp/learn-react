import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Radio } from 'zent';
import('./FormStyle.css');

const RadioGroup = Radio.Group;
export default class FormStyle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <RadioGroup value="male">
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </RadioGroup>
        </div>
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

      </div>
    )
  }

}