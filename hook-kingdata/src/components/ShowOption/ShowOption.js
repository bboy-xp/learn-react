import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ShowOption.css";
import deleteChoiceImg from "../../static/img/deleteChoice.png";
import addChoiceImg from "../../static/img/addChoice.png";
import deleteElementImg from "../../static/img/deleteElement.png";
import saveElementImg from "../../static/img/saveElement.png";

class ShowOption extends Component {

  constructor(props) {
    super(props);
    this.state = {
      changeProps: null,
      type: '',
      name: '',
      options: [
        { name: "option", value: '' },
        { name: "option", value: '' },
        { name: "option", value: '' },
      ]
    }
    this.deleteOption = this.deleteOption.bind(this);
    this.addOption = this.addOption.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.saveElement = this.saveElement.bind(this);
  }


  deleteOption(index) {
    let newOptions = this.state.options;
    newOptions.splice(index, 1);
    this.setState({
      options: newOptions
    })
  }

  addOption() {
    let newOptions = this.state.options;
    newOptions.push({ name: "option", value: '' });
    this.setState({
      options: newOptions
    })
  }
  //这是闭包
  changeOption(index) {
    // console.log(1)
    const that = this;
    return function (event) {
      // console.log(2)
      let newOptionsElement = { name: "option", value: event.target.value };
      let newOptions = that.state.options;
      newOptions.splice(index, 1, newOptionsElement);
      // console.log(that.state.options);
    }
  }

  saveElement() {

    if (this.state.type == 'single_choice' || this.state.type == 'multiple_choice' || this.state.type == 'drop_down') {
      const field = {
        name: this.state.name,
        type: this.state.type,
        choice: this.state.options
      }
      // console.log(field);
      this.props.pushFields(field);
      this.props.history.push("/editElement");
    } else {
      const field = {
        name: this.state.name,
        type: this.state.type,
      }
      // console.log(field);
      this.props.pushFields(field);
      this.props.history.push("/editElement");
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(1111);
    this.setState({
      options: [
        { name: "option", value: '' },
        { name: "option", value: '' },
        { name: "option", value: '' },
      ]
    })
  }

  render() {
    // console.log(this.props.changeProps);
    this.state.name = this.props.name;
    this.state.type = this.props.type;
    // console.log(this.props.type);
    const item = this.state.options.map((option, index) =>
      <div className="choiceContainer" key={index}>
        {/* <div className="deleteBtn" onClick={() => this.deleteOption(index)}> - </div> */}
        <img className="deleteImg" onClick={() => this.deleteOption(index)} src={deleteChoiceImg} alt="404" />
        <input placeholder={"选项" + (index + 1)} className="choiceInput" onChange={this.changeOption(index)} />
      </div>
    )
    const a = <div className="choiceBox">
      <div className="choiceBoxTitle">
        <span>字段标题</span>
      </div>
      <div className="choiceFatherContainer">
        {item}
      </div>
      <div className="addBtnContent" onClick={this.addOption}>
        <img className="addImg" src={addChoiceImg} alt="404" />
        <span>新增选项</span>
      </div>
    </div>
    if (this.state.type == "single_choice") {
      return <div className="choiceBoxContent">
        {a}
        <div className="blank"></div>
        <div className="footerBtnContent">
          <div className="deleteElement">
            <img className="footerBtn" src={deleteElementImg} alt="404" />
            <span>删除字段</span>
          </div>
          <div className="saveElement" onClick={this.saveElement}>
            <img className="footerBtn" src={saveElementImg} alt="404" />
            <span>保存字段</span>
          </div>
        </div>
      </div>

    }
    if (this.state.type == "multiple_choice") {
      return <div className="choiceBoxContent">
        {a}
        <div className="blank"></div>
        <div className="footerBtnContent">
          <div className="deleteElement">
            <img className="footerBtn" src={deleteElementImg} alt="404" />
            <span>删除字段</span>
          </div>
          <div className="saveElement" onClick={this.saveElement}>
            <img className="footerBtn" src={saveElementImg} alt="404" />
            <span>保存字段</span>
          </div>
        </div>
      </div>
    }
    if (this.state.type == "drop_down") {
      return <div className="choiceBoxContent">
        {a}
        <div className="blank"></div>
        <div className="footerBtnContent">
          <div className="deleteElement">
            <img className="footerBtn" src={deleteElementImg} alt="404" />
            <span>删除字段</span>
          </div>
          <div className="saveElement" onClick={this.saveElement}>
            <img className="footerBtn" src={saveElementImg} alt="404" />
            <span>保存字段</span>
          </div>
        </div>
      </div>
    }

    return (
      <div className="textFooterBtnContent">
        <div className="blank"></div>
        <div className="footerBtnContent">
          <div className="deleteElement">
            <img className="footerBtn" src={deleteElementImg} alt="404" />
            <span>删除字段</span>
          </div>
          <div className="saveElement" onClick={this.saveElement}>
            <img className="footerBtn" src={saveElementImg} alt="404" />
            <span>保存字段</span>
          </div>
        </div>
      </div>
    )
  }

}

//将state.fields绑定到props的timeResStrArray
const mapStateToProps = (state = {}) => {
  // console.log(state);
  return {
    fields: state.fields
  }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pushFields: (field) => dispatch({ type: "PUSH_FIELDS", field })
  }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(ShowOption)