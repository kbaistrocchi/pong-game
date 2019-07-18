import {SVG_NS} from '../settings'

// Add svg shapes on board. When ball hits them, games elements change.
// Red >> paddles shrink
// Green >> ball slows down
// Yellow >> resets game play
// Purple >> winning player looses 2 points


// create svgs of different colours
/* <polygon points = "100,10 40,180 190,60 10,60 160,180" fill = "red"/> */
// <!-- <g transform="translate(20, 20)"> -->
// 				<!-- star -->
// 				<!-- <polygon points = "0,8 20,8 4,20 10,0 16,20" fill = "red"/>
// 			 </g> -->

export default class Surprise {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    render(svg) {
        let group = document.createElementNS(SVG_NS, 'g')
        group.setAttributeNS(null, 'tranform', 'translate' + (this.x, this.y))
        let star = document.createElementNS(SVG_NS, 'polygon')
        star.setAttributeNS(null, 'fill', 'yellow')
        star.setAttributeNS(null, 'points', "0,8 20,8 4,20 10,0 16,20")
        svg.appendChild(group)
        group.appendChild(star)
    }
}

// create event listener or condition to trigger svg appearance (score?)

// have svg appear at random position on board (not behind paddles)

// condition for if ball hits new svg, trigger changes

// PURPLE >> find which player is winning(Math.max), subtract 2 pts
// let winning player = 

