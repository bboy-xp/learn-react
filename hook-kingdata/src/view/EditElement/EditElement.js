import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
class EditElement extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      fields: []
    }
  }

  handleClick(event) {
    // window.location.href = "/addElement";
    this.props.history.push("/addElement");
    // console.log("aaaa");
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
      <div>空</div>
    }
  
    return (
      <div>
        {list}
        <div>
          <button onClick={this.handleClick}>点击添加字段</button>
          {/* <Link to = "/addElement">点击添加字段</Link> */}

        </div>
      </div>
    )
  }

}

//将state.fields绑定到props的timeResStrArray
const mapStateToProps = (state = {}) => {
  console.log(state);
  return {
    fields: state.fields
  }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(EditElement)