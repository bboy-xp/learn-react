import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./List.css";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: []
    };
  }

  async componentDidMount() {
    const openid = localStorage.getItem('openid');
    const res = await axios.post('/getUserdataByOpenId', {
      openid: openid
    });
    console.log(res.data);
    this.setState({
      formList: res.data
    })
  }
  render() {
    const list = this.state.formList;
    const item = list.map((e, index) =>
      <div className="linkBox" key={index}>
        <Link className="linkText" to={'/admin/update?id=' + e.id}>{index + 1} · {e.formName}</Link>
      </div>
    )
    return (
      <div className="newContainer">
        <div className="title">已填写的表单</div>
        <div className="itemContainer">
          {item}
        </div>
      </div>


    )
  }
}