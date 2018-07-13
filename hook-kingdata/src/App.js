import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './view/Home/Home';
import CreateForm from './view/CreateForm/CreateForm';
import AddElement from './view/AddElement/AddElement';
import FormStyle from './view/FormStyle/FormStyle';
import EditElement from './view/EditElement/EditElement';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './App.css';
//引入zent组件库样式
import 'zent/css/index.css';
import { Form } from 'zent';

function todos(state = {}, action) {
  switch (action.type) {
    case 'PUSH_FIELDS':
      // console.log(state.num);
      const fields_n = "fields_" + state.num;
      // console.log(!state[fields_n]);
      if (state[fields_n].length) {
        // console.log(action);
        return Object.assign({}, state, { ["fields_" + state.num]: state["fields_" + state.num].concat([action.field]) })
      }

      return Object.assign({}, state, { ["fields_" + state.num]: [].concat([action.field]) })


    case 'PUSH_TITLE':
      return Object.assign({}, state, { title: action.title });
    case 'PUSH_DESCRIBE':
      return Object.assign({}, state, { describe: action.describe });
    case 'PUSH_NUM':
      return Object.assign({}, state, { num: action.num });
    case 'INIT_FIELD':
      return Object.assign({}, state, { ["fields_" + state.num]: [] })
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
            <Route path="/editElement" component={EditElement} />
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
