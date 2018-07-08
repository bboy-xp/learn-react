import React, { Component } from 'react';
import { connect } from "react-redux";
import { MainContainer, TimeShowBox, BeginButton, CheckScoreButton } from "./main-style.js"
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBegin: false,
            time: 0,
            timeResStr: '0:00'
        }
    }
    handleBeginButton() {
        if (this.state.isBegin) {
            const endTime = new Date().getTime();
            const beginTime = this.state.time;
            const bewteenTime = endTime - beginTime;
            //如果已经开始则结束
            this.setState({
                isBegin: false,
                time: bewteenTime
            })
            this.convertTimeToStr(bewteenTime);

        } else {
            //如果已经结束则开始
            this.setState({
                isBegin: true,
                time: new Date().getTime(),
                timeResStr: '0:00'
            })
        }
    }
    handleCheckButton() {
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! history & location is in props
        this.props.history.push('/score')
    }
    convertTimeToStr(time) {
        const prefix = parseInt(time / 1000);
        const suffix = time - prefix * 1000;
        this.setState({
            timeResStr: `${prefix}:${suffix}`
        })
        this.props.pushScore(`${prefix}:${suffix}`);
    }
    render() {
        return (
            <MainContainer>
                <TimeShowBox>{this.state.timeResStr}</TimeShowBox>
                <BeginButton onClick={this.handleBeginButton.bind(this)}>{this.state.isBegin ? `结束` : `开始`}</BeginButton>
                <CheckScoreButton onClick={this.handleCheckButton.bind(this)}>查看成绩</CheckScoreButton>
            </MainContainer>
        );
    }
}



//将state.timeResStrArray绑定到props的timeResStrArray
const mapStateToProps = (state = {}) => {
    console.log(`main 中的 mapStateToProps:`, state)
    return {
        timeScores: state.timeScores
    }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pushScore: (timeResStr) => dispatch({ type: "PUSH_SCORE", timeResStr }),
    }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Main)

