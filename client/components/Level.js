import React, { Component } from 'react'
import styled from 'styled-components'

import Timer from './Timer'

const StyledLevel = styled.div`
    color: rgb(0,255,0);
    transform: translateX(435px);
    text-align: center;
    background-color: rgba(0,0,0,0.3);
    height: 65px;
    padding-left: 20px;
    padding-right: 50px;
    z-index: 8;
`

export default class Level extends Component {
    render(){
        return <StyledLevel>Level {this.props.game.level}<Timer {...this.props}/></StyledLevel>
    }
}