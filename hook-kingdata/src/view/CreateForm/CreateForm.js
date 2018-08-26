import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import "./CreateForm.css";
import saveImg from "../../static/img/save.png";

class CreateForm extends Component {

  constructor(props) {
    super(props);
    this.createChildForm = this.createChildForm.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getDescribe = this.getDescribe.bind(this);
    // this.titleInputFocus = this.titleInputFocus.bind(this);
    //将redux中的数据取出渲染
    this.state = {
      title: this.props.formDescription.title,
      describe: this.props.formDescription.describe
    }

  }
  componentWillMount() {
    document.title = "创建表单";
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

  createChildForm(event) {
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
      <div className="createFormContainer">
        <div className="inputContainer">
          <input className="titleInput" value={this.state.title || ''} placeholder="未命名表单" onChange={this.getTitle}></input>
        </div>
        <div className="inputContainer">
          <textarea className="describeTextarea" value={this.state.describe || ''} rows="6" placeholder="表单描述" onChange={this.getDescribe}></textarea>
        </div>
        <div className="blank"></div>
        <div className="createBtnContent">
          <img className="saveImg" src={saveImg} alt="404" />
          <div className="createBtn2" onClick={this.createChildForm}>保存</div>
        </div>
      </div>
    )
  }

}

//将state.fields绑定到props的formDescription
const mapStateToProps = (state = {}) => {
  console.log(state);
  return {
    formDescription: state
  }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pushTitle: (title) => dispatch({ type: "PUSH_TITLE", title }),
    pushDescribe: (describe) => dispatch({ type: "PUSH_DESCRIBE", describe }),
    pushNum: (num) => dispatch({ type: "PUSH_NUM", num }),
  }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(CreateForm)