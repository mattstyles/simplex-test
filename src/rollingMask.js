/**
 * Generates a noisy radial gradient. inefficiently.
 */


import { to1d, max, min } from './util'
import random from 'lodash.random'

class Particle {
    constructor( opts ) {
        this.mapWidth = opts.mapWidth
        this.mapHeight = opts.mapHeight
        this.age = 0
        this.maxAge = opts.maxAge
        this.pos = opts.pos
        this.map = opts.map
        this.currentCellValue = 0
    }

    isPosValid() {
        if ( this.pos.x >= this.mapWidth ||
             this.pos.x < 0 ||
             this.pos.y >= this.mapHeight ||
             this.pos.y < 0 ) {
            return false
        }

        if ( this.map[ to1d( this.pos.x, this.pos.y ) ] >= this.currentCellValue ) {
            return false
        }

        return true
    }

    step() {
        let old = {}
        old.x = this.pos.x
        old.y = this.pos.y
        this.currentCellValue = this.map[ to1d( old.x, old.y ) ]

        this.pos.x = old.x += random( -1, 1 )
        this.pos.y = old.y += random( -1, 1 )

        let attempts = 0

        while ( !this.isPosValid() ) {
            this.pos.x = old.x += random( -1, 1 )
            this.pos.y = old.y += random( -1, 1 )

            if ( attempts++ > 8 ) {
                this.age = this.maxAge
                break
            }
        }

        this.age++
    }

    roll() {
        while( this.age < this.maxAge ) {
            this.map[ to1d( this.pos.x, this.pos.y ) ] += 1
            this.step()
        }
    }
}

export default class RollingGen {
    constructor( opts ) {
        this.width = opts.width
        this.height = opts.height

        this.map = new Array( this.width * this.height )
    }

    normalize() {
        let range = max( this.map ) - min( this.map )
        this.map = this.map.map( cell => cell / range )
    }


    generate( params ) {
        // Blank map, full of 0
        for ( let i = 0; i < this.width * this.height; i++ ) {
            this.map[ i ] = 0
        }

        // Start each particle rolling
        for ( let num = 0; num < params.num; num++ ) {
            let particle = new Particle({
                map: this.map,
                mapWidth: this.width,
                mapHeight: this.height,
                maxAge: params.maxAge,
                pos: {
                    x: random( 0 + params.mapBorder, this.width - params.mapBorder ),
                    y: random( 0 + params.mapBorder, this.height - params.mapBorder )
                }
            })
            particle.roll()
            num++
        }

        // 0...1
        this.normalize()

        return this
    }
}
