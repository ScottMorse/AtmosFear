import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import Shuttle from './Shuttle'
import Asteroid from './Asteroid'

const skyAnimation = keyframes`
    100% {background-position-y: -500%}
`

const StyledMain = styled.div`
    position: relative;
    width: 1000px;
    height: 700px;
    background-image: linear-gradient(to bottom, navy, indigo, indigo, navy);
    background-position-y: 0px;
    background-size: 100% 500%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    animation: ${skyAnimation} 10s linear infinite;
`

const keyCodes = {
    37: {direction: "left"},
    39: {direction: "right"},
}

export default class Main extends Component {

    state = {
        currentKey: null,
        keyIsPressed: false,
        keysPressed: [],
    }

    componentWillMount(){
        this.props.newThreat(
            Math.round(Math.random() * 490) * (Math.round(Math.random()) ? -1:1),
            'ASTEROID')
    }

    handleKeyDown = (e) => {
        if(this.state.currentKey === e.keyCode) return

        if(e.persist) e.persist()

        const keyDef = keyCodes[e.keyCode]
        if(!keyDef) return
        const direction = keyDef.direction
        if(!direction) return

        this.setState({
            keyIsPressed: true,
            currentKey: e.keyCode
        })

        if(!this.state.keysPressed.includes(e.keyCode)){
            this.setState({
                keysPressed: [
                    ...this.state.keysPressed,
                    e.keyCode
                ]
            })
        }

        this.props.moveShuttle(direction)
        const moveIntvl = setInterval(()=>{
            if(this.state.keyIsPressed && this.state.currentKey === e.keyCode){
                this.props.moveShuttle(direction)
            }
            else{
                clearInterval(moveIntvl)
                this.setState({isInterval: false})
            }
        },50)
    }

    handleKeyUp = (e) => {
        const stateKeysCopy = this.state.keysPressed.slice()
        stateKeysCopy.splice(stateKeysCopy.indexOf(e.keyCode),1)
        this.setState({
            keysPressed: stateKeysCopy,
        })
        if(stateKeysCopy.length == 0){
            this.setState({
                keyIsPressed: false,
                currentKey: null
            })
        }
        else{
            this.handleKeyDown({keyCode: stateKeysCopy[stateKeysCopy.length - 1]})
        }
    }

    render(){
        return <StyledMain tabIndex="0" onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}>
            {this.props.threats.map((threat,i) => {
                const threatProps = {
                    key: i,
                    index: i,
                    xPos: threat.xPos,
                    yPos: threat.yPos,
                    ...this.props
                }
                switch(threat.threatType){
                    case 'ASTEROID':
                        return <Asteroid {...threatProps}/>
                    default:
                        return <Asteroid {...threatProps}/>
                }
            })}
            <Shuttle {...this.props}/>
        </StyledMain>
    }
}