import React, { Component } from 'react'
import styled from 'styled-components'

import Timer from './Timer'

const StyledLevel = styled.div`
    color: rgb(0,255,0);
    transform: translateX(400px);
`

export default class Level extends Component {
    render(){
        return <StyledLevel>Level: {this.props.level}<Timer {...this.props}/></StyledLevel>
    }
}