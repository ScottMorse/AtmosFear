import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

let previousHealth = 100
export default class Shuttle extends Component {

    componentDidMount(){
        const element = document.getElementById('shuttle')
        element.style.transform = `translate(${this.props.shuttle.position}px,456px)`
        this.setState({el: element})
    }

    componentDidUpdate(){
        if(previousHealth != this.props.shuttle.health){
            this.hitAnimation()
        }
        if(this.props.game.ended) return
        previousHealth = this.props.shuttle.health
        this.state.el.style.transform = `translate(${this.props.shuttle.position}px,456px)`
    }

    hitAnimation = () => {
        const shuttleImg = document.getElementById('shuttle')
        shuttleImg.style.filter = "invert(1) brightness(0.5) sepia(1)"
        setTimeout(()=>{
            shuttleImg.style.filter = "invert(0)"
            if(this.props.game.ended){
                this.state.el.style.filter= 'brightness(0)'
            }
        },500)
    }

    render(){
        return <div id="shuttle"><img src={require('../assets/imgs/shuttle.png')}/><div id="flare"></div></div>
    }
}