import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { Select } from 'zent';
class EditElement extends Component {

  constructor(props) {
    super(props);
    this.addElement = this.addElement.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.connectForm = this.connectForm.bind(this);
    this.viewForm = this.viewForm.bind(this);
    this.state = {
      fields: [],
      allForm: [],
    }
  }

  addElement(event) {
    this.props.history.push("/addElement");
  }
  viewForm() {
    const id = this.props.formData.id;
    console.log(id);
    this.props.history.push("/formStyle?id="+id);
  }
  async saveForm() {
    const FormData = this.props.formData;
    const res = await axios.post('/saveForm', FormData);
    console.log(res);
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

  render() {
    let list;
    if (this.state.fields) {
      list = this.state.fields.map((field, index) =>
        <div key={index}>{field.type}</div>
      )
    } else {
      <div>空</div>
    }

    return (
      <div>
        {list}
        <div>
          <button onClick={this.addElement}>点击添加字段</button>
          <br />
          {/* <Link to = "/addElement">点击添加字段</Link> */}
          <div>
            <span>选择关联的表单</span>
            <Select optionText="title" optionValue="id" data={this.state.allForm} onChange={this.connectForm}></Select>
          </div>
          <button onClick={this.saveForm}>保存表单</button>
          <br/>
          <button onClick={this.viewForm}>在线预览表单</button>
        </div>
      </div>
    )
  }

}

//将state绑定到props的formData上
const mapStateToProps = (state = {}) => {
  console.log(state);
  return {
    formData: state
  }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pushNext: (next) => dispatch({ type: "PUSH_NEXT", next })
  }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(EditElement)