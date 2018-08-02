import React, { Component } from "react";
import axios from "axios";
import random from "../../components/random/random";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './Home.css';
import formImg from "../../static/img/form.png";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allForm: []
    }
    this.createForm = this.createForm.bind(this);
  }
  async componentDidMount() {
    const res = await axios.get("/getAllForm");
    // console.log(res);
    this.setState({
      allForm: res.data
    })
  }

  createForm() {
    const id = random(false, 5);
    this.props.pushid(id);
    this.props.history.push("/createForm");
  }

  render() {
    // console.log(this.state.allForm);
    // const allForm = this.state.allForm;
    // console.log(allForm);
    const formList = this.state.allForm.map((form, index) =>
      <div className="formLink" key={index}>
      <span>{index+1} · </span>
        <Link className="linkText" to={"/formStyle?id=" + form.id}>{form.title}</Link>
      </div>
    )
    // console.log(formList);


    return (
      <div className="container">
        <div className="title">首页</div>
        <div className="createBtn" onClick={this.createForm}>
          <span>点击创建表单</span>
        </div>
        <div className="formListContainer">
          <div className="createdFormTitle">
            <span className="createdForm">已建表单</span>
            <img className="formImg" src={formImg} alt="404" />
          </div>
          {formList}
        </div>
      </div>
    )
  }

}

//将state绑定到props的formData上
const mapStateToProps = (state = {}) => {
  return {
    formData: state
  }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pushid: (id) => dispatch({ type: "PUSH_ID", id }),
  }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Home)