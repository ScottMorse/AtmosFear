import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import Health from './Health'
import Shuttle from './Shuttle'
import Asteroid from './Asteroid'
import Level from './Level'

import { playAudio, stopAudio } from '../utils/utils'

const StyledMain = styled.div`
    position: relative;
    width: 1000px;
    height: 700px;
    background-image: linear-gradient(to bottom, lightblue, #00184B, #00184B, lightblue);
    background-position-y: 0px;
    background-size: 100% 500%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    &:focus{
        outline: none;
    }
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
    13: {name: "Enter"},
    83: {name: "s"},
    37: {direction: "left"},
    39: {direction: "right"},
}

let threatFallIntvl
let threatCreateIntvl
export default class Main extends Component {

    state = {
        currentKey: null,
        keyIsPressed: false,
        keysPressed: [],
    }

    componentDidMount(){
        threatFallIntvl = setInterval(()=>this.props.fallThreats(),100)
    }

    selectSound = () => {
        const el = document.getElementById('sound-button')
        if(!this.props.sound.selected){
            playAudio('intro')
            el.innerHTML = "SOUND"
            this.props.selectSound()
        }
        else{
            stopAudio('intro')
            el.innerHTML = "X SOUND"
            this.props.deselectSound()
        }
    }

    playMainMusic = () => {
        if(this.props.sound.selected){
            playAudio('main')
        }
    }

    componentDidUpdate(){
        if(!this.props.game.ended){
            if(this.props.shuttle.health == 0){
                this.props.endGame()
            }
        }
        if(this.props.game.ended){
            clearInterval(threatFallIntvl)
            clearInterval(threatCreateIntvl)
            if(!this.props.game.won){
                this.gameOver()
            }
        }
    }

    startGame = () => {
        if(this.props.sound.selected){
            this.playMainMusic()
        }
        const startMask = document.getElementById('game-start')
        const flare = document.getElementById('flare')
        const main = document.getElementById('main')
        main.style.animation = 'skyAnimation 60s linear infinite'
        flare.style.display = 'unset'
        flare.style.animation = 'flareAnim 0.5s linear infinite'
        startMask.style.opacity = 0
        setTimeout(()=>{
            startMask.style.diplay='none'
            this.startThreats()
        },1000)
    }

    gameOver = () => {
        const gameOverEl = document.getElementById('game-over')
        gameOverEl.style.display = 'flex'
        setTimeout(()=>gameOverEl.style.opacity = 1,50)
    }

    startThreats = () => {
        threatCreateIntvl = setInterval(()=> {this.props.newThreat(
            Math.round(Math.random() * 490) * (Math.round(Math.random()) ? -1:1),
            'ASTEROID')
        },1000)
    }

    handleKeyDown = (e) => {
        if(this.state.currentKey === e.keyCode) return

        if(e.persist) e.persist()

        if(e.keyCode == 13){
            this.startGame()
        }
        else if(e.keyCode == 83){
            this.selectSound()
        }

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
        return <StyledMain id="main" tabIndex="0" onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}>
            <div className="fullscreen" id="game-start">
                <StartButton id="sound-button" style={{backgroundColor: "lightblue"}} onClick={this.selectSound}>X SOUND<audio src="../assets/audio/intro.mp3" id="intro"></audio></StartButton>
                <h1>AtmosFear</h1>
                <StartButton onClick={this.startGame}>START</StartButton>
            </div>
            <div className="fullscreen" id="game-over">
                <h1>Game Over</h1>
            </div>
            <Level {...this.props}/>
            <Health {...this.props}/>
            {this.props.threats.map((threat,i) => {
                const threatProps = {
                    key: threat.id,
                    threatId: threat.id,
                    xPos: threat.xPos,
                    yPos: threat.yPos,
                    rect: threat.rect,
                    ...this.props
                }
                switch(threat.threatType){
                    case 'ASTEROID':
                        return <Asteroid {...threatProps}/>
                    default:
                        return <Asteroid {...threatProps}/>
                }
            })
            }
            <Shuttle {...this.props}/>
        </StyledMain>
    }
}