import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './view/Home/Home';
import CreateForm from './view/CreateForm/CreateForm';
import AddElement from './view/AddElement/AddElement';
import FormStyle from './view/FormStyle/FormStyle';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './App.css';
//引入zent组件库样式
import 'zent/css/index.css';
import { Form } from 'zent';

function todos(state = {}, action) {
  switch (action.type) {
    case 'PUSH_FIELDS':
    console.log(1111);
      if (!state.fields) {
        // console.log(action);
        return Object.assign({}, state, { fields: [].concat([action.field]) })
      }

      if (state.fields.length) {
        // console.log(action);
        return Object.assign({}, state, { fields: state.fields.concat([action.field]) })
      }
      break;
    default:
      break;
  }
}

const store = createStore(todos);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/createForm" component={CreateForm} />
            <Route path="/addElement" component={AddElement} />
            <Route path="/formStyle" component={FormStyle} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
// React.render((
// <Router>
//   <Route path="/" component={App}>
//     <Route path="createForm" component={Radio} />
//   </Route>
// </Router>
// ), document.body)
// const component2 = ()=>{
//   return (
//     <div>你好</div>
//   )
// }
export default App;
