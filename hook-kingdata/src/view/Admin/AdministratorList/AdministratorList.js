import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./AdministratorList.css";

export default class AdministratorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: []
    };
  }

  async componentDidMount() {
    const res = await axios.get('/getAllForm');
    console.log(res.data);
    this.setState({
      formList: res.data
    })
  }
  render() {
    const list = this.state.formList;
    const item = list.map((e, index) =>
      <div className="linkBox" key={index}>
        <Link className="linkText" to={'/admin/administratorUpdate?id='+e.id}>{index} · {e.title}</Link>
      </div>
    )
    
    return (
      <div className="newContainer">
        <div className="title">已创建的表单</div>
        <div className="itemContainer">
          {item}
        </div>
      </div>


    )
  }
}