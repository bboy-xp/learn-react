import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: []
    };
  }

  async componentDidMount() {
    const openid = localStorage.getItem('openid');
    const res = await axios.post('/getUserdataByOpenId',{
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
      <div key={index}>
        <Link to={'/admin/update?id=' + e.id}>{e.formName}</Link>
      </div>
    )
    return (
      <div>
        {item}
      </div>


    )
  }
}