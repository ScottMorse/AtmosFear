import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'


const StyledAsteroid = styled.div`
    position: absolute;
    background-color: maroon;
    width: 30px;
    height: 30px;
    border: 10px solid black;
    z-index: 1;
    opacity: 1;
    transition: transform 0.1s linear;
`

export default class Asteroid extends Component {

    speed = 20

    state = {
        hasHit: false,
        element: null,
        active: false
    }

    componentDidMount(){
        let thisAsteroidState
        this.props.threats.forEach(threat => {
            if(threat.id == this.props.threatId){
                thisAsteroidState = threat
            }
        })
        const asteroidRect = thisAsteroidState.rect
        
        const element = document.getElementById('a' + this.props.threatId)
        this.setState({element: element})

        element.style.cssText = `
            position: absolute;
            background-color: maroon;
            width: 30px;
            height: 30px;
            border: 10px solid black;
            z-index: 1;
            opacity: 1;
            transition: transform 0.1s linear;
            transform: translate(${this.props.xPos}px,${this.props.yPos}px) rotate(0deg)
        `

        this.props.fallThreat(this.speed,this.props.threatId)
        let continuing = true
        const fallIntvl = setInterval(()=> {
            if(this.props.yPos >= 700){
                clearInterval(fallIntvl)
                this.props.deactivateThreat(this.props.threatId)
                return
            }
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
                                (asteroidRect.y[0] <= shuttleRect.y[0] && asteroidRect.y[0] >= shuttleRect.y[1])
                                ||
                                (asteroidRect.y[1] <= shuttleRect.y[0] && asteroidRect.y[1] >= shuttleRect.y[1])
                            )
                        ){
                            this.props.hitShuttle('ASTEROID')
                            clearInterval(fallIntvl)
                            this.setState({hasHit: true})
                            this.disintegrate()
                            setTimeout(()=>this.props.deactivateThreat(this.props.threatId),500)
                            continuing = false
                            throw {name: 'Break'}
                        }
                    })
                }
                catch(e){if(e.name !== 'Break') throw e }
            }
            if(continuing) this.props.fallThreat(this.speed,this.props.threatId)
        },100)
    }

    componentDidUpdate(){
        this.state.element.style.transform = `translate(${this.props.xPos}px,${this.props.yPos}px) rotate(0deg)`
    }

    disintegrate = () => {
        this.state.element.style.opacity = 0
        this.state.element.style.transition = 'transform 0.5s linear, opacity 0.5s ease'
        this.state.element.style.transform = `translate(${this.props.xPos}px,900px) rotate(1000deg)`
    }

    render(){
        return <div id={"a" + this.props.threatId}></div>
    }
}