import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import Health from './Health'
import Shuttle from './Shuttle'
import Asteroid from './Asteroid'
import Laser from './Laser'
import HealthBall from './HealthBall'
import Level from './Level'

import { playAudio, stopAudio } from '../utils/utils'

const StyledMain = styled.div`
    position: relative;
    width: 1000px;
    height: 700px;
    background-image: linear-gradient(to bottom, lightsteelblue, #00184B, #00184B, lightsteelblue);
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
        paused: false,
        gameBegun: false,
        currentKey: null,
        keyIsPressed: false,
        keysPressed: [],
        startMask: null,
        flare: null,
        main: null,
        soundButton: null,
        gameOver: null,
        levelCompleteEl: null,
        stars: null,
    }

    componentDidMount(){
        this.setState({
            startMask: document.getElementById('game-start'),
            flare: document.getElementById('flare'),
            main: document.getElementById('main'),
            soundButton: document.getElementById('sound-button'),
            gameOver: document.getElementById('game-over'),
            levelCompleteEl: document.getElementById('level-complete'),
            gameWinEl: document.getElementById('game-win'),
            stars: document.getElementById('stars'),
        })
    }

    componentDidUpdate(){
        if(!this.props.game.ended){
            if(this.props.shuttle.health <= 0){
                this.props.gameOver()
                return
            }
        }
        if(!this.props.game.active && this.props.game.started && !this.state.paused){
            this.setState({paused: true})
            this.state.stars.style.opacity = 0
            clearInterval(threatFallIntvl)
            clearInterval(threatCreateIntvl)
            this.props.clearThreats()
            if(this.props.game.gameOver){
                this.gameOver()
            }
            else if(this.props.game.gameWin){
                this.gameWin()
            }
            else{
                this.levelComplete()
            }
            this.state.main.style.animation = 'none'
            this.state.flare.style.display = 'none'
            this.state.flare.style.animation = 'none'
        }
    }

    startGame = () => {
        if(this.props.sound.selected){
            this.playMainMusic()
        }
        this.state.main.style.animation = 'skyAnimation 60s linear infinite'
        this.state.flare.style.display = 'unset'
        this.state.flare.style.animation = 'flareAnim 0.5s linear infinite'
        this.state.startMask.style.opacity = 0
        this.state.levelCompleteEl.style.opacity = 0
        setTimeout(()=>{
            this.state.startMask.style.diplay='none'
            this.state.levelCompleteEl.style.diplay='none'
            this.props.startGame()
            this.startThreats()
            this.setState({paused: false})
        },500)
    }

    gameOver = () => {
        this.state.gameOver.style.display = 'flex'
        setTimeout(()=>this.state.gameOver.style.opacity = 1,50)
    }

    gameWin = () => {
        this.state.gameWinEl.style.display = 'flex'
        setTimeout(()=>this.state.gameWinEl.style.opacity = 1,50)
    }

    levelComplete = () => {
        this.state.levelCompleteEl.style.display = 'flex'
        setTimeout(()=>this.state.levelCompleteEl.style.opacity = 1,50)
    }

    startThreats = () => {
        let threatTypes
        let createSpeed
        switch(this.props.game.level){
            case 1:
                threatTypes = () => Math.round(Math.random() * 5) ? 'ASTEROID':'HEALTH'
                createSpeed = 1000
                break
            case 2:
                threatTypes = () => Math.round(Math.random() * 5) ? 'LASER':'HEALTH'
                createSpeed = 1000
                break
            case 3:
                threatTypes = () => Math.round(Math.random() * 5) 
                    ? 
                    Math.round(Math.random()) ? 'LASER' : 'ASTEROID'
                    :
                    'HEALTH'
                createSpeed = 1000
                break
            case 4:
                threatTypes = () => Math.round(Math.random() * 5) ? 'ASTEROID':'HEALTH'
                createSpeed = 500
                break
            case 5:
                threatTypes = () => Math.round(Math.random() * 5) ? 'LASER':'HEALTH'
                createSpeed = 500
                break
            case 6:
                threatTypes = () => Math.round(Math.random() * 5) 
                    ? 
                    Math.round(Math.random()) ? 'LASER' : 'ASTEROID'
                    :
                    'HEALTH'
                createSpeed = 500
                break
        }
        threatCreateIntvl = setInterval(()=> {
            return (Math.round(Math.random() * 4) 
                ? 
                this.props.newThreat(Math.round(Math.random() * 490) * (Math.round(Math.random()) ? -1:1),threatTypes()) 
                : '' )
        },createSpeed)
        threatFallIntvl = setInterval(()=>this.props.fallThreats(),100)
    }

    selectSound = () => {
        if(!this.props.sound.selected){
            playAudio('intro')
            this.state.soundButton.innerHTML = "SOUND"
            this.props.selectSound()
        }
        else{
            stopAudio('intro')
            this.state.soundButton.innerHTML = "X SOUND"
            this.props.deselectSound()
        }
    }

    playMainMusic = () => {
        if(this.props.sound.selected){
            playAudio('main')
        }
    }

    handleKeyDown = (e) => {
        e.preventDefault()
        if(e.keyCode == 13 && this.state.paused && !this.props.game.gameOver) this.startGame()
        if(this.state.currentKey === e.keyCode || this.state.paused) return
        if(!Object.keys(keyCodes).includes("" + e.keyCode)) return

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
            if(this.state.keyIsPressed && this.state.currentKey === e.keyCode  && !this.state.paused){
                this.props.moveShuttle(direction)
            }
            else{
                clearInterval(moveIntvl)
                this.setState({isInterval: false})
            }
        },50)
    }

    handleKeyUp = (e) => {
        e.preventDefault()
        if(this.state.paused) {this.setState({keysPressed: []});return}
        if(!Object.keys(keyCodes).includes("" + e.keyCode)) return
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
            <div id="stars"></div>
            <div className="fullscreen" id="game-start">
                <StartButton id="sound-button" style={{backgroundColor: "lightblue"}} onClick={this.selectSound}>X SOUND<audio src="../assets/audio/intro.mp3" id="intro"></audio></StartButton>
                <h1>AtmosFear</h1>
                <h2>Avoid collision!</h2>
                <h2> Move: ← Left or Right →</h2>
                <StartButton onClick={this.startGame}>START</StartButton>
            </div>
            <div className="fullscreen" id="game-over">
                <h1>Game Over</h1>
                <h2>Levels completed: {this.props.game.level - 1}</h2>
                <h2>Total damage taken: {this.props.shuttle.damageTotal}</h2>
            </div>
            <div className="fullscreen" id="level-complete">
                <h1>Level {this.props.game.level - 1} Complete!</h1>
                <StartButton onClick={this.startGame}>LEVEL {this.props.game.level}</StartButton>
            </div>
            <div className="fullscreen" id="game-win">
                <h1>You Win!</h1>
                <h2>Total damage taken: {this.props.shuttle.damageTotal}</h2>
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
                    speed: threat.speed,
                    ...this.props
                }
                switch(threat.threatType){
                    case 'ASTEROID':
                        return <Asteroid {...threatProps}/>
                    case 'HEALTH':
                        return <HealthBall {...threatProps}/>
                    case 'LASER':
                        return <Laser {...threatProps}/>
                    default:
                        return <Asteroid {...threatProps}/>
                }
            })
            }
            <Shuttle {...this.props}/>
        </StyledMain>
    }
}