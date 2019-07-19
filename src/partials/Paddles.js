import {SVG_NS} from '../settings'


export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
        this.boardHeight = boardHeight
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.speed = 10 // moves 10 pixels per click
        this.score = 0


        
        // 
        // this.keyMap = {}
        // document.addEventListener('keydown', (event) => {
    
        //     onkeydown = onkeyup = event => {
        //     // console.log("key pressed is", event.key)
        //     // this.keyMap.push(event.key) = event.type
        //     this.keyMap[event.key] = event.type === 'keydown'
        //     // console.log(this.keyMap)
        //     console.log("keyMap", this.keyMap[event.key])
        //     console.log(event.key)
        //     if (this.keyMap['a'] || this.keyMap['z'] || this.keyMap['ArrowUp'] || this.keyMap['ArrowDown']) {
        //         switch(event.key) {
        //             case up: this.y = Math.max(0, this.y - this.speed) //Math.max picks the largest of the numbers
        //             console.log(event.key)
        //             break
        //             case down: this.y = Math.min(this.boardHeight - this.height, this.y + this.speed)
        //             break
        //         } 
        //     }
        //   }
        // })

        // OPTION A
        document.addEventListener('keydown', (event) => {  // arrow function keeps global scope - otherwise need to bind this to that
            console.log(event)
            switch(event.key) {
                case up: this.y = Math.max(0, this.y - this.speed) //Math.max picks the largest of the numbers
                break
                case down: this.y = Math.min(this.boardHeight - this.height, this.y + this.speed)
                break
            }
        })

    }

    


    // get coordinates of paddles
    coordinates(x, y, width, height) {
        // get left  and right x position of ONE paddle
        let leftX = x
        let rightX = x + width
        let topY = y
        let bottomY = y + height
        return [leftX, rightX, topY, bottomY]
    }



    render(svg) {
        let rect = document.createElementNS(SVG_NS, 'rect')
        rect.setAttributeNS(null, 'width', this.width)
        rect.setAttributeNS(null, 'height', this.height)
        rect.setAttributeNS(null, 'fill', '#fff')
        rect.setAttributeNS(null, 'x', this.x)
        rect.setAttributeNS(null, 'y', this.y)

        svg.appendChild(rect)
    }
}