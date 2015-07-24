
import Gui from './gui'
import CONSTANTS from './constants'
import SimplexGen from './simplex'
import Renderer from './renderer'

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
    simplexGen.generate()
    map = simplexGen.map
    renderer.render( map )
}


const gui = new Gui( simplexParams )
gui.register( 'Generate', () => {
    console.log( 'Do some gen' )
    make()
})
