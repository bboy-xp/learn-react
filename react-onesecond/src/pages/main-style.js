import styled from "styled-components";

const shadowDIV = styled.div`
    box-shadow:1px 1px 1px 1px #123123;
`
  
export const MainContainer = shadowDIV.extend`
    height:100vh;
    width:100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const TimeShowBox = shadowDIV.extend`
    width:30vw;
    height:10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const BeginButton = shadowDIV.extend`
    width:30vw;
    height:30vw;
    border-radius: 50%;
    margin-top:10vw;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const CheckScoreButton = shadowDIV.extend`
    width:20vw;
    height:7vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:10vw;
`