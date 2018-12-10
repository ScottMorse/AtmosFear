# AtmosFear
## A 3-Day React/Redux Game Challenge

## <a href="http://atmos-fear.herokuapp.com">Play Here!</a>

This was a personal challenge to make a game using React and Redux in 3 days.  Project was started on December 3rd 2018, finalized on December 5th, and deployed for public play on December 6th.

What was created during this project time:
* Original game visuals (the space shuttle and enemy graphics)
* The game's entire functionality using the React and Redux JavaScript libraries
* Original background music and sound effects produced with Logic Pro

## <a target="_blank" href="https://www.youtube.com/watch?v=3X9DpqyjG9g"> Youtube Preview</a>

[![AtmosFear link to YouTube](https://img.youtube.com/vi/3X9DpqyjG9g/0.jpg)](https://www.youtube.com/watch?v=3X9DpqyjG9g)

# Overview

In this game, you're a space shuttle trying to leave the atmosphere intact.  Avoid the obstacles with left/right keys, and advanced a level when you can make it to the end of the timer without losing all your health!

Click 'Sound' to hear the sound effects and original soundtrack!

Music, pixel graphics, and functionality is all original by Scott Morse.

# Code snippets

## **The Redux**

## The default state
This is the default state of the store when the game first loads:
```javascript
//from store.js
const defaultState = {
    shuttle: {
        position: 0,
        rects: defaultShuttleRects,
        health: 100,
        damageTotal: 0,
    },
    threats: [],
    game: {
        active: false,
        ended: false,
        gameOver: false,
        gameWin: false,
        level: 1,
    },
    sound: {
        selected: false
    }
}
```
The major important aspects of the game are separated out based on the subject matter, such as the shuttle and overall game state.  Each major part of the state has it's own reducer file.
## Action creators
The actions that are used for dispatch are all in the file actionCreators.js. This is where all of the action types and arguments for each action are defined, such as a few examples here, which are all descriptive of different game events:
```javascript
//from actions/actionCreators.js
export function startGame(){
    return {
        type: 'START_GAME'
    }
}

export function gameOver(){
    return {
        type: 'GAME_OVER'
    }
}

export function moveShuttle(direction){
    return {
        type: 'MOVE_SHUTTLE',
        direction
    }
}
```
## The Reducers
There are several different reducer files, which are all combined for export using Redux's combineReducers function.
```javascript
// reducers/index.js
import { combineReducers } from 'redux'

import shuttle from './shuttle'
import threats from './threats'
import game from './game'
import sound from './sound'

export default combineReducers({
    shuttle,
    threats,
    game,
    sound
})
```
Every reducer file receives the action from the dispatch, but each uses a switch statement in order to narrow the action type it received to a specific update to part of the state.

`combineReducers` not only allows for better code organization, but allows each reducer to only handle part of the state.  For example, the game reducer only returns the part of the 'game' part of the store.
```javascript
// reducers/game.js
export default function game(state = {
    active: false,
    started: false,
    ended: false,
    gameOver: false,
    gameWin: false,
    level: 1,
}, action){
    switch(action.type){
        case 'START_GAME':
            return {
                ...state,
                active: true,
                started: true
            }
        case 'GAME_OVER':
            return {
                ...state,
                active: false,
                gameOver: true,
                ended: true,
            }
        case 'GAME_WIN':
            return {
                ...state,
                active: false,
                gameWin: true,
                ended: true,
            }
        case 'LEVEL_WIN':
            return {
                ...state,
                active: false,
                level: state.level + 1
            }
        default:
            return state
    }
}
```
## **The React**
Not very many components needed to be defined in order to run the game.  

## Styled components
I used styled-components to handle styling, but after running into performance issues associated using highly dynamic properties, I had to use this library minimally, and instead of creating a styled-component for each element/component, I used it mainly to define a global style.  After going through this, I realized it ended up mainly being as useful as a CSS import, which would have saved some space in the build bundle.  
I like this library, but would not use it again with any components that need to update any style properties to a large extent, and it can take up a large portion of your Webpack bundle if you are using many libraries.

## The Shuttle

The Main component deals with the keypresses that move the shuttle.  Rather than translating the shuttle in proportion to the keydown events generated, a keydown on the left or right key triggers an interval which will translate the shuttle, which is cleared if the key is lifted or the other is pressed.  View `Main.js` to see my `handleKeyDown` and `handleKeyUp` functions tp see jpw these events are handled so that the user can leave one key down while switching directions, instead of requiring all keys to be lifted up.

### Smooth animation

The shuttle's position along the x-axis of the game is stored in the Redux state and updated by the appropriate keyboard events. The shuttle's `componentWillUpdate` function checks if it had been hit/healed and updates the translation of its DOM element.

```javascript
// components/Shuttle.js in class Shuttle
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
  ```

 The interval at which the shuttle is translated is set at 50ms.  In order to make the translation smooth rather than blocky, a CSS transition is set on the shuttle element as `transition: transform 0.05s linear` in order to fill in the gap between the pixels jumped at exactly the same rate that the interval is run.  The animation of the asteroids falling is created the same way.  This allows the controlling of a sort of 'frame rate' at which the Redux store is updated.  

 Having the positions of the elements set at an interval by Redux may seem excessive, but it is what allows for hit detection.

Speaking of which...

## Hit detection

The hit boxes of the shuttle and falling asteroids (referred to in the code as 'rects') are constantly kept track of with Redux.

The starting rects for the shuttle are defined in `utils.js`.
```javascript
// from utils/utils.js
export const defaultShuttleRects = [
    {x: [-75,75],y: [650,606]},
    {x: [-65,65],y: [606,596]},
    {x: [-55,55],y: [596,526]},
    {x: [-45,45],y: [526,506]},
    {x: [-35,35],y: [506,486]},
    {x: [-25,25],y: [486,476]},
    {x: [-15,15],y: [476,456]},
    {x: [-5,5],y: [456,446]}
]
```
Each of these represents a min and max x and min and max y position of each portion of the shuttle to check for collision.  Some of the very bottom of the shuttle is left out for mercy on the player.  The center of the game is x = 0, and the top of the game is y = 0.  The shuttle's reducer (`reducers/shuttle.js`) takes care of updating the x values by however many pixels it has moved.

Each asteroid threat has a rect as well, which has its y values updated as it falls.  Each update to its position checks if it has collided with any of the shuttle's rects in its `componentDidUpdate`.

```javascript
// from components/Asteroid.js in componentWillUpdate()
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
```
The `throw` allows for a break of the forEach loop, since it only needs to detect one collision.

The hit detection is much easier with the Laser components, which only needs to know whether there was collision within the widest x values of the shuttle rect:
```javascript
// from components/Laser.js, a method of the Laser component
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
```

## The Timer 

The Timer component is the main place where the overall state of the game's progress is regulated, unless the shuttle has lost all health, in which case, the timer's interval ceases and the Main component displays the Game Over mask over the game.

The Timer component simply has a `start()` method, which it uses to display the seconds remaining, and to determine how the game will progress.  Once it ends, it will either dispatch an action that increases the game level in Redux, or declares the game won after level 6.

```javascript
// from components/Timer.js in the Timer class
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
```

## Webpack
The devServer.js file was just used for writing the game, as it uses the Webpack's Hot Middleware to allow hot reloading on save.  Webpack allowed a simple deployment of the game using a build with Babel.

## Known challenges/issues

* Performance is not always optimal when there are many components on the screen, such as when there are many asteroids.
* Styled-components was responsible for at least part of the performance issues
* Occasionally a small slip in performance may reveal an impoper collision that doesn't match up with the unsynced transition.
* There is a rare bug with the keyboard events that causes the shuttle's translation interval to not clear, sending it all the way to one side while no keys are pressed.

# Thank you!
Thank you for visiting and reading a bit about this game.  Feel free to explore the code to see the details that weren't covered here.