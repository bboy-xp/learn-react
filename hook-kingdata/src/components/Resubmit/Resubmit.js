import React, { Component } from 'react';
import './Resubmit.css';

export default class Resubmit extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
  }


  render() {
    const repeated = this.props.repeated;
    // console.log(this.props);
    return (
      <div>
        {
          repeated
            ? <div className="submitBtnContainer">
              <div>或</div>
              <button onClick={this.props.resubmit} className="submitBtn">提交并重新填写表单</button>
            </div>
            :
            <div></div>
        }
        
      </div>
    )
  }

}

