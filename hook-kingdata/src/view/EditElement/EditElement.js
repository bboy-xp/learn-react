import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
class EditElement extends Component {

  constructor(props) {
    super(props);
    this.addElement = this.addElement.bind(this);
    this.saveElement = this.saveElement.bind(this);
    this.state = {
      fields: []
    }
  }

  addElement(event) {
    // window.location.href = "/addElement";
    const fields_n = "fields_"+this.props.formData.num;
    if(!this.props.formData[fields_n]) {
      this.props.initField();
    }
    // const Obj = Object.keys(this.props.formData);
    //用Object.keys()方法判断一下是否存在，不存在initField()
    // Obj.forEach(e => {
    //   if(e == fields_n) {
    //     return;
    //   }else {
    //     this.props.initField();
    //     return;
    //   }
    // });
    this.props.history.push("/addElement");
    // console.log("aaaa");
  }
  saveElement(event) {
    this.props.history.push("/createForm");
  }
  componentDidMount() {
    this.setState({
      fields: this.props.fields
    })
  }

  render() {
    let list;
    if (this.state.fields) {
      list = this.state.fields.map((field, index) =>
        <div key={index}>{field.type}</div>
      )
    }else {
      list = <div>空</div>
    }
  
    return (
      <div>
        {list}
        <div>
          <button onClick={this.addElement}>点击添加字段</button>
          <br/>
          <button onClick={this.saveElement}>保存子表单</button>
          {/* <Link to = "/addElement">点击添加字段</Link> */}

        </div>
      </div>
    )
  }

}

//将state绑定到props的formData
const mapStateToProps = (state = {}) => {
  console.log(state);
  return {
    formData: state
  }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initField: () => dispatch({type: "INIT_FIELD"}),
  }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(EditElement)