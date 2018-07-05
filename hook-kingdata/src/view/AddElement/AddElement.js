import React, {Component} from 'react';
import { Button } from 'zent';

// 引入样式
// import 'zent/css/index.css';
export default class AddElement extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return(
      <div>
        <Button type="primary">按钮</Button>
        AddElement
      </div>
    )
  }

}