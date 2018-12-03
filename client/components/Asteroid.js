import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'


const StyledAsteroid = styled.div`
    position: absolute;
    background-color: maroon;
    width: 30px;
    height: 30px;
    border: 10px solid black;
    transition: transform 0.1s linear;
    z-index: 1;
    transform: translate(${props => props.xPos}px,${props => props.yPos}px);
`

export default class Asteroid extends Component {

    speed = 10

    state = {
        hasHit: false
    }

    componentWillMount(){
        const thisAsteroidState = this.props.threats[this.props.index]
        const asteroidRect = thisAsteroidState.rect

        this.props.fallThreat(this.speed,this.props.index)
        const fallIntvl = setInterval(()=> {
            if(this.props.yPos >= 700){
                clearInterval(fallIntvl)
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
                            console.log("boom")
                            this.setState({hasHit: true})
                            throw {name: 'Break'}
                        }
                    })
                }
                catch(e){if(e.name !== 'Break') throw e }
            }
            this.props.fallThreat(this.speed,this.props.index)
        },100)
    }

    fall = () => {
        
    }

    render(){
        return <StyledAsteroid xPos={this.props.xPos} yPos={this.props.yPos}>
        </StyledAsteroid>
    }
}