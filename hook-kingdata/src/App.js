import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './view/Home/Home';
import CreateForm from './view/CreateForm/CreateForm';
import AddElement from './view/AddElement/AddElement';
import './App.css';
import 'zent/css/index.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Route exact path="/" component={Home}/>
        <Route path="/createForm" component={CreateForm}/>
        <Route path="/addElement" component={AddElement}/>
        </div>
      </BrowserRouter>
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
