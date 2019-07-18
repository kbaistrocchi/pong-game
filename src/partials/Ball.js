import {SVG_NS} from '../settings'

export default class Ball {
    constructor (radius, boardWidth, boardHeight) {
        this.radius = radius
        this.boardWidth = boardWidth
        this.boardHeight = boardHeight
        this.direction = 1
        
        this.reset()
    }

    reset() {
        // declare new object variable using dot notation
        this.x = this.boardWidth/2
        this.y = this.boardHeight/2

        // set ball off in random direction (vy = y vector)
        this.vy = 0
        while(this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 -5)
        }
        
        //this.vx = Math.floor(Math.random() * 10 -5)
        
        this.vx = this.direction * (6 - Math.abs(this.vy)) //Math.abs gives an absolute number
        console.log('vx', this.vx)
        console.log('vy', this.vy)
    }

    wallCollision() {
        // if ball hits top or bottom then reverse  y direction (make  = -y)
        const hitTop = this.y - this.radius <= 0
        const hitBottom = this.y + this.radius >= this.boardHeight

        if (hitTop || hitBottom) {
            // change vector direction
            this.vy = -this.vy
        }

        const hitLeft = this.x - this.radius <= 0
        const hitRight = this.x + this.radius >= this.boardWidth

        if (hitLeft || hitRight) {
            this.vx = -this.vx
        }
    }

    paddleCollision(player1, player2) {
        // if vx is +, then moving to the right and going to hit player2 paddle
        // Player 2 Paddle
        if (this.vx > 0) {
            // need player2 coordinates from Paddles.js
            let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height)
            let [leftX, rightX, topY, bottomY] = paddle
            // if balls y is greater or less than paddles' y, then goal
            if (
                // check left side of Player 2 paddle
                (this.x + this.radius >= leftX)
                && (this.x + this.radius <= rightX)
                && (this.y >= topY && this.y <= bottomY)
            ) {
                // then change the x direction of the ball
                this.vx = -this.vx
            }
            
        }
        // Player 1 Paddle
        else {
            let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height)
            let [leftX, rightX, topY, bottomY] = paddle
            if (
                // check right side of Player 1 paddle
                (this.x - this.radius >= leftX)
                && (this.x - this.radius <= rightX)
                && (this.y >= topY && this.y <= bottomY)
            ) {
                this.vx = -this.vx
            }
                
        }
    }


    render(svg, player1, player2) {
        this.x += this.vx
        this.y += this.vy 

        // add in wallCollision() because always on loop and always checking to see
        // if the ball has his the wall
        this.wallCollision()
        this.paddleCollision(player1, player2)

        let circle = document.createElementNS(SVG_NS, 'circle')
        circle.setAttributeNS(null, 'r', this.radius)
        circle.setAttributeNS(null, 'fill', '#fff')
        circle.setAttributeNS(null, 'cx', this.x)
        circle.setAttributeNS(null, 'cy', this.y)

        svg.appendChild(circle)
    }
}

