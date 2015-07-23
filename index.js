
import Simplex from 'fast-simplex-noise'

const WIDTH = 512
const HEIGHT = 512
const PIXEL_SIZE = 2

const canvas = document.createElement( 'canvas' )
const ctx = canvas.getContext( '2d' )
canvas.setAttribute( 'width', WIDTH * PIXEL_SIZE )
canvas.setAttribute( 'height', HEIGHT * PIXEL_SIZE )
document.body.appendChild( canvas )


let simplex = new Simplex({
    min: 0,
    max: 1,
    frequency: .01,
    amplitude: 1,
    octaves: 8,
    persistence: .5
})

let map = new Array( WIDTH * HEIGHT )

function generate() {
    for ( let y = 0; y < HEIGHT; y++ ) {
        for ( let x = 0; x < WIDTH; x++ ) {
            map[ to1d( x, y ) ] = simplex.get2DNoise( x, y )
        }
    }
}

function to1d( x, y ) {
    return x + ( y * WIDTH )
}

function getFill( value ) {
    // let opacity = value > .5
    //     ? 1
    //     : 0

    return 'rgba( ' + 0 + ', 0, 0, ' + value + ')'
}

function render() {
    ctx.clearRect( 0, 0, WIDTH * PIXEL_SIZE, HEIGHT * PIXEL_SIZE )

    for ( let y = 0; y < HEIGHT; y++ ) {
        for ( let x = 0; x < WIDTH; x++ ) {
            ctx.fillStyle = getFill( map[ to1d( x, y ) ] )
            ctx.fillRect( x + PIXEL_SIZE, y + PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE )
        }
    }
}


generate()
render()


window.generate = generate
window.render = render
