import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import { playHit, playCharge } from '../utils/utils'

export default class Laser extends Component {

    state = {
        hasHit: false,
        element: null,
        shuttleRange: {
            min: null,
            max: null,
        },
        active: false
    }

    componentDidMount(){
        
        const element = document.getElementById('l' + this.props.threatId)
        this.setState({element: element})

        element.style.transform = `
            translate(${this.props.xPos}px,${this.props.yPos}px) rotate(0deg)
        `

        setTimeout(()=>element.children[1].style.filter = 'saturate(1)',95)

        if(this.props.sound.selected) playCharge()

        setTimeout(() => {
            const beam = this.state.element.firstElementChild
            beam.style.opacity = 1
            beam.style.width = '20px'
            let i = 0
            this.shuttleHitCheck()
            const shuttleChecker = setInterval(() => {
                if(i == 6 || this.state.hasHit){
                    clearInterval(shuttleChecker)
                    return
                }
                this.shuttleHitCheck()
                i++
            },100)
            setTimeout(this.disintegrate,500)
        },1000)
    }

    shuttleHitCheck = () => {
        const shuttleXRange = this.props.shuttle.rects[0].x
        const shuttleMin = shuttleXRange[0]
        const shuttleMax = shuttleXRange[1]
        if(this.props.xPos > shuttleMin && this.props.xPos < shuttleMax){
            if(!this.props.game.ended) this.props.hitShuttle('LASER')
            if(this.props.sound.selected) playHit()
            this.setState(({hasHit: true}))
        }
    }

    disintegrate = () => {
        this.state.element.style.opacity = 0
        setTimeout(()=>this.props.deactivateThreat(this.props.threatId),500)
    }

    render(){
        return <div className="laser" id={"l" + this.props.threatId}><div className="beam"></div><div className="laser-img"></div></div>
    }
}