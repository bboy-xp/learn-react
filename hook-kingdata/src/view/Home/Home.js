import React, {Component} from 'react';
import { Link } from "react-router-dom";

export default class Home extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return(
      <div className="">
        <Link to="/createForm">点击创建表单</Link>
      </div>
    )
  }

}