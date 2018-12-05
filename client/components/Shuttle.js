import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

let previousHealth = 100
export default class Shuttle extends Component {

    state = {
        element: null,
    }

    componentDidMount(){
        const element = document.getElementById('shuttle')
        element.style.transform = `translate(${this.props.shuttle.position}px,456px)`
        this.setState({element})
    }

    componentDidUpdate(){
        if(previousHealth > this.props.shuttle.health){
            this.hitAnimation()
        }
        else if(previousHealth < this.props.shuttle.health){
            this.healthAnimation()
        }
        if(this.props.game.ended) return
        previousHealth = this.props.shuttle.health
        this.state.element.style.transform = `translate(${this.props.shuttle.position}px,456px)`
    }

    hitAnimation = () => {
        this.state.element.style.filter = "invert(1) brightness(0.5) saturate(1) sepia(0.5) hue-rotate(0deg)"
        setTimeout(()=>{
            this.state.element.style.filter = "invert(0) brightness(1) saturate(1) sepia(0) hue-rotate(0deg)"
            if(this.props.game.ended){
                this.state.element.style.filter= 'invert(0) brightness(0) saturate(1) sepia(0) hue-rotate(0deg)'
            }
        },500)
    }

    healthAnimation = () => {
        this.state.element.style.filter = "invert(0) brightness(5) saturate(2) sepia(0) hue-rotate(100deg)"
        setTimeout(()=>{
            this.state.element.style.filter = "invert(0) brightness(1) saturate(1) sepia(0) hue-rotate(0deg)"
            if(this.props.game.ended){
                this.state.element.style.filter= 'invert(0) brightness(0) saturate(1) sepia(0) hue-rotate(0deg)'
            }
        },500)
    }

    render(){
        return <div id="shuttle"><img src={require('../assets/imgs/shuttle.png')}/><div id="flare"></div></div>
    }
}