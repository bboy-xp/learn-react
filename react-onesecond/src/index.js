import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MainPage from "./pages/main";
import ScorePage from "./pages/score";
import CommonPage from "./hocPages/common/index";
import HocPage from "./hocPages/higher/index";
import graphPage from "./graphqlPages/index";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
const client = new ApolloClient({
    // uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
    uri:'http://localhost:3000/graphql'
});
function todos(state = {}, action) {
    switch (action.type) {
        case 'PUSH_SCORE':
            if (!state.timeScores) {
                //如果为undefined
                return Object.assign(state, { timeScores: [].concat([action.timeResStr]) })
            }

            if (state.timeScores.length) {
                return Object.assign(state, { timeScores: state.timeScores.concat([action.timeResStr]) })
            }
            break;
        default:
            break;
    }
}
const store = createStore(todos)

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter basename="/">
                <div>
                    <Route path="/home" component={App} />
                    <Route path="/main" component={MainPage} />
                    <Route path="/score" component={ScorePage} />
                    <Route path="/common" component={CommonPage} />
                    <Route path="/hoc" component={HocPage} />
                    <Route path="/graphql" component={graphPage} />
                </div>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
