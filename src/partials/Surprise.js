import {SVG_NS} from '../settings'

// Add svg shapes on board. When ball hits them, games elements change.
// Red >> paddles shrink
// Green >> ball slows down
// Yellow >> resets game play
// Purple >> winning player looses 2 points


// create svgs of different colours

// <!-- <g transform="translate(20, 20)"> -->
// 				<!-- star -->
// 				<!-- <polygon points = "0,8 20,8 4,20 10,0 16,20" fill = "red"/>
// 			 </g> -->

export default class Star {
    constructor(x, y, colour) {
        this.x = x
        this.y = y
        this.colour = colour

        this.starLocation()
        this.setColour()
    }

    // randomize star location
    starLocation() {
        this.x = Math.random() * (512 - 20)
        // console.log("star x", this.x)
        this.y = Math.random() * (256 - 20)
        // console.log("star y", this.y)
    }

    setColour() {
        const colour = ['yellow', 'hotpink', 'aqua']
        let randomIndex = Math.floor(Math.random() * 3 )
        console.log(randomIndex)
        this.colour = colour[randomIndex]
    }

    

    render(svg) {
        let group = document.createElementNS(SVG_NS, 'g')
        group.setAttributeNS(null, 'transform', `translate(${this.x}, ${this.y})`)
        let star = document.createElementNS(SVG_NS, 'polygon')
        star.setAttributeNS(null, 'fill', this.colour)
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

