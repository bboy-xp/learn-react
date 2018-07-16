import React, {Component} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

export default class Home extends Component {

  constructor(props) {
    super(props);
    
  }

  async componentDidMount() {
    const res = await axios('/test');
    console.log(res);
  }

  render() {
    return(
      <div className="">
        <Link to="/createForm">点击创建表单</Link>
      </div>
    )
  }

}