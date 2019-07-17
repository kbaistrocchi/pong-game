import {SVG_NS, KEYS} from '../settings'
import Board from './Board'
import Paddle from './Paddles'

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
    

      // location in html element to append all game items to
    this.gameElement = document.getElementById(this.element)


  }

  render() {
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
  }
}
