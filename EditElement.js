import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
class EditElement extends Component {

  constructor(props) {
    super(props);
    this.addElement = this.addElement.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.state = {
      fields: []
    }
  }

  addElement(event) {
    // window.location.href = "/addElement";
    this.props.history.push("/addElement");
    // console.log("aaaa");
  }
  async saveForm() {
    const FormData = this.props.formData;
    const res = await axios.post('/saveForm',FormData);
    console.log(res);
    this.props.history.push('/');
  }
  componentDidMount() {
    this.setState({
      fields: this.props.formData.fields
    })
  }

  render() {
    let list;
    if (this.state.fields) {
      list = this.state.fields.map((field, index) =>
        <div key={index}>{field.type}</div>
      )
    }else {
      <div>空</div>
    }
  
    return (
      <div>
        {list}
        <div>
          <button onClick={this.addElement}>点击添加字段</button>
          <br/>
          {/* <Link to = "/addElement">点击添加字段</Link> */}
          <button onClick={this.saveForm}>保存表单</button>
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

  }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(EditElement)