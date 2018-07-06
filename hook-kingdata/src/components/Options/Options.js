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
  }

  deleteOption(index) {
    console.log(index);
  }

  // componentDidMount() {
  //   console.log(this.props);
  // }

  render() {
    const item = this.state.options.map((option, index1) =>
      <div key={index1}>
        <button onClick={()=>this.deleteOption(index1)}> - </button>
        <input />
      </div>
    )
    console.log(item);
    return (
        <div>
          {item}
        </div>
    )
  }

}