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

    // create a new instance of board 
    this.board = new Board(this.width, this.height)

    
    // create paddle instances
    // common Paddle dimensions
    this.paddleWidth = 8
    this.paddleHeight = 56
    this.spaceFromWall = 10



     // Player 1 paddle
    //Paddle (boardHeight, width, height, x, y, up, down)
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

      // create new instance of Score Board
      this.score1 = new Score ((this.width/2 - 50), 30, 30)
      this.score2 = new Score ((this.width/2 + 25), 30, 30)



      // create instance of star
      this.star = new Star ()
    

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

     
      // OPTION B - NULL
      // onkeydown = onkeyup = event => {
      //   // console.log("key pressed is", event.key)
      //   // this.keyMap1.push(event.key) = event.type
      //   this.keyMap1[event.key] = event.type === 'keydown'
      //   // console.log(this.keyMap)
      //   console.log("keyMap 1:", this.keyMap1[event.key])
      // //   if (this.keyMap1['a']) {
      // //     this.player1.y = Math.max(0, this.player1.y - this.player1.speed)
      // //   }
      // //   else if (this.keyMap1['z']) {
      // //     this.player1.y = Math.min(this.height - this.player1.height, this.player1.y + this.player1.speed)
      // //   }
      // }

      // OPTION B - ONLY last player instance works
      // this.keyMap = {}
      // onkeydown = onkeyup = event => {
      //   // console.log("key pressed is", event.key)
      //   // this.keyMap.push(event.key) = event.type
      //   this.keyMap[event.key] = event.type === 'keydown'
      //   // console.log(this.keyMap)
      //   console.log("keyMap", this.keyMap[event.key])
      //   if (this.keyMap['a'] || this.keyMap['z'] || this.keyMap['ArrowUp'] || this.keyMap['ArrowDown']) {
      //     this.player2.y = Math.max(0, this.player2.y - this.player2.speed)
      //   }
      //   else if (this.keyMap['ArrowDown']) {
      //     this.player2.y = Math.min(this.height - this.player2.height, this.player2.y + this.player2.speed)
      //   }
      // }

      //  OPTION C - functions but paddles still interfere
      // // event listener for Player1 up and down paddle movement
      // document.addEventListener('keydown', (event) => {  // arrow function keeps global scope - otherwise need to bind this to that
      //       // console.log(event.key)
      //       if (event.key === 'a') {
      //         this.player1.y = Math.max(0, this.player1.y - this.player1.speed)
      //       }
      //       else if (event.key === 'z') {
      //         this.player1.y = Math.min(this.height - this.player1.height, this.player1.y + this.player1.speed)
      //       }
      //   })

      // OPTION C
    //     // event listener for Player2 up and down paddle movement
    //   document.addEventListener('keydown', (event) => {  
    //     console.log(event.key)
    //     console.log(this.player2)
    //     if (event.key === 'ArrowUp') {
    //       this.player2.y = Math.max(0, this.player2.y - this.player2.speed)
    //     }
    //     else if (event.key === 'ArrowDown') {
    //       this.player2.y = Math.min(this.height - this.player2.height, this.player2.y + this.player2.speed)
    //     }
    // })

    

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

    // append svg to game canvas
    this.gameElement.appendChild(svg)

    // call the render method on board
    this.board.render(svg)

    // call the render method on both paddles
    this.player1.render(svg)
    this.player2.render(svg)

    // // TRYING TO FIX PADDLES
    // this.player1.movePaddles(this.player1)




    // render the ball ... add ball arguments player1 and 2
    this.ball.render(svg, this.player1, this.player2, this.star)
    // console.log(this.player1)

    // render score boards
    this.score1.render(svg, this.player1.score)
    this.score2.render(svg, this.player2.score)

    // render the star!
    this.star.render(svg)
    
    
    

  


  }
}
