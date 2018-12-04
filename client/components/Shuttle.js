import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

let previousHealth = 100
export default class Shuttle extends Component {

    componentDidMount(){
        const element = document.getElementById('shuttle')
        element.style.transform = `translate(${this.props.shuttle.position}px,456px)`
        element.style.cssText = `
            position: absolute;
            filter: invert(0) brightness(1) sepia(0);
            /* background-image: radial-gradient(closest-side at 50% 50%, red, rgba(0,0,0,0), rgba(0,0,0,0));
            background-size: 500%;
            background-position: center;
            background-repeat: no-repeat; */
            transition: transform .05s linear, filter 0.5s linear;
        `
        this.setState({el: element})
    }

    componentDidUpdate(){
        if(previousHealth != this.props.shuttle.health){
            this.hitAnimation()
        }
        previousHealth = this.props.shuttle.health
        this.state.el.style.transform = `translate(${this.props.shuttle.position}px,456px)`
    }

    hitAnimation = () => {
        const shuttleImg = document.getElementById('shuttle')
        shuttleImg.style.filter = "invert(1) brightness(0.5) sepia(1)"
        setTimeout(()=>shuttleImg.style.filter = "invert(0)",500)
    }

    render(){
        return <img id="shuttle" src={require('../assets/imgs/shuttle.png')}/>
    }
}