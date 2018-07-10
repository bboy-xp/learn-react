import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
class CreateForm extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getDescribe = this.getDescribe.bind(this);
    this.state = {
      title: '',
      describe: ''
    }

  }
  getTitle(event) {
    this.setState({
      title: event.target.value
    });

  }
  getDescribe(event) {
    this.setState({
      describe: event.target.value
    });

  }

  handleClick(event) {
    // window.location.href = "/addElement";
    const title = this.state.title;
    const describe = this.state.describe;
    this.props.pushTitle(title);
    this.props.pushDescribe(describe);
    this.props.history.push("/editElement");
    // console.log("aaaa");
  }

  render() {
    return (
      <div>
        <span>表单名称</span>
        <input onChange={this.getTitle}></input>
        <span>表单描述</span>
        <input onChange={this.getDescribe}></input>
        <div>
          <button onClick={this.handleClick}>点击编辑字段</button>
        </div>
      </div>
    )
  }

}

//将state.fields绑定到props的timeResStrArray
const mapStateToProps = (state = {}) => {
  console.log(state);
  return {
    fields: state.fields
  }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pushTitle: (title) => dispatch({ type: "PUSH_TITLE", title }),
    pushDescribe: (describe) => dispatch({ type: "PUSH_DESCRIBE", describe })
  }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(CreateForm)