import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import { playHealth } from '../utils/utils'

export default class HealthBall extends Component {

    state = {
        hasHit: false,
        element: null,
        active: false
    }

    componentDidMount(){
        
        const element = document.getElementById('h' + this.props.threatId)
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
                        this.props.refillHealth(25)
                        if(this.props.sound.selected){
                            playHealth()
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
        return <div className="health" id={"h" + this.props.threatId}></div>
    }
}