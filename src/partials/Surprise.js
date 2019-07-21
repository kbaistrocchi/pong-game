import {SVG_NS} from '../settings'
export default class Star {
    constructor(x, y, colour) {
        this.x = x
        this.y = y
        this.colour = colour

        this.starLocation()
        this.setColour()
    }

    starLocation() {
        this.x = Math.random() * (512 - 20)
        this.y = Math.random() * (256 - 20)
    }

    setColour() {
        const colour = ['yellow', 'hotpink', 'aqua']
        let randomIndex = Math.floor(Math.random() * 3 )
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


