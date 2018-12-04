import React, { Component } from 'react'
import styled from 'styled-components'

const StyledHealth = styled.div`
    position: absolute;
    margin: 5px;
    height: 20px;
    width: 300px;
    border: 5px solid black;
    background-color: darkslategrey;
    transform: translateX(-345px);
    z-index: 2;
`

const HealthFill = styled.div`
    height: inherit;
    width: ${props => props.percent * 300}px;
    background: rgb(${props => 255 - props.percent * 255},${props => props.percent * 255},0);
`

export default class Health extends Component {
    render(){
        return <StyledHealth>
            <HealthFill percent={this.props.shuttle.health / 100}/>
        </StyledHealth>
    }
}