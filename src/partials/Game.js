import {SVG_NS, KEYS} from '../settings'
import Board from './Board'
import Paddle from './Paddles'
import Ball from './Ball'
import Score from './Score'
import Star from './Surprise'

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.board = new Board(this.width, this.height)

    this.paddleWidth = 8
    this.paddleHeight = 56
    this.spaceFromWall = 10

    //Player 1 Paddle (boardHeight, width, height, x, y, up, down)
    this.player1 = new Paddle (
      this.height,                             
      this.paddleWidth,         
      this.paddleHeight, 
      this.spaceFromWall,                      
      ((this.height - this.paddleHeight) / 2),  
      KEYS.a,                                 
      KEYS.z                                 
      )

    // Player 2 paddle
    this.player2 = new Paddle (
      this.height,                                          
      this.paddleWidth,         
      this.paddleHeight, 
      (this.width - this.paddleWidth - this.spaceFromWall),  
      ((this.height - this.paddleHeight) / 2),              
      KEYS.up,
      KEYS.down
      )

    this.radius = 8
    this.ball = new Ball (this.radius, this.width, this.height)

    this.score1 = new Score ((this.width/2 - 50), 30, 30)
    this.score2 = new Score ((this.width/2 + 25), 30, 30)

    this.star = new Star ()
    
   // location in html element to append all game items 
    this.gameElement = document.getElementById(this.element)

    // Pausing game listener
    document.addEventListener('keydown', event => {
      switch(event.key) {
        case KEYS.spaceBar: this.pause = !this.pause
        this.player1.speed = 10
        this.player2.speed = 10
        console.log("Game is paused: ", this.pause)
        break
      }  
      })
 

  }



  render() {
    if(this.pause) {
      // stop player paddles from listening while paused
      this.player1.speed = 0
      this.player2.speed = 0
      return 
    }

    this.gameElement.innerHTML = ''

    // create the canvas for board
    let svg = document.createElementNS(SVG_NS, 'svg')
    svg.setAttributeNS(null, 'width', this.width)  // null because namespace is already called (SVG_NS), when saved svg variable
    svg.setAttributeNS(null, 'height', this.height)
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`)
    this.gameElement.appendChild(svg)

    this.board.render(svg)

    this.player1.render(svg)
    this.player2.render(svg)

    this.ball.render(svg, this.player1, this.player2, this.star)

    this.score1.render(svg, this.player1.score)
    this.score2.render(svg, this.player2.score)

    this.star.render(svg)

  }
}
