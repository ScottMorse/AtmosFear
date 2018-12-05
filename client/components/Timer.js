import React, { Component } from 'react'

export default class Timer extends Component{

    state = {
        started: false
    }

    componentDidUpdate(){
        if(!this.state.started && this.props.game.started){
            this.start()
        }
    }

    start = () => {
        console.log('It would start now')
    }

    stop = () => {
        
    }

    render(){
        return <div>0:00</div>
    }
}