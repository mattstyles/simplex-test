
import { to1d } from './util'
import CONSTANTS from './constants'

const CANVAS_WIDTH = CONSTANTS.WIDTH * CONSTANTS.PIXEL_SIZE
const CANVAS_HEIGHT = CONSTANTS.HEIGHT * CONSTANTS.PIXEL_SIZE

if ( document.querySelector( 'canvas' ) ) {
    throw new Error( 'are you trying to attach two renderers?' )
}

const canvas = document.createElement( 'canvas' )
const ctx = canvas.getContext( '2d' )
canvas.setAttribute( 'width', CANVAS_WIDTH )
canvas.setAttribute( 'height', CANVAS_HEIGHT )
document.body.appendChild( canvas )



export default class Renderer {
    constructor( opts ) {
        this.width = opts.width
        this.height = opts.height
    }

    getColor( value ) {
        return ' rgba( 255, 255, 255, ' + value + ')'
    }

    render( map ) {
        ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT )

        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                ctx.fillStyle = this.getColor( map[ to1d( x, y ) ] )
                ctx.fillRect( x * CONSTANTS.PIXEL_SIZE, y * CONSTANTS.PIXEL_SIZE, CONSTANTS.PIXEL_SIZE, CONSTANTS.PIXEL_SIZE )
            }
        }
    }

}
