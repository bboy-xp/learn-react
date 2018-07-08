import { MainContainer } from "./style.js"
import React, { Component } from 'react';
import { connect } from "react-redux";
class Common extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <MainContainer>这是一个普通的组件容器</MainContainer>
        )
    }
}

export default Common