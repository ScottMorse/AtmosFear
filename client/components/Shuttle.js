import React, { Component } from 'react'
import styled from 'styled-components'

const StyledShuttle = styled.img`
    position: absolute;
    transform: translate(${props => props.xPos}px,456px);
    transition: transform .05s linear;
`

export default class Shuttle extends Component {
    render(){
        return <StyledShuttle xPos={this.props.shuttle.position} src={require('../assets/imgs/shuttle.png')}/>
    }
}