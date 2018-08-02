import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { Select, Checkbox } from 'zent';
import "./EditElement.css";

class EditElement extends Component {

  constructor(props) {
    super(props);
    this.addElement = this.addElement.bind(this);
    // this.saveForm = this.saveForm.bind(this);
    this.connectForm = this.connectForm.bind(this);
    this.saveAndViewForm = this.saveAndViewForm.bind(this);
    this.repeatedChange = this.repeatedChange.bind(this);
    this.state = {
      fields: [],
      allForm: [],
      isRepeated: false,
    }
  }

  addElement(event) {
    this.props.history.push("/addElement");
  }
  // viewForm() {
  //   const id = this.props.formData.id;
  //   console.log(id);
  //   this.props.history.push("/formStyle?id="+id);
  // }
  async saveAndViewForm() {
    const FormData = this.props.formData;
    const res = await axios.post('/saveForm', FormData);
    // console.log(res);

    const id = this.props.formData.id;
    // console.log(id);
    this.props.history.push("/formStyle?id=" + id);
    //临时注释7.18
    // window.location.href = "/";
  }
  async componentDidMount() {
    const res = await axios.get("/getAllForm");
    this.setState({
      allForm: res.data,
      fields: this.props.formData.fields
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
          <div className="btnStyle" onClick={this.saveAndViewForm}>保存并在线预览表单</div>
        </div>
      </div>
    )
  }

}

//将state绑定到props的formData上
const mapStateToProps = (state = {}) => {
  // console.log(state);
  return {
    formData: state
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