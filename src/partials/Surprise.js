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
    constructor(x, y) {
        this.x = x
        this.y = y

        this.starLocation()
    }

    // randomize star location
    starLocation() {
        this.x = Math.random() * (512 - 20)
        // console.log("star x", this.x)
        this.y = Math.random() * (256 - 20)
        // console.log("star y", this.y)
    }
    
    // starCoordinates(x, y) {
    //     let starX = x
    //     let StarY = y
    //     return [starX, starY]
    // }
    // delete
    // // get coordinates of paddles
    // coordinates(x, y, width, height) {
    //     // get left  and right x position of ONE paddle
    //     let leftX = x
    //     let rightX = x + width
    //     let topY = y
    //     let bottomY = y + height
    //     return [leftX, rightX, topY, bottomY]
    // }

    render(svg) {
        let group = document.createElementNS(SVG_NS, 'g')
        group.setAttributeNS(null, 'transform', `translate(${this.x}, ${this.y})`)
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

