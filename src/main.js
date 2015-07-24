
import Gui from './gui'
import CONSTANTS from './constants'
import SimplexGen from './simplex'
import RollingMask from './rollingMask'
import BoxMask from './boxMask'
import FlatMask from './flatMask'
import Merger from './merge'
import Renderer from './renderer'
// import Renderer from './colRenderer'

import { to1d, max, min } from './util'

let simplexParams = {
    min: 0,
    max: 1,
    octaves: 8,
    persistence: .5,
    frequency: .01,
    amplitude: 1
}

let rollingParams = {
    num: 5000,
    maxAge: 100,
    mapBorder: 6
}

let boxParams = {
    outerEdge: 0.12,
    innerEdge: 0.36
}

let flatParams = {
    value: 1
}

let map = null

const simplexGen = new SimplexGen({
    width: CONSTANTS.WIDTH,
    height: CONSTANTS.HEIGHT
})

const rollingMask = new RollingMask({
    width: CONSTANTS.WIDTH,
    height: CONSTANTS.HEIGHT
})

const boxMask = new BoxMask({
    width: CONSTANTS.WIDTH,
    height: CONSTANTS.HEIGHT
})

const flatMask = new FlatMask({
    width: CONSTANTS.WIDTH,
    height: CONSTANTS.HEIGHT
})

const merger = new Merger({
    width: CONSTANTS.WIDTH,
    height: CONSTANTS.HEIGHT
})

merger
    // .mask( boxMask.generate( boxParams ).map )
    .mask( rollingMask.generate( rollingParams ).map )

const renderer = new Renderer({
    width: CONSTANTS.WIDTH,
    height: CONSTANTS.HEIGHT
})

function make() {
    // simplexGen.generate( simplexParams )
    // map = simplexGen.map
    // rollingMask.generate( rollingParams )
    // map = rollingMask.map
    // boxMask.generate( boxParams )
    // map = boxMask.map

    simplexGen.generate( simplexParams )
    map = merger.base( simplexGen.map ).merge()
    // flatMask.generate( flatParams )
    // map = merger.base( flatMask.map ).merge()
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
window.merger = merger


window.debugMap = function( x, y, map ) {
    let m = map || window.map
    for ( let i = y; i < y + 10; i++ ) {
        let row = []
        for ( let j = x; j < x + 10; j++ ) {
            row.push( m[ to1d( i, j ) ].toFixed( 2 ) )
        }
        console.log( row.join( ' ' ) )
    }
}
window.max = max
window.min = min
