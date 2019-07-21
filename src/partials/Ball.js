import {SVG_NS} from '../settings'
import pingSound from "../../public/sounds/pong-01.wav";
import pingSound2 from "../../public/sounds/pong-02.wav";
import pingSound3 from "../../public/sounds/pong-03.wav";
import pingSound4 from "../../public/sounds/pong-04.wav";

export default class Ball {
    constructor (radius, boardWidth, boardHeight) {
        this.radius = radius
        this.boardWidth = boardWidth
        this.boardHeight = boardHeight
        this.direction = 1
        this.ping = new Audio(pingSound) 
        this.ping2 = new Audio(pingSound2)
        this.ping3 = new Audio(pingSound3)
        this.ping4 = new Audio(pingSound4)
        this.notice = document.getElementById('notice') 
        
        this.reset()
    }

    reset() {
        this.x = this.boardWidth/2
        this.y = this.boardHeight/2

        // set ball off in random direction (vy = y vector)
        this.vy = 0
        while(this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 -5)
        }
        this.vx = this.direction * (6 - Math.abs(this.vy)) 
    }

    wallCollision() {
        const hitTop = this.y - this.radius <= 0
        const hitBottom = this.y + this.radius >= this.boardHeight

        if (hitTop || hitBottom) {
            this.vy = -this.vy
            this.ping.play()
        }
    }

    paddleCollision(player1, player2) {
        // Player 2 Paddle
        if (this.vx > 0) {
            let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height)
            let [leftX, rightX, topY, bottomY] = paddle
            if (
                // check left side of Player 2 paddle
                (this.x + this.radius >= leftX)
                && (this.x + this.radius <= rightX)
                && (this.y >= topY && this.y <= bottomY)
            ) {
                this.vx = -this.vx
                this.ping2.play()
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
                this.ping2.play()
            }
                
        }
    }

    goal(player) {
        player.score++
        this.reset()
    }

    starCollision(star, player1, player2) {
        if (
            (this.x >= star.x - this.radius)
            && (this.x <= star.x + 20 + this.radius)
            && (this.y >= star.y - this.radius)
            && (this.y <= star.y + 20 + this.radius)
            ) {
                this.clearNotice()
                this.ping4.play()
                let scoreDifference = Math.abs(player1.score - player2.score)
                let winningScore = Math.max(player1.score, player2.score)
                // reset dimensions of ball and paddle
                this.radius = 8
                player1.height = 56
                player2.height = 56

                if (star.colour === 'yellow') {
                    this.minusGoal(player1, player2) 
                }
                else if (star.colour === 'hotpink') {
                    this.radius = 16 
                }
                else if (star.colour === 'aqua') {
                   if (scoreDifference > 0) {
                        if (winningScore === player1.score) {
                        player1.height = 28
                        }
                        else if (winningScore === player2.score) {
                           player2.height = 28
                        }
                    } 
                    else { 
                        this.tieGame() 
                    } 
                }
                setTimeout(this.reset(), 2000)
                setTimeout(star.starLocation(), 2000)
                setTimeout(star.setColour(), 2000)       
            }
        
    }


    minusGoal(player1, player2) {
        let winningScore = Math.max(player1.score, player2.score)
        if (player1.score === player2.score) {
            this.tieGame()
            return
        }
        if (winningScore === player1.score) {
            player1.score = player1.score - 2
            return
        }
        else if (winningScore === player2.score) {
            player2.score = player2.score - 2
            return
        }
    }
    

    tieGame() {
        this.notice.innerHTML = "it's a tie game, so nothing happened"
        this.notice.style.textAlign = 'center'
    }

    clearNotice() {
        this.notice.innerHTML = ""
    }


    render(svg, player1, player2, star) {
        this.x += this.vx
        this.y += this.vy 

        this.wallCollision()
        this.paddleCollision(player1, player2)
        this.starCollision(star, player1, player2)

        let circle = document.createElementNS(SVG_NS, 'circle')
        circle.setAttributeNS(null, 'r', this.radius)
        circle.setAttributeNS(null, 'fill', '#fff')
        circle.setAttributeNS(null, 'cx', this.x)
        circle.setAttributeNS(null, 'cy', this.y)

        svg.appendChild(circle)

        const rightGoal = this.x + this.radius >= this.boardWidth  
        const leftGoal = this.x - this.radius <= 0

        if (rightGoal) {
            this.direction = -1
            this.goal(player1)
        }
        else if (leftGoal) {
        this.direction = 1
        this.goal(player2)
        }

    }
}

