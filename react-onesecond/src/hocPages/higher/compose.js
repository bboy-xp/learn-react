//这是一个函数，接收一个组件，并返回另一个组件
import React, { Component } from "react"
import {MainContainer,UnwrappedContainer} from "./style.js"
function compose(WrappedComponent,someProps) {
    class hoc extends Component {
        constructor(props) {
            super(props)
        }
        render(){
            return(
                <MainContainer>
                    <UnwrappedContainer>
                    这是外面的组件内容
                    </UnwrappedContainer>
                    <WrappedComponent></WrappedComponent>
                </MainContainer>
            )
        }
    }
    return hoc;
}
export default compose;