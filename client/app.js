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
        game: state.game
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