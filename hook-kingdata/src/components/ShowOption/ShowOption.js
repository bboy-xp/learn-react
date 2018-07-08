import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    // console.log(this.state);

    if (this.state.type == 'single_choice' || this.state.type == 'multiple_choice' || this.state.type == 'drop_down') {
      const field = {
        name: this.state.name,
        type: this.state.type,
        choice: this.state.options
      }
      // console.log(field);
      this.props.pushFields(field);
    } else {
      const field = {
        name: this.state.name,
        type: this.state.type,
      }
      console.log(field);
      this.props.pushFields(field);
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
      <div key={index}>
        <button onClick={() => this.deleteOption(index)}> - </button>
        <input onChange={this.changeOption(index)} />
      </div>
    )
    const a = <div>
      {item}
      <div>
        <span onClick={this.addOption}>新增选项</span>
      </div>
    </div>
    // console.log({a});
    if (this.state.type == "single_choice") {
      return <div>{a}
        <button onClick={this.saveElement}>保存字段</button>
      </div>

    }
    if (this.state.type == "multiple_choice") {
      return <div>{a}
        <button onClick={this.saveElement}>保存字段</button>
      </div>
    }
    if (this.state.type == "drop_down") {
      return <div>{a}
        <button onClick={this.saveElement}>保存字段</button>
      </div>
    }
    return (
      <div>
        <button onClick={this.saveElement}>保存字段</button>
      </div>
    )
  }

}

//将state.timeResStrArray绑定到props的timeResStrArray
const mapStateToProps = (state = {}) => {
  console.log(state)
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