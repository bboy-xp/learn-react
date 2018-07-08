import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScoreContainer, TitleBar, ItemsContainer } from "./score-style.js"
function scoreList() {

}
class Score extends Component {
    constructor(props) {
        super(props);
    }

    demo() {
        let timeScores;
        if (!this.props.timeScores.length) {
            timeScores = [];
        } else {
            timeScores = this.props.timeScores;
        }
        const items = timeScores.map((item) => {
            return (
                <div>{item}</div>
            )
        })
        return items;
        console.log(items);
    }
    render() {
        return (
            <ScoreContainer>
                <TitleBar onClick={this.demo.bind(this)}>score</TitleBar>
                <ItemsContainer>
                    {this.demo()}
                </ItemsContainer>
            </ScoreContainer>
        )
    }
}



//将state.timeResStrArray绑定到props的timeResStrArray
const mapStateToProps = (state = {}) => {
    console.log(`scores mapstatetoprops:`, state)
    return {
        timeScores: state.timeScores
    }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteScore: (timeResStr) => dispatch({ type: "DELETE_SCORE", timeResStr })
    }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Score)

