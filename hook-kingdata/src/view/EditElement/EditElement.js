import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { Notify, Select, Checkbox } from 'zent';
// 引入剪切板功能复制表单的url
import copy from 'copy-to-clipboard';
import "./EditElement.css";

class EditElement extends Component {

  constructor(props) {
    super(props);
    this.addElement = this.addElement.bind(this);
    // this.saveForm = this.saveForm.bind(this);
    this.connectForm = this.connectForm.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.repeatedChange = this.repeatedChange.bind(this);
    this.copyUrl = this.copyUrl.bind(this);
    this.state = {
      fields: [],
      allForm: [],
      isRepeated: false,
      isSaved: false,
    }
  }

  addElement(event) {
    this.props.history.push("/addElement");
  }
  // viewForm() {
  //   const id = this.props.formDescription.id;
  //   console.log(id);
  //   this.props.history.push("/formStyle?id="+id);
  // }
  async saveForm() {
    const FormDescription = this.props.formDescription;
    const res = await axios.post('/saveForm', FormDescription);
    console.log(res);
    if(res.data == 'ok') {
      this.setState({
        isSaved: true
      });
      Notify.success('保存成功');
    }else {
      Notify.error('保存失败');
    }
    // const id = this.props.formDescription.id;
    // console.log(id);
    // this.props.history.push("/formStyle?id=" + id);
    //临时注释7.18
    // window.location.href = "/";
  }
  async componentDidMount() {
    const res = await axios.get("/getAllForm");
    this.setState({
      allForm: res.data,
      fields: this.props.formDescription.fields
    })
  }
  connectForm(event) {
    this.props.pushNext(event.target.value);
  }

  repeatedChange() {
    const isRepeated = this.state.isRepeated;
    this.setState({
      isRepeated: !isRepeated
    });
    this.props.pushRepeated(!isRepeated);
  }

  copyUrl() {
    const id = this.props.formDescription.id;

    // 临时方法
    const formUrl = 'http://localhost:3000/formStyle?id=' + id;

    copy(formUrl);
    Notify.success('成功复制到剪切板');
  }

  render() {
    let list;
    if (this.state.fields) {
      list = this.state.fields.map((field, index) =>
        <div key={index}>{field.type}</div>
      )
    } else {
      list = <div>没有字段</div>
    }

    return (
      <div className="container">
        <div className="title">编辑表单</div>
        <div className="elementList">
          {list}
        </div>
        <div>
          <div className="btnStyle" onClick={this.addElement}>点击添加字段</div>
          <br />
          {/* <Link to = "/addElement">点击添加字段</Link> */}
          <div className="connectFormContainer">
            <span> ⚪ 选择关联的表单</span>
            <Select optionText="title" optionValue="id" data={this.state.allForm} onChange={this.connectForm}></Select>
          </div>
          <div>
            <Checkbox checked={this.state.isRepeated} onChange={this.repeatedChange}>设置成可重复填写的表单</Checkbox>
          </div>
          <div className="btnStyle" onClick={this.saveForm}>保存表单</div>
          {
            this.state.isSaved ? 
            <div className="btnStyle" onClick={this.copyUrl}>复制表单链接</div> :
            null
          }
        </div>
      </div>
    )
  }

}

//将state绑定到props的formDescription上
const mapStateToProps = (state = {}) => {
  // console.log(state);
  return {
    formDescription: state
  }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pushNext: (next) => dispatch({ type: "PUSH_NEXT", next }),
    pushRepeated: (isRepeated) => dispatch({ type: "PUSH_ISREPEATED", isRepeated })
  }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(EditElement)