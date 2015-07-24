import { max, min } from './util'

export default class Merger {
    constructor( opts ) {
        this.width = opts.width
        this.height = opts.height

        this.map = null

        this.maskMap = new Array( this.width * this.height )
        this.baseMap = null
        this.masks = []
    }

    base( map ) {
        this.baseMap = map

        return this
    }

    // Mask / Filter
    mask( map ) {
        this.masks.push( map )

        if ( this.masks.length < 2 ) {
            this.maskMap = this.masks[ 0 ]
            return this
        }

        // Aggregate masks - the merge then just applies the base
        this.maskMap = this.maskMap.map( ( cell, i ) => {
            // aggregate
            let value = this.masks.reduce( ( prev, curr ) => prev * curr[ i ], 1 )

            return value
        })

        this.normalize( this.maskMap )

        return this
    }

    normalize( map ) {
        let range = max( map ) - min( map )
        return map.map( cell => cell / range )
    }

    merge() {
        // Add mask map cell to base map cell and normalize
        this.map = this.maskMap.map( ( cell, index ) => ( cell * this.baseMap[ index ] ) )
        return this.normalize( this.map )
    }

}
