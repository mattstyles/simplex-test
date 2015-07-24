
import Gui from './gui'
import CONSTANTS from './constants'
import SimplexGen from './simplex'
import Renderer from './renderer'

import { to1d } from './util'

let simplexParams = {
    min: 0,
    max: 1,
    octaves: 8,
    persistence: .5,
    frequency: .01,
    amplitude: 1
}



let map = null

const simplexGen = new SimplexGen({
    width: CONSTANTS.WIDTH,
    height: CONSTANTS.HEIGHT
})

const renderer = new Renderer({
    width: CONSTANTS.WIDTH,
    height: CONSTANTS.HEIGHT
})

function make() {
    simplexGen.generate( simplexParams )
    map = simplexGen.map
    renderer.render( map )
}


const gui = new Gui( simplexParams )
gui.register( 'Generate', () => {
    console.log( 'Do some gen' )
    make()
})

// Kick off
make()



// Globals for debug/test
window.map = map


window.debugMap = function( x, y ) {
    for ( let i = y; i < y + 10; i++ ) {
        let row = []
        for ( let j = x; j < x + 10; j++ ) {
            row.push( map[ to1d( i, j ) ].toFixed( 2 ) )
        }
        console.log( row.join( ' ' ) )
    }
}
