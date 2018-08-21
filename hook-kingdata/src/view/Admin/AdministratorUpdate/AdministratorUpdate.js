import React, { Component } from "react";
import axios from 'axios';
import { Table } from 'element-react';


export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      FormDescription: {},
      userdata: [],
      newUserdata: [],
      newFormDescription: [],
    };
  }
  async componentDidMount() {
    //从url中获取id
    const idStr = this.props.location.search;
    const id = idStr.split('=')[1];
    this.setState({
      id: id
    });
    const getFormRes = await axios.post('/getForm', {
      id: id
    });
    // console.log(getFormRes.data);
    this.setState({
      formDescription: getFormRes.data
    })
    // console.log(getFormRes.data);
    const getUserdataRes = await axios.post('/getUserdata', {
      id: id
    });
    console.log(getUserdataRes.data);
    this.setState({
      userdata: getUserdataRes.data
    })
    //处理从后端请求回来的数据，并渲染到table组件上
    let newFormDescription = [];
    let newUserdata = [];

    const formDescriptionKey = Object.keys(this.state.formDescription);
    if (formDescriptionKey.length !== 0 && this.state.userdata.length !== 0) {
      const formDescription = this.state.formDescription[0].fields;
      formDescription.map((field, index) => {
        newFormDescription.push({
          label: field.name,
          prop: field.name,
        })
      });
      const userdata = this.state.userdata;
      console.log(userdata);
      userdata.map((e, index) => {
        e.userdata.map((data,index1) => {
          newUserdata.push(data);
        })
      });
      this.setState({
        newFormDescription: newFormDescription,
        newUserdata: newUserdata
      })
    }
  }
  render() {

    return (
      <div>
        <Table
          columns={this.state.newFormDescription}
          data={this.state.newUserdata}
        />
      </div>
    )
  }
}