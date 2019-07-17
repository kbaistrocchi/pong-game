import {SVG_NS} from '../settings'
import Board from './Board'

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    // create a new instance of board 
    this.board = new Board(this.width, this.height)

    // Other code goes here...
    this.gameElement = document.getElementById(this.element)
  }

  render() {
    // clear board
    this.gameElement.innerHTML = ''

    // render/create the canvas for board (SVG element)
    // use createElementNS for svg
    let svg = document.createElementNS(SVG_NS, 'svg')

    svg.setAttributeNS(null, 'width', this.width)
    // null because namespace is already called (SVG_NS), when saved svg variable
    svg.setAttributeNS(null, 'height', this.height)
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`)

    // append to HTML
    this.gameElement.appendChild(svg)

    // call the render method on board
    this.board.render(svg)
  }
}
