import React, { Component } from "react";
import axios from 'axios';
import { Notify, Collapse } from 'zent';
import "./Update.css";

export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: [],
      id: '',
      openid: '',
      formName: '',
      activeKey: "0",

    };
    this.inputChange = this.inputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.collapseChange = this.collapseChange.bind(this);
  }

  inputChange(index, e, index1) {
    const that = this;
    return function (event) {
      console.log(e);
      let newUserdata = that.state.userdata;
      newUserdata[index-1][e] = event.target.value;
      console.log(newUserdata);
      // that.setState({
      //   userdata: newUserdata
      // })
    }
  }
  async submit() {
    const userdata = this.state.userdata;
    const id = this.state.id;
    const openid = this.state.openid;
    const formName = this.state.formName;
    const res = await axios.post('/updateUserdata', {
      userdata: userdata,
      id: id,
      openid: openid,
      formName: formName
    });
    console.log(res);
    if (res.data.ok === 1) {
      alert('修改成功');
      window.location.reload();
    } else {
      Notify.error('修改失败，请重新修改');
    }
  }

  async componentDidMount() {
    const idStr = window.location.search;
    const id = idStr.split('=')[1];
    const openid = localStorage.getItem('openid');
    this.setState({
      id: id,
      openid: openid
    })
    const res = await axios.post('/getUserdataByOpenIdAndId', {
      id: id,
      openid: openid
    })
    console.log(res.data[0].userdata);
    this.setState({
      userdata: res.data[0].userdata,
      formName: res.data[0].formName
    });
  }
  collapseChange(activeKey) {
    this.setState({
      activeKey: activeKey
    });
  }
  render() {
    const userdata = this.state.userdata;

    let items;
    console.log(userdata);
    if (userdata.length !== 0) {
      //第一次map循环渲染出有几个折叠面板 
      items = userdata.map((item, index1) => {
        const keys = Object.keys(item);
        //第二次map循环渲染出表单数据
        const formDescription = keys.map((e, index) => {
          return (
            <div key={index}>
              <div>{e}</div>
              {
                e === 'id' ?
                <div className="valueContainer">{item[e]}</div> :
                <input className="valueContainer" defaultValue={item[e]} onChange={this.inputChange(index, e, index1)} type="text" />
              }
            </div>
          )
        }


        )
        return (
          <Collapse.Panel key={index1} title={"子表单" + (index1 + 1)}>
            {/* <div className="valueBox" key={index}>
              <div className="valueText">{e}</div>
              {
                e === 'id' ?
                  <div className="valueContainer">{value}</div> :
                  <input className="valueContainer" defaultValue={value} onChange={this.inputChange(index, e)} type="text" />
              }
              <br />
            </div> */}
            {
              formDescription
            }
          </Collapse.Panel>
        )
      }
      )
    }

    // const keys = Object.keys(userdata);
    // const item = keys.map((e, index) => {
    //   const value = userdata[e];
    //   return <div className="valueBox" key={index}>
    //     <div className="valueText">{e}</div>
    //     {
    //       e === 'id' ?
    //         <div className="valueContainer">{value}</div> :
    //         <input className="valueContainer" defaultValue={value} onChange={this.inputChange(index, e)} type="text" />
    //     }
    //     <br />
    //   </div>
    // })
    return (
      <div className="newContainer">
        <div className="itemContainer">
          <Collapse activeKey={this.state.activeKey} onChange={this.collapseChange} accordion>
            {items}
          </Collapse>
        </div>
        <button className="submitBtn" onClick={this.submit}>保存</button>
      </div>


    )
  }
}