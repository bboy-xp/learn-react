import React, { Component } from "react";
import axios from 'axios';
import { Table } from 'element-react';


export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      formdata: {},
      userdata: [],
      newUserdata: [],
      newFormdata: [],
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
    this.setState({
      formdata: getFormRes.data
    })
    // console.log(getFormRes.data);
    const getUserdataRes = await axios.post('/getUserdata', {
      id: id
    });
    this.setState({
      userdata: getUserdataRes.data
    })
    //处理从后端请求回来的数据，并渲染到table组件上
    let newFormdata = [];
    let newUserdata = [];

    const formdataKey = Object.keys(this.state.formdata);
    if (formdataKey.length !== 0 && this.state.userdata.length !== 0) {
      console.log('走到这里了');
      const formdata = this.state.formdata[0].fields;
      console.log(this.state.formdata);
      formdata.map((field, index) => {
        newFormdata.push({
          label: field.name,
          prop: field.name,
        })
      });
      const userdata = this.state.userdata;
      userdata.map((e, index) => {
        newUserdata.push(e.userdata);
      });
      this.setState({
        newFormdata: newFormdata,
        newUserdata: newUserdata
      })
    }
  }
  render() {

    return (
      <div>
        <Table
          columns={this.state.newFormdata}
          data={this.state.newUserdata}
        />
      </div>
    )
  }
}