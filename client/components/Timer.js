import React, { Component } from 'react'

let intvl
export default class Timer extends Component{

    seconds = 30

    state = {
        started: false,
        stars: null,
        seconds: null,
    }

    componentDidMount(){
        this.setState({
            stars: document.getElementById('stars'),
            seconds: document.getElementById('seconds')
        })
    }

    componentDidUpdate(){
        if(!this.state.started && this.props.game.active){
            this.start()
        }
    }

    start = () => {
        this.setState({started: true})
        this.state.stars.style.opacity = 0
        let i = this.seconds
        intvl = setInterval(() => {
            if(!this.props.game.active){
                return
            }
            if(i < 6){
                this.state.seconds.style.color = 'yellow'
            }
            else{
                this.state.seconds.style.color = 'rgb(0,255,0)'
            }
            if(i < 10){
                this.state.seconds.innerHTML = "0" + i
            }
            else{
                this.state.seconds.innerHTML = i
            }
            if(i <= 15){
                this.state.stars.style.opacity = ((this.seconds - i - 15) / (this.seconds * 5)).toFixed(2)
            }
            if(i == 0){
                clearInterval(intvl)
                if(!this.props.game.gameOver){
                    if(this.props.game.level == 6){
                        this.props.winGame()
                        this.setState({started: false})
                    }
                    else{
                        this.props.levelWin()
                        this.setState({started: false})
                    }
                }
            }
            i--
        },1000)
    }

    stop = () => {
        
    }

    render(){
        return <div id="timer">0:<span id="seconds">{this.seconds}</span></div>
    }
}