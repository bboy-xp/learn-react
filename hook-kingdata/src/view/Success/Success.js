import React, { Component } from 'react'

export default class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.goToList = this.goToList.bind(this);
    this.close = this.close.bind(this);
  }

  goToList() {
    this.props.history.push('/admin/list');
  }
  close() {
    window.close();
  }

  render() {
    return (
      <div>
        <div>恭喜您已填完表单</div>
        <button onClick={this.close}>关闭窗口</button>
        <button onClick={this.goToList}>管理表单</button>
      </div>
    )
  }
}
