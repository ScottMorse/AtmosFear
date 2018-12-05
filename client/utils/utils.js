export const defaultShuttleRects = [
    {x: [-75,75],y: [700,606]},
    {x: [-65,65],y: [606,596]},
    {x: [-55,55],y: [596,526]},
    {x: [-45,45],y: [526,506]},
    {x: [-35,35],y: [506,486]},
    {x: [-25,25],y: [486,476]},
    {x: [-15,15],y: [476,456]},
    {x: [-5,5],y: [456,446]}
]

const intro = new Audio(require('../assets/audio/intro.mp3'))
const main = new Audio(require('../assets/audio/atmosfear.mp3'))

const audioFiles = {
    intro: intro,
    main: main,
}

export const playAudio = (name) => {
    audioFiles[name].play()
}

export const stopAudio = (name) => {
    audioFiles[name].pause()
    audioFiles[name].currentTime = 0
}

export const playHit = () => {
    const hit = new Audio(require('../assets/audio/hit.mp3'))
    hit.volume = 0.3
    hit.play()
}