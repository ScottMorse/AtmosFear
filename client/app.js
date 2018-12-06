import React, { Component } from 'react';
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import store from './store'
import * as actionCreators from './actions/actionCreators'

import styled, { createGlobalStyle } from 'styled-components'

function mapStateToProps(state) {
    return {
        shuttle: state.shuttle,
        threats: state.threats,
        game: state.game,
        sound: state.sound
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch)
}

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Press+Start+2P');
    html{
        line-height: 2;
    }
    body{
        margin: 0;
    }
    * {
        font-family: 'Press Start 2P';
    }
    #stars {
        background-image: url(${require('./assets/imgs/stars.png')});
        position: absolute;
        background-size: 30%;
        width: inherit;
        height: inherit;
        opacity: 0;
        transition: opacity 2s ease;
    }
    .asteroid {
        position: absolute;
        width: 50px;
        height: 50px;
        background-image: url(${require('./assets/imgs/asteroid.png')});
        z-index: 1;
        opacity: 1;
        transition: transform 0.1s linear;
    }
    .laser{
        position: absolute;
        width: 80px;
        height: 80px;
        z-index: 1;
        opacity: 1;
        transition: transform 0.1s linear, opacity 0.5s ease;
        display: flex;
        justify-content: center;
        .laser-img{
            width: inherit;
            height: inherit;
            filter: saturate(0);
            transition: filter 0.95s ease;
            background-image: url(${require('./assets/imgs/laser.png')});
        }
        .beam{
            opacity: 0;
            transition: opacity 0.5s ease, width 0.5s ease;
            width: 5px;
            height: 700px;
            background: red;
            box-shadow: 0 0 10px 2px red;
            position: absolute;
            z-index: 10;
            filter: saturate(1.9);
            margin-top: 50px;
        }
    }
    .health{
        position: absolute;
        background-image: url(${require('./assets/imgs/health.png')});
        border-radius: 50%;
        width: 50px;
        height: 50px;
        z-index: 1;
        opacity: 1;
        transition: transform 0.1s linear;
        box-shadow: 0 0 10px 5px rgb(0,255,0);
    }
    #shuttle {
        position: absolute;
        filter: invert(0) brightness(1) sepia(0) hue-rotate(0deg) saturate(1);
        transition: transform .05s linear, filter 0.5s linear;
        display: flex;
        justify-content: center;
    }
    #flare{
        position: absolute;
        height: 10px;
        width: 150px;
        background-color: yellow;
        z-index: 5;
        transform: translateY(234px);
        background-color: goldenrods;
        margin-right: 0px;
        display: none;
        overflow-x: hidden;
    }
    .fullscreen {
        position: absolute;
        width: inherit;
        height: inherit;
        z-index: 10;
        background-color: rgba(0,0,0,0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: rgb(0,255,0);
        font-size: 40px;
        opacity: 0;
        transition: opacity 0.5s ease;
        h2 {
            font-size: 20px;
            margin: -50px 0 50px 0;
        }
        user-select: none;
    }
    #game-start{
        opacity: 1;
    }
    #game-over, #level-complete, #game-win{
        display: none;
        text-align: center; 
    }
    @keyframes flareAnim {
        0% { box-shadow: 0 0 20px 5px yellow }
        50% { box-shadow: 0 0 20px 10px yellow }
        100% { box-shadow: 0 0 20px 5px yellow }
    }
    @keyframes skyAnimation {
        100% {background-position-y: -140%}
    }
`

const StyledPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    min-height: 100vh;
`

class Page extends Component {

    render(){
        return <StyledPage>
            <GlobalStyle/>
            {this.props.children ? React.cloneElement(this.props.children,this.props):''}
        </StyledPage>
    }

}
const PageWithStore = connect(mapStateToProps,mapDispatchToProps)(Page)

import Main from './components/Main'

class App extends Component {
    render(){
        return <Provider store={store}>
            <PageWithStore>
                <Main/>
            </PageWithStore>
        </Provider>
    }
}

render(<App/>, document.getElementById('root'))