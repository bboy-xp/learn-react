import React, { Component } from "react";
import axios from 'axios';
import { Table } from 'element-react';


export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {
        "_id": 'ObjectId("5b4f264c1008a506ec346938")',
        "fields": [{
          "name": "姓名",
          "type": "single_line_text"
        }, {
          "name": "动机",
          "type": "paragraph_text"
        }, {
          "name": "性别",
          "type": "single_choice",
          "choice": [{
            "name": "option",
            "value": "男"
          }, {
            "name": "option",
            "value": "女"
          }]
        }, {
          "name": "爱好",
          "type": "multiple_choice",
          "choice": [{
            "name": "option",
            "value": "11"
          }, {
            "name": "option",
            "value": "22"
          }, {
            "name": "option",
            "value": "33"
          }, {
            "name": "option",
            "value": "44"
          }, {
            "name": "option",
            "value": "55"
          }]
        }, {
          "name": "年龄",
          "type": "number"
        }, {
          "name": "手机",
          "type": "phone"
        }, {
          "name": "专业",
          "type": "drop_down",
          "choice": [{
            "name": "option",
            "value": "11"
          }, {
            "name": "option",
            "value": "22"
          }, {
            "name": "option",
            "value": "33"
          }, {
            "name": "option",
            "value": "44"
          }]
        }],
        "title": "测试表单6",
        "describe": "6",
        "next": "8K3CL",
        "id": "py2zW",
        "createdAt": 'ISODate("2018-07-18T11:36:44.606Z")',
        "updatedAt": 'ISODate("2018-07-18T11:36:44.606Z")',
        "__v": 0
      },
      userdata: [{
        "_id": 'ObjectId("5b5173d96b38be332c7a977a")',
        "userdata": {
          "id": "py2zW",
          "姓名": "施心平",
          "动机": "吃药",
          "性别": "男",
          "爱好": ["11", "22", "33", "44"],
          "年龄": "20",
          "手机": "18846084097",
          "专业": "44"
        },
        "createdAt": 'ISODate("2018-07-20T05:32:09.376Z")',
        "updatedAt": 'ISODate("2018-07-20T05:32:09.376Z")',
        "__v": 0
      }, {
        "_id": 'ObjectId("5b51755e6b38be332c7a977b")',
        "userdata": {
          "id": "py2zW",
          "姓名": "hhp",
          "动机": "happy",
          "性别": "男",
          "爱好": ["11", "44"],
          "年龄": "25",
          "手机": "110",
          "专业": "22"
        },
        "createdAt": 'ISODate("2018-07-20T05:38:38.526Z")',
        "updatedAt": 'ISODate("2018-07-20T05:38:38.526Z")',
        "__v": 0
      }]
    };
  }
  componentDidMount() {

  }
  render() {
    const formdata = this.state.formdata.fields;
    let newFormdata = [];
    formdata.map((field,index) => {
      newFormdata.push({
        label: field.name,
        prop: field.name,
      })
    });
    const userdata = this.state.userdata;
    let newUserdata = [];
    userdata.map((e,index) => {
      newUserdata.push(e.userdata);
    }) 
    console.log(newUserdata);
    return (
      <div>
        <Table 
          columns={newFormdata}
          data={newUserdata}
        />
      </div>
    )
  }
}