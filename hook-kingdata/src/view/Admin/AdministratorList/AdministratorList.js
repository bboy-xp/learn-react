import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <div key={index}>
        <Link to='/admin/administratorUpdate'>{e.title}</Link>
      </div>
    )
    
    return (
      <div>
        {item}
      </div>


    )
  }
}