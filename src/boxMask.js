
import { to1d } from './util'


/**
 * Mega simple vignette mask
 */
export default class BoxMask {
    constructor( opts ) {
        this.width = opts.width
        this.height = opts.height

        this.map = new Array( this.width * this.height )
    }

    generate( params ) {
        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {

                this.map[ to1d( x, y ) ] = 1

                // Nearly edge
                if ( x === 1 || y === 1 || x === this.width - 2 || y === this.height - 2 ) {
                    this.map[ to1d( x, y ) ] = params.innerEdge
                }

                // Edge
                if ( x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1 ) {
                    this.map[ to1d( x, y ) ] = params.outerEdge
                }

            }
        }
    }
}
