import {SVG_NS, KEYS} from '../settings'
import Board from './Board'
import Paddle from './Paddles'
import Ball from './Ball'

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    // create a new instance of board 
    this.board = new Board(this.width, this.height)

    
    // create paddle instances
    // common Paddle dimensions
    this.paddleWidth = 8
    this.paddleHeight = 56
    this.spaceFromWall = 10

    // Player 1 paddle
    this.player1 = new Paddle (
      this.height,                              // boardHeight
      this.paddleWidth,         
      this.paddleHeight, 
      this.spaceFromWall,                      // x position
      ((this.height - this.paddleHeight) / 2),  // y position
      KEYS.a,                                  // up KEY
      KEYS.z                                   // down KEY
      )

       // Player 2 paddle
    this.player2 = new Paddle (
      this.height,                                          // boardHeight
      this.paddleWidth,         
      this.paddleHeight, 
      (this.width - this.paddleWidth - this.spaceFromWall),  // x position
      ((this.height - this.paddleHeight) / 2),               // y position
      KEYS.up,
      KEYS.down
      )

      // create instance of ball (radius, boardWidth, boardHeight)
      this.radius = 8
      this.ball = new Ball (this.radius, this.width, this.height)
    

      // location in html element to append all game items to
      this.gameElement = document.getElementById(this.element)

      // event listener for Pausing game
      document.addEventListener('keydown', event => {
        switch(event.key) {
          case KEYS.spaceBar: this.pause = !this.pause
          this.player1.speed = 10
          this.player2.speed = 10
          console.log("paused", this.pause)
          break
        }
         
      })



  }

  render() {
    // pause game
    if(this.pause) {
      // stop player paddles from listening while paused
      this.player1.speed = 0
      this.player2.speed = 0
      return 
    }


    // clear board
    this.gameElement.innerHTML = ''

    // render/create the canvas for board (SVG element)
    let svg = document.createElementNS(SVG_NS, 'svg')

    svg.setAttributeNS(null, 'width', this.width)  // null because namespace is already called (SVG_NS), when saved svg variable
    svg.setAttributeNS(null, 'height', this.height)
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`)

    // append to HTML
    this.gameElement.appendChild(svg)

    // call the render method on board
    this.board.render(svg)

    // call the render method on both paddles
    this.player1.render(svg)
    this.player2.render(svg)

    // render the ball
    this.ball.render(svg)


  }
}
