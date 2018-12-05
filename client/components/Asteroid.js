import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import { playHit } from '../utils/utils'

const StyledAsteroid = styled.div`
    position: absolute;
    background-color: maroon;
    width: 30px;
    height: 30px;
    border: 10px solid black;
    border-radius: 50%;
    z-index: 1;
    opacity: 1;
    transition: transform 0.1s linear;
`

export default class Asteroid extends Component {

    speed = 50

    state = {
        hasHit: false,
        element: null,
        active: false
    }

    componentDidMount(){
        
        const element = document.getElementById('a' + this.props.threatId)
        this.setState({element: element})

        element.style.transform = `
            translate(${this.props.xPos}px,${this.props.yPos}px) rotate(0deg)
        `
    }

    componentDidUpdate(){
        const asteroidRect = this.props.rect
        if(this.props.yPos >= 750){
            this.props.deactivateThreat(this.props.threatId)
            return
        }
        this.state.element.style.transform = `translate(${this.props.xPos}px,${this.props.yPos}px) rotate(0deg)`
        if(!this.state.hasHit){
            try{
                this.props.shuttle.rects.forEach(shuttleRect => {
                    if(
                        (
                            (asteroidRect.x[0] >= shuttleRect.x[0] && asteroidRect.x[0] <= shuttleRect.x[1])
                            ||
                            (asteroidRect.x[1] >= shuttleRect.x[0] && asteroidRect.x[1] <= shuttleRect.x[1])
                        ) &&
                        (
                            (asteroidRect.y[0] - 20 <= shuttleRect.y[0] && asteroidRect.y[0] - 20 >= shuttleRect.y[1])
                            ||
                            (asteroidRect.y[1] - 20 <= shuttleRect.y[0] && asteroidRect.y[1] - 20 >= shuttleRect.y[1])
                        )
                    ){
                        this.props.hitShuttle('ASTEROID')
                        if(this.props.sound.selected){
                            playHit()
                        }
                        this.setState({hasHit: true})
                        this.disintegrate()
                        setTimeout(()=>this.props.deactivateThreat(this.props.threatId),500)
                        throw {name: 'Break'}
                    }
                })
            }
            catch(e){if(e.name !== 'Break') throw e }
        }
    }

    disintegrate = () => {
        this.state.element.style.opacity = 0
        this.state.element.style.transition = 'transform 0.5s linear, opacity 0.5s ease'
        this.state.element.style.transform = `translate(${this.props.xPos}px,900px) rotate(1000deg)`
    }

    render(){
        return <div className="asteroid" id={"a" + this.props.threatId}></div>
    }
}