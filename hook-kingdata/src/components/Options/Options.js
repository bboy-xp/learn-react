import React, { Component } from 'react';
export default class Options extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [
        { name: "option", value: '' },
        { name: "option", value: '' },
        { name: "option", value: '' },
      ]
    }
    this.deleteOption = this.deleteOption.bind(this);
    this.addOption = this.addOption.bind(this);

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

  // componentDidMount() {
  //   console.log(this.props);
  // }

  render() {
    const item = this.state.options.map((option, index1) =>
      <div key={index1}>
        <button onClick={() => this.deleteOption(index1)}> - </button>
        <input />
      </div>
    )
    // console.log(this.props.changeProps);
    return (
      <div>
        {item}
        <div>
          <span onClick={this.addOption}>新增选项</span>
        </div>
      </div>
    )
  }

}