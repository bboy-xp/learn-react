import React, { Component } from 'react';
export default class ShowOption extends Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.log(this.props);
  // }

  render() {
    return (
      <div>
        {this.props.value == "single_choice" || this.props.value == "multiple_choice" || this.props.value == "drop_down" ? (<div>1</div>) : (<div>0</div>)}
        {/* <h1>{this.props.value}</h1> */}
      </div>
    )
  }

}