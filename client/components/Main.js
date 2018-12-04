import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import Health from './Health'
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
    &:focus{
        outline: none;
    }
`

const GameStarter = styled.div`
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
    opacity: 1;
    transition: opacity 1s ease;
`

const StartButton = styled.button`
    font-size: 30px;
    text-align: center;
    background-color: rgb(0,255,0);
    border: none;
    padding: 20px;
    &:focus{
        outline: none;
    }
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

    startGame = () => {
        const startMask = document.getElementById('game-start')
        startMask.style.opacity = 0
        setTimeout(()=>{
            startMask.style.diplay='none'
            this.startThreats()
        },1000)
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

    startThreats = () => {
        const asteroidIntvl = setInterval(()=> {this.props.newThreat(
            Math.round(Math.random() * 490) * (Math.round(Math.random()) ? -1:1),
            'ASTEROID')
        },1000)
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
            <GameStarter id="game-start">
                <h1>AtmosFear</h1>
                <StartButton onClick={this.startGame}>START</StartButton>
            </GameStarter>
            <Health {...this.props}/>
                {this.props.threats.map((threat,i) => {
                    const threatProps = {
                        key: threat.id,
                        threatId: threat.id,
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