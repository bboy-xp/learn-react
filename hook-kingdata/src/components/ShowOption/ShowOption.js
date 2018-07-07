import React, { Component } from 'react';
import Options from '../Options/Options';
export default class ShowOption extends Component {

  constructor(props) {
    super(props);
    this.state = {
      changeProps: null
    }
  }

  componentDidMount() {
    // console.log(this.props.changeProps);
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      changeProps: nextProps.changeProps
    })
  }

  render() {
    // console.log(this.props.changeProps);
    
    return (
      <div>
        {this.props.value == "single_choice" || this.props.value == "multiple_choice" || this.props.value == "drop_down" ? (<Options changeProps={this.state.changeProps}/>) : (null)}
        {/* <h1>{this.props.value}</h1> */}
        {/* <div>{this.props.changeProps}</div> */}
      </div>
    )
  }

}