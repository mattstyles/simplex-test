/**
 * Generates a noisy radial gradient. inefficiently.
 */


import { to1d } from './util'
import random from 'lodash.random'

class Cell {
    constructor( opts ) {
        this.mapWidth = opts.mapWidth
        this.mapHeight = opts.mapHeight
        this.maxAge = opts.maxAge
        this.pos = opts.pos
    }

    step() {

    }
}

export default class RollingGen {
    constructor( opts ) {
        this.width = opts.width
        this.height = opts.height

        this.map = new Array( this.width * this.height )
    }

    rndMoveParticle( x, y ) {
        x += random( -1, 1 )
        y += random( -1, 1 )


    }

    generate( params ) {
        // Blank map, full of 0
        for ( let i = 0; i < this.width * this.height; i++ ) {
            this.map[ i ] = 0
        }

        for ( let particle = 0; particle < params.num; particle++ ) {
            let age = 0
            let pos = {
                x: random( 0, this.width ),
                y: random( 0, this.height )
            }
            while ( age < params.age ) {

                // Inc cell
                this.map[ to1d( pos.x, pos.y ) ] += 1

                // Move to random adjacent square (that is lower in value)
                pos = this.rndMoveParticle( pos.x, pos.y )

                age++
            }
        }
    }
}
