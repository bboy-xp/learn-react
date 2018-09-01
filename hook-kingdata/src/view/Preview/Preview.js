import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import './Preview.css';
import { Radio, Checkbox, Select, DatePicker } from 'zent';
import editImg from "../../static/img/edit.png";
import shareImg from "../../static/img/share.png";

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

class Preview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: []
    };
    this.gotoShare = this.gotoShare.bind(this);

  }
  async componentWillMount() {
    document.title = "预览表单";
    console.log(this.props.formDescription);
    this.setState({
      fields: this.props.formDescription.fields
    })
  }
  gotoShare() {
    const id = this.props.formDescription.id;
    this.props.history.push('/share?id='+id);
  }

  render() {

    const form = this.state.fields.map((field, index) => {
      if (field.type === "single_line_text") {
        return <div className="fieldItem" key={index}>
          <div className="fieldName">{field.name}</div>
          <input className="inputBox" type="text" />
        </div>
      }
      if (field.type === "paragraph_text") {
        return <div className="fieldItem" key={index}>
          <div className="fieldName">{field.name}</div>
          <textarea className="textareaBox" rows="4" type="text" />
        </div>
      }
      if (field.type === "single_choice") {
        const choice = field.choice.map((item1, index1) => {
          return (
            <div key={index1} className="radioItem">
              <Radio value={item1.value}>{item1.value}</Radio>
            </div>
          )
        })

        return <div className="fieldItem" key={index}>
          <div className="fieldName">{field.name}</div>
          <div className="radioGroupContent">
            <RadioGroup>
              {choice}
            </RadioGroup>
          </div>
        </div>
      }
      if (field.type === "multiple_choice") {
        const choice = field.choice.map((item1, index1) => {
          return (
            <div key={index1} className="checkboxItem">
              <Checkbox value={item1.value}>{item1.value}</Checkbox>
            </div>
          )
        })

        return <div className="fieldItem" key={index}>
          <div className="fieldName">{field.name}</div>
          <div className="checkboxGroupContent">
            <CheckboxGroup>
              {choice}
            </CheckboxGroup>
          </div>
        </div>
      }
      if (field.type === "drop_down") {
        const choice = field.choice.map((item1, index1) => {
          return(
            <Option key={index1} value={item1.value}>{item1.value}</Option>
          )
        })

        return <div className="fieldItem" key={index}>
          <div className="fieldName">{field.name}</div>
          <Select>
            {choice}
          </Select>
        </div>
      }
      if (field.type === "phone") {
        return <div className="fieldItem" key={index}>
          <div className="fieldName">{field.name}</div>
          <input className="inputBox" type="number" />
        </div>
      }
      if (field.type === "number") {
        return <div className="fieldItem" key={index}>
          <div className="fieldName">{field.name}</div>
          <input className="inputBox" type="number" />
        </div>
      }
      if (field.type === "date") {
        return <div className="fieldItem" key={index}>
          <div className="fieldName">{field.name}</div>
          <DatePicker
            max="2020-01-01"
          />
        </div>
      }
    })


    return (
      <div className="previewContainer">
        <div className="previewBody">
          <div className="titleContent">
            <div className="formName">测试</div>
            <div className="formDescription">描述</div>
          </div>
          <div className="fieldsContent">
            {form}
          </div>
        </div>
        <div className="footer">
          <div className="editFormContent">
            <img className="editImg" src={editImg} alt="404" />
            <span>编辑表单</span>
          </div>
          <div className="shareFormContent" onClick={this.gotoShare}>
            <img className="shareImg" src={shareImg} alt="404" />
            <span>分享表单</span>
          </div>
        </div>
      </div>
    )
  }

}

//将state绑定到props的formDescription上
const mapStateToProps = (state = {}) => {
  return {
    formDescription: state
  }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Preview)