import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
class CreateForm extends Component {

  constructor(props) {
    super(props);
    this.createChildForm = this.createChildForm.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getDescribe = this.getDescribe.bind(this);
    //将redux中的数据取出渲染
    this.state = {
      title: this.props.formData.title,
      describe: this.props.formData.describe
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

  createChildForm(event) {
    // window.location.href = "/addElement";
    const title = this.state.title;
    const describe = this.state.describe;
    // console.log(this.props.formData);
    //判断用户是否提交过第一张子表单
    if (!this.props.formData.title || !this.props.formData.describe) {
      this.props.pushTitle(title);
      this.props.pushDescribe(describe);
      let num = 1;
      this.props.pushNum(num);
      console.log("success push title and describe");
    }else {
      this.props.pushTitle(title);
      this.props.pushDescribe(describe);
      // console.log(this.props.formData.num);
      let num = this.props.formData.num +1;
      this.props.pushNum(num);
    }
    this.props.history.push("/editElement");
    // console.log("aaaa");
  }

  render() {
    return (
      <div>
        <span>表单名称</span>
        <input value={this.state.title || ''} onChange={this.getTitle}></input>
        <span>表单描述</span>
        <input value={this.state.describe || ''} onChange={this.getDescribe}></input>
        <div>
          <button onClick={this.createChildForm}>点击创建子表单</button>
        </div>
      </div>
    )
  }

}

//将state.fields绑定到props的timeResStrArray
const mapStateToProps = (state = {}) => {
  console.log(state);
  return {
    formData: state
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