import Simplex from 'fast-simplex-noise'
import { to1d } from './util'

export default class SimplexGen {
    constructor( opts ) {
        this.width = opts.width
        this.height = opts.height

        this.map = new Array( this.width * this.height )
    }

    generate( params ) {
        let simplex = new Simplex( params )
        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                this.map[ to1d( x, y ) ] = simplex.get2DNoise( x, y )
            }
        }
    }
}
