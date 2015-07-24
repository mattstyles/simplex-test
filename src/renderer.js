
import { to1d } from './util'
import CONSTANTS from './constants'

const CANVAS_WIDTH = CONSTANTS.WIDTH * CONSTANTS.PIXEL_WIDTH
const CANVAS_HEIGHT = CONSTANTS.HEIGHT * CONSTANTS.PIXEL_HEIGHT

const canvas = document.createElement( 'canvas' )
const ctx = canvas.getContext( '2d' )
canvas.setAttribute( 'width', CANVAS_WIDTH )
canvas.setAttribute( 'height', CANVAS_HEIGHT )
document.body.appendChild( canvas )

const blue = 'rgb( 72, 72, 218 )'
const cyan = 'rgb( 102, 241, 250 )'
const red = 'rgb( 255, 35, 45 )'
const brown = 'rgb( 155, 84, 10 )'
const yellow = 'rgb( 235, 235, 77 )'
const green = 'rgb( 77, 216, 18 )'
const grey = 'rgb( 190, 190, 190 )'
const white = 'rgb( 221, 224, 234 )'



export default class Renderer {
    constructor( opts ) {
        this.width = opts.width
        this.height = opts.height
    }

    getFuzzyTile( val ) {
        if ( val >= 0 && val < .3 ) {
            return {
                color: blue,
                char: '~'
            }
        }
        if ( val >= .3 && val < .5 ) {
            return {
                color: cyan,
                char: '~'
            }
        }
        if ( val >= .5 && val < .55 ) {
            return {
                color: yellow,
                char: '.'
            }
        }
        if ( val >= .55 && val < .67 ) {
            return {
                color: green,
                char: '.'
            }
        }
        if ( val >= .67 && val < .73 ) {
            return {
                color: green,
                char: '#'
            }
        }
        if ( val >= .73 && val < .78 ) {
            return {
                color: brown,
                char: '='
            }
        }
        if ( val >= .78 && val <= 1 ) {
            return {
                color: white,
                char: '^'
            }
        }

        return {
            color: 'rgb( 100, 100, 100 )',
            char: 'M'
        }
    }

    render( map ) {
        ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT )

        ctx.font = '11px "dejavu sans mono"'

        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                let tile = this.getFuzzyTile( map[ to1d( x, y ) ] )
                ctx.fillStyle = tile.color
                ctx.fillText( tile.char, x * CONSTANTS.PIXEL_WIDTH, y * CONSTANTS.PIXEL_HEIGHT )
            }
        }
    }

}
