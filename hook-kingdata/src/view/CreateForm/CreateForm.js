import React, {Component} from 'react';
import { Link } from "react-router-dom";
export default class CreateForm extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    // window.location.href = "/addElement";
    this.props.history.push("/addElement");
    // console.log("aaaa");
  }

  render() {
    return(
      <div>
        <span>描述表单</span>
        <input></input>
        <div>
          <button onClick={this.handleClick}>点击添加字段</button>
          {/* <Link to = "/addElement">点击添加字段</Link> */}

        </div>
      </div>
    )
  }

}