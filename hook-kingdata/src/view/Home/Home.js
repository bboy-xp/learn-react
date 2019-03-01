import React, { Component } from "react";
import axios from "axios";
import random from "../../components/random/random";
import { connect } from "react-redux";
import './Home.css';
import formImg from "../../static/img/form.png";
import addFormImg from "../../static/img/addForm.png";
import nextImg from "../../static/img/next.png";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allForm: []
    }
    this.createForm = this.createForm.bind(this);
    this.gotoFormBackstage = this.gotoFormBackstage.bind(this);
  }
  async componentWillMount() {
    document.title = "首页";

    const res = await axios.get("/getAllForm");
    console.log(res.data);
    this.setState({
      allForm: res.data
    })
  }

  createForm() {
    const id = random(false, 5);
    this.props.pushid(id);
    this.props.history.push("/createForm");
  }
  gotoFormBackstage(id) {
    //闭包
    const that = this;
    return function() {
      // console.log(id);
      that.props.history.push("/backstage?id="+id);
    }
  }

  render() {
    const formList = this.state.allForm.map((form, index) =>
      <div key={index} onClick={this.gotoFormBackstage(form.id)} className="formItem">
        <img className="formImg" src={formImg} alt="404" />
        <div className="formItemText">
          <div className="formName">{form.title}</div>
          <div className="dataQuantity">总数据量</div>
        </div>
        <img className="nextImg" src={nextImg} alt="404" />
      </div>
    )

    return (
      <div className="homeContainer">
        <div className="createForm" onClick={this.createForm}>
          <img className="formImg" src={addFormImg} alt="404" />
          <div className="createFormText">创建表单</div>
          <img className="nextImg" src={nextImg} alt="404" />
        </div>
        <div className="formList">
          {formList}
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
    pushid: (id) => dispatch({ type: "PUSH_ID", id }),
  }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Home)